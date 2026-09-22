"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudentOpportunity } from "@/lib/opportunities/career-opportunity-engine";

interface OpportunityDetailModalProps {
  opportunity: StudentOpportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onApplySuccess?: (opportunity: StudentOpportunity) => void;
}

export function OpportunityDetailModal({
  opportunity,
  isOpen,
  onClose,
  onApplySuccess,
}: OpportunityDetailModalProps) {
  const [coverNote, setCoverNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !opportunity) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);

    if (onApplySuccess) {
      onApplySuccess(opportunity);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCoverNote("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden text-foreground">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/[0.08] bg-slate-950/60">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                <span>{opportunity.categoryEmoji}</span>
                <span>{opportunity.categoryLabel}</span>
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white/[0.06] text-slate-300 border border-white/10 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-cyan-400" />
                <span>{opportunity.localZone}</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Demo Opportunity
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-mono leading-tight">
              {opportunity.title}
            </h2>

            <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>{opportunity.organization}</span>
            </p>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs font-mono">
          {!isSubmitted ? (
            <>
              {/* Match Highlight Banner */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-sm">
                    <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span>{opportunity.matchPercentage}% Profile Compatibility</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">
                    Diagnostic Match
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {opportunity.whyYouMatch}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Opportunity Overview:
                </span>
                <p className="text-slate-300 font-sans leading-relaxed text-sm bg-slate-950/60 p-3.5 rounded-xl border border-white/[0.06]">
                  {opportunity.description}
                </p>
              </div>

              {/* Key Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.06] space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Location &amp; Commute:</span>
                  <div className="text-white font-bold">{opportunity.location}</div>
                  <div className="text-[11px] text-slate-400">🚌 {opportunity.commuteTransitInfo}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.06] space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Stipend / Support:</span>
                  <div className="text-emerald-400 font-bold">{opportunity.stipendOrBenefit}</div>
                  <div className="text-[11px] text-slate-400">📅 Deadline: {opportunity.deadline} ({opportunity.daysRemaining} days remaining)</div>
                </div>
              </div>

              {/* Eligibility & Required Skills */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Statutory Eligibility:
                  </span>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.06] text-slate-200">
                    ✓ {opportunity.eligibility}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Required Skills / Prerequisites:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {opportunity.requiredSkills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Mandatory Document Checklist:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {opportunity.documentsRequired.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-950/80 border border-white/[0.06] flex items-center gap-2 text-slate-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Note Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Candidate Note / Why Interested (Optional):
                </label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="e.g., I have 80% marks in electric circuits and reside in Hingna, interested in joining the upcoming batch."
                  className="w-full rounded-xl bg-slate-950 border border-white/10 p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </>
          ) : (
            /* Application Success View */
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-glow">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white font-mono">
                  Application Submitted!
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your candidate application for <strong className="text-white">{opportunity.title}</strong> has been simulated and recorded in your student tracker.
                </p>
              </div>

              <div className="p-4 max-w-md mx-auto rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Application Reference:</span>
                  <span className="font-bold text-emerald-300">SKL-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Organization:</span>
                  <span className="text-white">{opportunity.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-cyan-300 font-bold">🟢 Under Review / In Verification</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-slate-950/60 flex items-center justify-between gap-3">
          {!isSubmitted ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="font-mono text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="cyber"
                size="sm"
                className="font-mono text-xs gap-1.5 shadow-glow font-bold px-5"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Candidate Application</span>
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="w-full flex items-center justify-end gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="font-mono text-xs border-white/10 text-slate-300"
              >
                Close
              </Button>
              <Link href="/scholarships">
                <Button variant="cyber" size="sm" className="font-mono text-xs gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  <span>Check Matching Scholarships</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
