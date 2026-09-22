"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  GraduationCap,
  Award,
  Layers,
  TrendingUp,
  Brain,
  Compass,
  Users,
  Calendar,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Search,
  FileText,
  Clock,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Bot,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard, MetricCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { InstitutionMetricCards } from "@/components/analytics/institution-metric-cards";
import { SkillGapHeatmap } from "@/components/analytics/skill-gap-heatmap";
import { PlacementFunnelChart } from "@/components/analytics/placement-funnel-chart";
import { InstitutionFilterBar } from "@/components/analytics/institution-filter-bar";
import { InstitutionAnalyticsSummary } from "@/lib/analytics/role-analytics";
import { useAuth } from "@/lib/auth/auth-context";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";

function InstitutionDashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "dashboard";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [analytics, setAnalytics] = useState<InstitutionAnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [department, setDepartment] = useState("all");
  const [academicYear, setAcademicYear] = useState("all");
  const [dateRange, setDateRange] = useState("current_semester");
  const [studentSearch, setStudentSearch] = useState("");

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (department !== "all") params.set("department", department);
      if (academicYear !== "all") params.set("academicYear", academicYear);
      if (dateRange) params.set("dateRange", dateRange);

      const res = await fetch(`/api/analytics/institution?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data.analytics);
      }
    } catch (err) {
      console.error("Failed to load institution analytics:", err);
    } finally {
      setIsLoading(false);
    }
  }, [department, academicYear, dateRange]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Building2 },
    { id: "students", label: "Students", icon: Users },
    { id: "attendance", label: "Attendance Analytics", icon: Calendar },
    { id: "scholarships", label: "Scholarship Awareness", icon: Award },
    { id: "dropout", label: "Dropout Analytics", icon: AlertTriangle, badge: "Early Warning" },
    { id: "engagement", label: "Learning Engagement", icon: Zap },
    { id: "opportunities", label: "Opportunities", icon: Compass },
  ];

  return (
    <div className="py-10 space-y-8">
      <Container size="xl">
        {/* Banner Header */}
        <FadeIn>
          <GlassCard className="p-6 sm:p-8 border-purple-500/20 bg-gradient-to-br from-slate-900/95 via-slate-950 to-purple-950/20 relative overflow-hidden" glow>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="cyber" dot dotColor="violet">
                    INSTITUTIONAL ADMINISTRATION
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    GOVT. ADARSH VIDYALAYA • DISTRICT CODE: EDU-4102
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                  Institution Command &amp; Retention Analytics
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed font-mono">
                  District &amp; municipal student monitoring, dropout predictive intervention, scholarship disbursement verification, and vocational pathways.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/admin">
                  <Button variant="outline" size="sm" leftIcon={<ShieldCheck className="h-4 w-4 text-rose-400" />}>
                    Security Governance
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button variant="glow" size="sm" leftIcon={<Compass className="h-4 w-4" />}>
                    Opportunity Feed
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-slate-950/70 border border-white/10 text-xs shadow-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-purple-400" : "text-muted-foreground"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <SlideUp>
            <div className="space-y-8">
              {/* Filter Bar */}
              <InstitutionFilterBar
                department={department}
                academicYear={academicYear}
                dateRange={dateRange}
                onDepartmentChange={setDepartment}
                onAcademicYearChange={setAcademicYear}
                onDateRangeChange={setDateRange}
              />

              {isLoading || !analytics ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-28 w-full rounded-2xl" />
                    ))}
                  </div>
                  <Skeleton className="h-96 w-full rounded-2xl" />
                </div>
              ) : (
                <div className="space-y-8">
                  <InstitutionMetricCards analytics={analytics} />

                  {/* Department Breakdown Mini-Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analytics.departmentBreakdowns.map((dept) => (
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
                            <span className="text-muted-foreground">Attendance Rate:</span>
                            <span className="font-bold text-emerald-400">89.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Placement / ITI Ready:</span>
                            <span className="font-bold text-purple-400">{dept.placementReadinessRate}%</span>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>

                  <SkillGapHeatmap
                    heatmapCells={analytics.skillGapHeatmap}
                    commonSkillGaps={analytics.commonSkillGaps}
                  />

                  <PlacementFunnelChart funnelStages={analytics.placementFunnel} />
                </div>
              )}
            </div>
          </SlideUp>
        )}

        {/* TAB 2: STUDENTS ROSTER */}
        {activeTab === "students" && (
          <SlideUp>
            <GlassCard className="p-6 space-y-6 border-white/10" glow>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground font-mono">
                    Enrolled Students Master Directory
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    Official cohort records across SSC Class 10, CBSE, and Vocational Streams
                  </p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by student name or roll..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-foreground focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-muted-foreground uppercase text-[10px]">
                      <th className="pb-3">Student Name</th>
                      <th className="pb-3">Roll No</th>
                      <th className="pb-3">Class &amp; Stream</th>
                      <th className="pb-3">Attendance</th>
                      <th className="pb-3">Mastery</th>
                      <th className="pb-3">Scholarship</th>
                      <th className="pb-3">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "Pooja Kumari", roll: "2026-SSC-042", class: "Class 10 SSC", attendance: 91.5, mastery: 88, scholarship: "Eligible (NMMSS)", risk: "Safe" },
                      { name: "Amit Verma", roll: "2026-SSC-018", class: "Class 10 SSC", attendance: 74.2, mastery: 62, scholarship: "Pre-Matric Aid", risk: "At Risk" },
                      { name: "Suresh Patel", roll: "2026-VOC-104", class: "ITI Electrical", attendance: 86.0, mastery: 74, scholarship: "PMKVY Stipend", risk: "Safe" },
                      { name: "Sunita Yadav", roll: "2026-SSC-089", class: "Class 10 SSC", attendance: 94.0, mastery: 92, scholarship: "Disbursed", risk: "Safe" },
                      { name: "Vikram Chauhan", roll: "2026-VOC-055", class: "Vocational IT", attendance: 68.0, mastery: 58, scholarship: "Pending Doc", risk: "Critical" },
                    ]
                      .filter((s) => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.roll.toLowerCase().includes(studentSearch.toLowerCase()))
                      .map((stu) => (
                        <tr key={stu.roll} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 font-semibold text-foreground">{stu.name}</td>
                          <td className="py-3 text-muted-foreground">{stu.roll}</td>
                          <td className="py-3 text-cyan-300">{stu.class}</td>
                          <td className="py-3">
                            <span className={stu.attendance < 75 ? "text-rose-400 font-bold" : "text-emerald-400"}>
                              {stu.attendance}%
                            </span>
                          </td>
                          <td className="py-3 text-purple-300">{stu.mastery}%</td>
                          <td className="py-3 text-amber-300">{stu.scholarship}</td>
                          <td className="py-3">
                            {stu.risk === "Safe" && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px]">
                                Safe
                              </span>
                            )}
                            {stu.risk === "At Risk" && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                                At Risk
                              </span>
                            )}
                            {stu.risk === "Critical" && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold animate-pulse">
                                Critical
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </SlideUp>
        )}

        {/* TAB 3: ATTENDANCE ANALYTICS */}
        {activeTab === "attendance" && (
          <SlideUp>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Average Daily Attendance"
                  value="88.4%"
                  change="+2.1% vs last month"
                  isPositive={true}
                  icon={<Calendar className="h-4 w-4" />}
                />
                <MetricCard
                  title="Chronic Absenteeism Rate"
                  value="4.2%"
                  change="-1.5% this quarter"
                  isPositive={true}
                  icon={<AlertTriangle className="h-4 w-4" />}
                />
                <MetricCard
                  title="Parent Alerts Dispatched"
                  value="142 SMS/WA"
                  change="100% Delivered"
                  isPositive={true}
                  icon={<Zap className="h-4 w-4" />}
                />
                <MetricCard
                  title="Students Below 75% Mandate"
                  value="14 Students"
                  change="Early Intervention Active"
                  isPositive={false}
                  icon={<Users className="h-4 w-4" />}
                />
              </div>

              <GlassCard className="p-6 space-y-4 border-white/10" glow>
                <h3 className="font-bold text-foreground font-mono text-sm">
                  Classroom Roll-Call Telemetry &amp; Dropout Early Radar
                </h3>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  Daily aggregate attendance logged via municipal biometric and teacher ledger. Triggers automated WhatsApp communication to parents when consecutive absences exceed 2 days.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span className="text-foreground">Class 10 - Section A</span>
                      <span className="text-emerald-400">92.1% Attendance</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">42 Students enrolled • 0 in critical zone</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span className="text-foreground">Class 10 - Section B</span>
                      <span className="text-amber-300">74.2% Attendance</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">Amit Verma &amp; 3 others under active counseling</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span className="text-foreground">Vocational / ITI Trades</span>
                      <span className="text-cyan-300">86.4% Attendance</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">Hands-on workshop attendance validated weekly</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </SlideUp>
        )}

        {/* TAB 4: SCHOLARSHIP AWARENESS */}
        {activeTab === "scholarships" && (
          <SlideUp>
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
                <Award className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground font-mono">
                    Urgent Grant Deadline Tracking: Pooja &amp; 4 Other Students
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    National Means-cum-Merit Scholarship (NMMSS) portal closes in 4 days. 5 students have verified eligibility but have not submitted final certificates. Automated reminders dispatched to their verified guardian phones.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <GlassCard className="p-5 space-y-3 border-amber-500/20" glow>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">NMMSS Scheme</span>
                    <Badge variant="amber" size="sm">₹12,000 / yr</Badge>
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground">84 Eligible</div>
                  <div className="text-xs font-mono text-muted-foreground">79 Submitted • 5 Pending (Pooja Kumari)</div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: "94%" }} />
                  </div>
                </GlassCard>

                <GlassCard className="p-5 space-y-3 border-cyan-500/20" glow>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Pre-Matric State Aid</span>
                    <Badge variant="cyber" size="sm">₹4,500 / yr</Badge>
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground">120 Eligible</div>
                  <div className="text-xs font-mono text-muted-foreground">114 Disbursed via Direct Bank Transfer</div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "95%" }} />
                  </div>
                </GlassCard>

                <GlassCard className="p-5 space-y-3 border-purple-500/20" glow>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase">Skill India PMKVY</span>
                    <Badge variant="glass" size="sm">₹8,000 Stipend</Badge>
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground">45 Enrolled</div>
                  <div className="text-xs font-mono text-muted-foreground">100% Industry apprenticeship stipend</div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: "100%" }} />
                  </div>
                </GlassCard>
              </div>
            </div>
          </SlideUp>
        )}

        {/* TAB 5: DROPOUT ANALYTICS & PREDICTIVE RADAR */}
        {activeTab === "dropout" && (
          <SlideUp>
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-rose-400 shrink-0 mt-1 animate-pulse" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground font-mono">
                    Predictive Dropout Intervention Radar (Amit Verma Archetype)
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    AI flags students showing gradual attendance decay (e.g. 85% → 74%), test score deficits, or 3+ consecutive unexcused absences before formal dropout occurs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6 space-y-4 border-rose-500/30" glow>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-bold text-rose-400 font-mono text-xs">HIGHEST DROPOUT PROBABILITY</span>
                    <Badge variant="destructive" size="sm">URGENT ACTION</Badge>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-rose-500/20 space-y-1">
                      <div className="flex justify-between font-bold text-foreground">
                        <span>Amit Verma (Class 10 SSC)</span>
                        <span className="text-rose-400">74.2% Attendance</span>
                      </div>
                      <p className="text-muted-foreground text-[11px]">
                        Absence pattern: 3 consecutive days. Math test score fell from 72% to 54%. Family shared 1 phone. Socratic intervention assigned to Mrs. Sunita Sharma.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 space-y-1">
                      <div className="flex justify-between font-bold text-foreground">
                        <span>Vikram Chauhan (Vocational IT)</span>
                        <span className="text-amber-300">68.0% Attendance</span>
                      </div>
                      <p className="text-muted-foreground text-[11px]">
                        Seasonal agricultural harvest absenteeism. Recommended mobile offline study packet.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 space-y-4 border-white/10" glow>
                  <h3 className="font-bold text-foreground font-mono text-sm">
                    Root Cause Distribution &amp; Countermeasures
                  </h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted-foreground">Financial &amp; Daily Wage Assistance Need</span>
                        <span className="text-amber-300 font-bold">42%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "42%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted-foreground">Seasonal Harvest / Family Migration</span>
                        <span className="text-cyan-300 font-bold">31%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: "31%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-muted-foreground">Academic Disengagement in Mathematics/Science</span>
                        <span className="text-purple-300 font-bold">27%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: "27%" }} />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </SlideUp>
        )}

        {/* TAB 6: LEARNING ENGAGEMENT */}
        {activeTab === "engagement" && (
          <SlideUp>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Socratic Questions Resolved"
                  value="1,842 Queries"
                  change="+24% this week"
                  isPositive={true}
                  icon={<Bot className="h-4 w-4" />}
                />
                <MetricCard
                  title="Daily Practice Arena Drills"
                  value="76.8% Completion"
                  change="High Retention"
                  isPositive={true}
                  icon={<Zap className="h-4 w-4" />}
                />
                <MetricCard
                  title="Low-Bandwidth Mobile Sessions"
                  value="64.2% of Traffic"
                  change="Optimized for Shared Phones"
                  isPositive={true}
                  icon={<Layers className="h-4 w-4" />}
                />
                <MetricCard
                  title="Mastery Certification Issued"
                  value="34 Credentials"
                  change="Tamper-proof Ledger"
                  isPositive={true}
                  icon={<Award className="h-4 w-4" />}
                />
              </div>

              <GlassCard className="p-6 space-y-4 border-white/10" glow>
                <h3 className="font-bold text-foreground font-mono text-sm">
                  Active Subject Mastery Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                    <span className="text-cyan-400 font-bold">Mathematics (SSC Class 10)</span>
                    <p className="text-muted-foreground text-[11px]">810 practice attempts • Quadratic equations &amp; Triangles</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                    <span className="text-emerald-400 font-bold">General Science</span>
                    <p className="text-muted-foreground text-[11px]">640 practice attempts • Electricity, Light &amp; Chemical Reactions</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                    <span className="text-purple-400 font-bold">Vocational &amp; Digital Skills</span>
                    <p className="text-muted-foreground text-[11px]">392 practice attempts • Python, Solar PV &amp; Wiring basics</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </SlideUp>
        )}

        {/* TAB 7: OPPORTUNITIES & VOCATIONAL PIPELINE */}
        {activeTab === "opportunities" && (
          <SlideUp>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground font-mono">
                    Institutional Vocational &amp; Apprenticeship Feed
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    Local ITI, diploma, industrial apprentice drives, and government apprentice portals
                  </p>
                </div>
                <Link href="/opportunities">
                  <Button variant="cyber" size="sm">
                    Open Full Hub →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <GlassCard className="p-5 space-y-3 border-emerald-500/20" glow>
                  <div className="flex justify-between items-start">
                    <Badge variant="emerald" size="sm">ITI ELECTRICAL APPRENTICE</Badge>
                    <span className="text-xs font-mono text-emerald-400 font-bold">₹9,500 / month</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm">
                    State Electricity Distribution Corp (MSEDCL / UPPCL)
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    1-year certified industrial apprentice training. Class 10 pass with ITI Wireman / Electrician qualification. 14 student nominations submitted.
                  </p>
                </GlassCard>

                <GlassCard className="p-5 space-y-3 border-cyan-500/20" glow>
                  <div className="flex justify-between items-start">
                    <Badge variant="cyber" size="sm">JUNIOR WEB &amp; PYTHON TECH</Badge>
                    <span className="text-xs font-mono text-cyan-400 font-bold">₹22,000 / month</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm">
                    District Common Service Center (CSC e-Governance)
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    Digital record maintenance and public portal support. Requires demonstrated Python &amp; Data Entry competence. 6 candidates shortlisted.
                  </p>
                </GlassCard>
              </div>
            </div>
          </SlideUp>
        )}
      </Container>
    </div>
  );
}

export default function InstitutionDashboardPage() {
  return (
    <Suspense
      fallback={
        <Container size="xl" className="py-12 space-y-8">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </Container>
      }
    >
      <InstitutionDashboardContent />
    </Suspense>
  );
}

