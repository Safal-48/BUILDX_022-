"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  MessageSquare,
  CheckCircle2,
  Send,
  HeartHandshake,
  Clock,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ParentSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName?: string;
  teacherPhone?: string;
  childName?: string;
}

export function ParentSupportModal({
  isOpen,
  onClose,
  teacherName = "Dr. Rajesh Sharma",
  teacherPhone = "+91 98234 56780",
  childName = "Amit Kumar",
}: ParentSupportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>("Sickness / Viral Fever");
  const [parentNotes, setParentNotes] = useState<string>("");
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [language, setLanguage] = useState<"Hindi" | "English" | "Marathi">("Hindi");

  if (!isOpen) return null;

  const reasons = [
    { en: "Sickness / Viral Fever", hi: "बीमारी / बुखार", mr: "आजारी / ताप" },
    { en: "Commute / Bus Problem", hi: "आने-जाने / बस की समस्या", mr: "बस / प्रवासाची अडचण" },
    { en: "Family Urgent Work / Farming", hi: "पारिवारिक काम / खेती", mr: "घरगुती काम / शेती" },
    { en: "Struggling with Studies", hi: "पढ़ाई में परेशानी", mr: "अभ्यासात अडचण" },
  ];

  const getReasonLabel = (r: typeof reasons[0]) => {
    if (language === "Hindi") return r.hi;
    if (language === "Marathi") return r.mr;
    return r.en;
  };

  const getWhatsAppTemplate = () => {
    if (language === "Hindi") {
      return `नमस्ते ${teacherName} सर, मैं ${childName} का अभिभावक हूँ। ${childName} की अनुपस्थिति का कारण: "${selectedReason}". ${parentNotes ? `नोट: ${parentNotes}` : ""} कृपया मुझे बताएं कि वह छूटी हुई पढ़ाई कैसे पूरी कर सकता है।`;
    }
    if (language === "Marathi") {
      return `नमस्कार ${teacherName} सर, मी ${childName} चा पालक आहे. अनुपस्थितीचे कारण: "${selectedReason}". ${parentNotes ? `नोंद: ${parentNotes}` : ""} कृपया अभ्यास कसा पूर्ण करावा ते सांगावे.`;
    }
    return `Namaste ${teacherName} sir, I am the parent of ${childName}. Reason for absence: "${selectedReason}". ${parentNotes ? `Note: ${parentNotes}` : ""} Please let me know how he can catch up on missed lessons.`;
  };

  const handleRequestCallback = () => {
    setCallbackRequested(true);
    setTimeout(() => {
      setCallbackRequested(false);
      onClose();
    }, 2500);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(getWhatsAppTemplate());
    window.open(`https://wa.me/919823456780?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-foreground font-sans">
                {language === "Hindi" ? "शिक्षक से संपर्क करें" : language === "Marathi" ? "शिक्षकांशी संपर्क साधा" : "Contact Child's Teacher"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {teacherName} • {teacherPhone}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {callbackRequested ? (
            <div className="py-10 text-center space-y-3">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-bold text-foreground">
                {language === "Hindi" ? "कॉल बैक अनुरोध भेजा गया!" : language === "Marathi" ? "कॉल बॅक विनंती पाठवली!" : "Callback Request Sent!"}
              </h4>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {language === "Hindi"
                  ? `${teacherName} जी को सूचना भेज दी गई है। वे आपको जल्द ही कॉल करेंगे।`
                  : `${teacherName} has been notified. They will call you back shortly.`}
              </p>
            </div>
          ) : (
            <>
              {/* Language Selector */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-white/10 text-xs">
                <span className="text-muted-foreground font-medium pl-2">भाषा / Language:</span>
                <div className="flex gap-1">
                  {(["Hindi", "English", "Marathi"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                        language === lang
                          ? "bg-emerald-500 text-slate-950 shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {lang === "Hindi" ? "हिंदी" : lang === "Marathi" ? "मराठी" : "English"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Quick Call Button */}
              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase">
                    {language === "Hindi" ? "सीधा फोन कॉल" : "Direct Phone Call"}
                  </div>
                  <div className="text-base font-bold text-foreground mt-0.5">
                    {teacherName}
                  </div>
                  <div className="text-xs text-muted-foreground">{teacherPhone}</div>
                </div>
                <a
                  href={`tel:${teacherPhone}`}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/30 shrink-0"
                >
                  <Phone className="h-4 w-4" />
                  <span>{language === "Hindi" ? "कॉल करें" : "Call Now"}</span>
                </a>
              </div>

              {/* Inform Reason for Absence */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground block">
                  {language === "Hindi"
                    ? "अनुपस्थिति या समस्या का कारण चुनें:"
                    : "Select reason for child's absence / difficulty:"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {reasons.map((r) => {
                    const label = getReasonLabel(r);
                    const isSelected = selectedReason === r.en || selectedReason === label;
                    return (
                      <button
                        key={r.en}
                        type="button"
                        onClick={() => setSelectedReason(label)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-md"
                            : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Message */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground block font-medium">
                  {language === "Hindi" ? "अतिरिक्त संदेश (वैकल्पिक):" : "Optional message for teacher:"}
                </label>
                <input
                  type="text"
                  placeholder={language === "Hindi" ? "उदा. अमित कल से स्कूल आएगा..." : "e.g., Amit will return to school tomorrow..."}
                  value={parentNotes}
                  onChange={(e) => setParentNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-foreground focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Pre-filled Message Preview */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] text-muted-foreground font-bold uppercase block mb-1">
                  WhatsApp Preview:
                </span>
                {getWhatsAppTemplate()}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleRequestCallback}
                  className="w-full py-3 text-xs font-bold border-white/15 text-slate-200 hover:bg-white/5"
                  leftIcon={<Clock className="h-4 w-4 text-cyan-400" />}
                >
                  {language === "Hindi" ? "कॉल बैक का अनुरोध करें" : "Request Callback"}
                </Button>

                <Button
                  variant="glow"
                  onClick={handleWhatsAppSend}
                  className="w-full py-3 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  leftIcon={<Send className="h-4 w-4" />}
                >
                  {language === "Hindi" ? "WhatsApp पर भेजें" : "Send WhatsApp"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

