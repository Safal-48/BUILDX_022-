"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Building2,
  Brain,
  Sparkles,
  Compass,
  Clock,
  ShieldCheck,
  Bot,
  Users,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Target,
  FlaskConical,
  Calendar,
  AlertTriangle,
  Bell,
  Zap,
  Flame,
  ChevronRight,
  Check,
  FileText,
  RotateCcw,
  School,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard, MetricCard } from "@/components/ui/card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth/auth-context";
import { UserRole } from "@/lib/auth/types";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import {
  IndustryAnalyticsSummary,
  InstitutionAnalyticsSummary,
  AcademicianCollaborationEntity,
} from "@/lib/analytics/role-analytics";

// Import subcomponents for other role perspectives
import { IndustryOverviewCards } from "@/components/analytics/industry-overview-cards";
import { CandidateTalentRadar } from "@/components/analytics/candidate-talent-radar";
import { RiUserFillIcon } from "@/components/ui/icons/ri-user-fill";
import { SkillDemandChart } from "@/components/analytics/skill-demand-chart";
import { InstitutionMetricCards } from "@/components/analytics/institution-metric-cards";
import { SkillGapHeatmap } from "@/components/analytics/skill-gap-heatmap";
import { PlacementFunnelChart } from "@/components/analytics/placement-funnel-chart";
import { InstitutionFilterBar } from "@/components/analytics/institution-filter-bar";
import { AcademicianCollaborationCard } from "@/components/analytics/academician-collaboration-card";
import { LearningCommandCenter } from "@/components/dashboard/learning-command-center";
import { StudentCommandCenter } from "@/components/dashboard/student-command-center";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Role Perspective Switcher
  const [activeRoleView, setActiveRoleView] = useState<UserRole>("student");

  // Time-aware dynamic greeting
  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Demo toggle for Next Best Action scenario (Urgent Scholarship vs Weak Topic Practice)
  const [hasUrgentScholarship, setHasUrgentScholarship] = useState(true);

  // Telemetry States
  const [industryAnalytics, setIndustryAnalytics] = useState<IndustryAnalyticsSummary | null>(null);
  const [institutionAnalytics, setInstitutionAnalytics] = useState<InstitutionAnalyticsSummary | null>(null);
  const [academicianCollaborations, setAcademicianCollaborations] = useState<AcademicianCollaborationEntity[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Institution Filters
  const [deptFilter, setDeptFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("current_semester");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?callbackUrl=/dashboard");
    } else if (user) {
      setActiveRoleView(user.role);
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Load telemetry when active view changes
  useEffect(() => {
    async function loadRoleTelemetry() {
      if (!isAuthenticated) return;
      setAnalyticsLoading(true);
      try {
        if (activeRoleView === "industry") {
          const res = await fetch("/api/analytics/industry");
          if (res.ok) {
            const data = await res.json();
            setIndustryAnalytics(data.analytics);
          }
        } else if (activeRoleView === "institution") {
          const params = new URLSearchParams();
          if (deptFilter !== "all") params.set("department", deptFilter);
          if (yearFilter !== "all") params.set("academicYear", yearFilter);
          if (dateFilter) params.set("dateRange", dateFilter);

          const res = await fetch(`/api/analytics/institution?${params.toString()}`);
          if (res.ok) {
            const data = await res.json();
            setInstitutionAnalytics(data.analytics);
          }
        } else if (activeRoleView === "academician") {
          const res = await fetch("/api/academician/collaborations");
          if (res.ok) {
            const data = await res.json();
            setAcademicianCollaborations(data.collaborations || []);
          }
        }
      } catch (err) {
        console.error("Failed to load role telemetry:", err);
      } finally {
        setAnalyticsLoading(false);
      }
    }
    loadRoleTelemetry();
  }, [activeRoleView, deptFilter, yearFilter, dateFilter, isAuthenticated]);

  if (isLoading || !user) {
    return (
      <Container size="xl" className="py-12 space-y-8">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </Container>
    );
  }

  const roleMeta: Record<
    UserRole,
    { label: string; badgeVariant: "cyber" | "violet" | "emerald" | "amber" | "destructive"; icon: React.ComponentType<{ className?: string }> }
  > = {
    student: { label: "Student Learner", badgeVariant: "cyber", icon: RiUserFillIcon },
    teacher: { label: "Teacher / Faculty", badgeVariant: "emerald", icon: BookOpen },
    parent: { label: "Parent Portal", badgeVariant: "amber", icon: Users },
    industry: { label: "Industry Recruiter", badgeVariant: "violet", icon: Briefcase },
    academician: { label: "Academician / Faculty", badgeVariant: "emerald", icon: BookOpen },
    institution: { label: "Institutional Portal", badgeVariant: "amber", icon: Building2 },
    admin: { label: "System Administrator", badgeVariant: "destructive", icon: ShieldCheck },
  };

  const currentRoleMeta = roleMeta[user.role] || roleMeta.student;
  const RoleIcon = currentRoleMeta.icon;

  return (
    <div className="py-8 md:py-12 space-y-8">
      <Container size="xl">
        {/* Top Profile & Welcome Banner (Clean & Spacious) */}
        <FadeIn>
          <GlassCard className="p-6 sm:p-8 border-cyan-500/20 relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-cyan-950/20" glow>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Profile Info */}
              <div className="flex items-start sm:items-center gap-4">
                <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1.5px] shadow-glow-md shrink-0">
                  <div className="h-full w-full rounded-[14.5px] bg-slate-950 flex items-center justify-center overflow-hidden">
                    <RoleIcon className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      {greeting}, {user.fullName.split(" ")[0]} 👋
                    </h1>
                    <Badge variant={currentRoleMeta.badgeVariant} dot dotColor="cyan" className="font-mono text-[10px]">
                      {currentRoleMeta.label.toUpperCase()}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Profile
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-cyan-300/80 font-medium">
                    Here’s what needs your attention today.
                  </p>
                </div>
              </div>

              {/* Right Key Primary Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/portfolio">
                  <Button variant="glow" size="sm" leftIcon={<ShieldCheck className="h-4 w-4 text-emerald-400" />}>
                    Verified Portfolio
                  </Button>
                </Link>
                <Link href="/ai-career">
                  <Button variant="cyber" size="sm" leftIcon={<Bot className="h-4 w-4 text-cyan-400" />}>
                    AI Career Studio
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Role Perspective Switcher Bar (Segmented Control) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/70 border border-white/10 text-xs shadow-md mt-6">
          <div className="flex items-center gap-2 font-mono text-muted-foreground pl-1">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-foreground/90">Ecosystem Perspective:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "student", label: "Student Learner", icon: RiUserFillIcon, href: "/dashboard" },
              { id: "teacher", label: "Teacher / Faculty", icon: BookOpen, href: "/dashboard/teacher" },
              { id: "parent", label: "Parent Portal", icon: Users, href: "/dashboard/parent" },
              { id: "institution", label: "Institution & University", icon: Building2, href: "/dashboard/institution" },
              { id: "industry", label: "Industry Recruiter", icon: Briefcase, href: "/dashboard" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeRoleView === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === "teacher" || tab.id === "parent" || tab.id === "institution") {
                      router.push(tab.href);
                    } else {
                      setActiveRoleView(tab.id as UserRole);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-muted-foreground"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Role Dashboard Content */}
        <div className="mt-8">
          {analyticsLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          ) : (
            <div>
              {/* 1. STUDENT VIEW - PERSONAL EDUCATION COMMAND CENTER */}
              {activeRoleView === "student" && (
                <SlideUp>
                  <StudentCommandCenter
                    user={user}
                    greeting={greeting}
                    hasUrgentScholarship={hasUrgentScholarship}
                    setHasUrgentScholarship={setHasUrgentScholarship}
                  />
                </SlideUp>
              )}

              {/* 2. INDUSTRY RECRUITER VIEW */}
              {activeRoleView === "industry" && industryAnalytics && (
                <SlideUp>
                  <div className="space-y-8">
                    <IndustryOverviewCards analytics={industryAnalytics} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-cyan-400" />
                            Ranked Candidate Recommendations
                          </h3>
                          <Link href="/opportunities/manage" className="text-xs font-mono text-cyan-400 hover:underline">
                            Manage Pipeline →
                          </Link>
                        </div>
                        <CandidateTalentRadar candidates={industryAnalytics.rankedCandidateRecommendations} />
                      </div>

                      <div className="space-y-4">
                        <SkillDemandChart demands={industryAnalytics.skillDemandDistribution} />
                      </div>
                    </div>
                  </div>
                </SlideUp>
              )}

              {/* 3. INSTITUTION & UNIVERSITY VIEW */}
              {activeRoleView === "institution" && institutionAnalytics && (
                <SlideUp>
                  <div className="space-y-8">
                    <InstitutionFilterBar
                      department={deptFilter}
                      academicYear={yearFilter}
                      dateRange={dateFilter}
                      onDepartmentChange={setDeptFilter}
                      onAcademicYearChange={setYearFilter}
                      onDateRangeChange={setDateFilter}
                    />

                    <InstitutionMetricCards analytics={institutionAnalytics} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {institutionAnalytics.departmentBreakdowns.map((dept) => (
                        <GlassCard key={dept.departmentName} className="p-4 space-y-2 border-white/10" glow>
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-xs text-foreground leading-snug">{dept.departmentName}</span>
                            <Badge variant="cyber" size="sm">
                              {dept.enrolledStudents} STU
                            </Badge>
                          </div>
                          <div className="space-y-1 text-[11px] font-mono">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Skill Readiness:</span>
                              <span className="font-bold text-cyan-400">{dept.averageReadiness}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Internships:</span>
                              <span className="font-bold text-emerald-400">{dept.internshipParticipationRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Placement Ready:</span>
                              <span className="font-bold text-violet-400">{dept.placementReadinessRate}%</span>
                            </div>
                          </div>
                        </GlassCard>
                      ))}
                    </div>

                    <SkillGapHeatmap
                      heatmapCells={institutionAnalytics.skillGapHeatmap}
                      commonSkillGaps={institutionAnalytics.commonSkillGaps}
                    />

                    <PlacementFunnelChart funnelStages={institutionAnalytics.placementFunnel} />
                  </div>
                </SlideUp>
              )}

              {/* 4. ACADEMICIAN & FACULTY VIEW */}
              {activeRoleView === "academician" && (
                <SlideUp>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                          <FlaskConical className="h-5 w-5 text-violet-400" />
                          Faculty & Academician Collaboration Tracks
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Funded faculty internships, research grants, FDPs, and consultancy retainers
                        </p>
                      </div>
                      <Link href="/dashboard/academician">
                        <Button variant="glow" size="sm">
                          Full Academician Portal
                        </Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {academicianCollaborations.map((collab) => (
                        <AcademicianCollaborationCard
                          key={collab.id}
                          collaboration={collab}
                          onPropose={() => {
                            alert("Faculty proposal submitted successfully!");
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </SlideUp>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
