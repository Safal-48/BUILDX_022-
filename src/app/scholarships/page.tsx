"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Award,
  Search,
  Filter,
  SlidersHorizontal,
  Bell,
  Clock,
  CheckCircle2,
  FileText,
  Building2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Scholarship,
  ScholarshipProfile,
  ScholarshipApplication,
  ApplicationStatus,
} from "@/lib/scholarships/types";
import {
  MOCK_SCHOLARSHIPS,
  DEFAULT_STUDENT_SCHOLARSHIP_PROFILE,
  COMMON_REQUIRED_DOCUMENTS,
  INITIAL_STUDENT_APPLICATIONS,
} from "@/lib/scholarships/mock-data";
import { calculateScholarshipMatch } from "@/lib/scholarships/matcher";
import { ScholarshipProfileCard } from "@/components/scholarships/scholarship-profile-card";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { DocumentChecklistCard } from "@/components/scholarships/document-checklist-card";
import { ApplicationTrackerView } from "@/components/scholarships/application-tracker-view";

type TabView = "all" | "urgent" | "checklist" | "tracker";
type SortOption = "urgency" | "match" | "amount";

export default function ScholarshipsPage() {
  const { user } = useAuth();

  // Active Tab View
  const [activeTab, setActiveTab] = useState<TabView>("all");

  // Profile State initialized from user if available or default
  const [profile, setProfile] = useState<ScholarshipProfile>(() => {
    return {
      ...DEFAULT_STUDENT_SCHOLARSHIP_PROFILE,
      fullName: user?.fullName || DEFAULT_STUDENT_SCHOLARSHIP_PROFILE.fullName,
      classLevel: (user?.studentProfile?.academicYear as ScholarshipProfile["classLevel"]) || "Class 12",
    };
  });

  // Application Tracker State
  const [applications, setApplications] = useState<ScholarshipApplication[]>(
    INITIAL_STUDENT_APPLICATIONS
  );

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("all");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("urgency");

  // Document Readiness Percentage
  const documentReadinessPercent = useMemo(() => {
    const total = COMMON_REQUIRED_DOCUMENTS.length;
    const ready = Object.values(profile.documentsOnHand).filter(Boolean).length;
    return Math.round((ready / total) * 100);
  }, [profile.documentsOnHand]);

  // Toggle Document Hand Status
  const handleToggleDocument = (docId: string) => {
    setProfile((prev) => ({
      ...prev,
      documentsOnHand: {
        ...prev.documentsOnHand,
        [docId]: !prev.documentsOnHand[docId],
      },
    }));
  };

  // Add a scholarship to tracker
  const handleTrackApplication = (scholarship: Scholarship) => {
    const existing = applications.find((a) => a.scholarshipId === scholarship.id);
    if (existing) {
      setActiveTab("tracker");
      return;
    }
    const newApp: ScholarshipApplication = {
      id: `app-${Date.now()}`,
      scholarshipId: scholarship.id,
      scholarshipTitle: scholarship.title,
      provider: scholarship.provider,
      portalName: scholarship.portalName,
      portalUrl: scholarship.portalUrl,
      status: "applied",
      benefitAmount: scholarship.benefitAmount,
      appliedDate: "Today",
      notes: "Application initiated via Skillora portal link.",
      lastUpdated: "Just now",
    };
    setApplications([newApp, ...applications]);
    setActiveTab("tracker");
  };

  // Update status in tracker
  const handleUpdateAppStatus = (id: string, newStatus: ApplicationStatus, notes?: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              notes: notes !== undefined ? notes : app.notes,
              lastUpdated: "Just now",
            }
          : app
      )
    );
  };

  // Remove from tracker
  const handleRemoveApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Match calculations for all scholarships
  const scoredScholarships = useMemo(() => {
    return MOCK_SCHOLARSHIPS.map((sch) => {
      const matchResult = calculateScholarshipMatch(sch, profile);
      return {
        scholarship: sch,
        matchResult,
      };
    });
  }, [profile]);

  // Filtered & Sorted list
  const filteredScholarships = useMemo(() => {
    return scoredScholarships
      .filter(({ scholarship }) => {
        // Tab Filter
        if (activeTab === "urgent" && scholarship.urgency !== "urgent") {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = scholarship.title.toLowerCase().includes(q);
          const matchProvider = scholarship.provider.toLowerCase().includes(q);
          const matchTags = scholarship.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchProvider && !matchTags) return false;
        }

        // State Filter
        if (selectedStateFilter !== "all" && scholarship.state !== selectedStateFilter) {
          return false;
        }

        // Category Filter
        if (selectedCategoryFilter !== "all") {
          if (!scholarship.eligibility.categories.includes(selectedCategoryFilter as any)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "urgency") {
          return a.scholarship.daysRemaining - b.scholarship.daysRemaining;
        }
        if (sortBy === "match") {
          return b.matchResult.matchScore - a.matchResult.matchScore;
        }
        if (sortBy === "amount") {
          return b.scholarship.annualGrantRupees - a.scholarship.annualGrantRupees;
        }
        return 0;
      });
  }, [scoredScholarships, activeTab, searchQuery, selectedStateFilter, selectedCategoryFilter, sortBy]);

  // Urgent scholarships count
  const urgentCount = useMemo(() => {
    return MOCK_SCHOLARSHIPS.filter((s) => s.urgency === "urgent").length;
  }, []);

  return (
    <div className="py-8 md:py-12 space-y-8">
      <Container size="xl">
        <FadeIn>
          {/* Top Trust Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold shadow-glow-sm">
                  <Award className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Scholarship &amp; Direct Benefit Aid Gateway
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                    Official Central &amp; Maharashtra State Schemes • Direct Aadhaar DBT Transfer
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-muted-foreground">
                Verified Schemes: <strong className="text-cyan-400">{MOCK_SCHOLARSHIPS.length} Active</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
                🔴 {urgentCount} Urgent Deadline
              </span>
            </div>
          </div>
        </FadeIn>

        {/* ========================================================================= */}
        {/* TOP SCHOLARSHIP ALERT BANNER (POOJA USE-CASE AWARENESS AID)               */}
        {/* ========================================================================= */}
        <div className="mt-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-950/30 border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="h-5 w-5 text-amber-400 animate-bounce" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="amber" size="sm" className="font-mono text-[10px] uppercase font-bold">
                    ⏰ CLOSING IN 4 DAYS
                  </Badge>
                  <span className="text-xs font-mono text-amber-300 font-bold">
                    NMMSS 2026-27 • ₹12,000 / Year
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                    94% Match Verified
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  National Means-cum-Merit Scholarship registration closes on Friday at 5:00 PM. Pooja Kumari and eligible municipal school students must submit school-verified income certificates.
                </p>
              </div>
            </div>
            <a
              href="https://scholarships.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full md:w-auto"
            >
              <Button
                variant="cyber"
                size="sm"
                className="w-full text-xs font-mono font-bold justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 border-none shadow-md"
              >
                1-Click NSP Portal Apply →
              </Button>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. SCHOLARSHIP PROFILE CARD                                               */}
        {/* ========================================================================= */}
        <div className="mt-8">
          <ScholarshipProfileCard
            profile={profile}
            onProfileUpdate={setProfile}
            documentReadinessPercent={documentReadinessPercent}
          />
        </div>

        {/* ========================================================================= */}
        {/* TAB CONTROLS: ALL MATCHES / URGENT / CHECKLIST / TRACKER                  */}
        {/* ========================================================================= */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Matched Schemes ({MOCK_SCHOLARSHIPS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("urgent")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "urgent"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                  : "text-rose-400 hover:text-rose-300"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>🔴 Urgent Deadlines ({urgentCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("checklist")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === "checklist"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Document Checklist ({documentReadinessPercent}%)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tracker")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === "tracker"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Application Tracker ({applications.length})
            </button>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-foreground font-mono text-xs focus:outline-none"
            >
              <option value="urgency">Deadline Urgency (Soonest First)</option>
              <option value="match">Highest Match %</option>
              <option value="amount">Highest Benefit Amount</option>
            </select>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SEARCH & FILTERS BAR (For Scheme Catalog Tabs)                            */}
        {/* ========================================================================= */}
        {(activeTab === "all" || activeTab === "urgent") && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search scholarship by name, scheme code, or keywords (e.g. NMMSS, EBC, SC/ST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-foreground placeholder:text-muted-foreground text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* State Filter */}
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-foreground text-xs font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All States / Central</option>
                <option value="Maharashtra">Maharashtra Schemes Only</option>
                <option value="All-India">All-India Central Schemes</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-foreground text-xs font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="OBC">OBC Schemes</option>
                <option value="SC">SC Schemes</option>
                <option value="ST">ST Schemes</option>
                <option value="General">General / EBC</option>
                <option value="VJNT">VJNT Schemes</option>
              </select>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN TAB CONTENT                                                          */}
        {/* ========================================================================= */}
        <div className="mt-8">
          {/* TAB 1 & 2: SCHEME CARDS LIST */}
          {(activeTab === "all" || activeTab === "urgent") && (
            <div className="space-y-6">
              {filteredScholarships.length === 0 ? (
                <GlassCard className="p-12 text-center space-y-3 border-white/10">
                  <AlertCircle className="h-8 w-8 text-amber-400 mx-auto" />
                  <h4 className="text-base font-bold text-foreground">No Scholarships Match Current Filters</h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    Try clearing your search query or selecting &ldquo;All Categories&rdquo;. You can also click &ldquo;Edit Eligibility Profile&rdquo; to adjust your marks or income.
                  </p>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedStateFilter("all");
                      setSelectedCategoryFilter("all");
                    }}
                    className="font-mono text-xs cursor-pointer"
                  >
                    Reset Filters
                  </Button>
                </GlassCard>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredScholarships.map(({ scholarship, matchResult }) => {
                    const isTracked = applications.some((a) => a.scholarshipId === scholarship.id);
                    return (
                      <ScholarshipCard
                        key={scholarship.id}
                        scholarship={scholarship}
                        matchResult={matchResult}
                        documentsOnHand={profile.documentsOnHand}
                        onTrackApplication={handleTrackApplication}
                        isAlreadyTracked={isTracked}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DOCUMENT CHECKLIST */}
          {activeTab === "checklist" && (
            <SlideUp>
              <DocumentChecklistCard
                documentsOnHand={profile.documentsOnHand}
                onToggleDocument={handleToggleDocument}
                documentReadinessPercent={documentReadinessPercent}
              />
            </SlideUp>
          )}

          {/* TAB 4: APPLICATION TRACKER */}
          {activeTab === "tracker" && (
            <SlideUp>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      5. Personal Scholarship Application Tracker
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Manage your application stages, record official portal acknowledgement numbers, and follow DBT grants.
                    </p>
                  </div>

                  <Button
                    variant="cyber"
                    size="sm"
                    onClick={() => setActiveTab("all")}
                    className="text-xs font-mono cursor-pointer"
                  >
                    + Find More Scholarships
                  </Button>
                </div>

                <ApplicationTrackerView
                  applications={applications}
                  onUpdateStatus={handleUpdateAppStatus}
                  onRemoveApplication={handleRemoveApplication}
                />
              </div>
            </SlideUp>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TRUST & PORTAL FOOTER                                                     */}
        {/* ========================================================================= */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
            <div className="space-y-2">
              <h5 className="font-bold text-foreground font-mono uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Official Portal Submission
              </h5>
              <p className="leading-relaxed">
                Skillora aids in discovery, document preparation, and deadline tracking. Final application filings are submitted securely on verified government portals (MahaDBT &amp; NSP).
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-foreground font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-cyan-400" /> Direct DBT Transfer
              </h5>
              <p className="leading-relaxed">
                All scholarship funds are deposited directly into the student&apos;s Aadhaar-seeded bank account under Direct Benefit Transfer (DBT) guidelines.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-foreground font-mono uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-amber-400" /> Need Help with Forms?
              </h5>
              <p className="leading-relaxed">
                Connect with your school scholarship nodal teacher or visit your nearest Aaple Sarkar Seva Kendra (CSC) for free assistance.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
