"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  Compass,
  Award,
  CheckCircle2,
  Target,
  Calendar,
  Bell,
  Flame,
  Check,
  TrendingUp,
  Briefcase,
  Users,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/lib/auth/types";

interface StudentCommandCenterProps {
  user: UserProfile;
  greeting: string;
  hasUrgentScholarship?: boolean;
  setHasUrgentScholarship?: (val: boolean) => void;
}

export function StudentCommandCenter({
  user,
  greeting,
  hasUrgentScholarship: externalHasUrgent,
  setHasUrgentScholarship: externalSetHasUrgent,
}: StudentCommandCenterProps) {
  const [internalHasUrgent, setInternalHasUrgent] = useState(true);

  const hasUrgent = externalHasUrgent !== undefined ? externalHasUrgent : internalHasUrgent;
  const setHasUrgent = externalSetHasUrgent || setInternalHasUrgent;

  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Student";

  return (
    <div className="space-y-10">
      {/* ========================================================================= */}
      {/* TOP SECTION: TIME-AWARE GREETING & COMPACT 5-METRIC OVERVIEW             */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {greeting}, {firstName} 👋
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-sans">
              Here’s what needs your attention today.
            </p>
          </div>

          {/* Interactive Scenario Toggle for Next Best Action demo */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900/90 border border-white/10 px-2.5 py-1 rounded-xl text-[11px] font-mono shadow-sm">
            <span className="text-muted-foreground">Demo Scenario:</span>
            <button
              type="button"
              onClick={() => setHasUrgent(true)}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                hasUrgent
                  ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Urgent Scholarship
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => setHasUrgent(false)}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                !hasUrgent
                  ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Weakest Topic Drill
            </button>
          </div>
        </div>

        {/* Compact 5-Item Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* 1. Attendance */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Attendance</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <div className="text-2xl font-extrabold text-foreground group-hover:text-emerald-400 transition-colors">87%</div>
            <p className="text-[11px] font-medium text-emerald-400 mt-0.5 flex items-center gap-1">
              <Check className="h-3 w-3" /> Good attendance
            </p>
          </div>

          {/* 2. Academic Readiness */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Academic Readiness</span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
            <div className="text-2xl font-extrabold text-foreground group-hover:text-cyan-300 transition-colors">74%</div>
            <p className="text-[11px] font-medium text-cyan-300 mt-0.5">
              Class Rank #6 (Consistent)
            </p>
          </div>

          {/* 3. Learning Progress */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-violet-500/30 transition-all group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Learning Progress</span>
              <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            </div>
            <div className="text-2xl font-extrabold text-foreground group-hover:text-violet-300 transition-colors">14 / 20</div>
            <p className="text-[11px] font-medium text-violet-300 mt-0.5 flex items-center gap-1">
              <Flame className="h-3 w-3 text-amber-400" /> 18-Day Streak
            </p>
          </div>

          {/* 4. Scholarship Alerts */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Scholarships</span>
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
            </div>
            <div className="text-2xl font-extrabold text-amber-300 group-hover:text-amber-200 transition-colors">1 Urgent</div>
            <p className="text-[11px] font-medium text-amber-400/90 mt-0.5">
              3 Matches Available
            </p>
          </div>

          {/* 5. Career Readiness */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-blue-500/30 transition-all group col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Career Readiness</span>
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            </div>
            <div className="text-2xl font-extrabold text-foreground group-hover:text-blue-300 transition-colors">82%</div>
            <p className="text-[11px] font-medium text-blue-300 mt-0.5">
              ITI / Diploma Track
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROMINENT "NEXT BEST ACTION" HERO CARD                                    */}
      {/* ========================================================================= */}
      <div>
        {hasUrgent ? (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-950/30 border-2 border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.2)] p-5 sm:p-6 transition-all">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 shadow-glow-sm">
                  <Bell className="h-6 w-6 text-amber-400 animate-bounce" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="amber" size="sm" className="font-mono text-[10px] uppercase font-bold tracking-wider">
                      ⚡ Next Best Action • Closing in 5 Days
                    </Badge>
                    <span className="text-xs font-mono text-amber-300 font-bold">
                      ₹12,000 / Year • Direct DBT Aid
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                      94% Match Verified
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                    Your scholarship deadline is in 5 days.
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    National Means-cum-Merit Scholarship Scheme (NMMSS) registration closes this Friday. Your family income and Class 9 marks meet all eligibility rules. Submit before the portal closes.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
                <Link href="/scholarships" className="w-full sm:w-auto">
                  <Button variant="cyber" size="lg" className="w-full font-mono text-xs justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border-none shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer">
                    View Scholarship →
                  </Button>
                </Link>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setHasUrgent(false)}
                  className="text-[11px] font-mono text-muted-foreground hover:text-foreground justify-center cursor-pointer"
                >
                  Switch to Practice Drill
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/20 via-slate-900 to-blue-950/30 border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.2)] p-5 sm:p-6 transition-all">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 shadow-glow-sm">
                  <Target className="h-6 w-6 text-cyan-400 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="cyber" size="sm" className="font-mono text-[10px] uppercase font-bold tracking-wider">
                      ⚡ Next Best Action • 15-Min Focused Drill
                    </Badge>
                    <span className="text-xs font-mono text-cyan-300 font-bold">
                      Mathematics • Class 10 Syllabus
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-semibold">
                      Accuracy: 61%
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                    Geometry is your weakest topic.
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Your diagnostic quiz showed confusion on Triangles Similarity and Coordinate Geometry formulas. Spend 15 minutes reviewing 5 core questions to bring your subject accuracy above 75%.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
                <Link href="/learning/intervention?topic=trigonometry" className="w-full sm:w-auto">
                  <Button variant="cyber" size="lg" className="w-full font-mono text-xs justify-center font-bold">
                    Start 15-min Practice →
                  </Button>
                </Link>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setHasUrgent(true)}
                  className="text-[11px] font-mono text-muted-foreground hover:text-foreground justify-center cursor-pointer"
                >
                  View Scholarship Alert
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: ATTENDANCE                                                     */}
      {/* ========================================================================= */}
      <GlassCard className="p-6 border-white/10 bg-slate-900/70" glow>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Big Stat & Compliance */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-foreground">1. Attendance Tracking</h3>
              <Badge variant="emerald" size="sm" className="font-mono text-[10px]">
                87% • Good attendance
              </Badge>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">87%</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                +12% Above 75% Statutory Rule
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Your attendance is safely above the mandatory 75% state board exam requirement. You require 0 catch-up attendance sessions this month to remain in good standing.
            </p>

            {/* Visual Progress Bar with 75% Threshold Marker */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>Overall Attendance</span>
                <span>Target: 75% (Safe: 85%+)</span>
              </div>
              <div className="relative h-3 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                  style={{ width: "87%" }}
                />
                {/* 75% Statutory Rule Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
                  style={{ left: "75%" }}
                  title="Statutory Board Requirement (75%)"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground/80">
                <span>0%</span>
                <span className="text-amber-400 font-semibold">▲ 75% Board Rule Threshold</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Breakdown Metrics & Weekly Roll Call Strip */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-4 lg:w-80 shrink-0">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white/[0.03]">
                <div className="text-xs font-mono text-muted-foreground">Present</div>
                <div className="text-lg font-bold text-foreground">104</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03]">
                <div className="text-xs font-mono text-muted-foreground">Absent</div>
                <div className="text-lg font-bold text-foreground">16</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03]">
                <div className="text-xs font-mono text-muted-foreground">Streak</div>
                <div className="text-lg font-bold text-amber-400 flex items-center justify-center gap-0.5">
                  <Flame className="h-3.5 w-3.5" /> 18d
                </div>
              </div>
            </div>

            {/* Mon-Fri Roll Call Strip */}
            <div>
              <div className="text-[11px] font-mono text-muted-foreground mb-2 flex items-center justify-between">
                <span>This Week&apos;s Roll Call</span>
                <span className="text-emerald-400 font-bold">5/5 Present</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <div
                    key={day}
                    className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold"
                  >
                    {day}
                    <div className="text-[9px] text-emerald-300">✓</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <Link href="/dashboard/parent" className="block text-center text-xs font-mono text-cyan-400 hover:underline">
                Parent Verification Log →
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ========================================================================= */}
      {/* SECTION 2: LEARNING GAPS                                                  */}
      {/* ========================================================================= */}
      <GlassCard className="p-6 border-white/10 bg-slate-900/70" glow>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">2. Learning Gaps &amp; Diagnostic Breakdown</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Subject: Mathematics (Based on Weekly Class Assessments)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/learning">
                <Button variant="outline" size="sm" className="font-mono text-xs border-white/10 text-slate-300">
                  Subject Readiness
                </Button>
              </Link>
              <Link href="/learning/intervention?topic=trigonometry">
                <Button variant="cyber" size="sm" className="font-mono text-xs w-full sm:w-auto justify-center">
                  Start Personalized Practice →
                </Button>
              </Link>
            </div>
          </div>

          {/* Topics Progress List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Algebra */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Algebra</span>
                <span className="text-xs font-mono font-bold text-emerald-400">82%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: "82%" }} />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Linear equations, polynomials, and quadratic formula retention are strong.
              </p>
              <Badge variant="emerald" size="sm" className="font-mono text-[9px]">
                Mastered
              </Badge>
            </div>

            {/* Geometry */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Geometry</span>
                <span className="text-xs font-mono font-bold text-amber-400">61%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: "61%" }} />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Similarity theorems and coordinate geometry require step-by-step revision.
              </p>
              <Badge variant="amber" size="sm" className="font-mono text-[9px]">
                Needs Attention
              </Badge>
            </div>

            {/* Trigonometry */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Trigonometry</span>
                <span className="text-xs font-mono font-bold text-rose-400">38%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: "38%" }} />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Trigonometric ratios, heights &amp; distances formulas need targeted drill.
              </p>
              <Badge variant="destructive" size="sm" className="font-mono text-[9px]">
                Critical Gap
              </Badge>
            </div>
          </div>

          {/* Action Banner */}
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-300">
              <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Recommended Action:</strong> Completing a 15-minute diagnostic practice on Trigonometry will boost your predicted exam score by 14%.
              </span>
            </div>
            <Link href="/learning/intervention?topic=trigonometry" className="shrink-0 w-full sm:w-auto">
              <Button variant="glow" size="sm" className="w-full text-xs font-mono justify-center">
                Start Practice Now →
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* ========================================================================= */}
      {/* SECTION 3: SCHOLARSHIP ALERT                                              */}
      {/* ========================================================================= */}
      <GlassCard className="p-6 border-white/10 bg-slate-900/70" glow>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">3. Scholarship Alerts</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  3 scholarships may match your profile • 1 deadline within 7 days
                </p>
              </div>
            </div>

            <Link href="/scholarships">
              <Button variant="cyber" size="sm" className="font-mono text-xs w-full sm:w-auto justify-center cursor-pointer">
                View Scholarships →
              </Button>
            </Link>
          </div>

          {/* 3 Matched Scholarships */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scholarship 1 - Urgent */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <Badge variant="amber" size="sm" className="font-mono text-[9px] uppercase font-bold">
                    ⏰ Closes in 4 Days
                  </Badge>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    94% Match
                  </span>
                </div>
                <h4 className="font-bold text-sm text-foreground">
                  National Means-cum-Merit (NMMSS)
                </h4>
                <div className="text-xs font-mono text-amber-300 font-bold">
                  ₹12,000 / Year (Direct DBT)
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  For state &amp; municipal school students. Family income &lt; ₹3.5L. Income certificate required.
                </p>
              </div>
              <Link href="/scholarships" className="pt-2 block">
                <Button variant="cyber" size="sm" className="w-full text-xs font-mono justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border-none cursor-pointer">
                  Apply Now →
                </Button>
              </Link>
            </div>

            {/* Scholarship 2 */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <Badge variant="glass" size="sm" className="font-mono text-[9px] uppercase">
                    Closes in 18 Days
                  </Badge>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    91% Match
                  </span>
                </div>
                <h4 className="font-bold text-sm text-foreground">
                  State Pre-Matric SC/ST/OBC Aid
                </h4>
                <div className="text-xs font-mono text-cyan-300 font-bold">
                  ₹8,500 / Year + Book Grant
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  State welfare quota. Automatic tuition fee exemption and textbook voucher.
                </p>
              </div>
              <Link href="/scholarships" className="pt-2 block">
                <Button variant="glass" size="sm" className="w-full text-xs font-mono justify-center cursor-pointer">
                  View Details →
                </Button>
              </Link>
            </div>

            {/* Scholarship 3 */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <Badge variant="emerald" size="sm" className="font-mono text-[9px] uppercase">
                    Rolling Admissions
                  </Badge>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    96% Match
                  </span>
                </div>
                <h4 className="font-bold text-sm text-foreground">
                  AICTE Pragati Technical Grant
                </h4>
                <div className="text-xs font-mono text-violet-300 font-bold">
                  ₹50,000 / Year (Polytechnic/ITI)
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Dedicated for girl students admitted into recognized technical diploma or ITI trade courses.
                </p>
              </div>
              <Link href="/scholarships" className="pt-2 block">
                <Button variant="glass" size="sm" className="w-full text-xs font-mono justify-center cursor-pointer">
                  View Details →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ========================================================================= */}
      {/* SECTION 4: CAREER RECOMMENDATIONS                                         */}
      {/* ========================================================================= */}
      <GlassCard className="p-6 border-white/10 bg-slate-900/70" glow>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                <Compass className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">4. Career &amp; Opportunity Pathways</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Realistic local and vocational pathways for rural and municipal school students
                </p>
              </div>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. ITI */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-2">
                <Badge variant="cyber" size="sm" className="font-mono text-[9px] uppercase">
                  Vocational Trade
                </Badge>
                <h4 className="font-bold text-sm text-foreground group-hover:text-cyan-300 transition-colors">
                  ITI (Industrial Training)
                </h4>
                <div className="text-[11px] font-mono text-muted-foreground">
                  Electrician • Wireman • Draughtsman
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  2-Year NCVT Certificate. Direct recruitment eligibility into State Power Corp and Railway Workshops.
                </p>
              </div>
              <Link href="/career" className="pt-2 block">
                <Button variant="glass" size="sm" className="w-full text-[11px] font-mono justify-center group-hover:border-cyan-500/40">
                  Explore Trades →
                </Button>
              </Link>
            </div>

            {/* 2. Internship */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-2">
                <Badge variant="emerald" size="sm" className="font-mono text-[9px] uppercase">
                  Hands-on Experience
                </Badge>
                <h4 className="font-bold text-sm text-foreground group-hover:text-emerald-300 transition-colors">
                  Local Tech Internship
                </h4>
                <div className="text-[11px] font-mono text-muted-foreground">
                  District CSC Digital Assistant
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  3–6 Months • Stipend ₹6,000/mo. Learn citizen e-governance, digital records, and DBT filing.
                </p>
              </div>
              <Link href="/opportunities" className="pt-2 block">
                <Button variant="glass" size="sm" className="w-full text-[11px] font-mono justify-center group-hover:border-emerald-500/40">
                  View Openings →
                </Button>
              </Link>
            </div>

            {/* 3. Apprenticeship */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-amber-500/40 transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-2">
                <Badge variant="amber" size="sm" className="font-mono text-[9px] uppercase">
                  Govt. Apprentice
                </Badge>
                <h4 className="font-bold text-sm text-foreground group-hover:text-amber-300 transition-colors">
                  PSU Trade Apprenticeship
                </h4>
                <div className="text-[11px] font-mono text-muted-foreground">
                  Indian Railways / DRDO (Act 1961)
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  ₹8,500/mo stipend + Trade Certificate. Special quota reservation for permanent Group C/D posts.
                </p>
              </div>
              <Link href="/opportunities" className="pt-2 block">
                <Button variant="glass" size="sm" className="w-full text-[11px] font-mono justify-center group-hover:border-amber-500/40">
                  View NAPS Postings →
                </Button>
              </Link>
            </div>

            {/* 4. Higher Education */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-violet-500/40 transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-2">
                <Badge variant="violet" size="sm" className="font-mono text-[9px] uppercase">
                  Academic Degree
                </Badge>
                <h4 className="font-bold text-sm text-foreground group-hover:text-violet-300 transition-colors">
                  Higher Education
                </h4>
                <div className="text-[11px] font-mono text-muted-foreground">
                  State Polytechnic Diploma
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  3-Year Diploma in Electrical/Civil. Lateral entry into B.Tech 2nd year with municipal fee waivers.
                </p>
              </div>
              <Link href="/career" className="pt-2 block">
                <Button variant="glass" size="sm" className="w-full text-[11px] font-mono justify-center group-hover:border-violet-500/40">
                  Explore Diploma →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ========================================================================= */}
      {/* SECTION 5: RECENT ALERTS                                                  */}
      {/* ========================================================================= */}
      <GlassCard className="p-6 border-white/10 bg-slate-900/70" glow>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">5. Recent Alerts</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Real-time chronological updates from your teachers, school, and portal
                </p>
              </div>
            </div>
          </div>

          {/* Chronological Alerts Feed */}
          <div className="space-y-2.5">
            {/* Alert 1 */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                ⏰
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-amber-300">Urgent Scholarship Notice</span>
                  <span className="text-[10px] font-mono text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  NMMSS application window closes in 4 days. Please ensure parent income certificate is verified by school headmaster.
                </p>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                📚
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-cyan-300">Teacher Assignment</span>
                  <span className="text-[10px] font-mono text-muted-foreground">5 hours ago</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  Mr. Sharma (Mathematics) assigned Homework #4: 5 diagnostic practice questions on Coordinate Geometry (Due tomorrow).
                </p>
              </div>
            </div>

            {/* Alert 3 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-violet-500/15 text-violet-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                📅
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-violet-300">Examination Timetable</span>
                  <span className="text-[10px] font-mono text-muted-foreground">1 day ago</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  Terminal examinations for Class 10 will commence on October 14. Download the revised practical &amp; theory date sheet.
                </p>
              </div>
            </div>

            {/* Alert 4 */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                ✓
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-emerald-300">Daily Attendance Logged</span>
                  <span className="text-[10px] font-mono text-muted-foreground">Today, 9:15 AM</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  Morning roll call recorded: Present for all 6 scheduled periods. Current active streak: 18 consecutive days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ========================================================================= */}
      {/* SECTION 6: PERSONALIZED ROADMAP                                           */}
      {/* ========================================================================= */}
      <GlassCard className="p-6 border-white/10 bg-slate-900/70" glow>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400 flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">6. Personalized Education Roadmap</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Step-by-step visual progression from school to career and livelihood
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Flow */}
          <div className="relative">
            {/* Vertical / Horizontal Step Line */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Step 1 */}
              <div className="relative p-4 rounded-2xl bg-cyan-500/10 border-2 border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="h-6 w-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <Badge variant="cyber" size="sm" className="font-mono text-[9px]">
                    Current Stage
                  </Badge>
                </div>
                <h4 className="font-bold text-sm text-foreground">Class 10 / 12</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Focus on core syllabus, maintaining 85%+ attendance, and completing NMMSS scholarship application.
                </p>
                <div className="text-[10px] font-mono text-cyan-300 font-semibold">
                  Progress: 87% Complete
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="h-6 w-6 rounded-full bg-slate-800 text-foreground font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">Next Milestone</span>
                </div>
                <h4 className="font-bold text-sm text-foreground">Higher Ed / ITI</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Choose between State Polytechnic Diploma (3 Yrs) or ITI NCVT Certified Trade (2 Yrs).
                </p>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Entrance: June 2027
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="h-6 w-6 rounded-full bg-slate-800 text-foreground font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">Skill Foundation</span>
                </div>
                <h4 className="font-bold text-sm text-foreground">Skills Mastery</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Hands-on technical workshops, digital tools, electrical safety protocols, and technical math.
                </p>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Skillora Modules
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="h-6 w-6 rounded-full bg-slate-800 text-foreground font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">On-the-job</span>
                </div>
                <h4 className="font-bold text-sm text-foreground">Apprentice / Intern</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Practical training via Indian Railways Apprentice or District CSC Digital Assistant (NAPS portal).
                </p>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Stipend: ₹6k–₹10k/mo
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="h-6 w-6 rounded-full bg-slate-800 text-foreground font-bold text-xs flex items-center justify-center">
                    5
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">Goal</span>
                </div>
                <h4 className="font-bold text-sm text-foreground">Career &amp; Livelihood</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Certified Junior Technician, Assistant Engineer, or lateral B.Tech entry with financial independence.
                </p>
                <div className="text-[10px] font-mono text-emerald-400 font-semibold">
                  Sustainable Career
                </div>
              </div>
            </div>
          </div>

          {/* Counseling Callout */}
          <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-violet-300">
              <Sparkles className="h-4 w-4 text-violet-400 shrink-0" />
              <span>
                <strong>Unsure between ITI Trade and Polytechnic Diploma?</strong> Connect with our educational mentors for free guidance.
              </span>
            </div>
            <Link href="/mentorship" className="shrink-0 w-full sm:w-auto">
              <Button variant="glass" size="sm" className="w-full text-xs font-mono justify-center text-violet-300 hover:text-violet-200 cursor-pointer">
                Talk to Counselor →
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
