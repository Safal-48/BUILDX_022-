"use client";

import React from "react";
import Image from "next/image";
import {
  Check,
  X,
  Clock,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Send,
  Sparkles,
  Phone,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StudentAttendanceRecord, AttendanceStatus, InterventionType } from "@/lib/attendance/types";

interface AttendanceRosterTableProps {
  students: StudentAttendanceRecord[];
  onUpdateStatus: (studentId: string, status: AttendanceStatus) => void;
  onOpenIntervention: (student: StudentAttendanceRecord, type?: InterventionType) => void;
  onSelectStudentDetails?: (student: StudentAttendanceRecord) => void;
}

export function AttendanceRosterTable({
  students,
  onUpdateStatus,
  onOpenIntervention,
  onSelectStudentDetails,
}: AttendanceRosterTableProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-slate-950/60 text-muted-foreground font-mono uppercase tracking-wider">
              <th className="py-3.5 px-4 font-bold">Roll / Student</th>
              <th className="py-3.5 px-4 font-bold text-center">Today&apos;s Status</th>
              <th className="py-3.5 px-4 font-bold">Overall %</th>
              <th className="py-3.5 px-4 font-bold">4-Week Trend</th>
              <th className="py-3.5 px-4 font-bold">Absence Streak</th>
              <th className="py-3.5 px-4 font-bold">Risk Indicators</th>
              <th className="py-3.5 px-4 font-bold text-right">Intervention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {students.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground font-mono">
                  No students found matching current filters.
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const isHighRisk = student.earlyWarning.riskLevel === "high_risk";
                const isDeclining = student.earlyWarning.riskLevel === "declining";
                const isLate = student.currentStatus === "late";
                const isAbsent = student.currentStatus === "absent";
                const isPresent = student.currentStatus === "present";

                // Check if trend has dropped across consecutive weeks
                const w = student.weeklyTrend;
                const isConsecutivelyDeclining =
                  w.length >= 4 &&
                  w[0].percentage > w[1].percentage &&
                  w[1].percentage > w[2].percentage &&
                  w[2].percentage > w[3].percentage;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors hover:bg-white/[0.03] ${
                      isHighRisk
                        ? "bg-rose-950/[0.07]"
                        : isDeclining
                        ? "bg-amber-950/[0.05]"
                        : ""
                    }`}
                  >
                    {/* Student Roll & Identity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/10 shrink-0">
                          <Image
                            src={student.avatar}
                            alt={student.name}
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="font-bold text-foreground text-sm font-mono flex items-center gap-1.5">
                            {student.name}
                            {isHighRisk && (
                              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                            )}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-mono">
                            {student.rollNumber} • {student.section}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Quick 3-State Marking Buttons (Present, Absent, Late) */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex p-1 rounded-xl bg-slate-950/80 border border-white/10 gap-1">
                        {/* Present Button */}
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(student.id, "present")}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-1 ${
                            isPresent
                              ? "bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                              : "text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>P</span>
                        </button>

                        {/* Absent Button */}
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(student.id, "absent")}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-1 ${
                            isAbsent
                              ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                              : "text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                          }`}
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>A</span>
                        </button>

                        {/* Late Button */}
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(student.id, "late")}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center gap-1 ${
                            isLate
                              ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                              : "text-slate-400 hover:text-amber-400 hover:bg-amber-500/10"
                          }`}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          <span>L</span>
                        </button>
                      </div>
                    </td>

                    {/* Overall Attendance % */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono">
                        <span
                          className={`text-sm font-black ${
                            student.overallAttendance < 75
                              ? "text-rose-400"
                              : student.overallAttendance < 85
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {student.overallAttendance}%
                        </span>
                        <div className="text-[10px] text-muted-foreground">
                          {student.totalPresent}P / {student.totalAbsent}A / {student.totalLate}L
                        </div>
                      </div>
                    </td>

                    {/* 4-Week Trend Step Progression */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          {w.map((item, idx) => (
                            <React.Fragment key={item.weekLabel}>
                              <span
                                className={
                                  idx === w.length - 1
                                    ? student.overallAttendance < 75
                                      ? "font-bold text-rose-400"
                                      : "font-bold text-slate-200"
                                    : "text-muted-foreground"
                                }
                              >
                                {item.percentage}%
                              </span>
                              {idx < w.length - 1 && (
                                <span className="text-white/20">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        {isConsecutivelyDeclining && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                            <TrendingDown className="h-2.5 w-2.5" /> Declining 3 wks
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Absence Streak */}
                    <td className="py-3.5 px-4">
                      {student.consecutiveAbsences > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          {student.consecutiveAbsences} days straight
                        </span>
                      ) : (
                        <span className="text-muted-foreground font-mono text-xs">
                          0 days
                        </span>
                      )}
                    </td>

                    {/* Risk Level Badge */}
                    <td className="py-3.5 px-4">
                      {isHighRisk ? (
                        <Badge variant="destructive" size="sm" dot dotColor="rose">
                          High Risk
                        </Badge>
                      ) : isDeclining ? (
                        <Badge variant="amber" size="sm" dot dotColor="amber">
                          Declining
                        </Badge>
                      ) : (
                        <Badge variant="emerald" size="sm" dot dotColor="emerald">
                          Regular
                        </Badge>
                      )}
                    </td>

                    {/* Interventions Action Buttons */}
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {isHighRisk || isDeclining ? (
                        <button
                          type="button"
                          onClick={() => onOpenIntervention(student, "contact_parent")}
                          title="Contact Parent immediately"
                          className="px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/15 text-[11px] font-mono font-bold inline-flex items-center gap-1 transition-all"
                        >
                          <Phone className="h-3 w-3" />
                          <span>Parent</span>
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => onOpenIntervention(student)}
                        title="Open Recommended Interventions"
                        className="px-2.5 py-1 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/30 text-[11px] font-mono inline-flex items-center gap-1 transition-all"
                      >
                        <Sparkles className="h-3 w-3 text-cyan-400" />
                        <span>Action</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

