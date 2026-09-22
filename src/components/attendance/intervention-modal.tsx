"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertTriangle,
  Send,
  BookOpen,
  Eye,
  HeartHandshake,
} from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudentAttendanceRecord, InterventionType } from "@/lib/attendance/types";

interface InterventionModalProps {
  isOpen: boolean;
  student: StudentAttendanceRecord | null;
  initialType?: InterventionType;
  onClose: () => void;
  onSaveIntervention: (studentId: string, type: InterventionType, notes: string) => void;
}

export function InterventionModal({
  isOpen,
  student,
  initialType = "contact_parent",
  onClose,
  onSaveIntervention,
}: InterventionModalProps) {
  const [activeTab, setActiveTab] = useState<InterventionType>(initialType);
  const [parentChannel, setParentChannel] = useState<"whatsapp" | "call" | "sms">("whatsapp");
  const [language, setLanguage] = useState<"Hindi" | "English" | "Marathi">("Hindi");
  const [counsellorName, setCounsellorName] = useState("Mr. D. Varma (School Counsellor)");
  const [counsellingDate, setCounsellingDate] = useState("2026-09-24T10:30");
  const [followupType, setFollowupType] = useState<"drill" | "buddy" | "checkin">("drill");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initial type when opening
  React.useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
    }
    setIsSuccess(false);
  }, [initialType, isOpen]);

  if (!isOpen || !student) return null;

  const hindiTemplate = `नमस्ते ${student.parentInfo.name} जी, यह स्किलोरा डिजिटल स्कूल पोर्टल से शिक्षक का संदेश है। आपके पुत्र/पुत्री ${student.name} पिछले ${student.consecutiveAbsences} दिनों से स्कूल में अनुपस्थित हैं और उनकी उपस्थिति घटकर ${student.overallAttendance}% हो गई है। कृपया हमसे संपर्क करें ताकि उनकी बोर्ड परीक्षा की पढ़ाई प्रभावित न हो।`;

  const englishTemplate = `Namaste ${student.parentInfo.name} ji, this is an official message from Skillora School Portal regarding ${student.name} (Class 12-A). ${student.name} has been absent for ${student.consecutiveAbsences} consecutive days and attendance has declined to ${student.overallAttendance}%. Please get in touch with the school to ensure their board exam preparation remains on track.`;

  const marathiTemplate = `सस्नेह नमस्कार ${student.parentInfo.name} जी, स्किलोरा स्कूल पोर्टलकडून शिक्षक संदेश: आपला पाल्य ${student.name} मागील ${student.consecutiveAbsences} दिवसांपासून अनुपस्थित असून उपस्थिती ${student.overallAttendance}% पर्यंत घसरली आहे. कृपया शिक्षकांशी संपर्क साधावा.`;

  const getMessageBody = () => {
    if (language === "Hindi") return hindiTemplate;
    if (language === "Marathi") return marathiTemplate;
    return englishTemplate;
  };

  const handleExecute = () => {
    let finalNotes = notes;
    if (activeTab === "contact_parent") {
      finalNotes = `Parent notification (${parentChannel.toUpperCase()}) dispatched in ${language} to ${student.parentInfo.phone}. ${notes}`;
    } else if (activeTab === "schedule_counselling") {
      finalNotes = `Counselling session booked with ${counsellorName} for ${counsellingDate}. Note: ${notes}`;
    } else if (activeTab === "teacher_followup") {
      finalNotes = `Teacher follow-up assigned: ${followupType === "drill" ? "15-min Socratic drill" : followupType === "buddy" ? "Peer Study Buddy" : "1-on-1 Check-in"}. ${notes}`;
    } else if (activeTab === "monitor_progress") {
      finalNotes = `Student placed on High-Priority Watchlist with daily attendance alerts. ${notes}`;
    }

    onSaveIntervention(student.id, activeTab, finalNotes);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground font-mono">
                  Recommended Intervention Workflow
                </h3>
                <Badge
                  variant={student.earlyWarning.riskLevel === "high_risk" ? "destructive" : "amber"}
                  size="sm"
                >
                  {student.earlyWarning.riskLevel === "high_risk" ? "High Risk" : "Attendance Declining"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Action for <span className="text-foreground font-bold">{student.name}</span> ({student.rollNumber} • {student.className})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Tabs Bar */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-slate-950/40 text-xs font-mono">
          <button
            type="button"
            onClick={() => { setActiveTab("contact_parent"); setIsSuccess(false); }}
            className={`py-3 px-2 text-center font-bold transition-all border-b-2 ${
              activeTab === "contact_parent"
                ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            1. Contact Parent
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("schedule_counselling"); setIsSuccess(false); }}
            className={`py-3 px-2 text-center font-bold transition-all border-b-2 ${
              activeTab === "schedule_counselling"
                ? "border-purple-400 text-purple-400 bg-purple-500/10"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            2. Counselling
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("teacher_followup"); setIsSuccess(false); }}
            className={`py-3 px-2 text-center font-bold transition-all border-b-2 ${
              activeTab === "teacher_followup"
                ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            3. Teacher Follow-up
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("monitor_progress"); setIsSuccess(false); }}
            className={`py-3 px-2 text-center font-bold transition-all border-b-2 ${
              activeTab === "monitor_progress"
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            4. Monitor Watchlist
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-bold text-foreground font-mono">
                Intervention Successfully Logged!
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm">
                The institutional record and teacher activity log have been updated for {student.name}.
              </p>
            </div>
          ) : (
            <>
              {/* TAB 1: CONTACT PARENT */}
              {activeTab === "contact_parent" && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs text-emerald-400 font-mono font-bold">
                        GUARDIAN CONTACT DETAILS
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {student.parentInfo.name} ({student.parentInfo.relation})
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Phone: {student.parentInfo.phone} • Preferred: {student.parentInfo.preferredLanguage}
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setParentChannel("whatsapp")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          parentChannel === "whatsapp"
                            ? "bg-emerald-500 text-slate-950 font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setParentChannel("sms")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          parentChannel === "sms"
                            ? "bg-emerald-500 text-slate-950 font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        SMS
                      </button>
                      <button
                        type="button"
                        onClick={() => setParentChannel("call")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          parentChannel === "call"
                            ? "bg-emerald-500 text-slate-950 font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        Call Log
                      </button>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-muted-foreground">Notification Language:</span>
                    <div className="flex gap-2">
                      {(["Hindi", "English", "Marathi"] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setLanguage(lang)}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                            language === lang
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Preview Box */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-muted-foreground">
                      MESSAGE TEMPLATE PREVIEW:
                    </label>
                    <div className="p-3.5 rounded-xl border border-white/10 bg-slate-950 font-sans text-xs text-slate-200 leading-relaxed">
                      {getMessageBody()}
                    </div>
                  </div>

                  {/* Additional Teacher Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Optional Teacher Notes (for official school record):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Parent acknowledged, student recovering from viral fever..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-foreground focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: SCHEDULE COUNSELLING */}
              {activeTab === "schedule_counselling" && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-950/20 space-y-1">
                    <div className="text-xs text-purple-400 font-mono font-bold">
                      EARLY-STAGE GUIDANCE &amp; EMOTIONAL WELL-BEING
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Connect student with institutional psychological and academic counsellors to address underlying causes: family distress, commute barriers, or peer friction.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-muted-foreground">
                        SELECT COUNSELLOR:
                      </label>
                      <select
                        value={counsellorName}
                        onChange={(e) => setCounsellorName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-foreground focus:outline-none focus:border-purple-500"
                      >
                        <option value="Mr. D. Varma (School Counsellor)">Mr. D. Varma (School Counsellor)</option>
                        <option value="Dr. Pratibha Joshi (Career & Stress Mentor)">Dr. Pratibha Joshi (Career &amp; Stress Mentor)</option>
                        <option value="Mrs. Anita Kulkarni (Municipal Liaison)">Mrs. Anita Kulkarni (Municipal Liaison)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-muted-foreground">
                        SESSION DATE &amp; TIME:
                      </label>
                      <input
                        type="datetime-local"
                        value={counsellingDate}
                        onChange={(e) => setCounsellingDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-foreground focus:outline-none focus:border-purple-500"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Referral Context / Specific Reason:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Student has missed 5 consecutive days after scoring low on midterms. Check for exam anxiety or family migration pressures..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-foreground focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: TEACHER FOLLOW-UP */}
              {activeTab === "teacher_followup" && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 space-y-1">
                    <div className="text-xs text-cyan-400 font-mono font-bold">
                      ACADEMIC CATCH-UP &amp; PEER SUPPORT
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Reinforce classroom belonging through targeted 1-on-1 interactions or paired peer learning.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "drill", label: "15-Min Remedial Drill", desc: "Automated Socratic bridge practice" },
                      { id: "buddy", label: "Assign Peer Buddy", desc: "Pair with Pooja Kumari (Top Rank)" },
                      { id: "checkin", label: "Post-Class Check-in", desc: "10-min personal conversation" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFollowupType(item.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          followupType === item.id
                            ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                            : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-bold font-mono">{item.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">{item.desc}</div>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Follow-up Task Details:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Provide printed worksheet for missed Quadratic Equation proofs..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-foreground focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: MONITOR PROGRESS */}
              {activeTab === "monitor_progress" && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-950/20 space-y-1">
                    <div className="text-xs text-amber-400 font-mono font-bold">
                      PRIORITY ATTENDANCE WATCHLIST
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Tag student for automated daily alerts. If absent for 1 additional day, the system automatically escalates to the Vice Principal and Parent SMS dispatch.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 bg-slate-950 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Target Minimum Attendance:</span>
                      <span className="text-emerald-400 font-bold">75.0% by Midterm</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Required Present Days:</span>
                      <span className="text-cyan-400 font-bold">14 consecutive sessions</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Escalation Threshold:</span>
                      <span className="text-rose-400 font-bold">&gt;1 additional unexcused absence</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">
                      Watchlist Notes / Monitoring Goal:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Monitor bus commute arrival every morning for next 2 weeks..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-foreground focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isSuccess && (
          <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-xs font-mono">
              Cancel
            </Button>
            <Button
              variant="glow"
              size="sm"
              onClick={handleExecute}
              className="text-xs font-mono"
              leftIcon={<Send className="h-4 w-4" />}
            >
              Confirm &amp; Log Intervention
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

