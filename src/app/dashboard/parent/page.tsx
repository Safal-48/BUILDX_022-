"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  Calendar,
  AlertTriangle,
  BookOpen,
  Phone,
  MessageSquare,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  Bell,
  Volume2,
  HelpCircle,
  FileText,
  User,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParentSupportModal } from "@/components/parent/parent-support-modal";
import { SlideUp } from "@/components/animations/motion-wrapper";

type ParentLang = "en" | "hi" | "mr";
type ActiveDetailModal = "attendance" | "academics" | "alerts" | "announcements" | null;

export default function SimpleParentDashboard() {
  const [lang, setLang] = useState<ParentLang>("en");
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState<ActiveDetailModal>(null);

  // Localization strings
  const t = {
    en: {
      portalTitle: "Your Child's Education",
      subtitle: "Simple, easy overview for parents. Understand your child's situation in seconds.",
      childName: "Amit Kumar",
      childMeta: "Class 12-A • Roll No. 12A-18 • Municipal Adarsh Vidyalaya",
      teacherInfo: "Class Teacher: Dr. Rajesh Sharma (+91 98234 56780)",
      alertsTitle: "Urgent School Alerts",
      alert1: "⚠️ Amit has been absent for 3 consecutive days.",
      alert1Desc: "Please contact the class teacher or inform the school about the reason.",
      alert2: "📢 Parent-teacher meeting on Saturday.",
      alert2Desc: "Time: 10:00 AM in Classroom 12-A. Please attend to discuss Board Exam prep.",
      alert3: "🎓 Scholarship application deadline in 5 days.",
      alert3Desc: "MahaDBT Post-Matric Scholarship (₹25,000/yr). Income certificate needed.",
      attendanceTitle: "Attendance",
      attendanceVal: "63%",
      attendanceSub: "Low — Needs 75% for Board Exams",
      learningTitle: "Learning Progress",
      learningVal: "72%",
      learningSub: "Good syllabus coverage on portal",
      assignmentsTitle: "Assignments",
      assignmentsVal: "4 / 6",
      assignmentsSub: "2 homework sets pending",
      examTitle: "Upcoming Exam",
      examVal: "Mathematics — Friday",
      examSub: "Calculus & Quadratic Equations",
      btnAttendance: "View Attendance",
      btnAcademics: "View Academic Progress",
      btnAlerts: "View Alerts",
      btnAnnouncements: "View School Announcements",
      btnContact: "Contact / Request Teacher Support",
      callTeacher: "Call Teacher",
      messageTeacher: "Send WhatsApp",
    },
    hi: {
      portalTitle: "आपके बच्चे की शिक्षा",
      subtitle: "अभिभावकों के लिए सरल और स्पष्ट जानकारी। 5 सेकंड में समझें बच्चे की स्थिति।",
      childName: "अमित कुमार",
      childMeta: "कक्षा 12-A • रोल नंबर 12A-18 • म्युनिसिपल आदर्श विद्यालय",
      teacherInfo: "कक्षा शिक्षक: डॉ. राजेश शर्मा (+91 98234 56780)",
      alertsTitle: "ज़रूरी सूचनाएं (अलर्ट)",
      alert1: "⚠️ अमित पिछले 3 दिनों से लगातार स्कूल नहीं आ रहा है।",
      alert1Desc: "कृपया कक्षा शिक्षक से बात करें या स्कूल को अनुपस्थिति का कारण बताएं।",
      alert2: "📢 इस शनिवार को अभिभावक-शिक्षक बैठक (PTM) है।",
      alert2Desc: "समय: सुबह 10:00 बजे, कमरा 12-A। बोर्ड परीक्षा की तैयारी पर चर्चा होगी।",
      alert3: "🎓 स्कॉलरशिप फॉर्म जमा करने की अंतिम तिथि 5 दिन में है।",
      alert3Desc: "महाDBT पोस्ट-मैट्रिक स्कॉलरशिप (₹25,000/वर्ष)। आय प्रमाण पत्र ज़रूरी है।",
      attendanceTitle: "उपस्थिति (हाज़िरी)",
      attendanceVal: "63%",
      attendanceSub: "कम है — बोर्ड परीक्षा के लिए 75% ज़रूरी है",
      learningTitle: "पढ़ाई की प्रगति",
      learningVal: "72%",
      learningSub: "मोबाइल पोर्टल पर अच्छा अभ्यास चल रहा है",
      assignmentsTitle: "गृहकार्य (होमवर्क)",
      assignmentsVal: "4 / 6",
      assignmentsSub: "2 होमवर्क अभी बाकी हैं",
      examTitle: "अगली परीक्षा",
      examVal: "गणित — शुक्रवार",
      examSub: "कैलकुलस और द्विघात समीकरण",
      btnAttendance: "हाज़िरी का पूरा ब्यौरा देखें",
      btnAcademics: "विषयवार नंबर और प्रगति देखें",
      btnAlerts: "सभी स्कूल अलर्ट देखें",
      btnAnnouncements: "स्कूल की घोषणाएं देखें",
      btnContact: "शिक्षक से संपर्क करें / मदद मांगें",
      callTeacher: "शिक्षक को कॉल करें",
      messageTeacher: "WhatsApp पर संदेश भेजें",
    },
    mr: {
      portalTitle: "आपल्या पाल्याचे शिक्षण",
      subtitle: "पालकांसाठी अत्यंत सोपी आणि स्पष्ट माहिती. ५ सेकंदात समजून घ्या पाल्याची प्रगती.",
      childName: "अमित कुमार",
      childMeta: "इयत्ता १२ वी - अ • हजेरी क्र. 12A-18 • मनपा आदर्श विद्यालय",
      teacherInfo: "वर्गशिक्षक: डॉ. राजेश शर्मा (+91 98234 56780)",
      alertsTitle: "महत्त्वाच्या सूचना (अलर्ट)",
      alert1: "⚠️ अमित सलग ३ दिवसांपासून शाळेत गैरहजर आहे.",
      alert1Desc: "कृपया वर्गशिक्षकांशी संपर्क साधा किंवा गैरहजेरीचे कारण कळवा.",
      alert2: "📢 या शनिवारी पालक-शिक्षक सभा (PTM) आहे.",
      alert2Desc: "वेळ: सकाळी १०:०० वाजता, वर्ग १२-अ. बोर्ड परीक्षेच्या तयारीवर चर्चा.",
      alert3: "🎓 शिष्यवृत्ती अर्ज भरण्याची मुदत ५ दिवसात संपत आहे.",
      alert3Desc: "महाDBT पोस्ट-मॅट्रिक शिष्यवृत्ती (₹२५,०००/वर्ष). उत्पन्नाचा दाखला आवश्यक.",
      attendanceTitle: "शाळेतील उपस्थिती",
      attendanceVal: "63%",
      attendanceSub: "कमी आहे — परीक्षेसाठी ७५% उपस्थिती आवश्यक",
      learningTitle: "अभ्यासाची प्रगती",
      learningVal: "72%",
      learningSub: "पोर्टलवर अभ्यासक्रम समाधानकारक सुरू आहे",
      assignmentsTitle: "गृहपाठ (अभ्यास)",
      assignmentsVal: "4 / 6",
      assignmentsSub: "२ गृहपाठ जमा करणे बाकी आहे",
      examTitle: "पुढील परीक्षा",
      examVal: "गणित — शुक्रवार",
      examSub: "कॅल्क्युलस आणि समीकरणे",
      btnAttendance: "हजेरी तपशील पहा",
      btnAcademics: "विषयवार गुण आणि प्रगती पहा",
      btnAlerts: "शाळेच्या सर्व सूचना पहा",
      btnAnnouncements: "शालेय घोषणा पहा",
      btnContact: "शिक्षकांशी संपर्क साधा / मदत मागा",
      callTeacher: "शिक्षकांना कॉल करा",
      messageTeacher: "WhatsApp वर मेसेज करा",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-10">
      <Container size="lg">
        <SlideUp>
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Top Bar with Language Toggle & Low Data Indicator */}
            <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900 border border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-sans font-bold text-slate-300">
                  {lang === "hi" ? "कम डेटा मोड (Low Data)" : lang === "mr" ? "कमी डेटा मोड (Low Data)" : "Low Data Parent Mode"}
                </span>
              </div>

              {/* Language Switcher Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                    lang === "en" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("hi")}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                    lang === "hi" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => setLang("mr")}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                    lang === "mr" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Main Header Card: "Your Child's Education" */}
            <GlassCard className="p-6 sm:p-8 border-2 border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 rounded-3xl" glow>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono tracking-widest text-amber-400 uppercase">
                    Skillora Parent Portal
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if ("speechSynthesis" in window) {
                        const utterance = new SpeechSynthesisUtterance(
                          `${t.childName}. Attendance ${t.attendanceVal}. Learning Progress ${t.learningVal}. ${t.alert1}`
                        );
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 text-xs font-bold"
                    title="Audio readout"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>{lang === "hi" ? "सुने" : lang === "mr" ? "ऐका" : "Listen"}</span>
                  </button>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-foreground font-sans tracking-tight">
                  {t.portalTitle}
                </h1>

                {/* Child Name & Details (Large & Highly Legible) */}
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/10 space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-amber-300">
                    {t.childName}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">
                    {t.childMeta}
                  </div>
                  <div className="text-xs text-muted-foreground pt-1">
                    {t.teacherInfo}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* ========================================================================= */}
            {/* IMPORTANT ALERTS FIRST (Large, High Contrast Banners) */}
            {/* ========================================================================= */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 px-1">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
                <span>{t.alertsTitle}</span>
              </div>

              {/* Alert 1: 3 Consecutive Absences (Critical) */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-rose-500/50 bg-rose-950/30 shadow-lg space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-base sm:text-lg font-black text-rose-200">
                    {t.alert1}
                  </div>
                  <Badge variant="destructive" size="sm" className="shrink-0 font-bold">
                    Urgent
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-rose-300/90 leading-relaxed">
                  {t.alert1Desc}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSupportModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{t.callTeacher}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupportModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{t.messageTeacher}</span>
                  </button>
                </div>
              </div>

              {/* Alert 2: Parent-Teacher Meeting */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-cyan-500/40 bg-cyan-950/20 shadow-md space-y-1.5">
                <div className="text-base sm:text-lg font-black text-cyan-200">
                  {t.alert2}
                </div>
                <p className="text-xs sm:text-sm text-cyan-300/90 leading-relaxed">
                  {t.alert2Desc}
                </p>
              </div>

              {/* Alert 3: Scholarship Deadline */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-amber-500/40 bg-amber-950/20 shadow-md space-y-1.5">
                <div className="text-base sm:text-lg font-black text-amber-200">
                  {t.alert3}
                </div>
                <p className="text-xs sm:text-sm text-amber-300/90 leading-relaxed">
                  {t.alert3Desc}
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* BIG 4 STATUS CARDS (Large Readable Text, Instant Comprehension) */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Attendance */}
              <div className="p-5 rounded-2xl border-2 border-rose-500/40 bg-slate-900 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase">
                    {t.attendanceTitle}
                  </span>
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-500 animate-ping" />
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl sm:text-5xl font-black text-rose-400 font-sans">
                    {t.attendanceVal}
                  </div>
                  <span className="text-2xl">🔴</span>
                </div>
                <div className="text-xs sm:text-sm text-rose-300/90 font-medium">
                  {t.attendanceSub}
                </div>
              </div>

              {/* Card 2: Learning Progress */}
              <div className="p-5 rounded-2xl border-2 border-emerald-500/40 bg-slate-900 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase">
                    {t.learningTitle}
                  </span>
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-sans">
                    {t.learningVal}
                  </div>
                  <span className="text-2xl">🟢</span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-300/90 font-medium">
                  {t.learningSub}
                </div>
              </div>

              {/* Card 3: Assignments */}
              <div className="p-5 rounded-2xl border-2 border-white/20 bg-slate-900 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase">
                    {t.assignmentsTitle}
                  </span>
                  <FileText className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-cyan-300 font-sans">
                  {t.assignmentsVal}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {t.assignmentsSub}
                </div>
              </div>

              {/* Card 4: Upcoming Exam */}
              <div className="p-5 rounded-2xl border-2 border-purple-500/40 bg-slate-900 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase">
                    {t.examTitle}
                  </span>
                  <Calendar className="h-4 w-4 text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-300 font-sans leading-tight">
                  {t.examVal}
                </div>
                <div className="text-xs sm:text-sm text-purple-200/90 font-medium">
                  {t.examSub}
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 5 SIMPLE PARENT ACTIONS (Large Touch Targets, Minimal Navigation) */}
            {/* ========================================================================= */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                {lang === "hi" ? "ज़रूरी विकल्प (Options)" : lang === "mr" ? "उपयुक्त पर्याय (Options)" : "Parent Options"}
              </div>

              {/* Action 1: View Attendance */}
              <button
                type="button"
                onClick={() => setDetailModal("attendance")}
                className="w-full p-4 sm:p-5 rounded-2xl border-2 border-white/10 bg-slate-900 hover:bg-white/5 hover:border-amber-500/40 text-left transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-foreground">
                      {t.btnAttendance}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang === "hi" ? "महीने भर की हाज़िरी और गैरहाज़िर दिन देखें" : "See monthly attendance records and absent days"}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Action 2: View Academic Progress */}
              <button
                type="button"
                onClick={() => setDetailModal("academics")}
                className="w-full p-4 sm:p-5 rounded-2xl border-2 border-white/10 bg-slate-900 hover:bg-white/5 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-foreground">
                      {t.btnAcademics}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang === "hi" ? "गणित, विज्ञान, अंग्रेज़ी के नंबर देखें" : "See subject marks in Math, Physics, Chemistry, English"}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Action 3: View Alerts */}
              <button
                type="button"
                onClick={() => setDetailModal("alerts")}
                className="w-full p-4 sm:p-5 rounded-2xl border-2 border-white/10 bg-slate-900 hover:bg-white/5 hover:border-rose-500/40 text-left transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                    <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-foreground">
                      {t.btnAlerts}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang === "hi" ? "स्कूल और शिक्षक द्वारा भेजे गए सभी संदेश" : "All notices dispatched by school and class teacher"}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Action 4: View School Announcements */}
              <button
                type="button"
                onClick={() => setDetailModal("announcements")}
                className="w-full p-4 sm:p-5 rounded-2xl border-2 border-white/10 bg-slate-900 hover:bg-white/5 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-foreground">
                      {t.btnAnnouncements}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang === "hi" ? "छुट्टियां, परीक्षा समय सारणी और सरकारी योजनाएं" : "Holidays, exam timetables, and government welfare schemes"}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Action 5: Contact / Request Teacher Support (Prominent CTA) */}
              <button
                type="button"
                onClick={() => setSupportModalOpen(true)}
                className="w-full p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/30 hover:border-emerald-400 text-left transition-all flex items-center justify-between group shadow-xl"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="h-6 w-6 sm:h-7 sm:w-7 animate-bounce" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-black text-emerald-300">
                      {t.btnContact}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300">
                      {lang === "hi" ? "डॉ. राजेश शर्मा से सीधा कॉल या WhatsApp पर बात करें" : "Direct phone call or WhatsApp message to Dr. Rajesh Sharma"}
                    </div>
                  </div>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm shrink-0">
                  {lang === "hi" ? "बात करें" : "Connect"}
                </div>
              </button>
            </div>
          </div>
        </SlideUp>
      </Container>

      {/* ========================================================================= */}
      {/* SIMPLE DETAIL DIALOGS (Zero complex charts, clear reading lists) */}
      {/* ========================================================================= */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-white/20 rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-foreground">
                {detailModal === "attendance" && (lang === "hi" ? "हाज़िरी का ब्यौरा" : "Attendance Record")}
                {detailModal === "academics" && (lang === "hi" ? "विषयवार नंबर और प्रगति" : "Academic Marks & Progress")}
                {detailModal === "alerts" && (lang === "hi" ? "सभी सूचनाएं" : "All School Alerts")}
                {detailModal === "announcements" && (lang === "hi" ? "शालेय घोषणाएं" : "School Announcements")}
              </h3>
              <button
                type="button"
                onClick={() => setDetailModal(null)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                {lang === "hi" ? "बंद करें" : "Close"}
              </button>
            </div>

            {/* Modal Body 1: Attendance */}
            {detailModal === "attendance" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center">
                  <div className="text-3xl font-black text-rose-400">63%</div>
                  <p className="text-rose-200 mt-1">
                    {lang === "hi" ? "38 दिन उपस्थित • 19 दिन अनुपस्थित • 3 दिन देरी" : "38 Days Present • 19 Days Absent • 3 Days Late"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-slate-300">
                    {lang === "hi" ? "पिछले 4 सप्ताह की स्थिति:" : "Last 4 Weeks Status:"}
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                      <div className="text-[10px] text-muted-foreground">Wk 1</div>
                      <div className="font-bold text-foreground">82%</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                      <div className="text-[10px] text-muted-foreground">Wk 2</div>
                      <div className="font-bold text-foreground">76%</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                      <div className="text-[10px] text-muted-foreground">Wk 3</div>
                      <div className="font-bold text-foreground">69%</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40">
                      <div className="text-[10px] text-rose-300">Wk 4</div>
                      <div className="font-black text-rose-400">63%</div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {lang === "hi" ? "कृपया बच्चे को नियमित स्कूल भेजें ताकि बोर्ड परीक्षा में बैठने की अनुमति मिल सके।" : "Please ensure regular school attendance to remain eligible for the State Board Exams."}
                </p>
              </div>
            )}

            {/* Modal Body 2: Academic Progress */}
            {detailModal === "academics" && (
              <div className="space-y-3 text-xs">
                {[
                  { name: "Mathematics (गणित)", score: "48%", status: "Needs Improvement (मेहनत की ज़रूरत)", color: "text-rose-400" },
                  { name: "Physics (भौतिक विज्ञान)", score: "54%", status: "Passing (उत्तीर्ण)", color: "text-amber-400" },
                  { name: "Chemistry (रसायन विज्ञान)", score: "62%", status: "Good (अच्छा)", color: "text-emerald-400" },
                  { name: "English Core (अंग्रेज़ी)", score: "70%", status: "Very Good (बहुत अच्छा)", color: "text-emerald-400" },
                ].map((sub, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground text-sm">{sub.name}</div>
                      <div className="text-[11px] text-muted-foreground">{sub.status}</div>
                    </div>
                    <div className={`text-xl font-black ${sub.color}`}>{sub.score}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Body 3: Alerts */}
            {detailModal === "alerts" && (
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                  <div className="font-bold text-rose-300">⚠️ 3 दिन की लगातार गैरहाज़िरी दर्ज</div>
                  <div className="text-muted-foreground">आज सुबह 08:45 बजे शिक्षक द्वारा दर्ज की गई।</div>
                </div>
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                  <div className="font-bold text-cyan-300">📢 शनिवार को पालक-शिक्षक सभा</div>
                  <div className="text-muted-foreground">समय: सुबह 10:00 बजे। कृपया अपनी उपस्थिति दर्ज कराएं।</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <div className="font-bold text-amber-300">🎓 महाDBT स्कॉलरशिप अंतिम तारीख 30 सितंबर</div>
                  <div className="text-muted-foreground">तहसीलदार का आय प्रमाण पत्र जमा करना बाकी है।</div>
                </div>
              </div>
            )}

            {/* Modal Body 4: School Announcements */}
            {detailModal === "announcements" && (
              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="font-bold text-foreground">📘 नि:शुल्क पाठ्यपुस्तक व वर्दी वितरण</div>
                  <p className="text-muted-foreground">सरकारी योजना के तहत सभी छात्रों को नई अभ्यास पुस्तिकाएं वितरित की जा चुकी हैं।</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="font-bold text-foreground">🪔 दिवाली अवकाश सूचना</div>
                  <p className="text-muted-foreground">विद्यालय 20 अक्टूबर से 4 नवंबर तक बंद रहेगा। छुट्टियों के लिए गृहकार्य दिया जाएगा।</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <div className="font-bold text-foreground">🚌 ग्रामीण बस पास नवीनीकरण</div>
                  <p className="text-muted-foreground">छात्र रियायती एसटी बस पास के लिए प्रधानाचार्य कार्यालय में संपर्क करें।</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Teacher Support Modal */}
      <ParentSupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        childName={t.childName}
      />
    </div>
  );
}

