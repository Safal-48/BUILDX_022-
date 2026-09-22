"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Sparkles,
  Zap,
  Brain,
  Flame,
  ArrowRight,
  RotateCcw,
  Plus,
  BookOpen,
  Target,
  TrendingUp,
  ShieldCheck,
  HelpCircle,
  Layers,
  Sliders,
  RefreshCw,
  Dna,
  ExternalLink,
  X,
  Bot,
  GraduationCap,
  Briefcase,
  SlidersHorizontal,
  ChevronRight,
  AlertCircle,
  Info,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import {
  StudyPlannerProfile,
  StudyTaskItem,
  ExamDeadline,
  PriorityLevel,
} from "@/lib/learning/study-planner-engine";

interface StudyPlannerDashboardProps {
  initialPlanner?: StudyPlannerProfile | null;
  compactMode?: boolean;
}

export function StudyPlannerDashboard({
  initialPlanner = null,
  compactMode = false,
}: StudyPlannerDashboardProps) {
  const [planner, setPlanner] = useState<StudyPlannerProfile | null>(initialPlanner);
  const [isLoading, setIsLoading] = useState(!initialPlanner);
  const [isAdapting, setIsAdapting] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "weekly" | "deadlines" | "priorities">("today");
  const [showAddExamModal, setShowAddExamModal] = useState(false);

  // New Exam Form State
  const [examSubject, setExamSubject] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examPriority, setExamPriority] = useState<PriorityLevel>("Critical");
  const [examDifficulty, setExamDifficulty] = useState("Standard");

  // Fetch or sync planner on mount
  useEffect(() => {
    async function loadPlanner() {
      try {
        const res = await fetch("/api/learning/study-planner");
        if (res.ok) {
          const data = await res.json();
          if (data.planner) {
            setPlanner(data.planner);
          }
        }
      } catch (err) {
        console.error("Failed to load study planner:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!planner) {
      loadPlanner();
    }
  }, [planner]);

  // Toggle Task Status (Completed / Pending)
  const handleToggleTask = async (taskId: string) => {
    if (!planner) return;

    // Optimistic UI update
    const updatedTasks = planner.todayPlan.tasks.map((t) => {
      if (t.id === taskId) {
        const isDone = t.status === "completed";
        return {
          ...t,
          status: isDone ? ("pending" as const) : ("completed" as const),
          completedAt: isDone ? undefined : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
      }
      return t;
    });

    const completedCount = updatedTasks.filter((t) => t.status === "completed").length;
    const completionPercentage = Math.round((completedCount / updatedTasks.length) * 100);

    setPlanner({
      ...planner,
      todayPlan: {
        ...planner.todayPlan,
        tasks: updatedTasks,
        completedTasks: completedCount,
        completionPercentage,
      },
    });

    try {
      const res = await fetch("/api/learning/study-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_task", taskId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.planner) setPlanner(data.planner);
      }
    } catch (err) {
      console.error("Toggle task error:", err);
    }
  };

  // Trigger Real-Time Adaptive Re-Balancing
  const handleAdapt = async (
    event: "missed_session" | "score_improved" | "deadline_moved" | "budget_changed",
    payload?: { newBudget?: string; examId?: string; daysShifted?: number }
  ) => {
    setIsAdapting(true);
    try {
      const res = await fetch("/api/learning/study-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "adapt", event, ...payload }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.planner) setPlanner(data.planner);
      }
    } catch (err) {
      console.error("Adapt study plan error:", err);
    } finally {
      setIsAdapting(false);
    }
  };

  // Regenerate Schedule
  const handleRegenerate = async () => {
    setIsAdapting(true);
    try {
      const res = await fetch("/api/learning/study-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "regenerate" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.planner) setPlanner(data.planner);
      }
    } catch (err) {
      console.error("Regenerate study plan error:", err);
    } finally {
      setIsAdapting(false);
    }
  };

  // Add new exam / deadline
  const handleAddExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examSubject.trim() || !examTitle.trim() || !examDate) return;

    const daysRemaining = Math.max(
      1,
      Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    );

    setIsAdapting(true);
    try {
      const res = await fetch("/api/learning/study-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_exam",
          exam: {
            subject: examSubject.trim(),
            title: examTitle.trim(),
            examDate,
            daysRemaining: isNaN(daysRemaining) ? 10 : daysRemaining,
            priority: examPriority,
            syllabusTopics: [
              `${examSubject} Core Theory`,
              `${examSubject} High-Yield Problem Sets`,
              `${examSubject} Timed Exam Simulation`,
            ],
            currentReadiness: 48,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.planner) setPlanner(data.planner);
        setShowAddExamModal(false);
        setExamSubject("");
        setExamTitle("");
        setExamDate("");
      }
    } catch (err) {
      console.error("Add exam error:", err);
    } finally {
      setIsAdapting(false);
    }
  };

  if (isLoading || !planner) {
    return (
      <GlassCard className="p-8 text-center border-cyan-500/30 bg-slate-900/60">
        <div className="flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="h-7 w-7 text-cyan-400 animate-spin" />
          <span className="text-sm font-mono text-cyan-300">
            Synthesizing Autonomous AI Study Schedule from Skill DNA &amp; Deadlines...
          </span>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & TELEMETRY SUMMARY */}
      <GlassCard
        className="p-5 sm:p-6 rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-cyan-950/25 shadow-[0_0_35px_rgba(6,182,212,0.15)] relative overflow-hidden"
        glow
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                AI STUDY PLANNER
              </span>
              <Badge variant="cyber" size="sm" className="font-mono text-[10px]">
                Continuous Adaptive Schedule
              </Badge>
              <Badge variant="glass" size="sm" className="font-mono text-[10px] text-emerald-300 border-emerald-500/30 bg-emerald-500/10">
                {planner.dailyAvailableTime} / Day • {planner.preferredTimeSlot}
              </Badge>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-mono tracking-tight">
                Personalized Learning &amp; Exam Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                Personalized study plan tailored to your target skills, active goals, and daily learning routine.
              </p>
            </div>
          </div>

          {/* Quick Metrics (Streak, Velocity, Completion) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-xs font-mono min-w-[110px]">
              <span className="text-[10px] text-amber-400 uppercase font-bold flex items-center gap-1">
                <Flame className="h-3 w-3 text-amber-400" /> Streak
              </span>
              <span className="text-xl font-black text-amber-300">{planner.streakDays} Days</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Active Routine</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-xs font-mono min-w-[110px]">
              <span className="text-[10px] text-emerald-400 uppercase font-bold flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-400" /> Weekly Target
              </span>
              <span className="text-xl font-black text-emerald-300">{planner.weeklyCompletionRate}%</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">On Schedule</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-xs font-mono min-w-[110px]">
              <span className="text-[10px] text-cyan-400 uppercase font-bold flex items-center gap-1">
                <Target className="h-3 w-3 text-cyan-400" /> Today&apos;s Done
              </span>
              <span className="text-xl font-black text-cyan-300">
                {planner.todayPlan.completedTasks}/{planner.todayPlan.totalTasks}
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">{planner.todayPlan.completionPercentage}% Completed</span>
            </div>
          </div>
        </div>

        {/* 2. REAL-TIME ADAPTATION CALLOUT BANNER */}
        {planner.lastAdaptedReason && (
          <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-emerald-950/30 border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping mt-1 sm:mt-0 shrink-0" />
              <div className="text-slate-200">
                <span className="text-cyan-300 font-bold uppercase tracking-wider text-[11px] mr-1.5">
                  Live Adaptation Telemetry:
                </span>
                {planner.lastAdaptedReason}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isAdapting}
              className="text-[11px] font-mono border-white/10 hover:border-cyan-500/40 text-slate-300 shrink-0 h-7"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isAdapting ? "animate-spin text-cyan-400" : "text-slate-400"}`} />
              Re-Synthesize
            </Button>
          </div>
        )}

        {/* 3. SIMULATION & SCHEDULE CONTROLS */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold mr-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3 text-cyan-400" />
              Dynamic Triggers:
            </span>

            {/* Trigger: Missed Session */}
            <button
              onClick={() => handleAdapt("missed_session")}
              disabled={isAdapting}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-rose-500/30 hover:border-rose-500/60 text-[11px] font-mono text-rose-300 transition-all hover:bg-rose-500/10 flex items-center gap-1.5"
              title="Simulates student missing a scheduled study slot. AI gracefully redistributes the task."
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              <span>Simulate Missed Session</span>
            </button>

            {/* Trigger: Score Gain Reassessment */}
            <button
              onClick={() => handleAdapt("score_improved")}
              disabled={isAdapting}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/60 text-[11px] font-mono text-emerald-300 transition-all hover:bg-emerald-500/10 flex items-center gap-1.5"
              title="Simulates proving SQL JOINs with 84% in Reassessment. AI automatically advances to Operating Systems."
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Simulate Score Gain (42% → 84%)</span>
            </button>

            {/* Trigger: Deadline Shift */}
            <button
              onClick={() => handleAdapt("deadline_moved")}
              disabled={isAdapting}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/60 text-[11px] font-mono text-amber-300 transition-all hover:bg-amber-500/10 flex items-center gap-1.5"
              title="Simulates exam moved closer. AI increases urgency and injects past-paper probes."
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Simulate Deadline Shift</span>
            </button>
          </div>

          {/* Quick Study Budget Scaler */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
              Scale Budget:
            </span>
            {(["15 min", "30 min", "1 hour", "2 hours"] as const).map((b) => (
              <button
                key={b}
                onClick={() => handleAdapt("budget_changed", { newBudget: b })}
                disabled={isAdapting}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all border ${
                  planner.dailyAvailableTime === b
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold"
                    : "bg-slate-900/80 text-slate-400 border-white/10 hover:text-white"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* 4. WORKBEN NAVIGATION TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === "today"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Today&apos;s Focus Plan</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/30 text-cyan-200">
              {planner.todayPlan.tasks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === "weekly"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Calendar className="h-3.5 w-3.5 text-emerald-400" />
            <span>Weekly Schedule Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("deadlines")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === "deadlines"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            <span>Upcoming Deadlines ({planner.exams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("priorities")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === "priorities"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Dna className="h-3.5 w-3.5 text-violet-400" />
            <span>Skill DNA Priority Engine</span>
          </button>
        </div>

        <Button
          variant="cyber"
          size="sm"
          onClick={() => setShowAddExamModal(true)}
          className="text-xs font-mono gap-1.5 shadow-glow-sm h-8"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Exam / Deadline</span>
        </Button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TODAY'S FOCUS PLAN                                                */}
      {/* ========================================================================= */}
      {activeTab === "today" && (
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Tasks List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Today's Goal & Rationale Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <Target className="h-4 w-4 text-cyan-400" />
                    {planner.todayPlan.dayName}
                  </span>
                  <Badge variant="emerald" size="sm" className="font-mono text-[10px]">
                    +{planner.todayPlan.readinessBoostProjected}% Projected Readiness Gain
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  <strong>AI Rationale:</strong> {planner.todayPlan.aiFocusRationale}
                </p>
                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Daily Completion Velocity</span>
                    <span className="text-cyan-400 font-bold">{planner.todayPlan.completionPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${planner.todayPlan.completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Task Items */}
              <div className="space-y-3">
                {planner.todayPlan.tasks.map((task, idx) => {
                  const isDone = task.status === "completed";
                  const isMissed = task.status === "missed";
                  return (
                    <GlassCard
                      key={task.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isDone
                          ? "border-emerald-500/40 bg-emerald-950/10 opacity-80"
                          : isMissed
                          ? "border-rose-500/40 bg-rose-950/10"
                          : task.priority === "Critical"
                          ? "border-rose-500/40 bg-slate-900/80 hover:border-cyan-500/60"
                          : "border-white/10 bg-slate-900/60 hover:border-cyan-500/40"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Interactive Checkbox */}
                        <button
                          type="button"
                          onClick={() => handleToggleTask(task.id)}
                          className={`mt-1 p-1 rounded-lg transition-transform active:scale-95 ${
                            isDone
                              ? "text-emerald-400 hover:text-emerald-300"
                              : "text-slate-500 hover:text-cyan-400"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 fill-emerald-500/20 text-emerald-400" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0 space-y-2">
                          {/* Badges Bar */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                task.priority === "Critical"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                  : task.priority === "High"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              }`}
                            >
                              {task.priority} Priority
                            </span>

                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                              {task.typeLabel}
                            </span>

                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                              <Clock className="h-3 w-3 text-slate-400" />
                              {task.scheduledSlot} ({task.durationMinutes} min)
                            </span>

                            <Badge variant="outline" size="sm" className="text-[9px] font-mono border-white/10 text-slate-300">
                              {task.difficultyScaffold}
                            </Badge>

                            {task.isMissedRebalance && (
                              <Badge variant="amber" size="sm" className="text-[9px] font-mono">
                                Rebalanced Slot
                              </Badge>
                            )}
                          </div>

                          {/* Topic & Subject Title */}
                          <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                              {task.subject}
                            </span>
                            <h3 className={`text-base font-bold text-white font-mono mt-0.5 ${isDone ? "line-through text-slate-400" : ""}`}>
                              {task.topic}
                            </h3>
                          </div>

                          {/* Why AI Scheduled This (Skill DNA Connection) */}
                          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/[0.06] text-xs text-slate-300 leading-relaxed font-sans">
                            <span className="text-cyan-400 font-mono font-bold text-[11px] block mb-0.5">
                              Why AI Scheduled This:
                            </span>
                            {task.reason}
                          </div>

                          {/* Action Button */}
                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-slate-400">
                              {isDone ? `Completed at ${task.completedAt}` : "Scheduled for today"}
                            </span>
                            <Link href={task.actionUrl}>
                              <Button
                                variant={isDone ? "outline" : "cyber"}
                                size="sm"
                                className="text-xs font-mono gap-1.5 h-8"
                              >
                                <span>{task.actionLabel}</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Mini Deadlines & Recommended Action */}
            <div className="lg:col-span-4 space-y-4">
              {/* Upcoming Deadlines Widget */}
              <GlassCard className="p-5 rounded-2xl border border-amber-500/30 bg-slate-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">
                      Upcoming Deadlines
                    </span>
                  </div>
                  <Badge variant="amber" size="sm" className="text-[9px] font-mono">
                    Urgency Engine
                  </Badge>
                </div>

                <div className="space-y-3">
                  {planner.exams.slice(0, 3).map((exam) => (
                    <div
                      key={exam.id}
                      className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.08] space-y-2 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 font-bold block">
                            {exam.subject}
                          </span>
                          <span className="text-xs font-bold text-white font-mono leading-tight">
                            {exam.title}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                          ⏳ {exam.daysRemaining} Days
                        </span>
                      </div>

                      {/* Readiness Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-0.5">
                          <span>Exam Readiness</span>
                          <span className={exam.currentReadiness > 70 ? "text-emerald-400" : "text-amber-400"}>
                            {exam.currentReadiness}%
                          </span>
                        </div>
                        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${exam.currentReadiness > 70 ? "bg-emerald-400" : "bg-amber-400"}`}
                            style={{ width: `${exam.currentReadiness}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("deadlines")}
                  className="w-full text-center text-xs font-mono text-cyan-400 hover:text-cyan-300 block py-1"
                >
                  View All {planner.exams.length} Deadlines →
                </button>
              </GlassCard>

              {/* Socratic AI Study Companion Card */}
              <GlassCard className="p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-slate-950/90 space-y-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Socratic AI Tutor Link
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Stuck on a problem during your study session? Ask the AI Tutor to break it down into interactive Socratic steps in <strong>{planner.preferredLanguage}</strong>.
                </p>
                <Link href="/learning/assistant" className="block">
                  <Button variant="cyber" size="sm" className="w-full text-xs font-mono gap-1.5 shadow-glow-sm">
                    <span>Open AI Tutor Workspace</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </GlassCard>
            </div>
          </div>
        </FadeIn>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: WEEKLY SCHEDULE MATRIX                                            */}
      {/* ========================================================================= */}
      {activeTab === "weekly" && (
        <FadeIn>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
              <div>
                <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  7-Day Autonomous Study Timetable
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Allocated at <strong>{planner.dailyAvailableTime} per day</strong>, dynamically balancing DBMS, Operating Systems &amp; Machine Learning topics.
                </p>
              </div>
              <Badge variant="emerald" size="sm" className="font-mono text-[10px] w-fit">
                Optimal Spaced Repetition (Ebbinghaus Active)
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {planner.weeklySchedule.map((day) => (
                <div
                  key={day.dayName}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between min-h-[220px] ${
                    day.isToday
                      ? "bg-gradient-to-b from-cyan-950/50 to-slate-950 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      : day.isCompleted
                      ? "bg-slate-950/40 border-emerald-500/20 opacity-80"
                      : "bg-slate-900/50 border-white/[0.08]"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <span className="text-xs font-mono font-bold text-white">
                        {day.shortDay}
                      </span>
                      {day.isToday ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500/30 text-cyan-300 border border-cyan-500/40">
                          TODAY
                        </span>
                      ) : day.isCompleted ? (
                        <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="h-3 w-3" /> Done
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-slate-500">Scheduled</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                        {day.focusSubject}
                      </span>
                      <div className="mt-1 space-y-1">
                        {day.primaryTopics.map((top) => (
                          <div
                            key={top}
                            className="text-[11px] font-mono text-slate-300 bg-slate-900/90 px-2 py-1 rounded border border-white/[0.04]"
                          >
                            {top}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      {day.studyMinutes} min
                    </span>
                    <span className="text-emerald-400 font-bold">Planned</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: UPCOMING DEADLINES                                                */}
      {/* ========================================================================= */}
      {activeTab === "deadlines" && (
        <FadeIn>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  Upcoming Examination &amp; Assignment Deadlines
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  AI uses remaining days and syllabus scope to weight daily task difficulty and revision frequency.
                </p>
              </div>
              <Button
                variant="cyber"
                size="sm"
                onClick={() => setShowAddExamModal(true)}
                className="text-xs font-mono gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Deadline</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {planner.exams.map((exam) => (
                <GlassCard
                  key={exam.id}
                  className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant={exam.priority === "Critical" ? "amber" : "cyber"}
                        size="sm"
                        className="font-mono text-[10px]"
                      >
                        {exam.priority} Urgency
                      </Badge>
                      <span className="text-xs font-mono text-amber-300 font-bold">
                        ⏳ {exam.daysRemaining} Days Left
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                        {exam.subject}
                      </span>
                      <h4 className="text-base font-bold text-white font-mono mt-0.5">
                        {exam.title}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400 block mt-1">
                        Exam Date: {exam.examDate}
                      </span>
                    </div>

                    {/* Readiness Gauge */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Current Exam Readiness</span>
                        <span className="font-bold text-cyan-400">{exam.currentReadiness}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                          style={{ width: `${exam.currentReadiness}%` }}
                        />
                      </div>
                    </div>

                    {/* Syllabus Highlights */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                        Syllabus High-Yield Topics:
                      </span>
                      {exam.syllabusTopics.map((top) => (
                        <div
                          key={top}
                          className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
                        >
                          <span className="h-1 w-1 rounded-full bg-cyan-400" />
                          <span>{top}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/assessment">
                    <Button variant="outline" size="sm" className="w-full text-xs font-mono gap-1 border-white/10 hover:border-cyan-500/40">
                      <span>Take Diagnostic Mock Probe</span>
                      <ArrowRight className="h-3 w-3 text-cyan-400" />
                    </Button>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SKILL DNA PRIORITY ENGINE (WHAT TO STUDY FIRST)                    */}
      {/* ========================================================================= */}
      {activeTab === "priorities" && (
        <FadeIn>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/30">
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Dna className="h-4 w-4 text-cyan-400" />
                Skill DNA Diagnostic Priority Engine
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                The planner does not simply allocate time slots—it inspects your live <strong>Skill DNA &amp; Assessment Performance</strong> to formulate <em>WHAT</em> you must master first to prevent exam failure or interview bottlenecks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Priority 1: Critical Deficit */}
              <GlassCard className="p-5 rounded-2xl border border-rose-500/40 bg-gradient-to-b from-rose-950/20 to-slate-950 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Priority #1 • Critical Deficit
                  </span>
                  <span className="text-xs font-mono text-rose-400 font-bold">Score: 42%</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Database Systems</span>
                  <h4 className="text-base font-bold text-white font-mono">SQL Complex JOINs &amp; Subqueries</h4>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Diagnosed with recurring errors in filtering predicates. High dependency for the upcoming <strong>DBMS Exam in 10 days</strong>.
                </p>
                <div className="pt-2">
                  <Link href="/learning/intervention">
                    <Button variant="cyber" size="sm" className="w-full text-xs font-mono gap-1.5">
                      <span>Launch Socratic Sprint</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>

              {/* Priority 2: High Yield Prerequisite */}
              <GlassCard className="p-5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-slate-950 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Priority #2 • Retention Decay
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">Score: 68%</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Operating Systems</span>
                  <h4 className="text-base font-bold text-white font-mono">Process Scheduling &amp; Semaphores</h4>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Ebbinghaus curve shows a 18% retention drop over 6 days. Scheduled for 15-minute spaced retention drill.
                </p>
                <div className="pt-2">
                  <Link href="/practice">
                    <Button variant="outline" size="sm" className="w-full text-xs font-mono gap-1.5 border-white/10 hover:border-amber-500/30">
                      <span>Open Concurrency Sandbox</span>
                      <ArrowRight className="h-3 w-3 text-amber-400" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>

              {/* Priority 3: Milestone Project Target */}
              <GlassCard className="p-5 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-950 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Priority #3 • Target Milestone
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Score: 82%</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Machine Learning &amp; AI</span>
                  <h4 className="text-base font-bold text-white font-mono">PyTorch Tensors &amp; Backpropagation</h4>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Competency on track. Term project submission scheduled in 23 days.
                </p>
                <div className="pt-2">
                  <Link href="/learning/roadmap">
                    <Button variant="outline" size="sm" className="w-full text-xs font-mono gap-1.5 border-white/10 hover:border-emerald-500/30">
                      <span>View Milestone Node</span>
                      <ArrowRight className="h-3 w-3 text-emerald-400" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </div>
          </div>
        </FadeIn>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD EXAM / DEADLINE                                                */}
      {/* ========================================================================= */}
      {showAddExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-5 shadow-[0_0_50px_rgba(6,182,212,0.25)] relative">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-bold font-mono text-white">Add Exam or Assignment Deadline</h3>
              </div>
              <button
                onClick={() => setShowAddExamModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddExamSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Subject / Skill *</label>
                <Input
                  value={examSubject}
                  onChange={(e) => setExamSubject(e.target.value)}
                  placeholder="e.g. Database Management Systems / Operating Systems"
                  className="bg-slate-950 border-white/10 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Exam / Assignment Title *</label>
                <Input
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  placeholder="e.g. Mid-Term Examination / Lab Viva"
                  className="bg-slate-950 border-white/10 text-white text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Deadline Date *</label>
                  <Input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="bg-slate-950 border-white/10 text-white text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Priority</label>
                  <select
                    value={examPriority}
                    onChange={(e) => setExamPriority(e.target.value as PriorityLevel)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none"
                  >
                    <option value="Critical">Critical (Top Priority)</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Scaffolding Difficulty</label>
                <select
                  value={examDifficulty}
                  onChange={(e) => setExamDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none"
                >
                  <option value="Standard">Standard (Balanced Concept &amp; Practice)</option>
                  <option value="Scaffold Mode">Scaffold Mode (Step-by-step guidance)</option>
                  <option value="Advanced Edge-Cases">Advanced Edge-Cases</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddExamModal(false)}
                  className="text-xs font-mono"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="cyber"
                  size="sm"
                  disabled={isAdapting}
                  className="text-xs font-mono"
                >
                  Schedule in AI Planner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
