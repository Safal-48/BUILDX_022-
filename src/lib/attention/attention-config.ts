/**
 * Centralized Configuration for AI Attention & Interview Presence System
 * Privacy-First: Client-side detection only. Raw video is NEVER recorded or uploaded.
 * All timing, angle thresholds, neutral labels, and tolerance values are defined here.
 */

export type HeadDirection = "CENTER" | "LEFT" | "RIGHT" | "UP" | "DOWN" | "FACE_NOT_VISIBLE";

export type AttentionSeverity = "Low" | "Medium" | "High";

export type AttentionStatus =
  | "INITIALIZING"
  | "FOCUSED"
  | "DEVIATION_WARNING"
  | "FACE_LOST_WARNING"
  | "UNAVAILABLE"
  | "PAUSED";

export interface AttentionEvent {
  id: string;
  type: "HEAD_ORIENTATION_ALERT" | "FACE_NOT_DETECTED" | "ATTENTION_RECOVERED";
  direction: HeadDirection;
  directionLabel: string; // "Left" | "Right" | "Up" | "Down" | "Face Not Visible"
  timestamp: string; // ISO string or mm:ss
  formattedTime?: string; // e.g. "08:42"
  durationSeconds: number; // e.g. 4.2
  severity: AttentionSeverity; // "Low" | "Medium" | "High"
  neutralNote?: string;
}

export interface AttentionSummary {
  isAvailable: boolean;
  totalSessionDurationSeconds: number;
  focusedDurationSeconds: number;
  focusPercentage: number; // e.g. 88%
  attentionAlertsCount: number;
  warningCount: number;
  isTerminated?: boolean;
  terminationReason?: string;
  totalAlertDurationSeconds: number;
  longestAlertSeconds: number;
  directionBreakdown: {
    centerSeconds: number;
    leftSeconds: number;
    rightSeconds: number;
    upSeconds: number;
    downSeconds: number;
    faceNotVisibleSeconds: number;
  };
  events: AttentionEvent[];
  focusStatus: "CONSISTENT_GOOD" | "NEEDS_IMPROVEMENT";
  observationalNotes: string[];
}

export const ATTENTION_WARNINGS = {
  1: {
    level: 1,
    title: "Attention Warning 1/4",
    label: "Gentle",
    message: "Please maintain your focus on the screen.",
  },
  2: {
    level: 2,
    title: "Attention Warning 2/4",
    label: "Notice",
    message: "Your attention appears to be away from the interview. Please focus on the screen.",
  },
  3: {
    level: 3,
    title: "Attention Warning 3/4",
    label: "Serious",
    message: "Attention warning 3 of 4. Please return your focus to the interview.",
  },
  4: {
    level: 4,
    title: "Attention Warning 4/4",
    label: "Final",
    message: "Final warning: continued attention deviation will end this interview.",
  },
} as const;

export const TERMINATION_REASON = "Terminated due to repeated attention deviation";
export const MAX_WARNINGS = 4;

export const ATTENTION_CONFIG = {
  MAX_WARNINGS: 4,
  TERMINATION_REASON,
  WARNINGS: ATTENTION_WARNINGS,

  // Angle & Displacement thresholds - calibrated for responsive webcam tracking
  HEAD_YAW_THRESHOLD: 0.07, // Horizontal offset threshold for Left/Right detection
  HEAD_PITCH_THRESHOLD: 0.07, // Vertical offset threshold for Up/Down detection

  // Durations in milliseconds - responsive detection with debounce
  HEAD_TURN_DURATION_MS: 450, // 0.45s sustained deviation triggers warning escalation
  FACE_LOST_DURATION_MS: 650, // 0.65s grace period before Face Not Visible warning
  ALERT_COOLDOWN_MS: 300, // Recovery cooldown
  ALERT_ESCALATION_INTERVAL_MS: 2000, // Continuous deviation escalates to next warning every 2s

  // Sampling rate for camera video frame processing (10 FPS for ultra-low CPU/GPU impact)
  FRAME_SAMPLING_INTERVAL_MS: 100,

  // Neutral UI status labels (No punitive / false cheating accusations)
  LABELS: {
    FOCUSED: "Attention: Focused",
    WARNING_TITLE: "Attention Warning",
    LOOK_AT_SCREEN: "Please maintain your focus on the screen.",
    FACE_LOST: "Please make sure your face is visible within the camera frame.",
    UNAVAILABLE: "Attention Monitoring Unavailable",
    INITIALIZING: "Calibrating privacy-first presence monitor...",
  },

  // Audio configuration
  AUDIO: {
    CHIME_FREQUENCY_PRIMARY: 587.33, // D5 note (gentle and modern)
    CHIME_FREQUENCY_SECONDARY: 880.0, // A5 harmonic
    CHIME_DURATION_SECONDS: 0.15,
    DEFAULT_ENABLED: true,
  },
} as const;

