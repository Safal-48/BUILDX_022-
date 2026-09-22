"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  Briefcase,
  GraduationCap,
  Wrench,
  BookOpen,
  Award,
  Laptop,
  Tent,
  MapPin,
  Clock,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Factory,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import {
  StudentOpportunity,
  OpportunityCategory,
  LocalZone,
  DEMO_STUDENT_OPPORTUNITIES,
  filterStudentOpportunities,
} from "@/lib/opportunities/career-opportunity-engine";
import { StudentOpportunityCard } from "@/components/opportunities/student-opportunity-card";
import { CareerRecommendationPanel } from "@/components/opportunities/career-recommendation-panel";
import { OpportunityDetailModal } from "@/components/opportunities/opportunity-detail-modal";

export default function CareerAndOpportunityHubPage() {
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory | "all">("all");
  const [activeLocalZone, setActiveLocalZone] = useState<LocalZone>("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [minMatch, setMinMatch] = useState<number>(0);

  // Modal State
  const [selectedOpportunity, setSelectedOpportunity] = useState<StudentOpportunity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedCount, setAppliedCount] = useState(0);

  // 8 Specific Required Categories
  const categoriesList: {
    id: OpportunityCategory | "all";
    label: string;
    emoji: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "all", label: "All Opportunities", emoji: "🌟", icon: Compass },
    { id: "higher_education", label: "Higher Education", emoji: "🎓", icon: GraduationCap },
    { id: "iti_courses", label: "ITI Courses", emoji: "🔧", icon: Wrench },
    { id: "internships", label: "Internships", emoji: "💼", icon: Briefcase },
    { id: "apprenticeships", label: "Apprenticeships", emoji: "🏭", icon: Factory },
    { id: "skill_development", label: "Skill Programs", emoji: "📚", icon: BookOpen },
    { id: "scholarships", label: "Scholarships", emoji: "💰", icon: Award },
    { id: "jobs", label: "Jobs", emoji: "💻", icon: Laptop },
    { id: "career_fairs", label: "Career Fairs", emoji: "🎪", icon: Tent },
  ];

  // 4 Required Demo Locations
  const localZonesList: LocalZone[] = [
    "All Locations",
    "Nagpur",
    "MIHAN",
    "Hingna",
    "Butibori",
  ];

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    return filterStudentOpportunities(DEMO_STUDENT_OPPORTUNITIES, {
      category: activeCategory,
      localZone: activeLocalZone,
      searchQuery: searchQuery,
      minMatch: minMatch,
    });
  }, [activeCategory, activeLocalZone, searchQuery, minMatch]);

  // Counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: DEMO_STUDENT_OPPORTUNITIES.length };
    DEMO_STUDENT_OPPORTUNITIES.forEach((opp) => {
      counts[opp.category] = (counts[opp.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleOpenDetails = (opp: StudentOpportunity) => {
    setSelectedOpportunity(opp);
    setIsModalOpen(true);
  };

  const handleApplySuccess = (opp: StudentOpportunity) => {
    setAppliedCount((prev) => prev + 1);
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveLocalZone("All Locations");
    setSearchQuery("");
    setMinMatch(0);
  };

  return (
    <div className="py-10 space-y-10 min-h-screen bg-slate-950 text-foreground">
      <Container size="xl" className="space-y-8 max-w-6xl">
        {/* Hub Header */}
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="cyber" size="sm" className="font-mono text-xs">
                  Skillora Regional Network
                </Badge>
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  Career &amp; Opportunity Hub
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Demo Directory
                </span>
                {appliedCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    ✓ {appliedCount} Applied Today
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                Student Career &amp; Opportunity Hub
              </h1>

              <p className="text-sm text-slate-400 max-w-3xl">
                Discover higher education colleges, government ITI trades, apprenticeships, scholarships,
                and local industrial opportunities across Nagpur, MIHAN, Hingna, and Butibori.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link href="/scholarships">
                <Button variant="outline" size="sm" className="font-mono text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  <Award className="h-3.5 w-3.5 mr-1" />
                  Scholarships Module
                </Button>
              </Link>
              <Link href="/learning/assistant">
                <Button variant="cyber" size="sm" className="font-mono text-xs gap-1.5 shadow-glow">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Ask Career Questions</span>
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* TOP SECTION: CAREER RECOMMENDATION PANEL */}
        <SlideUp delay={0.05}>
          <CareerRecommendationPanel
            onSelectCategory={(cat) => {
              setActiveCategory(cat as OpportunityCategory);
              // Scroll down to listings
              const el = document.getElementById("opportunity-listings");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </SlideUp>

        {/* "OPPORTUNITIES NEAR YOU" LOCAL ZONE QUICK-FILTER STRIP */}
        <SlideUp delay={0.1}>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <MapPin className="h-4 w-4" />
                </span>
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Opportunities Near You (Vidarbha Demo Zones)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Filter by regional commute distance
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {localZonesList.map((zone) => {
                const isSelected = activeLocalZone === zone;
                const zoneCount =
                  zone === "All Locations"
                    ? DEMO_STUDENT_OPPORTUNITIES.length
                    : DEMO_STUDENT_OPPORTUNITIES.filter((o) => o.localZone === zone).length;

                return (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => setActiveLocalZone(zone)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-glow-sm"
                        : "bg-slate-950/80 text-slate-300 hover:text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <MapPin className={`h-3.5 w-3.5 ${isSelected ? "text-cyan-400" : "text-slate-500"}`} />
                    <span>{zone}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? "bg-cyan-500/30 text-cyan-200" : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {zoneCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </SlideUp>

        {/* 8 CATEGORY NAVIGATION TABS */}
        <SlideUp delay={0.15}>
          <div id="opportunity-listings" className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Explore Categories ({filteredOpportunities.length} Available)
              </span>
              {(activeCategory !== "all" || activeLocalZone !== "All Locations" || searchQuery || minMatch > 0) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {categoriesList.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`p-2.5 rounded-xl text-xs font-mono text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-b from-cyan-500/25 to-slate-900 border border-cyan-500/50 text-cyan-300 font-bold shadow-glow-sm"
                        : "bg-slate-900/60 border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:border-white/20"
                    }`}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span className="text-[11px] leading-tight truncate w-full">
                      {cat.label}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                        isSelected ? "bg-cyan-500/30 text-cyan-200" : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </SlideUp>

        {/* SEARCH & FILTER BAR */}
        <SlideUp delay={0.2}>
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trade, college, organization, skills (e.g. Electrician, Hingna, Mahindra, Solar)..."
                className="pl-10 text-xs font-mono bg-slate-950/80 border-white/10 text-white placeholder:text-slate-500 h-10"
              />
            </div>

            {/* Minimum Match Filter */}
            <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
              <span>Min Match:</span>
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/10">
                {[0, 85, 90, 95].map((threshold) => (
                  <button
                    key={threshold}
                    type="button"
                    onClick={() => setMinMatch(threshold)}
                    className={`px-2 py-0.5 rounded-lg transition-all text-[11px] cursor-pointer ${
                      minMatch === threshold
                        ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {threshold === 0 ? "All" : `${threshold}%+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SlideUp>

        {/* OPPORTUNITY CARDS GRID */}
        <SlideUp delay={0.25}>
          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredOpportunities.map((opp) => (
                <StudentOpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onViewDetails={handleOpenDetails}
                  onQuickApply={handleOpenDetails}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <GlassCard className="p-12 text-center rounded-3xl border border-white/[0.08] bg-slate-900/40 space-y-4">
              <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-slate-400">
                <Search className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-mono">
                  No opportunities match your current filter
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try clearing your search keyword, switching the location from &quot;{activeLocalZone}&quot; to &quot;All Locations&quot;, or lowering the minimum match threshold.
                </p>
              </div>
              <Button
                onClick={handleResetFilters}
                variant="outline"
                size="sm"
                className="font-mono text-xs border-white/10 text-slate-300"
              >
                Reset All Filters
              </Button>
            </GlassCard>
          )}
        </SlideUp>

        {/* DETAIL & APPLICATION MODAL */}
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApplySuccess={handleApplySuccess}
        />
      </Container>
    </div>
  );
}
