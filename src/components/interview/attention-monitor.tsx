"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Camera,
  CameraOff,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  HelpCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { AttentionEngine, ActiveAttentionWarning } from "@/lib/attention/attention-engine";
import { audioAlert } from "@/lib/attention/audio-alert";
import {
  AttentionStatus,
  HeadDirection,
  AttentionSummary,
  ATTENTION_CONFIG,
  ATTENTION_WARNINGS,
} from "@/lib/attention/attention-config";
import { registerCameraStream, stopCameraStream } from "@/lib/camera/camera-stream-manager";

interface AttentionMonitorProps {
  /** Optional pre-acquired live MediaStream from permission gate */
  initialStream?: MediaStream | null;
  /** Triggered when an alert state changes (true = deviation alert active) */
  onAlertChange?: (isAlert: boolean, message: string) => void;
  /** Triggered when attention session ends with the complete observational report */
  onSummaryReady?: (summary: AttentionSummary) => void;
  /** Triggered when attention status changes */
  onStatusChange?: (status: AttentionStatus) => void;
  /** Triggered when warning count or active warning changes (Levels 1 to 4) */
  onWarningChange?: (warningCount: number, activeWarning: ActiveAttentionWarning | null) => void;
  /** Triggered when interview is terminated due to repeated attention deviation */
  onAttentionTerminated?: (reason: string) => void;
  /** Indicates whether the interview/assessment session is currently active */
  isSessionActive?: boolean;
  /** Optional CSS classes for custom placement */
  className?: string;
  /** Compact display mode for mobile or small split screens */
  compact?: boolean;
  /** Active warning count (0, 1, 2, 3, 4) */
  warningCount?: number;
  /** Active warning object */
  activeWarning?: ActiveAttentionWarning | null;
  /** Whether the assessment is frozen due to violations */
  isFrozen?: boolean;
}

export function AttentionMonitor({
  initialStream,
  onAlertChange,
  onSummaryReady,
  onStatusChange,
  onWarningChange,
  onAttentionTerminated,
  isSessionActive = true,
  className = "",
  compact = false,
  warningCount: externalWarningCount,
  activeWarning: externalActiveWarning,
  isFrozen = false,
}: AttentionMonitorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const engineRef = useRef<AttentionEngine | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const [permissionState, setPermissionState] = useState<"idle" | "requesting" | "granted" | "denied" | "error">("idle");
  const [status, setStatus] = useState<AttentionStatus>("INITIALIZING");
  const [direction, setDirection] = useState<HeadDirection>("CENTER");
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [internalWarningCount, setInternalWarningCount] = useState<number>(0);
  const [internalActiveWarning, setInternalActiveWarning] = useState<ActiveAttentionWarning | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(0);

  const effectiveWarningCount = externalWarningCount !== undefined ? externalWarningCount : internalWarningCount;
  const activeWarningInfo = externalActiveWarning !== undefined ? externalActiveWarning : internalActiveWarning;


  // Keep latest callback references in refs to avoid re-triggering camera setup on parent re-renders
  const onAlertChangeRef = useRef(onAlertChange);
  const onSummaryReadyRef = useRef(onSummaryReady);
  const onStatusChangeRef = useRef(onStatusChange);
  const onWarningChangeRef = useRef(onWarningChange);
  const onAttentionTerminatedRef = useRef(onAttentionTerminated);

  useEffect(() => {
    onAlertChangeRef.current = onAlertChange;
    onSummaryReadyRef.current = onSummaryReady;
    onStatusChangeRef.current = onStatusChange;
    onWarningChangeRef.current = onWarningChange;
    onAttentionTerminatedRef.current = onAttentionTerminated;
  });

  // Setup and attach engine to the active video element
  const bindStreamToVideo = useCallback((stream: MediaStream) => {
    streamRef.current = stream;
    registerCameraStream(stream);
    setPermissionState("granted");

    const video = videoRef.current;
    if (!video) return;

    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }
    video.muted = true;
    video.playsInline = true;

    const startAnalysis = () => {
      video.play().catch((e) => console.warn("Video play handled:", e));

      if (!engineRef.current) {
        engineRef.current = new AttentionEngine();
      }

      engineRef.current.setCallbacks({
        onStatusChange: (newStatus, newDir) => {
          if (!isMountedRef.current) return;
          setStatus(newStatus);
          setDirection(newDir);
          onStatusChangeRef.current?.(newStatus);
        },
        onAlertTrigger: (alertActive, msg) => {
          if (!isMountedRef.current) return;
          setIsAlert(alertActive);
          setAlertMessage(msg);
          onAlertChangeRef.current?.(alertActive, msg);
        },
        onMetricsUpdate: (result) => {
          if (!isMountedRef.current) return;
          setConfidence(result.confidence);
          setDirection(result.direction);
        },
        onWarningChange: (count, warning) => {
          if (!isMountedRef.current) return;
          setInternalWarningCount(count);
          setInternalActiveWarning(warning);
          onWarningChangeRef.current?.(count, warning);
        },
        onAttentionTerminated: (reason) => {
          if (!isMountedRef.current) return;
          onAttentionTerminatedRef.current?.(reason);
        },
      });

      engineRef.current.start(video);
      setStatus("FOCUSED");
      onStatusChangeRef.current?.("FOCUSED");
    };

    if (video.readyState >= 2) {
      startAnalysis();
    } else {
      video.onloadeddata = startAnalysis;
      video.onloadedmetadata = startAnalysis;
    }
  }, []);

  // Comprehensive camera shutdown helper
  const stopCamera = useCallback(() => {
    if (engineRef.current) {
      const summary = engineRef.current.stop();
      onSummaryReadyRef.current?.(summary);
      engineRef.current = null;
    }

    if (streamRef.current) {
      stopCameraStream(streamRef.current);
      streamRef.current = null;
    }

    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      } catch {
        // Ignore
      }
    }
  }, []);

  // Initialize or re-acquire camera stream with automatic retry
  const startCamera = useCallback(async (retryCount: number = 0) => {
    if (!isMountedRef.current || !isSessionActive) return;

    try {
      if (initialStream && initialStream.active) {
        bindStreamToVideo(initialStream);
        return;
      }

      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setPermissionState("denied");
        setStatus("UNAVAILABLE");
        return;
      }

      setPermissionState("requesting");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 320, min: 240 },
          height: { ideal: 240, min: 180 },
          frameRate: { ideal: 15, max: 20 },
          facingMode: "user",
        },
        audio: false,
      });

      if (!isMountedRef.current) {
        stopCameraStream(stream);
        return;
      }

      bindStreamToVideo(stream);
    } catch (err: unknown) {
      console.warn("Attention camera acquisition attempt failed:", err);

      // Retry up to 3 times with backoff if camera is temporarily locked by DirectShow
      if (retryCount < 3 && isMountedRef.current) {
        setTimeout(() => {
          startCamera(retryCount + 1);
        }, 400 * (retryCount + 1));
        return;
      }

      setPermissionState("denied");
      setStatus("UNAVAILABLE");
    }
  }, [bindStreamToVideo, initialStream, isSessionActive]);

  // Main lifecycle: start camera on mount if session active, stop on unmount
  useEffect(() => {
    isMountedRef.current = true;
    if (isSessionActive) {
      startCamera(0);
    }

    return () => {
      isMountedRef.current = false;
      stopCamera();
    };
  }, [isSessionActive, startCamera, stopCamera]);

  // Handle incoming initialStream changes if stream attaches after mount
  useEffect(() => {
    if (initialStream && initialStream.active && isSessionActive) {
      bindStreamToVideo(initialStream);
    }
  }, [initialStream, isSessionActive, bindStreamToVideo]);

  // Stop camera if session becomes inactive
  useEffect(() => {
    if (!isSessionActive) {
      stopCamera();
    }
  }, [isSessionActive, stopCamera]);

  // Automatically shut down camera tracks when page/tab is navigated away or hidden
  useEffect(() => {
    const handlePageHide = () => {
      stopCamera();
    };
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
    };
  }, [stopCamera]);

  // Ensure video element plays the live stream as soon as DOM video attaches
  useEffect(() => {
    if (streamRef.current && videoRef.current) {
      const video = videoRef.current;
      if (video.srcObject !== streamRef.current) {
        video.srcObject = streamRef.current;
        video.play().catch(() => {});
      }
    }
  }, [permissionState, initialStream]);

  // Toggle sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioAlert.setEnabled(next);
  };

  // Render Status Badge Content
  const renderStatusBadge = () => {
    if (isAlert || status === "DEVIATION_WARNING") {
      return (
        <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px] font-bold animate-pulse">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
          <span>⚠ Attention Check</span>
        </div>
      );
    }

    if (status === "FACE_LOST_WARNING" || direction === "FACE_NOT_VISIBLE") {
      return (
        <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold animate-pulse">
          <Eye className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          <span>Face Not Visible</span>
        </div>
      );
    }

    if (direction !== "CENTER") {
      return (
        <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-medium">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Glancing {direction}</span>
        </div>
      );
    }

    if (status === "FOCUSED") {
      return (
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>Attention: Focused</span>
        </div>
      );
    }

    if (status === "UNAVAILABLE") {
      return (
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
          <CameraOff className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          <span>Monitor Offline</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px]">
        <RefreshCw className="h-3 w-3 animate-spin shrink-0" />
        <span>Calibrating...</span>
      </div>
    );
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
        isAlert
          ? "border-2 border-rose-500 bg-rose-950/30 shadow-[0_0_25px_rgba(244,63,94,0.6)] ring-2 ring-rose-500/50"
          : direction !== "CENTER" && status !== "INITIALIZING"
          ? "border-amber-500/50 bg-slate-950/90 shadow-amber-950/20"
          : "border-cyan-500/30 bg-slate-950/90 shadow-cyan-950/20"
      } ${className}`}
    >
      {/* Top Header Controls */}
      <div className="px-3 py-2 bg-slate-900/95 border-b border-white/[0.08] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span
              className={`h-2 w-2 rounded-full ${
                isAlert
                  ? "bg-rose-500 animate-ping"
                  : direction !== "CENTER"
                  ? "bg-amber-400 animate-pulse"
                  : status === "FOCUSED"
                  ? "bg-emerald-400 animate-ping opacity-75"
                  : "bg-cyan-400"
              }`}
            />
            <span
              className={`absolute h-2 w-2 rounded-full ${
                isAlert
                  ? "bg-rose-500"
                  : direction !== "CENTER"
                  ? "bg-amber-400"
                  : status === "FOCUSED"
                  ? "bg-emerald-400"
                  : "bg-cyan-400"
              }`}
            />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-200 uppercase">
            Attention Monitor
          </span>
          {isFrozen ? (
            <span className="px-1.5 py-0.5 rounded bg-rose-500/30 border border-rose-500 text-rose-300 text-[9px] font-mono font-bold animate-pulse">
              FROZEN 🔒
            </span>
          ) : effectiveWarningCount > 0 ? (
            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border transition-colors ${
              effectiveWarningCount === 1
                ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                : effectiveWarningCount === 2
                ? "bg-orange-500/20 border-orange-500/50 text-orange-300"
                : effectiveWarningCount === 3
                ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                : "bg-red-600/30 border-red-500 text-red-200 animate-pulse font-extrabold"
            }`}>
              Attention Warning {effectiveWarningCount}/4
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-1">
          {permissionState === "denied" && (
            <button
              type="button"
              onClick={() => startCamera(0)}
              title="Retry Camera"
              className="p-1 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 transition-colors text-[10px] font-mono flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Retry
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleSound}
            title={soundEnabled ? "Mute Attention Chime" : "Unmute Attention Chime"}
            className="p-1 rounded-lg text-slate-400 hover:text-foreground hover:bg-white/10 transition-colors"
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-cyan-400" /> : <VolumeX className="h-3.5 w-3.5 text-slate-500" />}
          </button>

          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            title="Privacy & Monitoring Info"
            className="p-1 rounded-lg text-slate-400 hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand Preview" : "Minimize Preview"}
            className="p-1 rounded-lg text-slate-400 hover:text-foreground hover:bg-white/10 transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Info Privacy Tooltip Modal */}
      {showInfo && (
        <div className="p-3 bg-slate-900/95 border-b border-white/10 text-[10px] font-mono text-slate-300 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1 text-cyan-400 font-bold">
            <Sparkles className="h-3 w-3" />
            <span>Privacy & Observational Protocol</span>
          </div>
          <p>
            • Analyzes approximate head orientation locally on your browser.
          </p>
          <p>
            • <strong>Zero video recording or external transmission.</strong>
          </p>
          <p>
            • Observational presence telemetry only — does NOT assess veracity or reduce technical interview scores.
          </p>
        </div>
      )}

      {/* Video & Tracking Canvas Area */}
      {!isMinimized && (
        <div className="relative aspect-[4/3] bg-black/90 overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full object-cover scale-x-[-1]"
          />

          {/* Orientation Overlay Grid Lines */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 grid grid-cols-3 grid-rows-3">
            <div className="border-r border-b border-white/[0.03]" />
            <div className="border-r border-b border-white/[0.03]" />
            <div className="border-b border-white/[0.03]" />
            <div className="border-r border-b border-white/[0.03]" />
            <div className={`border-r border-b transition-colors ${isAlert ? "border-rose-500/40 bg-rose-500/[0.05]" : "border-cyan-500/20 bg-cyan-500/[0.02]"}`} />
            <div className="border-b border-white/[0.03]" />
            <div className="border-r border-white/[0.03]" />
            <div className="border-r border-white/[0.03]" />
            <div />
          </div>

          {/* Real-Time Direction Badge Pill */}
          {direction !== "CENTER" && (
            <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider ${
              isAlert
                ? "bg-rose-950/90 border border-rose-500 text-rose-300 animate-pulse shadow-lg"
                : "bg-amber-950/80 border border-amber-500/50 text-amber-300"
            }`}>
              {direction}
            </div>
          )}

          {/* Deviation Alert Overlay (Shows 4-Level Warning card when looking away) */}
          {isAlert && (
            <div className={`absolute inset-0 flex items-center justify-center p-2 text-center animate-pulse ${
              effectiveWarningCount >= 4
                ? "bg-red-950/80 border-2 border-red-600"
                : effectiveWarningCount === 3
                ? "bg-rose-950/70 border-2 border-rose-600"
                : effectiveWarningCount === 2
                ? "bg-orange-950/60 border-2 border-orange-500"
                : "bg-amber-950/50 border-2 border-amber-500"
            }`}>
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/95 border border-white/20 shadow-2xl backdrop-blur-md max-w-[95%]">
                <AlertTriangle className={`h-6 w-6 mx-auto animate-bounce ${
                  effectiveWarningCount >= 4
                    ? "text-red-400"
                    : effectiveWarningCount === 3
                    ? "text-rose-400"
                    : effectiveWarningCount === 2
                    ? "text-orange-400"
                    : "text-amber-400"
                }`} />
                <p className="text-[11px] font-mono font-extrabold uppercase tracking-tight text-white">
                  {activeWarningInfo?.title || `Attention Warning ${effectiveWarningCount || 1}/4`}
                </p>
                <p className="text-[10px] font-mono text-slate-200 leading-snug">
                  {activeWarningInfo?.message || alertMessage || "Please maintain your focus on the screen."}
                </p>
                {effectiveWarningCount > 0 && (
                  <p className={`text-[9px] font-mono font-bold ${
                    effectiveWarningCount >= 4
                      ? "text-red-300"
                      : effectiveWarningCount === 3
                      ? "text-rose-300"
                      : "text-amber-300"
                  }`}>
                    Attention Warning {effectiveWarningCount}/4
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Status Ribbon */}
      <div className="p-2.5 bg-slate-900/90 flex items-center justify-between gap-2 border-t border-white/[0.08]">
        <div className="flex-1 truncate">{renderStatusBadge()}</div>

        <div className="text-[9px] font-mono text-muted-foreground flex items-center gap-1 shrink-0">
          <span>Status:</span>
          <span className={`font-bold uppercase ${
            isAlert
              ? "text-rose-400 font-extrabold"
              : direction !== "CENTER"
              ? "text-amber-400"
              : "text-emerald-400"
          }`}>
            {isAlert ? "DEVIATION ALERT" : direction !== "CENTER" ? direction : "FOCUSED"}
          </span>
        </div>
      </div>
    </div>
  );
}

