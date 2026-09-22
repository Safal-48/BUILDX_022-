"use client";

import React, { useState } from "react";
import { X, Check, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ScholarshipProfile,
  EducationLevel,
  ReservationCategory,
} from "@/lib/scholarships/types";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ScholarshipProfile;
  onSave: (updatedProfile: ScholarshipProfile) => void;
}

const DISTRICTS_MAHARASHTRA = [
  "Pune",
  "Mumbai Suburban",
  "Nashik",
  "Nagpur",
  "Amravati",
  "Chhatrapati Sambhajinagar (Aurangabad)",
  "Solapur",
  "Kolhapur",
  "Thane",
  "Nanded",
  "Jalgaon",
];

export function ProfileEditModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState<ScholarshipProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...profile });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="cyber" size="sm" className="font-mono text-[10px]">
                ELIGIBILITY ENGINE
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">Live Recalculation</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Update Scholarship Profile
            </h3>
            <p className="text-xs text-muted-foreground">
              Adjust your details to instantly test matching against Maharashtra and Central government schemes.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Class / Education Level */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">
                Current Class / Education Level
              </label>
              <select
                value={formData.classLevel}
                onChange={(e) =>
                  setFormData({ ...formData, classLevel: e.target.value as EducationLevel })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-foreground font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="Class 9">Class 9 (Pre-Matric)</option>
                <option value="Class 10">Class 10 (SSC / CBSE)</option>
                <option value="Class 11">Class 11 (Junior College / HSC)</option>
                <option value="Class 12">Class 12 (Junior College / HSC)</option>
                <option value="ITI Trade">ITI Vocational Trade (NCVT/SCVT)</option>
                <option value="Polytechnic Diploma">Polytechnic Diploma (Engineering)</option>
                <option value="Undergraduate">Undergraduate Degree (B.Sc/B.Com/B.E)</option>
              </select>
            </div>

            {/* Academic Marks */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground flex justify-between">
                <span>Previous Standard Marks (%)</span>
                <span className="font-mono text-cyan-400 font-bold">{formData.marks}%</span>
              </label>
              <input
                type="range"
                min="35"
                max="100"
                step="1"
                value={formData.marks}
                onChange={(e) =>
                  setFormData({ ...formData, marks: Number(e.target.value) })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>35% (Pass)</span>
                <span>55% (NMMSS Min)</span>
                <span>100%</span>
              </div>
            </div>

            {/* Annual Family Income */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground flex justify-between">
                <span>Annual Family Income</span>
                <span className="font-mono text-emerald-400 font-bold">
                  ₹{formData.familyIncome.toLocaleString("en-IN")} / yr
                </span>
              </label>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={formData.familyIncome}
                onChange={(e) =>
                  setFormData({ ...formData, familyIncome: Number(e.target.value) })
                }
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>₹50,000</span>
                <span>₹3.5L (NMMSS Limit)</span>
                <span>₹8.0L (EBC Limit)</span>
              </div>
            </div>

            {/* Reservation Category */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">
                Caste / Reservation Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ReservationCategory,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-foreground font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="General">General / Open (EBC Eligible)</option>
                <option value="OBC">Other Backward Class (OBC)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="VJNT">Vimukta Jati & Nomadic Tribe (VJNT)</option>
                <option value="SBC">Special Backward Class (SBC)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Female", "Male", "Other"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={`py-2 px-3 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer ${
                      formData.gender === g
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-glow-sm"
                        : "bg-slate-950 border-white/10 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Disability Status */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Disability Status (PwD)</label>
              <select
                value={formData.disabilityStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    disabilityStatus: e.target.value as ScholarshipProfile["disabilityStatus"],
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-foreground font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="None">None / General</option>
                <option value="PwD (40%+)">Divyangjan / PwD (40%+ UDID Card)</option>
                <option value="Hearing Impaired">Hearing Impairment</option>
                <option value="Visually Impaired">Visual Impairment</option>
              </select>
            </div>

            {/* District (Maharashtra) */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Home District (Maharashtra)</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-foreground font-mono focus:border-cyan-400 focus:outline-none"
              >
                {DISTRICTS_MAHARASHTRA.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Stream */}
            <div className="space-y-1.5">
              <label className="font-bold text-foreground block">Course / Stream</label>
              <select
                value={formData.stream}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stream: e.target.value as ScholarshipProfile["stream"],
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-foreground font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="Science">Science (PCB / PCM)</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts / Humanities</option>
                <option value="Vocational / ITI">Vocational Trade (ITI Electrician/Fitter)</option>
                <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                <option value="General">General School Education</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset to Original Profile
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                type="button"
                variant="glass"
                size="sm"
                onClick={onClose}
                className="w-full sm:w-auto font-mono text-xs cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="cyber"
                size="sm"
                className="w-full sm:w-auto font-mono text-xs cursor-pointer flex items-center justify-center gap-1.5 font-bold"
              >
                <Sparkles className="h-4 w-4" /> Save &amp; Recalculate
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
