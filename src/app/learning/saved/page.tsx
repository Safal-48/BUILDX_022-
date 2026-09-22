"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  Wifi,
  WifiOff,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
  HardDrive,
  Copy,
  Check,
  Award,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import { useLowData } from "@/lib/accessibility/low-data-context";
import {
  PRELOADED_OFFLINE_RESOURCES,
  OfflineResource,
  downloadNotesAsTxt,
} from "@/lib/offline/saved-learning-engine";

export default function OfflineSavedLearningPage() {
  const { isOnline, isLowData, toggleLowData, estimatedDataSavedMb } = useLowData();
  const [activeTab, setActiveTab] = useState<"all" | "notes" | "lessons" | "quiz">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>("note-trig-01");

  // Offline Quiz State (100% Client-Side)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const filteredResources = PRELOADED_OFFLINE_RESOURCES.filter((res) => {
    if (activeTab === "all") return true;
    if (activeTab === "notes") return res.type === "notes";
    if (activeTab === "lessons") return res.type === "lesson";
    if (activeTab === "quiz") return res.type === "quiz";
    return true;
  });

  const handleDownloadTxt = (res: OfflineResource) => {
    downloadNotesAsTxt(res.title, res.content);
    setDownloadedId(res.id);
    setTimeout(() => setDownloadedId(null), 3000);
  };

  const handleCopyContent = (res: OfflineResource) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(res.content);
      setCopiedId(res.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleQuizAnswer = (qId: string, optIdx: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleQuizSubmit = () => {
    const quizResource = PRELOADED_OFFLINE_RESOURCES.find((r) => r.type === "quiz");
    if (!quizResource?.quizQuestions) return;

    let correct = 0;
    quizResource.quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });

    const scorePercent = Math.round((correct / quizResource.quizQuestions.length) * 100);
    setQuizScore(scorePercent);
    setIsQuizSubmitted(true);
  };

  const handleQuizReset = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
  };

  const quizResource = PRELOADED_OFFLINE_RESOURCES.find((r) => r.type === "quiz");

  return (
    <div className="py-10 space-y-8 min-h-screen bg-slate-950 text-foreground">
      <Container size="xl" className="space-y-6 max-w-5xl">
        {/* Header Section */}
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <HardDrive className="h-4 w-4" />
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Device Memory Storage
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  100% Offline Ready
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                Offline / Saved Learning
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Access your downloaded study notes, text lessons, and practice drills anytime — even with zero mobile data or no cellular signal.
              </p>
            </div>

            {/* Live Data-Saver Status */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={toggleLowData}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isLowData
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-glow-sm"
                    : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Low Data: {isLowData ? "ON (Saving 75%)" : "OFF"}</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* GENUINE NETWORK & OFFLINE INTEGRITY BANNER */}
        <SlideUp delay={0.05}>
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${
              isOnline
                ? "bg-slate-900/80 border-white/10 text-slate-300"
                : "bg-amber-950/40 border-amber-500/40 text-amber-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`p-2 rounded-xl flex items-center justify-center ${
                  isOnline
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                }`}
              >
                {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              </span>
              <div>
                <div className="font-bold flex items-center gap-2">
                  <span>{isOnline ? "Network Status: Online" : "⚠️ Offline Mode Active (No Internet)"}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-slate-400">
                    0 KB Data Consumed
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  All 7 saved resources below are stored directly on your phone or computer memory. You can read and practice without consuming mobile data.
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-emerald-400 font-bold block">7 Packets Ready Locally</span>
              <span className="text-[10px] text-slate-400">Est. Data Saved: ~{estimatedDataSavedMb} MB</span>
            </div>
          </div>
        </SlideUp>

        {/* CATEGORY SWITCHER TABS */}
        <SlideUp delay={0.1}>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/[0.06]">
            {[
              { id: "all", label: "All Saved Content", count: PRELOADED_OFFLINE_RESOURCES.length },
              { id: "notes", label: "📝 Formula & Summary Notes", count: 4 },
              { id: "lessons", label: "📖 Offline Text Lessons", count: 2 },
              { id: "quiz", label: "🎯 Offline Practice Probe", count: 1 },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-cyan-500/30 text-cyan-200" : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </SlideUp>

        {/* MAIN OFFLINE RESOURCE LIST */}
        <SlideUp delay={0.15}>
          <div className="space-y-4">
            {filteredResources.map((res) => {
              const isExpanded = expandedId === res.id;
              const isQuiz = res.type === "quiz";

              return (
                <GlassCard
                  key={res.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isExpanded
                      ? "border-cyan-500/40 bg-slate-900/80 shadow-lg"
                      : "border-white/[0.08] bg-slate-900/40 hover:border-white/20"
                  }`}
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/[0.06] border border-white/10 text-cyan-300">
                          {res.categoryLabel}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {res.subject}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          ✓ {res.sizeKb} KB on device
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        {res.description}
                      </p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                      {!isQuiz && (
                        <>
                          <Button
                            onClick={() => handleDownloadTxt(res)}
                            variant="outline"
                            size="sm"
                            className="font-mono text-xs border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 gap-1.5"
                            title="Download pure .txt file for offline viewing or Bluetooth sharing"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>{downloadedId === res.id ? "Downloaded!" : "Download .txt"}</span>
                          </Button>

                          <Button
                            onClick={() => handleCopyContent(res)}
                            variant="ghost"
                            size="sm"
                            className="font-mono text-xs text-slate-400 hover:text-white"
                            title="Copy text to clipboard"
                          >
                            {copiedId === res.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </Button>
                        </>
                      )}

                      <Button
                        onClick={() => setExpandedId(isExpanded ? null : res.id)}
                        variant="glass"
                        size="sm"
                        className="font-mono text-xs border-white/10 text-slate-300"
                      >
                        {isExpanded ? "Collapse" : isQuiz ? "Take Offline Quiz" : "Read Notes"}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Content View */}
                  {isExpanded && (
                    <div className="pt-4 space-y-4 animate-in fade-in duration-200">
                      {!isQuiz ? (
                        /* Text Content View */
                        <div className="relative">
                          <pre className="p-4 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto selection:bg-cyan-500/30">
                            {res.content}
                          </pre>
                          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>Ready to read offline anytime • 0 data needed</span>
                            <button
                              type="button"
                              onClick={() => handleDownloadTxt(res)}
                              className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="h-3 w-3" />
                              <span>Save to device files (.txt)</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* INTERACTIVE OFFLINE QUIZ (Zero Network Calls) */
                        <div className="space-y-4">
                          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                            <span className="text-cyan-300 font-bold">
                              Interactive Offline Probe • Grades instantly in your browser
                            </span>
                            {isQuizSubmitted && (
                              <span className="text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">
                                Score: {quizScore}%
                              </span>
                            )}
                          </div>

                          <div className="space-y-4">
                            {res.quizQuestions?.map((q, idx) => {
                              const selectedOpt = quizAnswers[q.id];
                              const isAnswered = selectedOpt !== undefined;
                              const isCorrect = selectedOpt === q.correctOptionIndex;

                              return (
                                <div
                                  key={q.id}
                                  className={`p-4 rounded-xl border text-xs font-mono space-y-3 ${
                                    isQuizSubmitted
                                      ? isCorrect
                                        ? "bg-emerald-950/20 border-emerald-500/40"
                                        : "bg-rose-950/20 border-rose-500/40"
                                      : "bg-slate-950/70 border-white/[0.06]"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="font-bold text-white leading-relaxed">
                                      Q{idx + 1}. {q.question}
                                    </span>
                                    {isQuizSubmitted && (
                                      <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                                          isCorrect
                                            ? "text-emerald-300 bg-emerald-500/20 border-emerald-500/40"
                                            : "text-rose-300 bg-rose-500/20 border-rose-500/40"
                                        }`}
                                      >
                                        {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                                      </span>
                                    )}
                                  </div>

                                  {/* Options List */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {q.options.map((opt, optIdx) => {
                                      const isSelected = selectedOpt === optIdx;
                                      const isActualCorrect = q.correctOptionIndex === optIdx;

                                      let optStyle = "bg-slate-900 border-white/[0.08] text-slate-300 hover:border-white/20";
                                      if (isQuizSubmitted) {
                                        if (isActualCorrect) {
                                          optStyle = "bg-emerald-500/20 border-emerald-500 text-white font-bold";
                                        } else if (isSelected && !isActualCorrect) {
                                          optStyle = "bg-rose-500/20 border-rose-500 text-rose-200 line-through";
                                        }
                                      } else if (isSelected) {
                                        optStyle = "bg-cyan-500/20 border-cyan-400 text-white font-bold";
                                      }

                                      return (
                                        <button
                                          key={optIdx}
                                          type="button"
                                          disabled={isQuizSubmitted}
                                          onClick={() => handleQuizAnswer(q.id, optIdx)}
                                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${optStyle}`}
                                        >
                                          <span className="mr-2 text-slate-500 font-bold">
                                            {String.fromCharCode(65 + optIdx)}.
                                          </span>
                                          <span>{opt}</span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Explanation when submitted */}
                                  {isQuizSubmitted && (
                                    <div className="pt-2 border-t border-white/[0.06] text-[11px] text-slate-300 font-sans leading-relaxed">
                                      <strong className="text-cyan-300 font-mono">Explanation: </strong>
                                      {q.explanation}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Quiz Action Buttons */}
                          <div className="pt-2 flex items-center justify-between">
                            {!isQuizSubmitted ? (
                              <Button
                                onClick={handleQuizSubmit}
                                disabled={Object.keys(quizAnswers).length < (res.quizQuestions?.length || 5)}
                                variant="cyber"
                                size="sm"
                                className="font-mono text-xs gap-1.5 shadow-glow"
                              >
                                <span>Grade Offline Quiz Now</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            ) : (
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-slate-300">
                                  Your Final Score: <strong className="text-emerald-400">{quizScore}%</strong>
                                </span>
                                <Button
                                  onClick={handleQuizReset}
                                  variant="outline"
                                  size="sm"
                                  className="font-mono text-xs border-white/10"
                                >
                                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                                  <span>Retry Quiz</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </SlideUp>

        {/* LOW-DATA COMMUNITY EDUCATION ADVISORY */}
        <SlideUp delay={0.2}>
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950/40 border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="space-y-1 max-w-xl">
              <span className="text-cyan-300 font-bold uppercase tracking-wider block">
                💡 Low-Data Student Study Tip:
              </span>
              <p className="text-slate-300 font-sans leading-relaxed">
                Connect once to school or municipal public Wi-Fi to download your desired notes as <strong className="text-white">.txt</strong> files. Once downloaded, you can study them on any basic feature phone or Android device without a SIM card or data recharge.
              </p>
            </div>

            <Link href="/learning" className="shrink-0">
              <Button variant="cyber" size="sm" className="font-mono text-xs gap-1">
                <span>View Learning Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </SlideUp>
      </Container>
    </div>
  );
}

