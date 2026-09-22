"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  BookOpen,
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  Save,
  Download,
  Share2,
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_CLASSES, INITIAL_STUDENTS_ROSTER } from "@/lib/attendance/mock-data";
import {
  StudentAttendanceRecord,
  AttendanceStatus,
  RiskLevel,
  InterventionType,
} from "@/lib/attendance/types";
import { AttendanceKpiSummary } from "@/components/attendance/attendance-kpi-summary";
import { AttendanceRosterTable } from "@/components/attendance/attendance-roster-table";
import { EarlyWarningRadar } from "@/components/attendance/early-warning-radar";
import { AttendanceTrendChart } from "@/components/attendance/attendance-trend-chart";
import { InterventionModal } from "@/components/attendance/intervention-modal";
import { SlideUp } from "@/components/animations/motion-wrapper";

type FilterTab = "all" | "regular" | "declining" | "high_risk";
type ViewMode = "roster" | "early_warning" | "analytics";

export default function TeacherAttendancePage() {
  // Session Controls State
  const [selectedClassId, setSelectedClassId] = useState("cls-12a");
  const [selectedDate, setSelectedDate] = useState(() => {
    // Current date format YYYY-MM-DD
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  // Roster Records State
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(INITIAL_STUDENTS_ROSTER);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [activeView, setActiveView] = useState<ViewMode>("roster");

  // Modal State
  const [selectedStudentForIntervention, setSelectedStudentForIntervention] =
    useState<StudentAttendanceRecord | null>(null);
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);
  const [defaultInterventionType, setDefaultInterventionType] =
    useState<InterventionType>("contact_parent");

  // Save feedback state
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Selected Class Metadata
  const currentClass = useMemo(() => {
    return MOCK_CLASSES.find((c) => c.id === selectedClassId) || MOCK_CLASSES[0];
  }, [selectedClassId]);

  // Bulk Attendance Actions
  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, currentStatus: "present" })));
  };

  const handleMarkAllAbsent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, currentStatus: "absent" })));
  };

  const handleQuickFillPresent = () => {
    setStudents((prev) =>
      prev.map((s) => (s.currentStatus === "unmarked" ? { ...s, currentStatus: "present" } : s))
    );
  };

  const handleResetAttendance = () => {
    setStudents(INITIAL_STUDENTS_ROSTER);
  };

  // Individual Status Toggle
  const handleUpdateStatus = (studentId: string, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        // Adjust counts dynamically if needed
        const prevStatus = s.currentStatus;
        let newPresent = s.totalPresent;
        let newAbsent = s.totalAbsent;
        let newLate = s.totalLate;

        if (prevStatus === "present") newPresent--;
        if (prevStatus === "absent") newAbsent--;
        if (prevStatus === "late") newLate--;

        if (status === "present") newPresent++;
        if (status === "absent") newAbsent++;
        if (status === "late") newLate++;

        return {
          ...s,
          currentStatus: status,
          totalPresent: newPresent,
          totalAbsent: newAbsent,
          totalLate: newLate,
        };
      })
    );
  };

  // Open Intervention Dialog
  const handleOpenIntervention = (student: StudentAttendanceRecord, type?: InterventionType) => {
    setSelectedStudentForIntervention(student);
    if (type) setDefaultInterventionType(type);
    else {
      // Pick first recommended intervention
      setDefaultInterventionType(
        student.earlyWarning.recommendedInterventions[0]?.type || "contact_parent"
      );
    }
    setInterventionModalOpen(true);
  };

  // Save Intervention Callback
  const handleSaveIntervention = (
    studentId: string,
    type: InterventionType,
    notes: string
  ) => {
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
                  ? "Parent Contacted"
                  : type === "schedule_counselling"
                  ? "Counselling Scheduled"
                  : type === "teacher_followup"
                  ? "Teacher Follow-up Assigned"
                  : "Watchlist Activated",
              notes,
              date: new Date().toISOString().split("T")[0],
              performedBy: "Current Teacher",
              status: "Completed",
            },
            ...s.interventionHistory,
          ],
        };
      })
    );
  };

  // Save Session Handler
  const handleSaveSession = () => {
    const presentTotal = students.filter((s) => s.currentStatus === "present").length;
    setSaveSuccessMessage(
      `Attendance for ${currentClass.name} (${selectedSubject}) recorded successfully on ${selectedDate}. (${presentTotal} Present)`
    );
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4000);
  };

  // Filtered Students List
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // 1. Search filter
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Risk/Status Category filter
      if (filterTab === "regular") {
        return student.earlyWarning.riskLevel === "regular";
      }
      if (filterTab === "declining") {
        return student.earlyWarning.riskLevel === "declining";
      }
      if (filterTab === "high_risk") {
        return student.earlyWarning.riskLevel === "high_risk";
      }
      return true; // "all"
    });
  }, [students, searchQuery, filterTab]);

  // Dynamic KPI Counts
  const presentCount = students.filter((s) => s.currentStatus === "present").length;
  const absentCount = students.filter((s) => s.currentStatus === "absent").length;
  const lateCount = students.filter((s) => s.currentStatus === "late").length;
  const atRiskCount = students.filter(
    (s) => s.earlyWarning.riskLevel === "high_risk" || s.earlyWarning.riskLevel === "declining"
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
      <Container>
        <SlideUp>
          <div className="space-y-6">
            {/* Top Navigation & Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Link
                    href="/dashboard/teacher"
                    className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    <ArrowLeft className="h-3 w-3" /> Teacher Portal
                  </Link>
                  <span>/</span>
                  <span className="text-cyan-300 font-bold">Smart Attendance &amp; Early Warning</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight font-mono">
                  Smart Attendance &amp; Dropout Early Warning System
                </h1>
                <p className="text-xs text-muted-foreground">
                  Daily classroom register with multi-week trend detection, bulk marking, and transparent risk indicators.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const csvContent =
                      "data:text/csv;charset=utf-8," +
                      "Roll,Name,Status,AttendancePct,RiskLevel\n" +
                      students
                        .map(
                          (s) =>
                            `${s.rollNumber},"${s.name}",${s.currentStatus},${s.overallAttendance}%,${s.earlyWarning.riskLevel}`
                        )
                        .join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute(
                      "download",
                      `Attendance_${currentClass.name}_${selectedDate}.csv`
                    );
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="text-xs font-mono border-white/15"
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Export CSV
                </Button>

                <Button
                  variant="glow"
                  size="sm"
                  onClick={handleSaveSession}
                  className="text-xs font-mono"
                  leftIcon={<Save className="h-4 w-4" />}
                >
                  Save Attendance
                </Button>
              </div>
            </div>

            {/* Save Success Toast Banner */}
            {saveSuccessMessage && (
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 flex items-center justify-between text-xs text-emerald-300 font-mono animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{saveSuccessMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSaveSuccessMessage(null)}
                  className="text-emerald-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Teacher Selector Toolbar: Class, Date, Subject */}
            <GlassCard className="p-4 sm:p-5 border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Class Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-cyan-400" />
                    Select Class / Cohort
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-foreground font-mono font-bold focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    {MOCK_CLASSES.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} • {cls.totalEnrolled} Students ({cls.stream || cls.grade})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Date Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                    Attendance Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-foreground font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* 3. Subject Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                    Subject / Period
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-foreground font-mono focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    {currentClass.subjects.map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* Attendance KPI Summary & Bulk Action Bar */}
            <AttendanceKpiSummary
              classNameTitle={currentClass.name}
              totalEnrolled={currentClass.totalEnrolled}
              sampleRosterCount={students.length}
              presentCount={presentCount}
              absentCount={absentCount}
              lateCount={lateCount}
              atRiskCount={atRiskCount}
              onMarkAllPresent={handleMarkAllPresent}
              onMarkAllAbsent={handleMarkAllAbsent}
              onQuickFillPresent={handleQuickFillPresent}
              onResetAttendance={handleResetAttendance}
            />

            {/* Main Tabs Navigation (Roster vs Early Warning vs Analytics) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveView("roster")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeView === "roster"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Attendance Roster ({students.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("early_warning")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeView === "early_warning"
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-glow-sm"
                      : "text-rose-400 hover:text-white hover:bg-rose-500/10 border border-rose-500/20"
                  }`}
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                  <span>Early Warning Radar ({atRiskCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("analytics")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    activeView === "analytics"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-glow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <TrendingDown className="h-3.5 w-3.5 text-purple-400" />
                  <span>Trend Telemetry</span>
                </button>
              </div>

              {/* Quick Filter Tabs (All, Regular, Declining, High Risk) */}
              <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setFilterTab("all")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterTab === "all"
                      ? "bg-white/10 text-white font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All ({students.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab("regular")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterTab === "regular"
                      ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Regular
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab("declining")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterTab === "declining"
                      ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Declining
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab("high_risk")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filterTab === "high_risk"
                      ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  High Risk
                </button>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search student by name, roll number (e.g. Amit Kumar, 12A-18)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* VIEW 1: ATTENDANCE ROSTER TABLE */}
            {activeView === "roster" && (
              <div className="space-y-6">
                <AttendanceRosterTable
                  students={filteredStudents}
                  onUpdateStatus={handleUpdateStatus}
                  onOpenIntervention={handleOpenIntervention}
                />
              </div>
            )}

            {/* VIEW 2: EARLY WARNING RADAR */}
            {activeView === "early_warning" && (
              <div className="space-y-6">
                <EarlyWarningRadar
                  students={filteredStudents}
                  onTriggerIntervention={handleOpenIntervention}
                />
              </div>
            )}

            {/* VIEW 3: TREND TELEMETRY ANALYTICS */}
            {activeView === "analytics" && (
              <div className="space-y-6">
                <AttendanceTrendChart students={students} />
              </div>
            )}
          </div>
        </SlideUp>
      </Container>

      {/* Intervention Modal */}
      <InterventionModal
        isOpen={interventionModalOpen}
        student={selectedStudentForIntervention}
        initialType={defaultInterventionType}
        onClose={() => setInterventionModalOpen(false)}
        onSaveIntervention={handleSaveIntervention}
      />
    </div>
  );
}
