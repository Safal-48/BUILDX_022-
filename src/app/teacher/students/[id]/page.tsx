"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  TrendingDown,
  Award,
  FileText,
  History,
  Send,
  Plus,
  ShieldCheck,
  UserX,
  Zap,
  Check,
  Layers,
  FileWarning,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INITIAL_STUDENTS_ROSTER } from "@/lib/attendance/mock-data";
import {
  StudentAttendanceRecord,
  InterventionType,
  InterventionLog,
} from "@/lib/attendance/types";
import { InterventionModal } from "@/components/attendance/intervention-modal";
import { SlideUp } from "@/components/animations/motion-wrapper";

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params?.id as string;

  // Find student record from mock data (fallback to Amit Kumar std-12a-001 if id not matched)
  const initialStudent = useMemo(() => {
    return (
      INITIAL_STUDENTS_ROSTER.find((s) => s.id === studentId) ||
      INITIAL_STUDENTS_ROSTER[0]
    );
  }, [studentId]);

  const [student, setStudent] = useState<StudentAttendanceRecord>(initialStudent);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<InterventionType>("contact_parent");
  const [activeTab, setActiveTab] = useState<
    "overview" | "academics" | "assignments" | "scholarships" | "interventions"
  >("overview");

  // Handle saving new intervention to student history
  const handleSaveIntervention = (
    sid: string,
    type: InterventionType,
    notes: string
  ) => {
    const todayStr = "Today";
    const newLog: InterventionLog = {
      id: `int-${Date.now()}`,
      studentId: sid,
      type,
      title:
        type === "contact_parent"
          ? "Teacher contacted parent"
          : type === "schedule_counselling"
          ? "Counselling recommended"
          : type === "teacher_followup"
          ? "Teacher Follow-up logged"
          : "Watchlist status updated",
      notes,
      date: todayStr,
      performedBy: "Dr. Rajesh Sharma (Class Teacher)",
      status: "Completed",
    };

    setStudent((prev) => ({
      ...prev,
      interventionHistory: [newLog, ...prev.interventionHistory],
    }));
  };

  const isHighRisk = student.earlyWarning.riskLevel === "high_risk";
  const isDeclining = student.earlyWarning.riskLevel === "declining";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
      <Container>
        <SlideUp>
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Navigation Breadcrumb */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Link
                  href="/dashboard/teacher"
                  className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Teacher Dashboard
                </Link>
                <span>/</span>
                <span className="text-slate-400">Class 12-A</span>
                <span>/</span>
                <span className="text-cyan-300 font-bold">{student.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setModalType("contact_parent");
                    setModalOpen(true);
                  }}
                  className="text-xs font-mono border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  leftIcon={<Phone className="h-3.5 w-3.5" />}
                >
                  Contact Parent
                </Button>

                <Button
                  variant="glow"
                  size="sm"
                  onClick={() => {
                    setModalType("teacher_followup");
                    setModalOpen(true);
                  }}
                  className="text-xs font-mono"
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                >
                  Add Intervention
                </Button>
              </div>
            </div>

            {/* Student Profile Hero Header */}
            <GlassCard className="p-6 border-white/10 relative overflow-hidden" glow>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                      <Image
                        src={student.avatar}
                        alt={student.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    </div>
                    <span
                      className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-slate-900 ${
                        isHighRisk ? "bg-rose-500" : isDeclining ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="text-2xl sm:text-3xl font-black text-foreground font-mono">
                        {student.name}
                      </h1>
                      <Badge
                        variant={isHighRisk ? "destructive" : isDeclining ? "amber" : "emerald"}
                        size="sm"
                        dot
                        dotColor={isHighRisk ? "rose" : isDeclining ? "amber" : "emerald"}
                      >
                        {isHighRisk ? "High Risk" : isDeclining ? "Attendance Declining" : "Regular"}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground font-mono flex flex-wrap items-center gap-3">
                      <span>Roll No: <strong className="text-foreground">{student.rollNumber}</strong></span>
                      <span>•</span>
                      <span>{student.className} (Section {student.section})</span>
                      <span>•</span>
                      <span>Parent: <strong className="text-slate-200">{student.parentInfo.name}</strong> ({student.parentInfo.phone})</span>
                    </div>

                    <p className="text-xs text-muted-foreground pt-1">
                      Target Support Goal: Recover attendance to 75% statutory norm &amp; complete overdue assignments.
                    </p>
                  </div>
                </div>

                {/* Big Metric Badges */}
                <div className="grid grid-cols-2 gap-3 sm:w-64 shrink-0">
                  <div className="p-3 rounded-xl border border-white/10 bg-slate-950/80 text-center">
                    <div className="text-[11px] font-mono text-muted-foreground uppercase">Attendance</div>
                    <div className={`text-2xl font-black font-mono ${student.overallAttendance < 75 ? "text-rose-400" : "text-emerald-400"}`}>
                      {student.overallAttendance}%
                    </div>
                    <div className="text-[10px] text-muted-foreground">{student.totalPresent} Present / {student.totalAbsent} Absent</div>
                  </div>

                  <div className="p-3 rounded-xl border border-white/10 bg-slate-950/80 text-center">
                    <div className="text-[11px] font-mono text-muted-foreground uppercase">Absence Streak</div>
                    <div className={`text-2xl font-black font-mono ${student.consecutiveAbsences > 0 ? "text-rose-400" : "text-slate-300"}`}>
                      {student.consecutiveAbsences} <span className="text-xs">days</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">Consecutive days</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Quick Navigation Tabs for Large Class Management */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-mono overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeTab === "overview"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                1. Attendance &amp; Trend
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("academics")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeTab === "academics"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                2. Marks &amp; Progress
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("assignments")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "assignments"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>3. Missed Assignments</span>
                {(student.missedAssignmentsList?.length || 0) > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {student.missedAssignmentsList?.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("scholarships")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeTab === "scholarships"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                4. Scholarship Status
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("interventions")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "interventions"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <History className="h-3 w-3" />
                <span>5. Intervention History ({student.interventionHistory.length})</span>
              </button>
            </div>

            {/* TAB 1: ATTENDANCE & MULTI-WEEK TREND */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* 4-Week Trend Step Progression */}
                <GlassCard className="p-6 border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-rose-400" />
                        Longitudinal Attendance Progression
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Detecting consecutive weekly declines before exam qualification risk
                      </p>
                    </div>
                    <Badge variant="destructive" size="sm">
                      {student.earlyWarning.trendSummary}
                    </Badge>
                  </div>

                  {/* 4 Steps: Week 1 → Week 2 → Week 3 → Week 4 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {student.weeklyTrend.map((w, idx) => {
                      const isCurrent = idx === student.weeklyTrend.length - 1;
                      return (
                        <div
                          key={w.weekLabel}
                          className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                            isCurrent
                              ? "border-rose-500/40 bg-rose-950/20 text-rose-300 font-bold"
                              : "border-white/10 bg-slate-950/60 text-slate-300"
                          }`}
                        >
                          <div className="text-[11px] font-mono text-muted-foreground uppercase">{w.weekLabel}</div>
                          <div className="text-2xl font-black font-mono">{w.percentage}%</div>
                          <div className="text-[10px] text-muted-foreground">
                            {w.presentDays} of {w.totalDays} days attended
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Consecutive Absence & Trend Explanation */}
                  <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-950/10 flex items-start gap-3">
                    <FileWarning className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                      <span className="font-bold text-rose-300 block font-mono">
                        Risk Indicators Detected for {student.name}:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                        {student.earlyWarning.reasons.map((r, i) => (
                          <li key={i}><span className="text-slate-200">{r}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>

                {/* Recent Alerts Feed */}
                <GlassCard className="p-6 border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      Recent Student System Alerts
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">Chronological</span>
                  </div>

                  <div className="space-y-2.5">
                    {student.recentAlertsList?.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-xl border border-white/5 bg-slate-950/60 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-foreground font-mono flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                alert.type === "high"
                                  ? "bg-rose-500"
                                  : alert.type === "medium"
                                  ? "bg-amber-500"
                                  : "bg-cyan-500"
                              }`}
                            />
                            {alert.title}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {alert.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                          {alert.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {/* TAB 2: MARKS & LEARNING PROGRESS */}
            {activeTab === "academics" && (
              <div className="space-y-6">
                <GlassCard className="p-6 border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-cyan-400" />
                      Academic Subject Mastery &amp; Unit Test Scores
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">Class 12-A Science</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {student.academicSubjectMastery.map((sub) => {
                      const isFailing = sub.score < 50;
                      return (
                        <div
                          key={sub.subject}
                          className="p-4 rounded-xl border border-white/10 bg-slate-950/60 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-foreground">{sub.subject}</span>
                            <span className={`font-black ${isFailing ? "text-rose-400" : "text-emerald-400"}`}>
                              {sub.score}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isFailing ? "bg-rose-500" : sub.score < 70 ? "bg-amber-500" : "bg-emerald-500"
                              }`}
                              style={{ width: `${sub.score}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-muted-foreground flex justify-between">
                            <span>Passing: 35%</span>
                            <span>Class Avg: 68%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>

                {/* Learning Progress Summary */}
                {student.learningProgressDetails && (
                  <GlassCard className="p-6 border-white/10 space-y-4">
                    <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      Digital Learning Engagement &amp; Topic Diagnostic
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl border border-white/10 bg-slate-950 text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-mono">Curriculum Done</div>
                        <div className="text-xl font-bold text-cyan-300 font-mono">
                          {student.learningProgressDetails.overallCompletion}%
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-white/10 bg-slate-950 text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-mono">Active Streak</div>
                        <div className="text-xl font-bold text-amber-300 font-mono">
                          {student.learningProgressDetails.activeDaysStreak} days
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-white/10 bg-slate-950 text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-mono">Questions Solved</div>
                        <div className="text-xl font-bold text-foreground font-mono">
                          {student.learningProgressDetails.practiceQuestionsSolved}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-white/10 bg-slate-950 text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-mono">Monthly Study</div>
                        <div className="text-xl font-bold text-purple-300 font-mono">
                          {student.learningProgressDetails.hoursSpentThisMonth} hrs
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                      <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
                        <span className="text-emerald-400 font-bold block mb-1">Demonstrated Strength:</span>
                        <span className="text-slate-200">{student.learningProgressDetails.strongTopic}</span>
                      </div>
                      <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-950/10">
                        <span className="text-rose-400 font-bold block mb-1">Target Remedial Topic:</span>
                        <span className="text-slate-200">{student.learningProgressDetails.weakTopic}</span>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </div>
            )}

            {/* TAB 3: MISSED ASSIGNMENTS */}
            {activeTab === "assignments" && (
              <GlassCard className="p-6 border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                      <FileText className="h-4 w-4 text-rose-400" />
                      Pending &amp; Missed Homework Submissions
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Teacher check-list for assignments requiring student catch-up
                    </p>
                  </div>
                  <Badge variant="destructive" size="sm">
                    {student.missedAssignmentsList?.length || 0} Overdue
                  </Badge>
                </div>

                <div className="space-y-3 pt-2">
                  {(!student.missedAssignmentsList || student.missedAssignmentsList.length === 0) ? (
                    <div className="py-8 text-center text-xs text-muted-foreground font-mono">
                      No overdue assignments on record. All submissions up to date!
                    </div>
                  ) : (
                    student.missedAssignmentsList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-rose-500/20 bg-rose-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-foreground font-mono flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                              {item.subject}
                            </span>
                            <span>{item.title}</span>
                          </div>
                          <div className="text-[11px] text-muted-foreground font-mono">
                            Due Date: <span className="text-rose-300 font-bold">{item.dueDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setModalType("teacher_followup");
                              setModalOpen(true);
                            }}
                            className="text-xs font-mono border-white/10"
                          >
                            Assign Remediation
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </GlassCard>
            )}

            {/* TAB 4: SCHOLARSHIP STATUS */}
            {activeTab === "scholarships" && (
              <GlassCard className="p-6 border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-400" />
                    Government Scholarship Tracking &amp; Financial Support
                  </h3>
                  <Badge variant="amber" size="sm">
                    High Priority
                  </Badge>
                </div>

                {student.scholarshipInfo ? (
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-foreground font-mono">
                          {student.scholarshipInfo.schemeName}
                        </div>
                        <div className="text-[11px] text-amber-300 font-mono mt-0.5">
                          Match Score: <strong>{student.scholarshipInfo.matchPercentage}%</strong> • Deadline: <strong>{student.scholarshipInfo.deadline}</strong>
                        </div>
                      </div>

                      <Badge variant="amber" size="sm">
                        {student.scholarshipInfo.status}
                      </Badge>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-white/10 text-slate-200">
                      <strong>Teacher Action Required:</strong> {student.scholarshipInfo.actionRequired}
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <Button
                        variant="glow"
                        size="sm"
                        onClick={() => {
                          setModalType("contact_parent");
                          setModalOpen(true);
                        }}
                        className="text-xs font-mono"
                        leftIcon={<Phone className="h-3.5 w-3.5" />}
                      >
                        Remind Parent About Documents
                      </Button>

                      <Link href="/scholarships">
                        <Button variant="outline" size="sm" className="text-xs font-mono border-white/10">
                          View Full Scholarship Portal
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-muted-foreground font-mono">
                    No urgent scholarship deadlines flagged for this student profile.
                  </div>
                )}
              </GlassCard>
            )}

            {/* TAB 5: INTERVENTION HISTORY TIMELINE */}
            {activeTab === "interventions" && (
              <GlassCard className="p-6 border-white/10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                      <History className="h-4 w-4 text-emerald-400" />
                      Intervention History &amp; Chronological Support Log
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Teacher and counsellor interaction timeline for {student.name}
                    </p>
                  </div>

                  <Button
                    variant="glow"
                    size="sm"
                    onClick={() => {
                      setModalType("teacher_followup");
                      setModalOpen(true);
                    }}
                    className="text-xs font-mono"
                    leftIcon={<Plus className="h-3.5 w-3.5" />}
                  >
                    Log New Action
                  </Button>
                </div>

                {/* Practical Vertical Timeline */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {student.interventionHistory.map((item, idx) => (
                    <div key={item.id} className="relative space-y-1.5">
                      {/* Timeline dot */}
                      <span
                        className={`absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 ${
                          idx === 0 ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-cyan-400"
                        }`}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-mono font-bold text-emerald-300 text-sm">
                          {item.date}
                        </span>
                        <Badge variant="glass" size="sm">
                          {item.performedBy}
                        </Badge>
                      </div>

                      <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950/70 space-y-1">
                        <div className="font-bold text-foreground text-xs font-mono flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">{item.title}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-mono">
                            • {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {item.notes}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </SlideUp>
      </Container>

      {/* Intervention Modal */}
      <InterventionModal
        isOpen={modalOpen}
        student={student}
        initialType={modalType}
        onClose={() => setModalOpen(false)}
        onSaveIntervention={handleSaveIntervention}
      />
    </div>
  );
}

