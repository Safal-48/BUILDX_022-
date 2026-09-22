"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scholarship, EligibilityMatchResult } from "@/lib/scholarships/types";

interface ScholarshipCardProps {
  scholarship: Scholarship;
  matchResult: EligibilityMatchResult;
  documentsOnHand: Record<string, boolean>;
  onTrackApplication?: (scholarship: Scholarship) => void;
  isAlreadyTracked?: boolean;
}

export function ScholarshipCard({
  scholarship,
  matchResult,
  documentsOnHand,
  onTrackApplication,
  isAlreadyTracked,
}: ScholarshipCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Deadline Priority Urgency mapping
  const renderUrgencyBadge = () => {
    if (scholarship.urgency === "urgent") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold shadow-[0_0_12px_rgba(244,63,94,0.3)] animate-pulse">
          <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" />
          🔴 Deadline very soon — {scholarship.daysRemaining} days left
        </span>
      );
    }
    if (scholarship.urgency === "approaching") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
          <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" />
          🟡 Deadline approaching — {scholarship.daysRemaining} days left
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
        <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
        🟢 Plenty of time — {scholarship.daysRemaining} days left
      </span>
    );
  };

  // Match score color variant
  const getMatchBadge = () => {
    const score = matchResult.matchScore;
    if (score >= 85) {
      return (
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-extrabold shadow-glow-sm">
          Scholarship Match — {score}%
        </span>
      );
    }
    if (score >= 65) {
      return (
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-extrabold">
          Scholarship Match — {score}%
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
        Partial Match — {score}%
      </span>
    );
  };

  return (
    <GlassCard
      className={`p-5 sm:p-6 transition-all relative overflow-hidden flex flex-col justify-between ${
        scholarship.urgency === "urgent"
          ? "border-amber-500/40 bg-gradient-to-br from-amber-500/[0.07] via-slate-900/90 to-slate-950/90 shadow-[0_0_25px_rgba(245,158,11,0.12)]"
          : "border-white/10 bg-slate-900/80 hover:border-cyan-500/30"
      }`}
      glow={scholarship.urgency === "urgent"}
    >
      <div className="space-y-4">
        {/* Top Badges Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {renderUrgencyBadge()}
            <Badge variant="glass" size="sm" className="font-mono text-[10px]">
              {scholarship.portalName}
            </Badge>
            {scholarship.state === "Maharashtra" && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-300 border border-orange-500/30 font-bold">
                Maharashtra State Quota
              </span>
            )}
          </div>
          {getMatchBadge()}
        </div>

        {/* Title and Provider */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
            {scholarship.title}
          </h3>
          <p className="text-xs text-muted-foreground font-mono mt-1 flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>{scholarship.provider}</span>
            {scholarship.officialSchemeCode && (
              <span className="text-[11px] text-slate-400">({scholarship.officialSchemeCode})</span>
            )}
          </p>
        </div>

        {/* Financial Benefit Strip */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
              Financial Benefit / Grant Amount
            </span>
            <div className="text-lg font-extrabold text-amber-300 font-mono mt-0.5">
              {scholarship.benefitAmount}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
              Application Deadline
            </span>
            <div className="text-xs font-mono font-bold text-foreground flex items-center gap-1 justify-end mt-0.5">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" />
              <span>{scholarship.deadline}</span>
            </div>
          </div>
        </div>

        {/* Why the student matches */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Why You Match:
          </span>
          <div className="space-y-1">
            {matchResult.matchReasons.slice(0, 3).map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{reason}</span>
              </div>
            ))}
          </div>

          {/* Any Gaps if partial */}
          {matchResult.gapReasons.length > 0 && (
            <div className="pt-1">
              {matchResult.gapReasons.map((gap, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-amber-300/90 font-mono">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Requirement to verify: {gap}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Document Checklist Preview */}
        {expanded && (
          <div className="pt-3 border-t border-white/10 space-y-3 animate-in fade-in duration-200">
            <div>
              <h4 className="text-xs font-bold font-mono text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="h-3.5 w-3.5 text-cyan-400" /> Required Documents Verification:
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Check whether you already possess these documents before starting application on {scholarship.portalName}:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {scholarship.requiredDocuments.map((doc) => {
                const hasDoc = !!documentsOnHand[doc.id];
                return (
                  <div
                    key={doc.id}
                    className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                      hasDoc
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-slate-950 border-white/10 text-slate-300"
                    }`}
                  >
                    <div className="mt-0.5">
                      {hasDoc ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-muted-foreground/60 shrink-0" />
                      )}
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="font-semibold text-xs text-foreground flex items-center justify-between">
                        <span>{doc.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {hasDoc ? "Ready" : "Pending"}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Application Steps */}
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs space-y-1.5">
              <span className="font-bold text-cyan-300 block font-mono">
                Official Submission Steps:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                {scholarship.applicationSteps.map((step, sidx) => (
                  <li key={sidx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="pt-4 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center sm:justify-start gap-1 cursor-pointer transition-colors py-1"
        >
          <span>{expanded ? "Hide Details & Documents" : "View Documents & Scheme Details"}</span>
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        <div className="flex items-center gap-2">
          {onTrackApplication && (
            <Button
              type="button"
              variant="glass"
              size="sm"
              onClick={() => onTrackApplication(scholarship)}
              className="text-xs font-mono cursor-pointer"
            >
              {isAlreadyTracked ? "✓ In Tracker" : "+ Add to Tracker"}
            </Button>
          )}

          <a
            href={scholarship.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none"
          >
            <Button
              type="button"
              variant="cyber"
              size="sm"
              className="w-full text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-none shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <span>Apply on {scholarship.portalName.split(" ")[0]}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </div>
    </GlassCard>
  );
}

