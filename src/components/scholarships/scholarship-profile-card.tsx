"use client";

import React, { useState } from "react";
import { UserCheck, SlidersHorizontal, CheckCircle2, ShieldCheck, MapPin, GraduationCap, IndianRupee } from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScholarshipProfile } from "@/lib/scholarships/types";
import { ProfileEditModal } from "./profile-edit-modal";

interface ScholarshipProfileCardProps {
  profile: ScholarshipProfile;
  onProfileUpdate: (updated: ScholarshipProfile) => void;
  documentReadinessPercent: number;
}

export function ScholarshipProfileCard({
  profile,
  onProfileUpdate,
  documentReadinessPercent,
}: ScholarshipProfileCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GlassCard className="p-5 sm:p-6 border-cyan-500/20 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-cyan-950/20 relative overflow-hidden" glow>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyber" size="sm" className="font-mono text-[10px] uppercase font-bold">
                1. Scholarship Profile
              </Badge>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Auto-Synced with School Record
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                {profile.fullName}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono flex flex-wrap items-center gap-2">
                <span>{profile.classLevel} ({profile.stream})</span>
                <span>•</span>
                <span>Category: <strong className="text-cyan-300">{profile.category}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="h-3 w-3 text-cyan-400" /> {profile.district}, {profile.state}
                </span>
              </p>
            </div>

            {/* Micro pills of key matching parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">Academic Marks</span>
                <span className="text-sm font-bold font-mono text-cyan-300">{profile.marks}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">Family Income</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  ₹{profile.familyIncome.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">Gender &amp; PwD</span>
                <span className="text-sm font-bold font-mono text-foreground">
                  {profile.gender} {profile.disabilityStatus !== "None" ? "(PwD)" : ""}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                <span className="text-[10px] font-mono text-muted-foreground uppercase block">Doc Readiness</span>
                <span className="text-sm font-bold font-mono text-amber-400">
                  {documentReadinessPercent}% Ready
                </span>
              </div>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2.5 shrink-0">
            <Button
              variant="cyber"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="font-mono text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
              <span>Edit Eligibility Profile</span>
            </Button>
            <span className="text-[10px] font-mono text-muted-foreground text-center lg:text-right">
              Test what-if scenarios (income/marks/caste)
            </span>
          </div>
        </div>
      </GlassCard>

      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        onSave={onProfileUpdate}
      />
    </>
  );
}
