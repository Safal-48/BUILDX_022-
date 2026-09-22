"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  BookOpen,
  Calendar,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Brain,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Send,
  Phone,
  MessageSquare,
  Sparkles,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  UserCheck,
  UserX,
  Award,
  FileText,
  History,
  Eye,
  Plus,
  FileWarning,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlowBorder } from "@/components/ui/glow-border";
import { useAuth } from "@/lib/auth/auth-context";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import { INITIAL_STUDENTS_ROSTER } from "@/lib/attendance/mock-data";
import {
  StudentAttendanceRecord,
  InterventionType,
} from "@/lib/attendance/types";
import { InterventionModal } from "@/components/attendance/intervention-modal";

type TeacherTab = "dashboard" | "students" | "at-risk" | "interventions";

function TeacherDashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = (searchParams.get("tab") as TeacherTab) || "dashboard";
  const [activeTab, setActiveTab] = useState<TeacherTab>(currentTab);
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(INITIAL_STUDENTS_ROSTER);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentRiskFilter, setStudentRiskFilter] = useState<"all" | "high_risk" | "declining" | "regular">("all");

  // Modal State
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentAttendanceRecord | null>(null);
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState<InterventionType>("contact_parent");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync tab with URL
  React.useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as TeacherTab;
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tab: TeacherTab) => {
    setActiveTab(tab);
    router.push(`/dashboard/teacher?tab=${tab}`);
  };

  // Open Contact Parent Modal
  const handleOpenContactParent = (student: StudentAttendanceRecord) => {
    setSelectedStudentForModal(student);
    setModalInitialType("contact_parent");
    setInterventionModalOpen(true);
  };

  // Open Add Intervention Modal
  const handleOpenAddIntervention = (student: StudentAttendanceRecord) => {
    setSelectedStudentForModal(student);
    setModalInitialType("teacher_followup");
    setInterventionModalOpen(true);
  };

  // Save Intervention Callback
  const handleSaveIntervention = (studentId: string, type: InterventionType, notes: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return {
          ...s,
          interventionHistory: [
            {
              id: `int-${Date.now()}`,
              studentId: s.id,
              type,
              title:
                type === "contact_parent"
                  ? "Teacher contacted parent"
                  : type === "schedule_counselling"
                  ? "Counselling recommended"
                  : type === "teacher_followup"
                  ? "Teacher follow-up logged"
                  : "Watchlist status updated",
              notes,
              date: "Today",
              performedBy: user?.fullName || "Dr. Rajesh Sharma",
              status: "Completed",
            },
            ...s.interventionHistory,
          ],
        };
      })
    );
    setToastMessage(`Intervention logged for student successfully!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Flagged students requiring attention
  const atRiskStudents = useMemo(() => {
    return students.filter(
      (s) => s.earlyWarning.riskLevel === "high_risk" || s.earlyWarning.riskLevel === "declining"
    );
  }, [students]);

  // Filtered student roster
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (studentRiskFilter === "high_risk") return s.earlyWarning.riskLevel === "high_risk";
      if (studentRiskFilter === "declining") return s.earlyWarning.riskLevel === "declining";
      if (studentRiskFilter === "regular") return s.earlyWarning.riskLevel === "regular";
      return true;
    });
  }, [students, searchQuery, studentRiskFilter]);

  // Greeting based on current time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
      <Container>
        <SlideUp>
          <div className="space-y-6">
            {/* Header / Teacher Command Center Greeting */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="cyber" size="sm">
                    TEACHER SUPPORT PORTAL
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    Class 12-A • Science Stream
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-mono">
                  {greeting}, {user?.fullName || "Dr. Rajesh Sharma"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Proactive student support dashboard: triage attendance declines, academic gaps, and immediate interventions.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Link href="/teacher/attendance">
                  <Button
                    variant="cyber"
                    size="sm"
                    className="font-mono text-xs gap-1.5"
                    leftIcon={<Calendar className="h-3.5 w-3.5" />}
                  >
                    Smart Attendance &amp; Bulk Register
                  </Button>
                </Link>

                <Link href="/scholarships">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs gap-1.5 border-white/15"
                    leftIcon={<Award className="h-3.5 w-3.5 text-amber-400" />}
                  >
                    Scholarship Tracker
                  </Button>
                </Link>
              </div>
            </div>

            {/* Toast Feedback */}
            {toastMessage && (
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 flex items-center justify-between text-xs text-emerald-300 font-mono animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{toastMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setToastMessage(null)}
                  className="text-emerald-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TOP OVERVIEW: 180 Students • 🟢 Regular — 142 • 🟡 Attendance Declining — 24 • 🔴 High Risk — 14 */}
            {/* ========================================================================= */}
            <GlassCard className="p-5 border-white/10 relative overflow-hidden" glow>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                    Class Cohort Health Status
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-black text-foreground font-mono">
                      180
                    </span>
                    <span className="text-base font-bold text-slate-300 font-mono">
                      Total Enrolled Students
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Answering your core morning priority: <strong className="text-cyan-300">&quot;Which students need my attention today?&quot;</strong>
                  </p>
                </div>

                {/* 3 Status Buckets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
                  {/* Regular */}
                  <div className="px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-950/15 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-bold text-emerald-400">
                        🟢 Regular
                      </div>
                      <div className="text-xl font-extrabold text-foreground font-mono">
                        142 <span className="text-xs text-muted-foreground font-sans font-normal">students</span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Declining */}
                  <div className="px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-950/15 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-bold text-amber-400">
                        🟡 Declining
                      </div>
                      <div className="text-xl font-extrabold text-foreground font-mono">
                        24 <span className="text-xs text-muted-foreground font-sans font-normal">students</span>
                      </div>
                    </div>
                  </div>

                  {/* High Risk */}
                  <div className="px-4 py-3 rounded-xl border border-rose-500/30 bg-rose-950/20 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_8px_#ef4444] animate-pulse shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-bold text-rose-400">
                        🔴 High Risk
                      </div>
                      <div className="text-xl font-extrabold text-rose-300 font-mono">
                        14 <span className="text-xs text-rose-400/70 font-sans font-normal">need action</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleTabChange("dashboard")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  activeTab === "dashboard"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard Overview
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("at-risk")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "at-risk"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-glow-sm"
                    : "text-rose-400 hover:text-white"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                <span>Students Requiring Attention ({atRiskStudents.length})</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("students")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  activeTab === "students"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Students Roster
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("interventions")}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "interventions"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <History className="h-3.5 w-3.5 text-emerald-400" />
                <span>Intervention History</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* VIEW 1: DASHBOARD OVERVIEW (SHOWS ALL 6 CORE SECTIONS) */}
            {/* ========================================================================= */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* ------------------------------------------------------------- */}
                {/* SECTION 3 PROMINENT: STUDENTS REQUIRING ATTENTION (CORE FOCUS) */}
                {/* ------------------------------------------------------------- */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" dot dotColor="rose">
                          STUDENTS REQUIRING ATTENTION TODAY
                        </Badge>
                        <span className="text-xs font-mono text-rose-300 font-bold">
                          Immediate Action Recommended
                        </span>
                      </div>
                      <h2 className="text-lg font-black text-foreground font-mono mt-1">
                        High Risk &amp; Declining Attendance Radar
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTabChange("at-risk")}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      View all {atRiskStudents.length} flagged students <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* AT-RISK STUDENT CARDS GRID */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {atRiskStudents.slice(0, 4).map((student) => {
                      const isCritical = student.earlyWarning.riskLevel === "high_risk";

                      return (
                        <GlassCard
                          key={student.id}
                          className={`p-5 border transition-all duration-300 space-y-4 ${
                            isCritical
                              ? "border-rose-500/40 bg-rose-950/15 hover:border-rose-500/60"
                              : "border-amber-500/30 bg-amber-950/15 hover:border-amber-500/50"
                          }`}
                        >
                          {/* Student Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                <Image
                                  src={student.avatar}
                                  alt={student.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                  unoptimized
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-base font-bold text-foreground font-mono">
                                    {student.name}
                                  </h3>
                                  <span className="text-xs font-mono text-muted-foreground">
                                    ({student.rollNumber})
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground font-mono">
                                  {student.className} • Parent: {student.parentInfo.name}
                                </div>
                              </div>
                            </div>

                            <Badge variant={isCritical ? "destructive" : "amber"} size="sm">
                              {isCritical ? "High Risk" : "Declining"}
                            </Badge>
                          </div>

                          {/* Attendance & Trend Indicator */}
                          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border border-white/10 bg-slate-950/80">
                            <div>
                              <div className="text-[10px] font-mono text-muted-foreground uppercase">
                                Attendance
                              </div>
                              <div className={`text-xl font-black font-mono ${student.overallAttendance < 75 ? "text-rose-400" : "text-amber-400"}`}>
                                {student.overallAttendance}%
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] font-mono text-muted-foreground uppercase">
                                Trend
                              </div>
                              <div className="text-sm font-black font-mono text-rose-400 flex items-center gap-1">
                                <TrendingDown className="h-3.5 w-3.5" />
                                <span>↓ Declining</span>
                              </div>
                            </div>
                          </div>

                          {/* Risk Indicators (Bullet List) */}
                          <div className="space-y-1.5">
                            <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                              <FileWarning className="h-3.5 w-3.5 text-rose-400" />
                              Risk Indicators:
                            </div>
                            <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                              {student.earlyWarning.reasons.slice(0, 2).map((reason, idx) => (
                                <li key={idx}>
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 3 ACTIONS: [View Student] [Contact Parent] [Add Intervention] */}
                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                            <Link href={`/teacher/students/${student.id}`} className="w-full">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs font-mono border-white/15 hover:border-cyan-500/40 text-slate-200"
                                leftIcon={<Eye className="h-3 w-3 text-cyan-400" />}
                              >
                                View Student
                              </Button>
                            </Link>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenContactParent(student)}
                              className="w-full text-xs font-mono border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                              leftIcon={<Phone className="h-3 w-3" />}
                            >
                              Contact Parent
                            </Button>

                            <Button
                              variant="glow"
                              size="sm"
                              onClick={() => handleOpenAddIntervention(student)}
                              className="w-full text-xs font-mono"
                              leftIcon={<Plus className="h-3 w-3" />}
                            >
                              Intervention
                            </Button>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 2-COLUMN LAYOUT FOR SECTIONS 1, 2, 4, 5, 6 */}
                {/* ------------------------------------------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* SECTION 1: ATTENDANCE OVERVIEW */}
                  <GlassCard className="p-6 border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-emerald-400" />
                        1. Attendance Overview
                      </h3>
                      <Link href="/teacher/attendance">
                        <span className="text-xs font-mono text-cyan-400 hover:underline">
                          Open Register →
                        </span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-white/10 bg-slate-950/60 space-y-1">
                        <div className="text-xs text-muted-foreground font-mono uppercase">
                          Class Cumulative
                        </div>
                        <div className="text-3xl font-black text-emerald-400 font-mono">
                          89.4%
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          State examination baseline: 75%
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-950/10 space-y-1">
                        <div className="text-xs text-rose-300 font-mono uppercase">
                          Below 75% Cutoff
                        </div>
                        <div className="text-3xl font-black text-rose-400 font-mono">
                          38 <span className="text-xs font-sans font-normal text-muted-foreground">students</span>
                        </div>
                        <p className="text-[11px] text-rose-300/80">
                          Requires parent notification
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Daily roll-call recorded via the Smart Attendance System is automatically synchronized with State Education records and SMS gateways.
                    </p>
                  </GlassCard>

                  {/* SECTION 2: ACADEMIC PERFORMANCE */}
                  <GlassCard className="p-6 border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-400" />
                        2. Academic Performance &amp; Mastery
                      </h3>
                      <Badge variant="glass" size="sm">Unit Test 2</Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                      <div className="p-2.5 rounded-xl border border-white/10 bg-slate-950/60">
                        <div className="text-[10px] text-muted-foreground">Mathematics</div>
                        <div className="text-lg font-bold text-cyan-300">64%</div>
                      </div>
                      <div className="p-2.5 rounded-xl border border-white/10 bg-slate-950/60">
                        <div className="text-[10px] text-muted-foreground">Physics</div>
                        <div className="text-lg font-bold text-cyan-300">68%</div>
                      </div>
                      <div className="p-2.5 rounded-xl border border-white/10 bg-slate-950/60">
                        <div className="text-[10px] text-muted-foreground">Chemistry</div>
                        <div className="text-lg font-bold text-cyan-300">72%</div>
                      </div>
                      <div className="p-2.5 rounded-xl border border-white/10 bg-slate-950/60">
                        <div className="text-[10px] text-muted-foreground">English</div>
                        <div className="text-lg font-bold text-emerald-300">81%</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-950/10 text-xs text-slate-300">
                      <strong className="text-rose-400">Class Learning Gap:</strong> 24 students struggling with <em>Quadratic Equations &amp; Word Problems</em>. Recommended 15-min Socratic drill.
                    </div>
                  </GlassCard>

                  {/* SECTION 4: SCHOLARSHIP AWARENESS */}
                  <GlassCard className="p-6 border-amber-500/20 bg-amber-950/[0.05] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-400" />
                        4. Scholarship Awareness &amp; Deadlines
                      </h3>
                      <Link href="/scholarships">
                        <span className="text-xs font-mono text-amber-400 hover:underline">
                          View Schemes →
                        </span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      <div className="p-2.5 rounded-xl border border-white/10 bg-slate-950/80">
                        <div className="text-[10px] text-muted-foreground">Eligible</div>
                        <div className="text-lg font-bold text-amber-300">18</div>
                      </div>
                      <div className="p-2.5 rounded-xl border border-white/10 bg-slate-950/80">
                        <div className="text-[10px] text-muted-foreground">Submitted</div>
                        <div className="text-lg font-bold text-emerald-400">12</div>
                      </div>
                      <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-950/20">
                        <div className="text-[10px] text-rose-300">Urgent Gaps</div>
                        <div className="text-lg font-bold text-rose-400">6</div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-200">MahaDBT Post-Matric:</span>
                        <span className="text-amber-400 font-mono font-bold">Closing in 8 days (Sep 30)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-200">NMMSS Central Merit:</span>
                        <span className="text-rose-400 font-mono font-bold">Closing in 4 days (Sep 26)</span>
                      </div>
                    </div>
                  </GlassCard>

                  {/* SECTION 5: LEARNING ENGAGEMENT */}
                  <GlassCard className="p-6 border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        5. Digital Learning Engagement
                      </h3>
                      <Badge variant="cyber" size="sm">Active Platform</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl border border-white/10 bg-slate-950/60">
                        <div className="text-muted-foreground text-[10px]">Active Weekly Learners</div>
                        <div className="text-xl font-bold text-foreground mt-1">164 / 180</div>
                        <div className="text-[10px] text-emerald-400 mt-0.5">91% participation</div>
                      </div>

                      <div className="p-3 rounded-xl border border-white/10 bg-slate-950/60">
                        <div className="text-muted-foreground text-[10px]">Homework Turn-in Rate</div>
                        <div className="text-xl font-bold text-foreground mt-1">78%</div>
                        <div className="text-[10px] text-cyan-400 mt-0.5">▲ +4% from last week</div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Students in rural clusters with low network connectivity use the offline practice mode for automatic background syncing.
                    </p>
                  </GlassCard>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* SECTION 6: RECENT ALERTS */}
                {/* ------------------------------------------------------------- */}
                <GlassCard className="p-6 border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      6. Recent System Alerts &amp; Critical Incident Feed
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">Real-Time</span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        title: "Amit Kumar — 5 Consecutive Absences",
                        desc: "Attendance dropped to 63%. Automated bilingual notification sent to parent Rajesh Kumar (+91 98231 44819).",
                        time: "Today, 08:45 AM",
                        severity: "high",
                      },
                      {
                        title: "Vikram Chauhan — Morning Tardiness Flagged",
                        desc: "Arrived 25 mins late for 1st period physics. 4th late entry recorded this month.",
                        time: "Today, 09:10 AM",
                        severity: "medium",
                      },
                      {
                        title: "Neha Gupta — Inactivity Alert (14 Days)",
                        desc: "No portal logins or homework submissions for 2 weeks. Seasonal farm migration suspected.",
                        time: "Yesterday, 04:15 PM",
                        severity: "high",
                      },
                      {
                        title: "MahaDBT Scholarship Deadline Approaching",
                        desc: "6 eligible students have not uploaded Tehsildar Income Certificates. Deadline in 8 days.",
                        time: "Sep 20, 11:30 AM",
                        severity: "info",
                      },
                    ].map((alert, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-white/5 bg-slate-950/70 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-foreground font-mono flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                alert.severity === "high"
                                  ? "bg-rose-500"
                                  : alert.severity === "medium"
                                  ? "bg-amber-500"
                                  : "bg-cyan-500"
                              }`}
                            />
                            {alert.title}
                          </div>
                          <p className="text-muted-foreground">{alert.desc}</p>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                          {alert.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW 2: AT-RISK STUDENTS RADAR FOCUS */}
            {/* ========================================================================= */}
            {activeTab === "at-risk" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-foreground font-mono">
                      Students Requiring Attention ({atRiskStudents.length} Flagged)
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Triage students with declining multi-week trends, consecutive absences, or pending interventions
                    </p>
                  </div>
                  <Badge variant="destructive" dot dotColor="rose">
                    Priority Queue
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {atRiskStudents.map((student) => (
                    <GlassCard
                      key={student.id}
                      className="p-5 border border-rose-500/30 bg-rose-950/10 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                            <Image
                              src={student.avatar}
                              alt={student.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <div className="font-bold text-foreground font-mono text-base">
                              {student.name}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {student.rollNumber} • {student.className}
                            </div>
                          </div>
                        </div>

                        <Badge
                          variant={student.earlyWarning.riskLevel === "high_risk" ? "destructive" : "amber"}
                          size="sm"
                        >
                          {student.earlyWarning.riskLevel === "high_risk" ? "High Risk" : "Declining"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border border-white/10 bg-slate-950/80">
                        <div>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase">
                            Attendance
                          </div>
                          <div className="text-xl font-black font-mono text-rose-400">
                            {student.overallAttendance}%
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase">
                            Trend
                          </div>
                          <div className="text-sm font-black font-mono text-rose-400 flex items-center gap-1">
                            <TrendingDown className="h-3.5 w-3.5" />
                            <span>↓ Declining</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-xs font-mono font-bold text-slate-300">
                          Risk Indicators:
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                          {student.earlyWarning.reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                        <Link href={`/teacher/students/${student.id}`} className="w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs font-mono border-white/15 hover:border-cyan-500/40 text-slate-200"
                            leftIcon={<Eye className="h-3 w-3 text-cyan-400" />}
                          >
                            View Student
                          </Button>
                        </Link>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenContactParent(student)}
                          className="w-full text-xs font-mono border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                          leftIcon={<Phone className="h-3 w-3" />}
                        >
                          Contact Parent
                        </Button>

                        <Button
                          variant="glow"
                          size="sm"
                          onClick={() => handleOpenAddIntervention(student)}
                          className="w-full text-xs font-mono"
                          leftIcon={<Plus className="h-3 w-3" />}
                        >
                          Intervention
                        </Button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW 3: ALL STUDENTS ROSTER */}
            {/* ========================================================================= */}
            {activeTab === "students" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by student name or roll number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-foreground focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setStudentRiskFilter("all")}
                      className={`px-3 py-1 rounded-lg ${studentRiskFilter === "all" ? "bg-white/10 text-white font-bold" : "text-muted-foreground"}`}
                    >
                      All ({students.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentRiskFilter("high_risk")}
                      className={`px-3 py-1 rounded-lg ${studentRiskFilter === "high_risk" ? "bg-rose-500/20 text-rose-300 font-bold" : "text-muted-foreground"}`}
                    >
                      High Risk
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentRiskFilter("declining")}
                      className={`px-3 py-1 rounded-lg ${studentRiskFilter === "declining" ? "bg-amber-500/20 text-amber-300 font-bold" : "text-muted-foreground"}`}
                    >
                      Declining
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentRiskFilter("regular")}
                      className={`px-3 py-1 rounded-lg ${studentRiskFilter === "regular" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-muted-foreground"}`}
                    >
                      Regular
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-950/80 text-muted-foreground font-mono uppercase text-[11px]">
                        <th className="py-3 px-4 font-bold">Student</th>
                        <th className="py-3 px-4 font-bold">Attendance %</th>
                        <th className="py-3 px-4 font-bold">Consecutive Absences</th>
                        <th className="py-3 px-4 font-bold">Status</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {filteredStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-foreground font-mono">{s.name}</div>
                            <div className="text-[11px] text-muted-foreground font-mono">{s.rollNumber} • {s.className}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-bold font-mono ${s.overallAttendance < 75 ? "text-rose-400" : "text-emerald-400"}`}>
                              {s.overallAttendance}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {s.consecutiveAbsences > 0 ? (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                                {s.consecutiveAbsences} days
                              </span>
                            ) : (
                              <span className="text-muted-foreground">0 days</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={s.earlyWarning.riskLevel === "high_risk" ? "destructive" : s.earlyWarning.riskLevel === "declining" ? "amber" : "emerald"}
                              size="sm"
                            >
                              {s.earlyWarning.riskLevel === "high_risk" ? "High Risk" : s.earlyWarning.riskLevel === "declining" ? "Declining" : "Regular"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <Link href={`/teacher/students/${s.id}`}>
                              <button
                                type="button"
                                className="px-2.5 py-1 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-[11px] font-mono"
                              >
                                View
                              </button>
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenContactParent(s)}
                              className="px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-[11px] font-mono"
                            >
                              Contact
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW 4: INTERVENTIONS TIMELINE */}
            {/* ========================================================================= */}
            {activeTab === "interventions" && (
              <GlassCard className="p-6 border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                    <History className="h-4 w-4 text-emerald-400" />
                    Classroom-Wide Support Log &amp; Interventions
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">Recent Actions</span>
                </div>

                <div className="space-y-3 pt-2">
                  {students.flatMap((s) => s.interventionHistory.map((h) => ({ ...h, studentName: s.name, rollNumber: s.rollNumber }))).map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-mono">
                          <span className="font-bold text-foreground">{item.studentName} ({item.rollNumber})</span>
                          <span>•</span>
                          <span className="text-cyan-400 font-bold">{item.title}</span>
                          <Badge variant="glass" size="sm">{item.date}</Badge>
                        </div>
                        <p className="text-muted-foreground">{item.notes}</p>
                      </div>
                      <Badge variant="emerald" size="sm">Completed</Badge>
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
        isOpen={interventionModalOpen}
        student={selectedStudentForModal}
        initialType={modalInitialType}
        onClose={() => setInterventionModalOpen(false)}
        onSaveIntervention={handleSaveIntervention}
      />
    </div>
  );
}

export default function TeacherDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-xs font-mono text-muted-foreground">
          Loading Teacher Student Support Dashboard...
        </div>
      }
    >
      <TeacherDashboardContent />
    </Suspense>
  );
}

