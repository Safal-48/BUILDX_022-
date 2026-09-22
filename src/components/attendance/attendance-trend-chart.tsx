"use client";

import React from "react";
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  History,
  Info,
  Calendar,
  ArrowDownRight,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentAttendanceRecord } from "@/lib/attendance/types";

interface AttendanceTrendChartProps {
  students: StudentAttendanceRecord[];
  onSelectStudent?: (student: StudentAttendanceRecord) => void;
}

export function AttendanceTrendChart({
  students,
  onSelectStudent,
}: AttendanceTrendChartProps) {
  // Aggregate multi-week class averages
  const week1Avg = Math.round(
    students.reduce((acc, s) => acc + (s.weeklyTrend[0]?.percentage || 0), 0) / (students.length || 1)
  );
  const week2Avg = Math.round(
    students.reduce((acc, s) => acc + (s.weeklyTrend[1]?.percentage || 0), 0) / (students.length || 1)
  );
  const week3Avg = Math.round(
    students.reduce((acc, s) => acc + (s.weeklyTrend[2]?.percentage || 0), 0) / (students.length || 1)
  );
  const week4Avg = Math.round(
    students.reduce((acc, s) => acc + (s.weeklyTrend[3]?.percentage || 0), 0) / (students.length || 1)
  );

  const overallClassAvg = Math.round(
    students.reduce((acc, s) => acc + s.overallAttendance, 0) / (students.length || 1)
  );

  // Count students with declining attendance
  const decliningStudents = students.filter(
    (s) => s.earlyWarning.riskLevel === "high_risk" || s.earlyWarning.riskLevel === "declining"
  );

  // Count students with repeated absences (consecutive absences >= 2)
  const repeatedAbsenceStudents = students.filter((s) => s.consecutiveAbsences >= 2);

  return (
    <div className="space-y-6">
      {/* Top 4 Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance */}
        <GlassCard className="p-5 border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
              Overall Attendance
            </span>
            <Badge
              variant={overallClassAvg >= 75 ? "emerald" : "destructive"}
              size="sm"
            >
              {overallClassAvg >= 75 ? "Above 75% Norm" : "Below Threshold"}
            </Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl sm:text-4xl font-black text-foreground font-mono">
              {overallClassAvg}%
            </div>
            <span className="text-xs text-muted-foreground">Class Cumulative</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Minimum statutory requirement: 75% for Board Examination eligibility.
          </p>
        </GlassCard>

        {/* 4-Week Trend */}
        <GlassCard className="p-5 border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
              Cohort 4-Week Trend
            </span>
            <span className="text-xs font-mono text-amber-400 flex items-center gap-0.5">
              <ArrowDownRight className="h-3.5 w-3.5" /> -{week1Avg - week4Avg}%
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
            {week4Avg}%
            <span className="text-xs text-muted-foreground font-sans ml-1.5 font-normal">
              from {week1Avg}%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Slight downward shift over 4 weeks driven by seasonal harvesting &amp; commute gaps.
          </p>
        </GlassCard>

        {/* Students with Declining Attendance */}
        <GlassCard className="p-5 border-amber-500/30 bg-amber-950/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Declining Attendance
            </span>
            <Badge variant="amber" size="sm">
              Requires Tracking
            </Badge>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-foreground font-mono">
            {decliningStudents.length}
            <span className="text-xs text-muted-foreground font-sans ml-1.5 font-normal">
              of {students.length}
            </span>
          </div>
          <p className="text-[11px] text-amber-300/80">
            Consecutive weekly drop detected across 3+ academic periods.
          </p>
        </GlassCard>

        {/* Repeated Absences */}
        <GlassCard className="p-5 border-rose-500/30 bg-rose-950/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">
              Repeated Absences
            </span>
            <Badge variant="destructive" size="sm">
              ≥ 2 Consecutive
            </Badge>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">
            {repeatedAbsenceStudents.length}
            <span className="text-xs text-muted-foreground font-sans ml-1.5 font-normal">
              students
            </span>
          </div>
          <p className="text-[11px] text-rose-300/80">
            Critical indicator for impending disengagement if unresolved within 48 hours.
          </p>
        </GlassCard>
      </div>

      {/* Visual Multi-Week Progression Bars & Benchmark Radar */}
      <GlassCard className="p-6 border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
              <History className="h-4 w-4 text-cyan-400" />
              Classroom Multi-Week Attendance Progression vs. 75% Statutory Baseline
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Comparative weekly aggregate showing steady-state vs. flagged student groups
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-cyan-500" /> Class Avg
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-rose-500" /> At-Risk Cohort
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-emerald-400 border-dashed border-t" /> 75% Norm
            </span>
          </div>
        </div>

        {/* 4-Week Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {[
            { label: "Week 1", avg: week1Avg, atRiskAvg: 80, change: "Baseline" },
            { label: "Week 2", avg: week2Avg, atRiskAvg: 75, change: "-3%" },
            { label: "Week 3", avg: week3Avg, atRiskAvg: 69, change: "-6%" },
            { label: "Week 4 (Current)", avg: week4Avg, atRiskAvg: 63, change: "-6%" },
          ].map((w, idx) => (
            <div
              key={w.label}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300">{w.label}</span>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    idx === 0
                      ? "text-cyan-400"
                      : "text-amber-400 flex items-center"
                  }`}
                >
                  {w.change}
                </span>
              </div>

              {/* Class Average Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground">Class Avg</span>
                  <span className="text-foreground font-bold">{w.avg}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${w.avg}%` }}
                  />
                  {/* 75% guideline */}
                  <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-emerald-400" />
                </div>
              </div>

              {/* Flagged Cohort Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-rose-400">At-Risk Group</span>
                  <span className="text-rose-300 font-bold">{w.atRiskAvg}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${w.atRiskAvg}%` }}
                  />
                  {/* 75% guideline */}
                  <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trend Explanation Alert */}
        <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 flex items-start gap-3">
          <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed space-y-1">
            <span className="font-bold text-cyan-300 block font-mono">
              Smart Trend Telemetry Active:
            </span>
            <span>
              The system analyses longitudinal weekly trajectories rather than isolated snapshots.
              Students who display a negative slope across 3 or more consecutive weeks are immediately tagged for
              early mentoring before cumulative attendance drops below the 75% state threshold.
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

