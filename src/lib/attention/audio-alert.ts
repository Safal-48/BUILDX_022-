/**
 * Web Audio API gentle notification sound for Attention Alerts
 * Runs client-side with no external audio file dependencies.
 */

import { ATTENTION_CONFIG } from "./attention-config";

class AudioAlertManager {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = ATTENTION_CONFIG.AUDIO.DEFAULT_ENABLED;
  private lastPlayTime: number = 0;

  constructor() {
    // Lazy initialize on first interaction or alert
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  private initContext() {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Play a subtle, professional dual-frequency chime
   */
  public playSoftAttentionChime() {
    this.playWarningChime(1);
  }

  /**
   * Play progressive, subtle harmonic chimes based on warning level (1 to 4)
   * Avoids harsh or abrasive sirens while clearly signaling escalation.
   */
  public playWarningChime(level: number = 1) {
    if (!this.isEnabled) return;

    // Minimum 1.5-second gap between audio chimes to prevent spamming
    const now = Date.now();
    if (now - this.lastPlayTime < 1500) return;
    this.lastPlayTime = now;

    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const clampedLevel = Math.max(1, Math.min(4, level));

      if (clampedLevel === 1) {
        // Level 1: Gentle dual chime (C5 -> E5, 523Hz -> 659Hz)
        this.playSineSequence(ctx, [
          { freq: 523.25, timeOffset: 0, duration: 0.12, gain: 0.06 },
          { freq: 659.25, timeOffset: 0.10, duration: 0.16, gain: 0.07 },
        ]);
      } else if (clampedLevel === 2) {
        // Level 2: Notice chime (C5 -> G5, 523Hz -> 783.99Hz)
        this.playSineSequence(ctx, [
          { freq: 523.25, timeOffset: 0, duration: 0.12, gain: 0.08 },
          { freq: 783.99, timeOffset: 0.10, duration: 0.20, gain: 0.09 },
        ]);
      } else if (clampedLevel === 3) {
        // Level 3: Serious warning (Three ascending harmonic pulses: E5 -> G5 -> B5)
        this.playSineSequence(ctx, [
          { freq: 659.25, timeOffset: 0, duration: 0.10, gain: 0.09 },
          { freq: 783.99, timeOffset: 0.09, duration: 0.10, gain: 0.10 },
          { freq: 987.77, timeOffset: 0.18, duration: 0.22, gain: 0.11 },
        ]);
      } else {
        // Level 4: Final warning (Four distinct resonant pulses: A4 -> C#5 -> E5 -> A5)
        this.playSineSequence(ctx, [
          { freq: 440.0, timeOffset: 0, duration: 0.10, gain: 0.10 },
          { freq: 554.37, timeOffset: 0.09, duration: 0.10, gain: 0.11 },
          { freq: 659.25, timeOffset: 0.18, duration: 0.11, gain: 0.12 },
          { freq: 880.0, timeOffset: 0.27, duration: 0.26, gain: 0.13 },
        ]);
      }
    } catch {
      // Audio playback restrictions safely handled
    }
  }

  /**
   * Helper to play clean sine tones without harshness
   */
  private playSineSequence(
    ctx: AudioContext,
    notes: Array<{ freq: number; timeOffset: number; duration: number; gain: number }>
  ) {
    const startTime = ctx.currentTime;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.freq, startTime + note.timeOffset);

      gainNode.gain.setValueAtTime(0, startTime + note.timeOffset);
      gainNode.gain.linearRampToValueAtTime(note.gain, startTime + note.timeOffset + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + note.timeOffset + note.duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime + note.timeOffset);
      osc.stop(startTime + note.timeOffset + note.duration);
    });
  }

  /**
   * Play a soft descending tone when interview terminates due to attention deviation
   */
  public playTerminationTone() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      this.playSineSequence(ctx, [
        { freq: 440.0, timeOffset: 0, duration: 0.16, gain: 0.10 },
        { freq: 349.23, timeOffset: 0.14, duration: 0.18, gain: 0.10 },
        { freq: 261.63, timeOffset: 0.30, duration: 0.35, gain: 0.09 },
      ]);
    } catch {
      // Audio restrictions handled
    }
  }

  /**
   * Backward-compatible alias for siren -> plays level 2 chime
   */
  public playWarningSiren() {
    this.playWarningChime(2);
  }

  /**
   * Backward-compatible alias for lockout -> plays termination tone
   */
  public playLockoutAlert() {
    this.playTerminationTone();
  }
}

export const audioAlert = new AudioAlertManager();


