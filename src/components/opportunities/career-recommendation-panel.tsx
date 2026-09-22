"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Building2,
  GraduationCap,
  Wrench,
  ChevronRight,
  Info,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DEMO_CAREER_RECOMMENDATIONS,
  DEFAULT_STUDENT_PROFILE,
  AI_RECOMMENDATION_DISCLAIMER,
  CareerRecommendation,
} from "@/lib/opportunities/career-opportunity-engine";

interface CareerRecommendationPanelProps {
  onSelectCategory?: (categorySlug: string) => void;
}

export function CareerRecommendationPanel({
  onSelectCategory,
}: CareerRecommendationPanelProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const recommendations = DEMO_CAREER_RECOMMENDATIONS;
  const profile = DEFAULT_STUDENT_PROFILE;

  return (
    <GlassCard className="p-6 sm:p-7 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-950 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Student Profile Summary & Disclaimer Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Compass className="h-4 w-4" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              Personalized Career Pathway Intelligence
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/10 text-[10px] font-mono">
              Diagnostic Match
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            Based on your profile
          </h2>

          <p className="text-xs text-slate-400">
            Synthesized from {profile.currentClass} performance (Physics 80%, Math 82%, Remediated Trigonometry 75%),
            87% attendance compliance, and proximity to Hingna/Butibori industrial clusters.
          </p>
        </div>

        {/* Profile Attributes Snapshot */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-white/10 shrink-0">
          <span className="text-slate-400">Profile:</span>
          <span className="text-white font-bold">{profile.currentClass}</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300 font-bold">Circuits: 80%</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-300 font-bold">Attn: 87%</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-cyan-400" />
            Nagpur
          </span>
        </div>
      </div>

      {/* 3 Top Ranked Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
        {recommendations.map((rec, idx) => {
          const isTop = idx === 0;

          return (
            <div
              key={rec.rank}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isTop
                  ? "bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30"
                  : "bg-slate-950/60 border-white/[0.08] hover:border-white/20"
              }`}
            >
              <div className="space-y-3">
                {/* Rank & Fit Score */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-6 w-6 rounded-full font-mono text-xs font-black flex items-center justify-center ${
                        isTop
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {rec.rank}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {rec.categoryBadge}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {rec.fitScore}% Fit
                  </span>
                </div>

                {/* Pathway Title */}
                <h3 className="text-lg font-black text-white font-mono leading-snug">
                  {rec.pathwayTitle}
                </h3>

                {/* EXPLAINABLE "RECOMMENDED BECAUSE..." BLOCK */}
                <div className="p-3 rounded-xl bg-cyan-500/[0.07] border border-cyan-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-mono font-bold">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>Recommended because:</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {rec.recommendedBecause}
                  </p>
                </div>

                {/* Curriculum & Practical Highlights */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Core Skills Covered:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {rec.curriculumHighlights.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-white/[0.08] text-slate-300"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Institutes & Hubs */}
                <div className="space-y-1 text-xs font-mono text-slate-300 pt-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Nearby Training Hubs:
                  </span>
                  {rec.matchingInstitutesOrHubs.map((inst, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-200">
                      <Building2 className="h-3 w-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{inst}</span>
                    </div>
                  ))}
                </div>

                {/* Stipend / Cost */}
                <div className="text-[11px] font-mono text-emerald-400 pt-1">
                  💰 {rec.averageEntryStipendOrCost}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-slate-400 truncate max-w-[170px]">
                  {rec.suggestedNextStep}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCategory) {
                      if (rec.rank === 1) onSelectCategory("iti_courses");
                      else if (rec.rank === 2) onSelectCategory("higher_education");
                      else onSelectCategory("apprenticeships");
                    }
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Explore</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MANDATORY RESPONSIBLE AI DISCLAIMER */}
      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 flex items-start gap-3 relative z-10">
        <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-xs font-mono font-bold text-slate-200 block">
            Responsible AI Advisory &amp; Fair Notice:
          </span>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            {AI_RECOMMENDATION_DISCLAIMER} Always review official statutory notifications on DTE Maharashtra, DVET, or employer portals before making education decisions.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

