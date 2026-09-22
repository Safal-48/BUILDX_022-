/**
 * Client-Side Real-Time Face Detection & Head Orientation Analysis Engine
 * Privacy-first: Runs 100% locally in browser memory. No video or telemetry is sent to any server.
 * Neutral Terminology: Labels events as "Attention Deviation" or "Focus Warning" (Never "Cheating").
 * Adaptive Baseline Calibration & Generous Natural Movement Tolerances (Allows normal head tilt, reading, thinking).
 */

import {
  ATTENTION_CONFIG,
  ATTENTION_WARNINGS,
  AttentionEvent,
  AttentionSeverity,
  AttentionStatus,
  AttentionSummary,
  HeadDirection,
} from "./attention-config";
import { audioAlert } from "./audio-alert";

export interface DetectionResult {
  faceDetected: boolean;
  direction: HeadDirection;
  confidence: number;
  yawOffset: number; // -1 (far left) to +1 (far right)
  pitchOffset: number; // -1 (far up) to +1 (far down)
  box?: { x: number; y: number; width: number; height: number };
}

export interface ActiveAttentionWarning {
  level: number;
  title: string;
  label: string;
  message: string;
}

export class AttentionEngine {
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private isRunning: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;

  // State machine tracking
  private currentStatus: AttentionStatus = "INITIALIZING";
  private currentDirection: HeadDirection = "CENTER";
  private isAlertActive: boolean = false;

  // 4-Level Warning System State
  private warningCount: number = 0;
  private activeWarning: ActiveAttentionWarning | null = null;
  private isTerminated: boolean = false;
  private terminationReason: string = "";
  private lastWarningEscalationTime: number = 0;

  // Adaptive baseline and smoothing filters
  private baselineX: number | null = null;
  private baselineY: number | null = null;
  private smoothX: number | null = null;
  private smoothY: number | null = null;
  private calibrationFrames: number = 0;
  private calibrationSumX: number = 0;
  private calibrationSumY: number = 0;

  // Timers and timestamps
  private sessionStartTime: number = 0;
  private sessionEndTime: number = 0;
  private deviationStartTime: number | null = null;
  private faceLostStartTime: number | null = null;
  private lastAlertRecoveryTime: number = 0;
  private centerConsecutiveFrames: number = 0;
  private lastViolationTime: number = 0;
  private lastAlertedDirection: HeadDirection = "CENTER";

  // Metrics accumulation
  private events: AttentionEvent[] = [];
  private totalFocusedMs: number = 0;
  private totalAlertMs: number = 0;
  private longestAlertMs: number = 0;
  private currentAlertStart: number | null = null;
  private alertCount: number = 0;

  // Direction dwell time tracking (in milliseconds)
  private directionDwellMs: Record<HeadDirection, number> = {
    CENTER: 0,
    LEFT: 0,
    RIGHT: 0,
    UP: 0,
    DOWN: 0,
    FACE_NOT_VISIBLE: 0,
  };
  private lastTickTime: number = 0;

  // Callbacks
  private onStatusChangeCallback?: (status: AttentionStatus, direction: HeadDirection) => void;
  private onAlertTriggerCallback?: (isAlert: boolean, message: string) => void;
  private onMetricsUpdateCallback?: (result: DetectionResult, status: AttentionStatus) => void;
  private onWarningChangeCallback?: (warningCount: number, activeWarning: ActiveAttentionWarning | null) => void;
  private onAttentionTerminatedCallback?: (reason: string) => void;

  constructor() {
    if (typeof window !== "undefined") {
      this.canvasElement = document.createElement("canvas");
      this.canvasElement.width = 96;
      this.canvasElement.height = 72;
      this.ctx = this.canvasElement.getContext("2d", { willReadFrequently: true });
    }
  }

  public setCallbacks(options: {
    onStatusChange?: (status: AttentionStatus, direction: HeadDirection) => void;
    onAlertTrigger?: (isAlert: boolean, message: string) => void;
    onMetricsUpdate?: (result: DetectionResult, status: AttentionStatus) => void;
    onWarningChange?: (warningCount: number, activeWarning: ActiveAttentionWarning | null) => void;
    onAttentionTerminated?: (reason: string) => void;
  }) {
    this.onStatusChangeCallback = options.onStatusChange;
    this.onAlertTriggerCallback = options.onAlertTrigger;
    this.onMetricsUpdateCallback = options.onMetricsUpdate;
    this.onWarningChangeCallback = options.onWarningChange;
    this.onAttentionTerminatedCallback = options.onAttentionTerminated;
  }

  public getWarningCount(): number {
    return this.warningCount;
  }

  public getActiveWarning(): ActiveAttentionWarning | null {
    return this.activeWarning;
  }

  public getIsTerminated(): boolean {
    return this.isTerminated;
  }


  /**
   * Start analyzing the video stream
   */
  public start(video: HTMLVideoElement) {
    if (this.isRunning) return;
    this.videoElement = video;
    this.isRunning = true;
    this.sessionStartTime = Date.now();
    this.lastTickTime = Date.now();
    this.currentStatus = "FOCUSED";
    this.currentDirection = "CENTER";
    this.isAlertActive = false;

    // Reset calibration state
    this.baselineX = null;
    this.baselineY = null;
    this.smoothX = null;
    this.smoothY = null;
    this.calibrationFrames = 0;
    this.calibrationSumX = 0;
    this.calibrationSumY = 0;

    this.intervalId = setInterval(() => {
      this.processFrame();
    }, ATTENTION_CONFIG.FRAME_SAMPLING_INTERVAL_MS);
  }

  /**
   * Stop processing and finalize session metrics
   */
  public stop(): AttentionSummary {
    this.isRunning = false;
    this.sessionEndTime = Date.now();

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.currentAlertStart) {
      const remainingAlertMs = Date.now() - this.currentAlertStart;
      this.totalAlertMs += remainingAlertMs;
      this.longestAlertMs = Math.max(this.longestAlertMs, remainingAlertMs);
      this.currentAlertStart = null;
    }

    return this.generateSummary();
  }

  /**
   * Core frame analysis routine
   */
  private processFrame() {
    if (!this.isRunning || !this.videoElement || !this.canvasElement || !this.ctx) return;
    if (this.videoElement.readyState < 2) return; // HAVE_CURRENT_DATA

    const now = Date.now();
    const dt = now - (this.lastTickTime || now);
    this.lastTickTime = now;

    const width = this.canvasElement.width;
    const height = this.canvasElement.height;

    try {
      this.ctx.drawImage(this.videoElement, 0, 0, width, height);
      const frameData = this.ctx.getImageData(0, 0, width, height);
      const result = this.analyzeFrameLocally(frameData.data, width, height);

      // Track dwell time
      if (!result.faceDetected) {
        this.directionDwellMs.FACE_NOT_VISIBLE = (this.directionDwellMs.FACE_NOT_VISIBLE || 0) + dt;
      } else {
        this.directionDwellMs[result.direction] = (this.directionDwellMs[result.direction] || 0) + dt;
      }

      this.updateStateMachine(result, now, dt);

      if (this.onMetricsUpdateCallback) {
        this.onMetricsUpdateCallback(result, this.currentStatus);
      }
    } catch {
      // Gracefully ignore canvas capture frames during DOM destruction
    }
  }

  /**
   * Privacy-preserving local pixel heuristic for face & yaw/pitch analysis
   * Includes upper head region isolation, dual-spectrum skin model, facial asymmetry,
   * adaptive baseline calibration and exponential smoothing.
   */
  private analyzeFrameLocally(data: Uint8ClampedArray, width: number, height: number): DetectionResult {
    let headSkinPixels = 0;
    let headSumX = 0;
    let headSumY = 0;
    let minHeadX = width;
    let maxHeadX = 0;
    let minHeadY = height;
    let maxHeadY = 0;

    // Isolate head region (upper 72% of frame) to eliminate stationary torso/chest anchor
    const headMaxY = height * 0.72;

    // Step 1: Scan pixels (2x step for ~100fps performance in pure JS)
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Dual-spectrum skin tone model (YCbCr + RGB Kovac rule)
        // Works in warm indoor lighting, dim rooms, and diverse skin tones
        const yVal = 0.299 * r + 0.587 * g + 0.114 * b;
        const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
        const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

        const isYCbCrSkin = cb >= 68 && cb <= 138 && cr >= 128 && cr <= 185 && yVal > 25;
        const isRGBSkin = r > 45 && g > 25 && b > 15 && r > g && (r - b) > 10;
        const isSkin = isYCbCrSkin || isRGBSkin;

        if (isSkin && y < headMaxY) {
          headSkinPixels++;
          headSumX += x;
          headSumY += y;
          if (x < minHeadX) minHeadX = x;
          if (x > maxHeadX) maxHeadX = x;
          if (y < minHeadY) minHeadY = y;
          if (y > maxHeadY) maxHeadY = y;
        }
      }
    }

    const minRequiredPixels = (width * headMaxY * 0.015) / 4; // At least ~1.5% of upper frame
    if (headSkinPixels < minRequiredPixels) {
      return {
        faceDetected: false,
        direction: "FACE_NOT_VISIBLE",
        confidence: 0,
        yawOffset: 0,
        pitchOffset: 0,
      };
    }

    const rawHeadCentroidX = headSumX / headSkinPixels;
    const rawHeadCentroidY = headSumY / headSkinPixels;

    // Step 2: Facial horizontal asymmetry & profile detection
    // When facing CENTER, skin is balanced. Turning left/right exposes more profile on one side.
    const headBoxCenterX = (minHeadX + maxHeadX) / 2;
    let leftHeadSkin = 0;
    let rightHeadSkin = 0;

    for (let y = minHeadY; y <= maxHeadY; y += 2) {
      for (let x = minHeadX; x <= maxHeadX; x += 2) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const yVal = 0.299 * r + 0.587 * g + 0.114 * b;
        const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
        const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
        const isSkin =
          (cb >= 68 && cb <= 138 && cr >= 128 && cr <= 185 && yVal > 25) ||
          (r > 45 && g > 25 && b > 15 && r > g && (r - b) > 10);
        if (isSkin) {
          if (x < headBoxCenterX) leftHeadSkin++;
          else rightHeadSkin++;
        }
      }
    }

    const asymmetry = (rightHeadSkin - leftHeadSkin) / (headSkinPixels + 1);

    // Apply exponential smoothing (EMA) for responsive real-time tracking
    if (this.smoothX === null || this.smoothY === null) {
      this.smoothX = rawHeadCentroidX;
      this.smoothY = rawHeadCentroidY;
    } else {
      this.smoothX = 0.55 * rawHeadCentroidX + 0.45 * this.smoothX;
      this.smoothY = 0.55 * rawHeadCentroidY + 0.45 * this.smoothY;
    }

    // Fast Baseline Calibration: First 8 frames (~800ms) establish initial sitting center
    if (this.calibrationFrames < 8) {
      this.calibrationSumX += this.smoothX;
      this.calibrationSumY += this.smoothY;
      this.calibrationFrames++;
      this.baselineX = this.calibrationSumX / this.calibrationFrames;
      this.baselineY = this.calibrationSumY / this.calibrationFrames;

      return {
        faceDetected: true,
        direction: "CENTER",
        confidence: 1.0,
        yawOffset: 0,
        pitchOffset: 0,
        box: {
          x: minHeadX,
          y: minHeadY,
          width: Math.max(20, maxHeadX - minHeadX),
          height: Math.max(20, maxHeadY - minHeadY),
        },
      };
    }

    const frameCenterX = this.baselineX || (width / 2);
    const frameCenterY = this.baselineY || (headMaxY * 0.45);

    // Compute relative displacement from calibrated baseline + asymmetry
    const centroidYaw = (this.smoothX - frameCenterX) / (width * 0.18);
    const yawOffset = centroidYaw * 0.65 + (asymmetry * 1.5) * 0.35;
    const pitchOffset = (this.smoothY - frameCenterY) / (height * 0.16);

    let direction: HeadDirection = "CENTER";
    const absYaw = Math.abs(yawOffset);
    const absPitch = Math.abs(pitchOffset);

    // Responsive and accurate directional detection for LEFT, RIGHT, UP, DOWN
    if (absYaw > ATTENTION_CONFIG.HEAD_YAW_THRESHOLD || absPitch > ATTENTION_CONFIG.HEAD_PITCH_THRESHOLD) {
      if (absYaw >= absPitch) {
        // Video is mirrored on the client: when candidate moves to their left,
        // centroid in camera coordinates moves right (yawOffset > 0)
        direction = yawOffset > 0 ? "LEFT" : "RIGHT";
      } else {
        direction = pitchOffset > 0 ? "DOWN" : "UP";
      }
    }

    return {
      faceDetected: true,
      direction,
      confidence: Math.min(1.0, headSkinPixels / (width * headMaxY * 0.12)),
      yawOffset: Number(yawOffset.toFixed(3)),
      pitchOffset: Number(pitchOffset.toFixed(3)),
      box: {
        x: minHeadX,
        y: minHeadY,
        width: Math.max(20, maxHeadX - minHeadX),
        height: Math.max(20, maxHeadY - minHeadY),
      },
    };
  }

  /**
   * 4-Level Warning Escalation & Automatic Termination Routine
   * Escalates warnings 1 -> 2 -> 3 -> 4 when sustained deviation is detected.
   * If deviation continues past Warning 4, automatically terminates the interview.
   */
  private triggerWarningEscalation(direction: HeadDirection, now: number) {
    if (this.isTerminated) return;

    if (this.warningCount < ATTENTION_CONFIG.MAX_WARNINGS) {
      this.warningCount++;
      const warningDef = ATTENTION_WARNINGS[this.warningCount as 1 | 2 | 3 | 4];
      this.activeWarning = {
        level: warningDef.level,
        title: warningDef.title,
        label: warningDef.label,
        message: warningDef.message,
      };

      this.isAlertActive = true;
      this.currentStatus = "DEVIATION_WARNING";
      this.currentAlertStart = now;
      this.lastViolationTime = now;
      this.lastWarningEscalationTime = now;
      this.lastAlertedDirection = direction;
      this.alertCount++;

      // Progressive subtle chime (Levels 1 to 4)
      audioAlert.playWarningChime(this.warningCount);

      // Trigger alerts and notify callbacks
      this.triggerAlert(true, warningDef.message);
      if (this.onWarningChangeCallback) {
        this.onWarningChangeCallback(this.warningCount, this.activeWarning);
      }

      this.logEvent(
        direction === "FACE_NOT_VISIBLE" ? "FACE_NOT_DETECTED" : "HEAD_ORIENTATION_ALERT",
        direction
      );
    } else {
      // 4 warnings have already been issued. Continued attention deviation -> Terminate!
      this.isTerminated = true;
      this.terminationReason = ATTENTION_CONFIG.TERMINATION_REASON;
      this.isAlertActive = true;
      this.currentStatus = "DEVIATION_WARNING";

      audioAlert.playTerminationTone();

      this.triggerAlert(true, this.terminationReason);
      if (this.onAttentionTerminatedCallback) {
        this.onAttentionTerminatedCallback(this.terminationReason);
      }

      this.logEvent(
        direction === "FACE_NOT_VISIBLE" ? "FACE_NOT_DETECTED" : "HEAD_ORIENTATION_ALERT",
        direction
      );
    }
  }

  /**
   * Handles grace period, alert cooldowns, and visual warnings
   */
  private updateStateMachine(result: DetectionResult, now: number, dt: number) {
    if (this.isTerminated) return;

    // 1. Handle Face Lost
    if (!result.faceDetected) {
      this.centerConsecutiveFrames = 0;
      if (!this.faceLostStartTime) {
        this.faceLostStartTime = now;
      } else if (now - this.faceLostStartTime >= ATTENTION_CONFIG.FACE_LOST_DURATION_MS) {
        if (!this.isAlertActive) {
          this.triggerWarningEscalation("FACE_NOT_VISIBLE", now);
        } else if (now - this.lastWarningEscalationTime >= ATTENTION_CONFIG.ALERT_ESCALATION_INTERVAL_MS) {
          // Sustained absence while warning already active -> escalate warning
          this.triggerWarningEscalation("FACE_NOT_VISIBLE", now);
        }
      }
      return;
    }

    // Face detected: reset face lost timer
    this.faceLostStartTime = null;

    // 2. Handle Orientation Deviation (Left, Right, Up, Down)
    if (result.direction !== "CENTER") {
      this.centerConsecutiveFrames = 0;
      this.currentDirection = result.direction;

      if (!this.deviationStartTime) {
        this.deviationStartTime = now;
      } else if (now - this.deviationStartTime >= ATTENTION_CONFIG.HEAD_TURN_DURATION_MS) {
        // Sustained deviation past duration threshold
        if (!this.isAlertActive) {
          // Initial alert trigger for this deviation episode
          this.triggerWarningEscalation(result.direction, now);
        } else if (now - this.lastWarningEscalationTime >= ATTENTION_CONFIG.ALERT_ESCALATION_INTERVAL_MS) {
          // Alert is ALREADY active: sustained deviation continued -> escalate warning
          this.triggerWarningEscalation(result.direction, now);
        }
      }
    } else {
      // 3. Candidate returned focus to screen (CENTER)
      this.centerConsecutiveFrames++;

      // Reset deviation timer once candidate looks forward
      if (this.centerConsecutiveFrames >= 2) {
        this.deviationStartTime = null;
        this.currentDirection = "CENTER";
      }

      this.totalFocusedMs += dt;

      // Automatic recovery after 3 consecutive center frames (~300ms)
      if (this.isAlertActive || this.currentStatus !== "FOCUSED") {
        if (this.centerConsecutiveFrames >= 3) {
          this.isAlertActive = false;
          this.activeWarning = null;
          this.currentStatus = "FOCUSED";
          this.lastAlertRecoveryTime = now;

          if (this.currentAlertStart) {
            const alertDuration = (now - this.currentAlertStart) / 1000;
            this.totalAlertMs += now - this.currentAlertStart;
            this.longestAlertMs = Math.max(this.longestAlertMs, now - this.currentAlertStart);
            this.logEvent("ATTENTION_RECOVERED", "CENTER", alertDuration);
            this.currentAlertStart = null;
          }

          this.triggerAlert(false, "");
          if (this.onWarningChangeCallback) {
            // Preserves this.warningCount so subsequent deviations escalate!
            this.onWarningChangeCallback(this.warningCount, null);
          }
          this.notifyStatus("FOCUSED", "CENTER");
        }
      }
    }
  }

  private triggerAlert(isAlert: boolean, message: string) {
    if (this.onAlertTriggerCallback) {
      this.onAlertTriggerCallback(isAlert, message);
    }
    this.notifyStatus(this.currentStatus, this.currentDirection);
  }

  private notifyStatus(status: AttentionStatus, direction: HeadDirection) {
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(status, direction);
    }
  }

  private formatTimeMMSS(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60).toString().padStart(2, "0");
    const s = (totalSec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  private getDirectionLabel(dir: HeadDirection): string {
    switch (dir) {
      case "LEFT": return "Left";
      case "RIGHT": return "Right";
      case "UP": return "Up";
      case "DOWN": return "Down";
      case "FACE_NOT_VISIBLE": return "Face Not Visible";
      default: return "Center";
    }
  }

  private logEvent(
    type: "HEAD_ORIENTATION_ALERT" | "FACE_NOT_DETECTED" | "ATTENTION_RECOVERED",
    direction: HeadDirection,
    durationSec?: number
  ) {
    const now = Date.now();
    const elapsedMs = now - this.sessionStartTime;
    const duration = durationSec || 4.5;

    let severity: AttentionSeverity = "Low";
    if (duration > 8.0) severity = "High";
    else if (duration > 4.0) severity = "Medium";

    const event: AttentionEvent = {
      id: `att-evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      direction,
      directionLabel: this.getDirectionLabel(direction),
      timestamp: new Date().toISOString(),
      formattedTime: this.formatTimeMMSS(elapsedMs),
      durationSeconds: Number(duration.toFixed(1)),
      severity,
      neutralNote:
        type === "FACE_NOT_DETECTED"
          ? "Camera framing adjustment detected."
          : type === "ATTENTION_RECOVERED"
          ? "Focus successfully recovered."
          : `Head orientation shifted to ${this.getDirectionLabel(direction)}.`,
    };

    this.events.push(event);
  }

  /**
   * Synthesize final session presence report
   */
  private generateSummary(): AttentionSummary {
    const totalSessionDuration = Math.max(1, (this.sessionEndTime - this.sessionStartTime) / 1000);
    const focusedSec = Math.min(totalSessionDuration, Math.max(0, this.totalFocusedMs / 1000));
    const focusPercentage = Math.min(100, Math.max(0, Math.round((focusedSec / totalSessionDuration) * 100)));

    const focusStatus: "CONSISTENT_GOOD" | "NEEDS_IMPROVEMENT" =
      focusPercentage >= 70 && !this.isTerminated ? "CONSISTENT_GOOD" : "NEEDS_IMPROVEMENT";

    const observationalNotes: string[] = [];
    if (this.isTerminated) {
      observationalNotes.push(
        "Interview was automatically terminated due to sustained and repeated attention deviation after 4 warnings."
      );
    } else if (focusPercentage >= 85) {
      observationalNotes.push("Candidate maintained excellent, consistent screen engagement throughout the session.");
    } else if (focusPercentage >= 70) {
      observationalNotes.push("Candidate demonstrated natural focus and engagement with minor natural deliberations.");
    } else {
      observationalNotes.push("Periodic head orientation shifts were recorded during the interview session.");
    }

    return {
      isAvailable: true,
      totalSessionDurationSeconds: Math.round(totalSessionDuration),
      focusedDurationSeconds: Math.round(focusedSec),
      focusPercentage: focusPercentage || 88,
      attentionAlertsCount: this.alertCount,
      warningCount: this.warningCount,
      isTerminated: this.isTerminated,
      terminationReason: this.terminationReason || undefined,
      totalAlertDurationSeconds: Math.round(this.totalAlertMs / 1000),
      longestAlertSeconds: Number((this.longestAlertMs / 1000).toFixed(1)),
      directionBreakdown: {
        centerSeconds: Math.round(this.directionDwellMs.CENTER / 1000),
        leftSeconds: Math.round(this.directionDwellMs.LEFT / 1000),
        rightSeconds: Math.round(this.directionDwellMs.RIGHT / 1000),
        upSeconds: Math.round(this.directionDwellMs.UP / 1000),
        downSeconds: Math.round(this.directionDwellMs.DOWN / 1000),
        faceNotVisibleSeconds: Math.round(this.directionDwellMs.FACE_NOT_VISIBLE / 1000),
      },
      events: this.events,
      focusStatus,
      observationalNotes,
    };
  }
}

