"use client";

import React, { useState } from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  Calendar,
  Building2,
  Edit2,
  Save,
  Check,
  X,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ScholarshipApplication,
  ApplicationStatus,
} from "@/lib/scholarships/types";

interface ApplicationTrackerViewProps {
  applications: ScholarshipApplication[];
  onUpdateStatus: (id: string, newStatus: ApplicationStatus, notes?: string) => void;
  onRemoveApplication?: (id: string) => void;
}

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; badgeVariant: "glass" | "amber" | "cyber" | "violet" | "emerald" | "destructive"; description: string }
> = {
  not_started: {
    label: "Not Started",
    badgeVariant: "glass",
    description: "You have shortlisted this scheme but haven't started registration yet.",
  },
  documents_pending: {
    label: "Documents Pending",
    badgeVariant: "amber",
    description: "1 or more required certificates (e.g. Income/Bank) are missing.",
  },
  applied: {
    label: "Applied",
    badgeVariant: "cyber",
    description: "Application submitted on portal. Awaiting institution verification.",
  },
  under_review: {
    label: "Under Review",
    badgeVariant: "violet",
    description: "School Headmaster or District Welfare Officer is scrutinizing forms.",
  },
  approved: {
    label: "Approved",
    badgeVariant: "emerald",
    description: "Scheme approved! Direct DBT transfer scheduled to your bank.",
  },
  rejected: {
    label: "Rejected",
    badgeVariant: "destructive",
    description: "Application flagged for error. You can appeal or re-apply with corrected docs.",
  },
};

export function ApplicationTrackerView({
  applications,
  onUpdateStatus,
  onRemoveApplication,
}: ApplicationTrackerViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<ApplicationStatus>("applied");
  const [editNotes, setEditNotes] = useState<string>("");

  const handleStartEdit = (app: ScholarshipApplication) => {
    setEditingId(app.id);
    setEditStatus(app.status);
    setEditNotes(app.notes || "");
  };

  const handleSaveEdit = (id: string) => {
    onUpdateStatus(id, editStatus, editNotes);
    setEditingId(null);
  };

  if (applications.length === 0) {
    return (
      <GlassCard className="p-8 text-center space-y-4 border-white/10 bg-slate-900/80">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <FileText className="h-6 w-6" />
        </div>
        <div className="space-y-1 max-w-md mx-auto">
          <h4 className="font-bold text-base text-foreground">No Tracked Applications Yet</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Browse matching scholarships above and click <strong>&ldquo;+ Add to Tracker&rdquo;</strong> to track your submission lifecycle, acknowledgement IDs, and DBT disbursement.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => {
        const config = STATUS_CONFIG[app.status] || STATUS_CONFIG.not_started;
        const isEditing = editingId === app.id;

        return (
          <GlassCard
            key={app.id}
            className="p-5 sm:p-6 border-white/10 bg-slate-900/80 space-y-4 relative overflow-hidden"
            glow={app.status === "approved"}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={config.badgeVariant} size="sm" className="font-mono text-[10px] font-bold uppercase">
                    {config.label}
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Portal: <strong className="text-foreground">{app.portalName}</strong>
                  </span>
                  {app.applicationId && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      ID: {app.applicationId}
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-bold text-foreground">
                  {app.scholarshipTitle}
                </h4>
                <p className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                  <span>{app.provider}</span>
                  <span>•</span>
                  <span className="text-amber-300 font-bold">{app.benefitAmount}</span>
                </p>
              </div>

              {/* Status Action */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <a
                  href={app.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl transition-colors"
                >
                  <span>Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                {!isEditing ? (
                  <Button
                    type="button"
                    variant="glass"
                    size="sm"
                    onClick={() => handleStartEdit(app)}
                    className="text-xs font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="h-3 w-3 text-cyan-400" />
                    <span>Update Status</span>
                  </Button>
                ) : (
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="cyber"
                      size="sm"
                      onClick={() => handleSaveEdit(app.id)}
                      className="text-xs font-mono flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Save className="h-3 w-3" /> Save
                    </Button>
                    <Button
                      type="button"
                      variant="glass"
                      size="sm"
                      onClick={() => setEditingId(null)}
                      className="text-xs font-mono cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {onRemoveApplication && (
                  <button
                    type="button"
                    onClick={() => onRemoveApplication(app.id)}
                    title="Remove from tracker"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Editing State Form */}
            {isEditing ? (
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3 text-xs animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-foreground block font-mono">
                      Change Status:
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as ApplicationStatus)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-foreground font-mono focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="not_started">Not Started</option>
                      <option value="documents_pending">Documents Pending</option>
                      <option value="applied">Applied (Submitted)</option>
                      <option value="under_review">Under Review</option>
                      <option value="approved">Approved (Sanctioned)</option>
                      <option value="rejected">Rejected (Needs Correction)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground block font-mono">
                      Notes / Application Reference:
                    </label>
                    <input
                      type="text"
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="e.g. Scrutiny pending at Tahsil office..."
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-foreground font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Non-editing Status Notes & Timeline */
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Status Note: </span>
                  {app.notes || config.description}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/80 shrink-0">
                  Last Updated: {app.lastUpdated}
                </div>
              </div>
            )}
          </GlassCard>
        );
      })}
    </div>
  );
}

