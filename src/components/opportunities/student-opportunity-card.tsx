"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudentOpportunity } from "@/lib/opportunities/career-opportunity-engine";

interface StudentOpportunityCardProps {
  opportunity: StudentOpportunity;
  onViewDetails: (opportunity: StudentOpportunity) => void;
  onQuickApply?: (opportunity: StudentOpportunity) => void;
}

export function StudentOpportunityCard({
  opportunity,
  onViewDetails,
  onQuickApply,
}: StudentOpportunityCardProps) {
  const isUrgent = opportunity.daysRemaining <= 45;

  const matchColor =
    opportunity.matchPercentage >= 92
      ? "text-cyan-400 border-cyan-500/40 bg-cyan-500/10 shadow-glow-sm"
      : opportunity.matchPercentage >= 85
      ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
      : "text-amber-400 border-amber-500/40 bg-amber-500/10";

  return (
    <GlassCard className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-cyan-500/40 bg-slate-900/50 transition-all duration-300 flex flex-col justify-between space-y-4 relative group overflow-hidden">
      {/* Background Ambient Hover Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

      {/* Top Meta Bar */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          {/* Category & Local Zone Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/[0.06] border border-white/10 text-white flex items-center gap-1">
              <span>{opportunity.categoryEmoji}</span>
              <span>{opportunity.categoryLabel}</span>
            </span>

            {/* Local Zone Tag */}
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-cyan-400" />
              <span>{opportunity.localZone}</span>
            </span>

            {/* Strict DEMO Label */}
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Demo Opportunity
            </span>
          </div>

          {/* Match Percentage Badge */}
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shrink-0 ${matchColor}`}
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
            <span>{opportunity.matchPercentage}% MATCH</span>
          </div>
        </div>

        {/* Title & Organization */}
        <div>
          <h3 className="text-lg font-bold text-white font-mono group-hover:text-cyan-300 transition-colors leading-snug">
            {opportunity.title}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-1.5">
            <span className="font-semibold text-slate-300">{opportunity.organization}</span>
          </p>
        </div>

        {/* Location & Transit */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/[0.05] space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-mono">
            <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="text-[11px] text-slate-400 pl-5">
            🚌 {opportunity.commuteTransitInfo}
          </div>
        </div>

        {/* Eligibility Snippet */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Eligibility Requirements:
          </span>
          <p className="text-xs text-slate-200 font-mono leading-relaxed bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
            {opportunity.eligibility}
          </p>
        </div>

        {/* Required Skills Pills */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Required Skills:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-950/80 border border-white/10 text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Benefit / Stipend Callout */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono">
          <span className="text-slate-300">Benefit / Stipend:</span>
          <strong className="text-emerald-300 font-bold text-right truncate pl-2">
            {opportunity.stipendOrBenefit}
          </strong>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        {/* Deadline Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-400">Deadline:</span>
          <span
            className={`font-bold ${
              isUrgent ? "text-rose-400" : "text-slate-200"
            }`}
          >
            {opportunity.deadline}
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded border ${
              isUrgent
                ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                : "bg-white/5 text-slate-400 border-white/10"
            }`}
          >
            {opportunity.daysRemaining}d left
          </span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onViewDetails(opportunity)}
            variant="cyber"
            size="sm"
            className="text-xs font-mono gap-1 shadow-glow"
          >
            <span>View &amp; Apply</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

