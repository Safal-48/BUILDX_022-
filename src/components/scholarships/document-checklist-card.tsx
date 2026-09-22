"use client";

import React from "react";
import { Check, FileText, AlertCircle, HelpCircle, CheckCircle2, ShieldCheck, Download } from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMMON_REQUIRED_DOCUMENTS } from "@/lib/scholarships/mock-data";

interface DocumentChecklistCardProps {
  documentsOnHand: Record<string, boolean>;
  onToggleDocument: (docId: string) => void;
  documentReadinessPercent: number;
}

export function DocumentChecklistCard({
  documentsOnHand,
  onToggleDocument,
  documentReadinessPercent,
}: DocumentChecklistCardProps) {
  const readyCount = Object.values(documentsOnHand).filter(Boolean).length;
  const totalCount = COMMON_REQUIRED_DOCUMENTS.length;

  return (
    <GlassCard className="p-5 sm:p-6 border-white/10 bg-slate-900/80 space-y-5" glow>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald" size="sm" className="font-mono text-[10px]">
              DOCUMENT READINESS
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">MahaDBT &amp; NSP Checklist</span>
          </div>
          <h3 className="text-lg font-bold text-foreground mt-1">
            4. Universal Scholarship Document Checklist
          </h3>
          <p className="text-xs text-muted-foreground">
            Check off the certificates you already possess so schemes can verify your submission readiness.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5 sm:w-56 shrink-0">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Readiness:</span>
            <span className="font-bold text-emerald-400">
              {readyCount} / {totalCount} ({documentReadinessPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${documentReadinessPercent}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-muted-foreground/80 text-right">
            {documentReadinessPercent >= 80 ? "✓ Application Ready" : "⚠️ Action Required"}
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {COMMON_REQUIRED_DOCUMENTS.map((doc) => {
          const isChecked = !!documentsOnHand[doc.id];
          return (
            <div
              key={doc.id}
              onClick={() => onToggleDocument(doc.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isChecked
                  ? "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50"
                  : "bg-slate-950/60 border-white/10 hover:border-cyan-500/30"
              }`}
            >
              {/* Checkbox */}
              <div
                className={`h-5 w-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isChecked
                    ? "bg-emerald-500 border-emerald-400 text-slate-950 font-bold"
                    : "border-muted-foreground/50 bg-slate-900"
                }`}
              >
                {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
              </div>

              {/* Text */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={`font-bold text-xs ${isChecked ? "text-foreground" : "text-slate-300"}`}>
                    {doc.name}
                  </span>
                  {doc.authority && (
                    <span className="text-[10px] font-mono text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
                      {doc.authority}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-muted-foreground leading-snug">
                  {doc.description}
                </p>

                {doc.sampleTips && (
                  <p className="text-[10px] font-mono text-cyan-400/90 pt-0.5">
                    💡 Tip: {doc.sampleTips}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Government Authority Advisory */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-300">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            <strong>Need your Income Certificate?</strong> Visit your nearest Aaple Sarkar Seva Kendra (CSC) or apply on <code>mahaonline.gov.in</code>.
          </span>
        </div>
        <a
          href="https://aaplesarkar.mahaonline.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-amber-300 hover:text-amber-200 font-mono text-[11px] underline"
        >
          Aaple Sarkar Portal →
        </a>
      </div>
    </GlassCard>
  );
}

