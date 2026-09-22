"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Bot,
  Zap,
  Users,
  FileText,
  Compass,
  Brain,
  ShieldCheck,
  Building2,
  GraduationCap,
  ArrowRight,
  Layers,
  Award,
  Sliders,
  CheckCircle2,
  LayoutDashboard,
  Target,
  BookOpen,
  TrendingUp,
  Clock,
  Play,
  Calendar,
  AlertTriangle,
  Bell,
  History,
  UserCheck,
  BarChart3,
} from "lucide-react";
import { Container } from "./container";
import { SkilloraLogo, SkilloraIcon } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationBell } from "@/components/marketplace/notification-bell";
import { useAuth } from "@/lib/auth/auth-context";
import { UserRole } from "@/lib/auth/types";
import { stopAllCameraStreams } from "@/lib/camera/camera-stream-manager";
import { RiUserFillIcon } from "@/components/ui/icons/ri-user-fill";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const { user, isAuthenticated, logout, login } = useAuth();
  const pathname = usePathname();

  // Guarantee that leaving camera sections (assessment / mock interview) immediately shuts down all camera hardware
  React.useEffect(() => {
    if (pathname !== "/assessment" && !pathname.startsWith("/mock-interview")) {
      stopAllCameraStreams();
    }
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Determine Active Role
  const effectiveRole: UserRole = user?.role || "student";

  // Role Navigation Flags
  const isTeacher = effectiveRole === "teacher" || effectiveRole === "academician";
  const isParent = effectiveRole === "parent";
  const isInstitution = effectiveRole === "institution" || effectiveRole === "admin";
  const isStudent = !isTeacher && !isParent && !isInstitution;

  // 1-Click Role Switch Demo Helper
  const handleRoleQuickSwitch = async (targetRole: UserRole) => {
    setOpenDropdown(null);
    const demoAccounts: Record<string, string> = {
      student: "student@titan.ai",
      teacher: "teacher@skillora.edu",
      parent: "parent@skillora.edu",
      institution: "institution@titan.ai",
      admin: "admin@titan.ai",
    };
    const email = demoAccounts[targetRole];
    if (email) {
      await login({ email, password: "password123" });
    }
  };

  // Secondary Tools Items (Preserves all existing platform features)
  const secondaryTools = [
    {
      title: "AI Mock Technical Interview",
      desc: "Oral interview simulation with real-time feedback & scoring",
      href: "/mock-interview",
      icon: Sparkles,
      badge: "Voice AI",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
    {
      title: "AI Group Discussion Room",
      desc: "Simulate collaborative roundtables with 5 AI peer personas",
      href: "/group-discussion",
      icon: Users,
      badge: "Multi-Agent",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      title: "Resume & ATS Studio",
      desc: "Automated keyword extraction and reality check against demonstrated skills",
      href: "/resume-analyzer",
      icon: FileText,
      badge: "ATS 0-100",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      title: "Practice Arena",
      desc: "Oral defense drills, GD simulations & interactive coding challenges",
      href: "/practice",
      icon: Play,
      badge: "Practice",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    },
    {
      title: "AI Study Planner",
      desc: "Autonomous daily & weekly schedule tailored to your goals",
      href: "/learning/planner",
      icon: Calendar,
      badge: "Autonomous",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      title: "My Skill DNA",
      desc: "Diagnostic competency radar & multi-vector skill breakdown",
      href: "/skills",
      icon: Brain,
      badge: "Skill DNA",
      color: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    },
    {
      title: "Verified Digital Credentials",
      desc: "Institutional certificates & 3D verifiable portfolio",
      href: "/certificate",
      icon: Award,
      badge: "Verified",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    },
    {
      title: "Verified Portfolio",
      desc: "Shareable 3D credential ledger and verified skill proof",
      href: "/portfolio",
      icon: ShieldCheck,
      badge: "Portfolio",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-slate-950/60 backdrop-blur-md border-b border-white/[0.05]"
      }`}
    >
      <Container size="xl">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <SkilloraLogo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation - Dynamically Customized by Active Role */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {/* ---------------- 1. STUDENT PERSPECTIVE NAVIGATION ---------------- */}
            {isStudent && (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname === "/dashboard"
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  HOME
                </Link>

                <Link
                  href="/learning"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname === "/learning" || pathname?.startsWith("/learning/intervention")
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                  <span>LEARN</span>
                </Link>

                <Link
                  href="/assessment"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname?.startsWith("/assessment")
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Brain className="h-3.5 w-3.5 text-cyan-400" />
                  <span>ASSESS</span>
                </Link>

                <Link
                  href="/scholarships"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname?.startsWith("/scholarships")
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  <span>SCHOLARSHIPS</span>
                </Link>

                <Link
                  href="/opportunities"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]`}
                >
                  <Compass className="h-3.5 w-3.5 text-emerald-400" />
                  <span>CAREER &amp; OPPS</span>
                </Link>

                <Link
                  href="/learning/roadmap"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname?.startsWith("/learning/roadmap")
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 text-cyan-400" />
                  <span>MY ROADMAP</span>
                </Link>

                <Link
                  href="/dashboard#alerts"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Bell className="h-3.5 w-3.5 text-amber-400" />
                  <span>ALERTS</span>
                </Link>

                <Link
                  href="/profile"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname?.startsWith("/profile")
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <RiUserFillIcon className="h-3.5 w-3.5 text-cyan-400" />
                  <span>PROFILE</span>
                </Link>
              </>
            )}

            {/* ---------------- 2. TEACHER PERSPECTIVE NAVIGATION ---------------- */}
            {isTeacher && (
              <>
                <Link
                  href="/dashboard/teacher"
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname === "/dashboard/teacher"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  DASHBOARD
                </Link>

                <Link
                  href="/dashboard/teacher?tab=students"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Users className="h-3.5 w-3.5 text-cyan-400" />
                  <span>STUDENTS</span>
                </Link>

                <Link
                  href="/teacher/attendance"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname?.startsWith("/teacher/attendance")
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  <span>ATTENDANCE</span>
                </Link>

                <Link
                  href="/dashboard/teacher?tab=at-risk"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-rose-300 hover:text-white hover:bg-rose-500/10 border border-rose-500/30"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                  <span>AT-RISK STUDENTS</span>
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                </Link>

                <Link
                  href="/dashboard/teacher?tab=insights"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Brain className="h-3.5 w-3.5 text-purple-400" />
                  <span>ACADEMIC INSIGHTS</span>
                </Link>

                <Link
                  href="/dashboard/teacher?tab=alerts"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Bell className="h-3.5 w-3.5 text-amber-400" />
                  <span>ALERTS</span>
                </Link>

                <Link
                  href="/dashboard/teacher?tab=interventions"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <History className="h-3.5 w-3.5 text-cyan-400" />
                  <span>INTERVENTIONS</span>
                </Link>
              </>
            )}

            {/* ---------------- 3. PARENT PERSPECTIVE NAVIGATION ---------------- */}
            {isParent && (
              <>
                <Link
                  href="/dashboard/parent"
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname === "/dashboard/parent"
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  HOME
                </Link>

                <Link
                  href="/dashboard/parent?tab=child"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
                  <span>CHILD OVERVIEW</span>
                </Link>

                <Link
                  href="/dashboard/parent?tab=attendance"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-amber-300 hover:text-white hover:bg-amber-500/10 border border-amber-500/30"
                >
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>ATTENDANCE</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">74.2%</span>
                </Link>

                <Link
                  href="/dashboard/parent?tab=academics"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  <span>ACADEMIC PROGRESS</span>
                </Link>

                <Link
                  href="/dashboard/parent?tab=alerts"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Bell className="h-3.5 w-3.5 text-rose-400" />
                  <span>ALERTS</span>
                </Link>

                <Link
                  href="/dashboard/parent?tab=updates"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                  <span>SCHOOL UPDATES</span>
                </Link>
              </>
            )}

            {/* ---------------- 4. INSTITUTION / ADMIN NAVIGATION ---------------- */}
            {isInstitution && (
              <>
                <Link
                  href="/dashboard/institution"
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                    pathname === "/dashboard/institution"
                      ? "bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-glow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  DASHBOARD
                </Link>

                <Link
                  href="/dashboard/institution?tab=students"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Users className="h-3.5 w-3.5 text-cyan-400" />
                  <span>STUDENTS</span>
                </Link>

                <Link
                  href="/dashboard/institution?tab=attendance"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  <span>ATTENDANCE ANALYTICS</span>
                </Link>

                <Link
                  href="/dashboard/institution?tab=scholarships"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  <span>SCHOLARSHIP AWARENESS</span>
                </Link>

                <Link
                  href="/dashboard/institution?tab=dropout"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-rose-300 hover:text-white hover:bg-rose-500/10 border border-rose-500/30"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                  <span>DROPOUT ANALYTICS</span>
                </Link>

                <Link
                  href="/dashboard/institution?tab=engagement"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Zap className="h-3.5 w-3.5 text-cyan-400" />
                  <span>LEARNING ENGAGEMENT</span>
                </Link>

                <Link
                  href="/dashboard/institution?tab=opportunities"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-slate-300 hover:text-white hover:bg-white/[0.06]"
                >
                  <Compass className="h-3.5 w-3.5 text-emerald-400" />
                  <span>OPPORTUNITIES</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap text-rose-300 hover:text-white hover:bg-rose-500/15 border border-rose-500/30"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-rose-400" />
                  <span>ADMIN</span>
                </Link>
              </>
            )}

            {/* ---------------- MORE TOOLS DROPDOWN (PRESERVES ALL PLATFORM CAPABILITIES) ---------------- */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "tools" ? null : "tools")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold tracking-wide transition-all whitespace-nowrap ${
                  openDropdown === "tools"
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/40 shadow-glow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span>MORE TOOLS</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openDropdown === "tools" ? "rotate-180 text-violet-400" : "text-muted-foreground"
                  }`}
                />
              </button>

              {openDropdown === "tools" && (
                <div className="absolute top-full right-0 mt-2 w-[460px] p-3 rounded-2xl bg-[#090d16] border border-violet-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-violet-400 border-b border-white/[0.08] pb-1.5">
                    Extended Learning &amp; AI Studio
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {secondaryTools.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="p-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1b253b] border border-white/[0.08] hover:border-violet-500/40 transition-all flex items-start gap-3 group"
                        >
                          <div
                            className={`p-2 rounded-lg border ${item.color} shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-foreground font-mono group-hover:text-violet-300 transition-colors">
                                {item.title}
                              </span>
                              <Badge variant="glass" size="sm" className="font-mono text-[9px]">
                                {item.badge}
                              </Badge>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Quick Role Switcher (For rapid testing & demo review) */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "role_switcher" ? null : "role_switcher")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 transition-all"
                title="Switch role view for demonstration"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="uppercase text-[11px]">{effectiveRole}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "role_switcher" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "role_switcher" && (
                <div className="absolute top-full right-0 mt-2 w-64 p-2 rounded-2xl bg-[#0a0f1d] border border-cyan-500/40 shadow-2xl space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-b border-white/10">
                    Switch Demo Persona
                  </div>
                  <button
                    onClick={() => handleRoleQuickSwitch("student")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between hover:bg-cyan-500/10 ${effectiveRole === "student" ? "bg-cyan-500/20 text-cyan-300 font-bold" : "text-slate-300"}`}
                  >
                    <span>🎓 Student (Amit / Pooja)</span>
                    {effectiveRole === "student" && <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => handleRoleQuickSwitch("teacher")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between hover:bg-emerald-500/10 ${effectiveRole === "teacher" ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-slate-300"}`}
                  >
                    <span>👩‍🏫 Teacher (Mrs. Sunita)</span>
                    {effectiveRole === "teacher" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => handleRoleQuickSwitch("parent")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between hover:bg-amber-500/10 ${effectiveRole === "parent" ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-300"}`}
                  >
                    <span>👨‍👧 Parent (Rajesh Verma)</span>
                    {effectiveRole === "parent" && <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => handleRoleQuickSwitch("institution")}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between hover:bg-purple-500/10 ${effectiveRole === "institution" ? "bg-purple-500/20 text-purple-300 font-bold" : "text-slate-300"}`}
                  >
                    <span>🏛️ Institution / Admin</span>
                    {effectiveRole === "institution" && <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />}
                  </button>
                </div>
              )}
            </div>

            <NotificationBell />

            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="gap-1.5 border-white/10 hover:border-cyan-500/40 px-2.5 sm:px-3">
                    <RiUserFillIcon className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="hidden sm:inline font-mono text-xs">{user?.fullName || "Profile"}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 h-8 w-8 sm:h-9 sm:w-9"
                  title="Log Out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-mono text-xs text-slate-300 hover:text-white">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="cyber" size="sm" className="font-mono text-xs gap-1.5">
                    Start Learning <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="xl:hidden py-4 border-t border-white/[0.08] space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
            {!isAuthenticated && (
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/[0.06]">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono font-bold text-center text-slate-200"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono font-bold text-center text-cyan-300"
                >
                  Register →
                </Link>
              </div>
            )}

            {/* Role Header in Mobile */}
            <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono">
              <span className="text-muted-foreground">Active Role:</span>
              <span className="font-bold text-cyan-300 uppercase">{effectiveRole}</span>
            </div>

            {/* Mobile Nav Links depending on Role */}
            {isStudent && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4 text-cyan-400" />
                  <span>HOME</span>
                </Link>
                <Link
                  href="/learning"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  <span>LEARN</span>
                </Link>
                <Link
                  href="/assessment"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <Brain className="h-4 w-4 text-cyan-400" />
                  <span>ASSESS</span>
                </Link>
                <Link
                  href="/scholarships"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>SCHOLARSHIPS</span>
                </Link>
                <Link
                  href="/learning/roadmap"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>MY ROADMAP</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <RiUserFillIcon className="h-4 w-4 text-cyan-400" />
                  <span>PROFILE</span>
                </Link>
              </div>
            )}

            {isTeacher && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard/teacher"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4 text-emerald-400" />
                  <span>DASHBOARD</span>
                </Link>
                <Link
                  href="/dashboard/teacher?tab=students"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <Users className="h-4 w-4 text-cyan-400" />
                  <span>STUDENTS</span>
                </Link>
                <Link
                  href="/dashboard/teacher?tab=at-risk"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono font-bold text-rose-300 flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                  <span>AT-RISK</span>
                </Link>
                <Link
                  href="/teacher/attendance"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <span>ATTENDANCE</span>
                </Link>
              </div>
            )}

            {isParent && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard/parent"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4 text-amber-400" />
                  <span>HOME</span>
                </Link>
                <Link
                  href="/dashboard/parent?tab=child"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <UserCheck className="h-4 w-4 text-cyan-400" />
                  <span>CHILD STATUS</span>
                </Link>
                <Link
                  href="/dashboard/parent?tab=attendance"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-300 flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>ATTENDANCE</span>
                </Link>
                <Link
                  href="/dashboard/parent?tab=academics"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>ACADEMICS</span>
                </Link>
              </div>
            )}

            {isInstitution && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard/institution"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4 text-purple-400" />
                  <span>DASHBOARD</span>
                </Link>
                <Link
                  href="/dashboard/institution?tab=dropout"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono font-bold text-rose-300 flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                  <span>DROPOUT</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4 text-rose-400" />
                  <span>ADMIN</span>
                </Link>
              </div>
            )}

            {/* Secondary Tools in Mobile Drawer */}
            <div className="pt-2 border-t border-white/[0.08] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 px-1">
                More Tools &amp; Labs
              </span>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {secondaryTools.slice(0, 4).map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg bg-slate-900/40 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
                  >
                    <tool.icon className="h-3.5 w-3.5 text-violet-400" />
                    <span className="truncate">{tool.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
