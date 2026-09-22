"use client";

import React from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  CheckCheck,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AttendanceKpiSummaryProps {
  classNameTitle: string; // e.g. "Class 12-A"
  totalEnrolled: number; // e.g. 180
  sampleRosterCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  atRiskCount: number;
  onMarkAllPresent: () => void;
  onMarkAllAbsent: () => void;
  onQuickFillPresent: () => void;
  onResetAttendance: () => void;
}

export function AttendanceKpiSummary({
  classNameTitle,
  totalEnrolled,
  sampleRosterCount,
  presentCount,
  absentCount,
  lateCount,
  atRiskCount,
  onMarkAllPresent,
  onMarkAllAbsent,
  onQuickFillPresent,
  onResetAttendance,
}: AttendanceKpiSummaryProps) {
  const presentPct = Math.round((presentCount / (sampleRosterCount || 1)) * 100);
  const absentPct = Math.round((absentCount / (sampleRosterCount || 1)) * 100);
  const latePct = Math.round((lateCount / (sampleRosterCount || 1)) * 100);

  return (
    <div className="space-y-4">
      {/* Top Banner with Cohort Information & Quick Bulk Actions */}
      <GlassCard className="p-5 border-white/10 relative overflow-hidden" glow>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Cohort Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                ACTIVE ROSTER SESSION
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Showing {sampleRosterCount} active sample records of {totalEnrolled} total enrolled
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-mono">
                {classNameTitle}
              </h2>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                • {totalEnrolled} Students
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Official institutional attendance session synced with State Education Database &amp; Parent Alert Gateway.
            </p>
          </div>

          {/* Bulk Marking Toolbar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllPresent}
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-300"
              leftIcon={<CheckCheck className="h-4 w-4 text-emerald-400" />}
            >
              Mark All Present
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAbsent}
              className="border-rose-500/30 text-rose-400 hover:bg-rose-500/15 hover:text-rose-300"
              leftIcon={<XCircle className="h-4 w-4 text-rose-400" />}
            >
              Mark All Absent
            </Button>

            <Button
              variant="cyber"
              size="sm"
              onClick={onQuickFillPresent}
              className="text-xs font-mono"
              leftIcon={<Sparkles className="h-3.5 w-3.5" />}
            >
              Fill Unmarked
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onResetAttendance}
              title="Reset today's roster marking to initial state"
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* KPI 4-Card Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Present Card */}
        <div className="p-4 rounded-xl border border-emerald-500/25 bg-emerald-950/15 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Present
            </span>
            <Badge variant="emerald" size="sm">
              {presentPct}%
            </Badge>
          </div>
          <div className="text-3xl font-extrabold text-foreground font-mono">
            {presentCount}
            <span className="text-xs text-muted-foreground font-sans ml-1.5 font-normal">
              students
            </span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${presentPct}%` }}
            />
          </div>
        </div>

        {/* Absent Card */}
        <div className="p-4 rounded-xl border border-rose-500/25 bg-rose-950/15 backdrop-blur-sm relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-rose-400" />
              Absent
            </span>
            <Badge variant="destructive" size="sm">
              {absentPct}%
            </Badge>
          </div>
          <div className="text-3xl font-extrabold text-foreground font-mono">
            {absentCount}
            <span className="text-xs text-muted-foreground font-sans ml-1.5 font-normal">
              students
            </span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${absentPct}%` }}
            />
          </div>
        </div>

        {/* Late Card */}
        <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-950/15 backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-400" />
              Late
            </span>
            <Badge variant="amber" size="sm">
              {latePct}%
            </Badge>
          </div>
          <div className="text-3xl font-extrabold text-foreground font-mono">
            {lateCount}
            <span className="text-xs text-muted-foreground font-sans ml-1.5 font-normal">
              students
            </span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${latePct}%` }}
            />
          </div>
        </div>

        {/* Early Warning / Flagged Card */}
        <div className="p-4 rounded-xl border border-rose-500/40 bg-gradient-to-br from-rose-950/30 to-purple-950/20 backdrop-blur-sm relative overflow-hidden group hover:border-rose-500/60 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-400 animate-pulse" />
              Requires Attention
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-foreground font-mono">
            {atRiskCount}
            <span className="text-xs text-rose-300 font-sans ml-1.5 font-normal">
              flagged
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-3 truncate">
            Early Warning signals detected
          </p>
        </div>
      </div>
    </div>
  );
}
