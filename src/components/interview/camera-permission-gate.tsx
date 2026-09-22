"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  CameraOff,
  Mic,
  ShieldCheck,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Video,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";

interface CameraPermissionGateProps {
  onPermissionGranted: (stream?: MediaStream | null) => void;
  onCancel: () => void;
  roleTitle?: string;
}

export function CameraPermissionGate({
  onPermissionGranted,
  onCancel,
  roleTitle = "Software Engineering Candidate",
}: CameraPermissionGateProps) {
  const [permissionState, setPermissionState] = useState<"prompt" | "requesting" | "granted" | "denied">("prompt");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isProceedingRef = useRef<boolean>(false);

  const requestCameraAccess = async () => {
    setPermissionState("requesting");
    setErrorMessage("");

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setPermissionState("denied");
      setErrorMessage("Camera access is not supported by your browser environment.");
      return;
    }

    try {
      // Release any previously opened stream tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640, min: 320 },
          height: { ideal: 480, min: 240 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;
      setPermissionState("granted");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err: any) {
      console.warn("Camera permission denied or unavailable:", err);
      setPermissionState("denied");
      setErrorMessage(
        err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
          ? "Camera permission was denied. Please allow camera access in your browser settings to proceed with the mock interview."
          : "Could not initialize video stream. Please ensure no other application is using your webcam."
      );
    }
  };

  // Ensure video element plays the live stream immediately upon granting
  useEffect(() => {
    if (permissionState === "granted" && streamRef.current && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn("Video auto-play handled:", e);
        });
      }
    }
  }, [permissionState]);

  const handleProceed = () => {
    if (isProceedingRef.current) return;
    isProceedingRef.current = true;
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const stream = streamRef.current;
    // Pass live stream directly so the interview room starts instantly with zero hardware delays
    onPermissionGranted(stream);
  };

  // Auto-redirect upward to the mock interview upon granting permission
  useEffect(() => {
    if (permissionState === "granted") {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      const redirectTimer = setTimeout(() => {
        handleProceed();
      }, 1200);

      return () => clearTimeout(redirectTimer);
    }
  }, [permissionState]);

  useEffect(() => {
    return () => {
      // If unmounted without proceeding (e.g. cancelled), clean up local stream
      if (!isProceedingRef.current && streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return (
    <FadeIn>
      <div className="max-w-2xl mx-auto space-y-6">
        <GlassCard
          className="p-6 sm:p-8 border-cyan-500/30 bg-gradient-to-br from-slate-900/95 via-slate-950 to-cyan-950/20 shadow-2xl relative overflow-hidden"
          glow
        >
          {/* Header Banner */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-widest">
              <Camera className="h-3.5 w-3.5 text-cyan-400" />
              <span>Camera &amp; Attention Monitoring Check</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              Pre-Interview Equipment Check
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              Target Role: <strong className="text-cyan-400">{roleTitle}</strong>
            </p>
          </div>

          {/* Privacy Guarantee Box */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>100% Privacy-First Client-Side Guarantee:</span>
            </div>
            <p className="text-xs text-emerald-300/80 font-mono leading-relaxed pl-6">
              Your raw camera feed is processed <strong>strictly on your local device</strong> and is <strong>never uploaded, streamed, or permanently recorded</strong>. The AI engine only computes lightweight derived events (such as orientation deviation duration and focus consistency %) for your final performance report.
            </p>
          </div>

          {/* Live Video Preview Box */}
          <div className="mt-6 relative rounded-2xl overflow-hidden bg-black/90 border border-white/10 aspect-video flex items-center justify-center">
            {/* Live Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              onLoadedMetadata={() => {
                videoRef.current?.play().catch(() => {});
              }}
              className={`w-full h-full object-cover ${
                permissionState === "granted" ? "block" : "hidden"
              }`}
              style={{ transform: "scaleX(-1)" }}
            />

            {permissionState === "prompt" && (
              <div className="text-center p-6 space-y-4">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Video className="h-8 w-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-bold font-mono text-white">Camera Access Required</h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto font-mono leading-relaxed">
                    Attention monitoring requires camera access to detect basic screen-facing orientation and natural focus.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={requestCameraAccess}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-mono text-sm sm:text-base font-bold shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.75)] border border-cyan-300/40 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  >
                    <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-200 group-hover:rotate-6 transition-transform duration-200 shrink-0" />
                    <span className="tracking-wide font-extrabold">Grant Camera Permission</span>
                  </button>
                </div>
              </div>
            )}

            {permissionState === "requesting" && (
              <div className="text-center p-6 space-y-3">
                <RefreshCw className="h-9 w-9 mx-auto text-cyan-400 animate-spin" />
                <p className="text-sm font-mono font-bold text-cyan-300">Requesting browser permissions...</p>
                <p className="text-xs text-muted-foreground font-mono">Please click &quot;Allow&quot; in your browser pop-up prompt.</p>
              </div>
            )}

            {permissionState === "denied" && (
              <div className="text-center p-6 space-y-3 max-w-md">
                <div className="h-12 w-12 mx-auto rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <CameraOff className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold font-mono text-rose-400">Permission Required to Proceed</h4>
                <p className="text-xs text-rose-300/80 font-mono leading-relaxed">{errorMessage}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={requestCameraAccess}
                  className="font-mono text-xs border-rose-500/40 text-rose-300 hover:bg-rose-500/10"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Try Again
                </Button>
              </div>
            )}

            {/* Granted Floating Badge & Redirect Overlay */}
            {permissionState === "granted" && (
              <>
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2 shadow-lg z-10">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold">Camera Live &amp; Calibrated</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 animate-pulse" />
                    <span>Redirecting upward to AI Interview room...</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleProceed}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer"
                  >
                    <span>Enter Room Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Attention Rules Summary */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-muted-foreground">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Natural Movement Allowed:</strong> 3-second grace period prevents false warnings on head tilts.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>No Facial ID:</strong> No facial recognition, emotion analysis, or biometric identification.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="font-mono text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="cyber"
              size="default"
              disabled={permissionState !== "granted"}
              onClick={handleProceed}
              className="font-mono text-xs font-bold gap-2 shadow-glow px-6"
            >
              <span>Begin AI Mock Interview</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </GlassCard>
      </div>
    </FadeIn>
  );
}

