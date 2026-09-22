"use client";

import React from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ShieldAlert,
  Info,
  ArrowRight,
  TrendingDown,
  Phone,
  Calendar,
  Sparkles,
  Eye,
  CheckCircle2,
  Clock,
  UserX,
  Send,
  HeartHandshake,
  Activity,
  FileWarning,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudentAttendanceRecord, InterventionType } from "@/lib/attendance/types";

interface EarlyWarningRadarProps {
  students: StudentAttendanceRecord[];
  onTriggerIntervention: (student: StudentAttendanceRecord, type: InterventionType) => void;
}

export function EarlyWarningRadar({
  students,
  onTriggerIntervention,
}: EarlyWarningRadarProps) {
  // Filter for students requiring attention (High Risk & Attendance Declining)
  const flaggedStudents = students.filter(
    (s) => s.earlyWarning.riskLevel === "high_risk" || s.earlyWarning.riskLevel === "declining"
  );

  return (
    <div className="space-y-6">
      {/* Educational Phrasing & Transparency Header Banner */}
      <GlassCard className="p-6 border-rose-500/30 bg-gradient-to-r from-rose-950/20 via-slate-900/60 to-purple-950/20 relative overflow-hidden" glow>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" dot dotColor="rose">
                EARLY WARNING SYSTEM
              </Badge>
              <span className="text-xs font-mono font-bold text-rose-300">
                Risk Indicators &amp; Students Requiring Attention
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-foreground font-mono">
              Empowering Timely Teacher Interventions Before Disengagement
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-slate-200">Ethical AI Notice:</strong> This early-warning radar does not claim to definitively predict student outcomes. Instead, it computes a transparent multi-signal indicator based on attendance velocity, consecutive absences, missed assignments, and portal inactivity to prompt compassionate, early human support.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-slate-950/80 shrink-0 space-y-1.5 text-center">
            <div className="text-2xl font-black text-rose-400 font-mono">
              {flaggedStudents.length} Students
            </div>
            <div className="text-[11px] font-mono text-muted-foreground uppercase">
              Requiring Immediate Attention
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Flagged Students Card List */}
      <div className="space-y-4">
        {flaggedStudents.map((student) => {
          const isHighRisk = student.earlyWarning.riskLevel === "high_risk";

          return (
            <GlassCard
              key={student.id}
              className={`p-6 border transition-all duration-300 ${
                isHighRisk
                  ? "border-rose-500/40 bg-rose-950/10 hover:border-rose-500/60"
                  : "border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left Column: Student Identity & Trend Progression */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-white/15">
                        <Image
                          src={student.avatar}
                          alt={student.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      </div>
                      <span
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 ${
                          isHighRisk ? "bg-rose-500" : "bg-amber-500"
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-black text-foreground font-mono">
                          {student.name}
                        </h4>
                        <span className="text-xs font-mono text-muted-foreground font-bold">
                          {student.rollNumber}
                        </span>
                        <Badge
                          variant={isHighRisk ? "destructive" : "amber"}
                          size="sm"
                          dot
                          dotColor={isHighRisk ? "rose" : "amber"}
                        >
                          {isHighRisk ? "High Risk" : "Attendance Declining"}
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-3">
                        <span>Class: <strong className="text-slate-200">{student.className}</strong></span>
                        <span>•</span>
                        <span>Current Attendance: <strong className={isHighRisk ? "text-rose-400" : "text-amber-400"}>{student.overallAttendance}%</strong></span>
                        <span>•</span>
                        <span>Consecutive Absences: <strong className="text-rose-400">{student.consecutiveAbsences} days</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Longitudinal Trend Progression (Week 1 → Week 4) */}
                  <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                        Longitudinal Attendance Trend:
                      </span>
                      <span className="text-xs font-mono font-bold text-rose-400">
                        {student.earlyWarning.trendSummary}
                      </span>
                    </div>

                    {/* Step progression display */}
                    <div className="flex items-center gap-2 pt-1 text-xs font-mono">
                      {student.weeklyTrend.map((w, idx) => (
                        <React.Fragment key={w.weekLabel}>
                          <div
                            className={`flex-1 p-2 rounded-lg border text-center transition-all ${
                              idx === student.weeklyTrend.length - 1
                                ? "border-rose-500/40 bg-rose-500/15 text-rose-300 font-bold"
                                : "border-white/10 bg-white/[0.02] text-slate-300"
                            }`}
                          >
                            <div className="text-[10px] text-muted-foreground">{w.weekLabel}</div>
                            <div className="text-sm font-black">{w.percentage}%</div>
                          </div>
                          {idx < student.weeklyTrend.length - 1 && (
                            <span className="text-muted-foreground">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Transparent Reasons: Explain WHY the student was flagged */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <FileWarning className="h-3.5 w-3.5 text-rose-400" />
                      Risk Indicators Detected (Why this student was flagged):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {student.earlyWarning.reasons.map((reason, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-200"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: 4 Recommended Interventions */}
                <div className="lg:w-80 shrink-0 space-y-3 p-4 rounded-xl border border-white/10 bg-slate-950/90">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                      Recommended Interventions
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      Select Action
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* 1. Contact Parent */}
                    <button
                      type="button"
                      onClick={() => onTriggerIntervention(student, "contact_parent")}
                      className="w-full p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-left transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                          <Phone className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-foreground font-mono">
                            1. Contact Parent
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate max-w-[170px]">
                            WhatsApp/SMS to {student.parentInfo.name}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    {/* 2. Schedule Counselling */}
                    <button
                      type="button"
                      onClick={() => onTriggerIntervention(student, "schedule_counselling")}
                      className="w-full p-2.5 rounded-lg border border-purple-500/30 bg-purple-950/20 hover:bg-purple-500/20 hover:border-purple-500/50 text-left transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                          <Calendar className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-foreground font-mono">
                            2. Schedule Counselling
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate max-w-[170px]">
                            Refer to School Counsellor
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    {/* 3. Teacher Follow-up */}
                    <button
                      type="button"
                      onClick={() => onTriggerIntervention(student, "teacher_followup")}
                      className="w-full p-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-left transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-md bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                          <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-foreground font-mono">
                            3. Teacher Follow-up
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate max-w-[170px]">
                            Remedial drill &amp; peer buddy
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    {/* 4. Monitor Progress */}
                    <button
                      type="button"
                      onClick={() => onTriggerIntervention(student, "monitor_progress")}
                      className="w-full p-2.5 rounded-lg border border-amber-500/30 bg-amber-950/20 hover:bg-amber-500/20 hover:border-amber-500/50 text-left transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                          <Eye className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-foreground font-mono">
                            4. Monitor Progress
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate max-w-[170px]">
                            Tag for Daily Attendance Alert
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

