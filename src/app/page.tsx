"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Activity,
  Compass,
  Users,
  User,
  GraduationCap,
  Sparkles,
  Brain,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  AlertTriangle,
  HeartHandshake,
  HardDrive,
  Calendar,
  Check,
  Lock,
  School,
  FileText,
  Clock,
  Briefcase,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/card";
import { useLowData } from "@/lib/accessibility/low-data-context";
import { useAuth } from "@/lib/auth/auth-context";
import { UserRole } from "@/lib/auth/types";
import dynamic from "next/dynamic";

const ScrollHighlight = dynamic(
  () => import("@/components/animations/scroll-highlight"),
  {
    ssr: false,
    loading: () => (
      <div className="py-12 text-center text-slate-400 font-mono text-sm">
        Loading philosophy &amp; vision...
      </div>
    ),
  }
);

const SkilloraEcosystemVisualizer = dynamic(
  () => import("@/components/3d/skillora-ecosystem-visualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full rounded-3xl border border-emerald-500/20 bg-slate-950/70 flex items-center justify-center text-slate-400 font-mono text-sm">
        Loading ecosystem architecture...
      </div>
    ),
  }
);

export default function HomePage() {
  const { isLowData, toggleLowData, isOnline, estimatedDataSavedMb } = useLowData();
  const { login } = useAuth();
  const [selectedRoleTab, setSelectedRoleTab] = React.useState<"student" | "teacher" | "parent">("student");

  // 1-Click quick persona login for evaluators/judges
  const handleQuickLogin = async (role: UserRole) => {
    const demoAccounts: Record<string, string> = {
      student: "student@titan.ai",
      teacher: "teacher@skillora.edu",
      parent: "parent@skillora.edu",
    };
    const email = demoAccounts[role];
    if (email) {
      await login({ email, password: "password123" });
    }
  };

  return (
    <div className="relative pb-24 w-full max-w-full overflow-x-hidden">
      {/* ---------------- HERO SECTION (Matching Pic 2: Spacious, Centered, Aesthetic) ---------------- */}
      <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden min-h-[85vh] flex flex-col justify-center">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_65%)]" />
        </div>

        <Container size="xl">
          <div className="max-w-5xl mx-auto text-center space-y-5 sm:space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>National Education &amp; Community Support Initiative</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
              Empowering Every Student,
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Teacher &amp; Parent
              </span>
            </h1>

            {/* Exact Required 10-Second Problem Statement */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed font-sans px-2">
              One platform for learning, scholarships, attendance support and career opportunities — helping students stay on track and helping teachers and parents intervene early.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-md sm:max-w-none mx-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-sm sm:text-base font-bold shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_45px_rgba(6,182,212,0.65)] transition-all duration-300 hover:scale-105 rounded-2xl flex items-center justify-center gap-2"
                >
                  <span>Get Started / Register</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="glass"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-sm sm:text-base font-bold border-white/15 bg-slate-900/70 hover:bg-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 rounded-2xl flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4 text-cyan-400" />
                  <span>Sign In to Portal</span>
                </Button>
              </Link>
            </div>

            {/* ---------------- 4 ELEGANT HERO CARDS (EXACT MATCH WITH PIC 2!) ---------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-10 sm:pt-14 w-full max-w-6xl mx-auto text-left">
              {/* Card 1: Student Command */}
              <Link href="/dashboard" className="group">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/95 p-5 h-44 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/50 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      STUDENT COMMAND
                    </span>
                    <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Brain className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Adaptive Learning
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Diagnostic topic gap remediation
                    </div>
                  </div>

                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 w-fit">
                    <span>Topic Gaps • Practice</span>
                  </div>
                </div>
              </Link>

              {/* Card 2: Proactive Scholarships */}
              <Link href="/scholarships" className="group">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/95 p-5 h-44 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/50 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      FINANCIAL AID
                    </span>
                    <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Award className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      Proactive Grants
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      MahaDBT &amp; NSP scheme matching
                    </div>
                  </div>

                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 w-fit">
                    <span>MahaDBT • 0 Missed Deadlines</span>
                  </div>
                </div>
              </Link>

              {/* Card 3: Attendance & Dropout Risk */}
              <Link href="/teacher/attendance" className="group">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/95 p-5 h-44 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      TEACHER SUPPORT
                    </span>
                    <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Activity className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Dropout Prevention
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Multi-week attendance decline radar
                    </div>
                  </div>

                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 w-fit">
                    <span>Class 12-A • 4-Week Trend</span>
                  </div>
                </div>
              </Link>

              {/* Card 4: Parent Mode */}
              <Link href="/parent" className="group">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/95 p-5 h-44 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/50 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      FAMILY CARE
                    </span>
                    <div className="h-8 w-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <HeartHandshake className="h-4 w-4" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      5-Second Status
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Clear view for shared family phones
                    </div>
                  </div>

                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[11px] font-mono text-purple-300 w-fit">
                    <span>Shared Phones • Teacher Call</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- CORE PHILOSOPHY & VISION (Side-by-Side Architectural Showcase) ---------------- */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-y border-white/[0.08] bg-slate-950/70 backdrop-blur-md">
        {/* Subtle Ambient Cosmic Glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: The Intelligent Bridge Headline & Highlights */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>CORE PHILOSOPHY &amp; VISION</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-white leading-[1.15]">
                The Intelligent Bridge{" "}
                <span className="block mt-1">
                  Between <span className="text-cyan-400">Skills</span>,{" "}
                  <span className="text-emerald-400">Learning</span>
                </span>
                <span className="block mt-1">
                  and{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                    Opportunity
                  </span>
                </span>
              </h2>

              {/* Subtitle / Paragraph */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-sans max-w-xl">
                Skillora unifies students, academia, and industry in one AI-powered ecosystem to assess skills, close gaps, and connect the right talent with the right opportunities.
              </p>

              {/* 3 Vertical Feature Items */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 group">
                  <div className="h-10 w-10 shrink-0 rounded-full border border-cyan-400/60 bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
                    <Brain className="h-5 w-5" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-white transition-colors">
                    AI-powered skill assessment &amp; gap analysis
                  </span>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="h-10 w-10 shrink-0 rounded-full border border-teal-400/60 bg-teal-500/10 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)] group-hover:scale-110 transition-transform">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-white transition-colors">
                    Smart matching for internships, jobs &amp; projects
                  </span>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="h-10 w-10 shrink-0 rounded-full border border-emerald-400/60 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-white transition-colors">
                    End-to-end ecosystem for career growth
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Exact Skillora Ecosystem Architecture Topology Diagram */}
            <div className="lg:col-span-7">
              <SkilloraEcosystemVisualizer />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- THREE PURPOSE-BUILT ROLE PORTALS ---------------- */}
      <section className="py-16 border-t border-white/[0.06] relative bg-slate-950/40">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Role-Based Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Purpose-Built for Every Educational Stakeholder
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select your role to explore the tailored workflow designed for your daily routine.
            </p>

            {/* Role Tabs */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => setSelectedRoleTab("student")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedRoleTab === "student"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                👨‍🎓 Student Portal
              </button>
              <button
                type="button"
                onClick={() => setSelectedRoleTab("teacher")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedRoleTab === "teacher"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                👩‍🏫 Teacher Portal
              </button>
              <button
                type="button"
                onClick={() => setSelectedRoleTab("parent")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedRoleTab === "parent"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                👨‍👧 Parent Mode
              </button>
            </div>
          </div>

          {/* Role Tab Content: STUDENT */}
          {selectedRoleTab === "student" && (
            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-cyan-950/20 p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <Badge variant="cyber">Student Personal Command Center</Badge>
                  <h3 className="text-2xl font-bold text-white">Never Fall Behind in Class</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Skillora identifies your weakest topics (like Trigonometry at 38%) and generates a personalized 15-minute practice sprint. Reassess immediately to boost your grade and keep your attendance high.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span><strong>Next Best Action:</strong> Timely alerts before scholarship closing dates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span><strong>MahaDBT &amp; NSP:</strong> Auto-matched with required document checklists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span><strong>Regional Careers:</strong> ITI &amp; apprenticeships in Nagpur, MIHAN, Hingna</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex gap-3">
                    <Link href="/dashboard">
                      <Button variant="default" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs">
                        Open Student Dashboard →
                      </Button>
                    </Link>
                    <Link href="/learning/saved">
                      <Button variant="outline" className="border-white/10 text-xs text-slate-300">
                        Saved Notes (0 KB)
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950/80 border border-white/10 p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
                    <span>DEMO STUDENT PROFILE</span>
                    <span className="text-cyan-400">Class 12-A</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Attendance:</span>
                      <span className="text-emerald-400 font-bold">87% (Good)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Algebra:</span>
                      <span className="text-cyan-300">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Geometry:</span>
                      <span className="text-cyan-300">61%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Trigonometry:</span>
                      <span className="text-rose-400 font-bold">38% (Priority Gap)</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
                    ⚡ Next Best Action: Start 15-min Trigonometry Practice
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Role Tab Content: TEACHER */}
          {selectedRoleTab === "teacher" && (
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-emerald-950/20 p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <Badge variant="emerald">Teacher &amp; Mentor Support</Badge>
                  <h3 className="text-2xl font-bold text-white">Identify At-Risk Students Early</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Mark bulk attendance for Class 12-A (180 students) in seconds. Our early-warning radar tracks 4-week decline trends, alerting you before an unaddressed absence turns into a dropout.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span><strong>Trend Analytics:</strong> Detect multi-week drops (82% &rarr; 76% &rarr; 69% &rarr; 63%)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span><strong>Transparent Risk Score:</strong> Multi-factor scoring from 0 to 100</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span><strong>Parent Outreach:</strong> 1-tap WhatsApp/call logging and counseling history</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex gap-3">
                    <Link href="/dashboard/teacher">
                      <Button variant="default" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
                        Open Teacher Dashboard →
                      </Button>
                    </Link>
                    <Link href="/teacher/attendance">
                      <Button variant="outline" className="border-white/10 text-xs text-slate-300">
                        Take Class Attendance
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950/80 border border-white/10 p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
                    <span>CLASS 12-A OVERVIEW</span>
                    <span className="text-emerald-400">180 Students</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <div className="text-lg font-bold text-emerald-300">142</div>
                      <div className="text-[10px] text-slate-400">Regular</div>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <div className="text-lg font-bold text-amber-300">24</div>
                      <div className="text-[10px] text-slate-400">Declining</div>
                    </div>
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30">
                      <div className="text-lg font-bold text-rose-300">14</div>
                      <div className="text-[10px] text-slate-400">High Risk</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px]">
                    ⚠️ Amit Kumar: 3 consecutive absences • Risk Score: 88/100
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Role Tab Content: PARENT */}
          {selectedRoleTab === "parent" && (
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-amber-950/20 p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <Badge variant="amber">Parent Mode (Shared Phones)</Badge>
                  <h3 className="text-2xl font-bold text-white">Understand Your Child in 5 Seconds</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Designed for parents using basic or shared mobile phones. No complicated graphs — just large readable attendance numbers, urgent alerts, and direct contact with teachers.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                      <span><strong>High-Contrast Text:</strong> Effortless reading on any budget display</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                      <span><strong>Critical Alerts First:</strong> Instant warnings for 3 consecutive absences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                      <span><strong>1-Tap Connect:</strong> Direct phone/WhatsApp call to Mrs. Sunita Sharma</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex gap-3">
                    <Link href="/parent">
                      <Button variant="default" className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs">
                        Open Parent Mode →
                      </Button>
                    </Link>
                    <Link href="/parent?student=amit-kumar">
                      <Button variant="outline" className="border-white/10 text-xs text-slate-300">
                        View Amit&rsquo;s Status
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950/80 border border-white/10 p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
                    <span>CHILD: AMIT KUMAR</span>
                    <span className="text-amber-400">Class 12-A</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Attendance:</span>
                      <span className="text-rose-400 font-bold text-base">63% 🔴 (Needs Attention)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assignments Done:</span>
                      <span className="text-slate-200">4 / 6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Upcoming Exam:</span>
                      <span className="text-cyan-300">Mathematics — Friday</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-between">
                    <span>Teacher: Mrs. Sunita Sharma</span>
                    <span className="font-bold text-emerald-400">Call Now 📞</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ---------------- LOW DATA & OFFLINE HUB SPOTLIGHT ---------------- */}
      <section className="py-14 border-t border-white/[0.06] relative">
        <Container size="xl">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900/90 to-cyan-950/20 p-6 sm:p-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                  <Zap className="h-3.5 w-3.5 text-emerald-400" />
                  <span>BUILT FOR LIMITED 2G/3G DATA &amp; SHARED HARDWARE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Zero Data Drain: Offline Notes &amp; Lightweight Practice
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Turn on <strong>⚡ Low Data Mode</strong> anytime to stop heavy 3D animations and prioritize text.
                  Students can download study notes as pure <code>.txt</code> files directly to their phone storage or SD card and complete practice quizzes offline with 0 KB data consumption.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={toggleLowData}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    isLowData
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-glow-sm"
                      : "bg-slate-900 text-white border-white/20 hover:border-emerald-500/50"
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>{isLowData ? "⚡ Low Data Active" : "⚡ Turn ON Low Data"}</span>
                </button>

                <Link href="/learning/saved" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full text-xs font-mono border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 gap-2 py-5">
                    <HardDrive className="h-4 w-4" />
                    <span>Offline Hub (0 KB)</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- 1-CLICK QUICK EVALUATION SWITCHER ---------------- */}
      <section className="py-10 border-t border-white/[0.06] bg-slate-950/60">
        <Container size="xl">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Interactive Evaluation Switcher</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              Evaluate Any Persona with 1 Click
            </h3>

            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Switch immediately between student, teacher, and parent views to test each perspective live.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("student")}
                className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <span>👨‍🎓 Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("teacher")}
                className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <span>👩‍🏫 Teacher</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("parent")}
                className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <span>👨‍👧 Parent</span>
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
