"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Bot,
  Award,
  Calendar,
  Compass,
  GraduationCap,
  Layers,
  ChevronRight,
  TrendingUp,
  Clock,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import {
  INITIAL_SCHOOL_READINESS,
  SubjectReadiness,
  TopicReadiness,
} from "@/lib/learning/school-learning-engine";

export default function SchoolLearningDashboardPage() {
  const [readinessData, setReadinessData] = useState<SubjectReadiness[]>(INITIAL_SCHOOL_READINESS);
  const [reassessedScore, setReassessedScore] = useState<number | null>(null);
  const [reassessedTopic, setReassessedTopic] = useState<string | null>(null);

  // Check localStorage for completed reassessments on client load
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedTrig = localStorage.getItem("skillora_reassessment_trig-01") ||
        localStorage.getItem("skillora_reassessment_trigonometry");

      if (storedTrig) {
        const score = parseInt(storedTrig, 10);
        if (!isNaN(score)) {
          setReassessedScore(score);
          setReassessedTopic("Trigonometry");

          // Update subject readiness data
          setReadinessData((prev) =>
            prev.map((subj) => {
              if (subj.subject === "Mathematics") {
                const updatedTopics = subj.topics.map((t) => {
                  if (t.topic === "Trigonometry") {
                    return {
                      ...t,
                      score: score,
                      status: (score >= 70 ? "Mastered" : "Moderate") as "Mastered" | "Moderate",
                      estimatedTimeToClose: score >= 70 ? "Remediated" : "15 mins",
                    };
                  }
                  return t;
                });
                const avgScore = Math.round(
                  updatedTopics.reduce((acc, curr) => acc + curr.score, 0) / updatedTopics.length
                );
                return {
                  ...subj,
                  topics: updatedTopics,
                  overallScore: avgScore,
                  priorityGapTopic: score >= 70 ? "" : subj.priorityGapTopic,
                };
              }
              return subj;
            })
          );
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleResetProgress = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("skillora_reassessment_trig-01");
        localStorage.removeItem("skillora_reassessment_trigonometry");
      } catch {
        // ignore
      }
    }
    setReassessedScore(null);
    setReassessedTopic(null);
    setReadinessData(INITIAL_SCHOOL_READINESS);
  };

  const isTrigRemediated = reassessedScore !== null && reassessedScore >= 70;

  return (
    <div className="py-10 space-y-10 min-h-screen bg-slate-950 text-foreground">
      <Container size="xl" className="space-y-8 max-w-6xl">
        {/* Header Section */}
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="cyber" size="sm" className="font-mono text-xs">
                  Class 10-12 Curriculum
                </Badge>
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  Personalized Learning Engine
                </span>
                {isTrigRemediated && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    ✓ Trigonometry Remediated ({reassessedScore}%)
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                Student Learning Dashboard
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl">
                Diagnostic learning loop identifying foundational subject gaps, delivering targeted 15-minute
                interventions, and tracking reassessed mastery.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link href="/learning/assistant">
                <Button variant="cyber" size="sm" className="font-mono text-xs gap-1.5 shadow-glow">
                  <Bot className="h-4 w-4 text-cyan-400" />
                  <span>AI Education Assistant</span>
                </Button>
              </Link>
              <Link href="/scholarships">
                <Button variant="outline" size="sm" className="font-mono text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  <Award className="h-3.5 w-3.5 mr-1" />
                  Scholarships
                </Button>
              </Link>
              {isTrigRemediated && (
                <Button
                  onClick={handleResetProgress}
                  variant="ghost"
                  size="sm"
                  className="font-mono text-xs text-slate-400 hover:text-rose-400"
                  title="Reset demo data to show 38% Trigonometry gap again"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                  Reset Demo
                </Button>
              )}
            </div>
          </div>
        </FadeIn>

        {/* 5-Step Core Loop Interactive Banner */}
        <SlideUp delay={0.05}>
          <GlassCard className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-slate-900/50">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.06] mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                  <RotateCcw className="h-4 w-4" />
                </span>
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Skillora 5-Step Learning Loop
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">
                Continuous Remediation Cycle
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                {
                  step: "01",
                  title: "Assessment",
                  desc: "Diagnostic test identifies concept boundaries",
                  status: "Completed",
                  badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                },
                {
                  step: "02",
                  title: "Learning Gap",
                  desc: "Found Trigonometry at 38% deficit",
                  status: isTrigRemediated ? "Remediated" : "Detected",
                  badgeColor: isTrigRemediated ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : "text-rose-400 bg-rose-500/10 border-rose-500/30",
                },
                {
                  step: "03",
                  title: "Intervention",
                  desc: "Concept explanation & real-world triangle ratios",
                  status: isTrigRemediated ? "Completed" : "Ready",
                  badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
                },
                {
                  step: "04",
                  title: "Practice",
                  desc: "15-minute targeted Socratic drills",
                  status: isTrigRemediated ? "Passed" : "Action Required",
                  badgeColor: isTrigRemediated ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" : "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
                },
                {
                  step: "05",
                  title: "Reassessment",
                  desc: "3-question probe verifies knowledge transfer",
                  status: isTrigRemediated ? `${reassessedScore}% Verified` : "Pending",
                  badgeColor: isTrigRemediated ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" : "text-slate-400 bg-white/5 border-white/10",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.05] relative flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        {item.step}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white font-mono">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </SlideUp>

        {/* PRIORITY LEARNING GAP BANNER */}
        <SlideUp delay={0.1}>
          {!isTrigRemediated ? (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/60 border-2 border-rose-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Target className="h-48 w-48 text-rose-500" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                      High Priority Remediation Needed
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono">
                      Current Score: 38%
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    Your priority learning gap is Trigonometry.
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Assessment shows recurring confusion with <strong className="text-white">sin θ, cos θ ratios</strong> and <strong className="text-white">tan 45° = 1</strong> applications.
                    A focused 15-minute Socratic sprint will remediate this deficit before upcoming board exams.
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-cyan-400" />
                      15 Mins
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      Concept + Branching Practice
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      Immediate Reassessment
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                  <Link href="/learning/intervention?topic=trigonometry">
                    <Button
                      variant="cyber"
                      size="lg"
                      className="w-full font-mono text-sm gap-2 shadow-glow bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 font-bold px-6 py-5"
                    >
                      <span>Start 15-min Practice</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/learning/assistant">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full font-mono text-xs border-white/20 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40"
                    >
                      <Bot className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
                      Ask AI Assistant
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Remediated Success Banner */
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/60 border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                      Learning Gap Closed
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                      Reassessed: {reassessedScore}% (+{reassessedScore - 38}% Gain)
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    Trigonometry Mastery Verified!
                  </h2>

                  <p className="text-sm text-slate-300">
                    Great work! Your understanding of trigonometric ratios is now at{" "}
                    <strong className="text-emerald-400">{reassessedScore}%</strong>. Your next area for practice is{" "}
                    <strong className="text-white">Biology: Photosynthesis</strong> or{" "}
                    <strong className="text-white">Physics: Optics</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link href="/learning/intervention?topic=photosynthesis">
                    <Button variant="cyber" size="sm" className="font-mono text-xs gap-1.5">
                      <span>Practice Photosynthesis</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    onClick={handleResetProgress}
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs border-white/10"
                  >
                    Reset &amp; Retry Trigonometry
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SlideUp>

        {/* SUBJECT-LEVEL READINESS CARDS */}
        <SlideUp delay={0.15}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-mono">
                  Subject-Level Readiness
                </h2>
                <p className="text-xs text-slate-400">
                  Detailed topic-by-topic breakdown and diagnostic scores across your curriculum.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                Class 12 Board Prep
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {readinessData.map((subject) => {
                return (
                  <GlassCard
                    key={subject.subject}
                    className="p-5 rounded-2xl border border-white/[0.08] bg-slate-900/50 flex flex-col justify-between space-y-4 hover:border-cyan-500/30 transition-all"
                  >
                    {/* Subject Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                            Curriculum Subject
                          </span>
                          <h3 className="text-lg font-bold text-white font-mono">
                            {subject.subject}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-mono font-black text-cyan-300">
                            {subject.overallScore}%
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 block">
                            Readiness
                          </span>
                        </div>
                      </div>

                      {/* Topic List */}
                      <div className="space-y-3 pt-1">
                        {subject.topics.map((topic) => {
                          const isLow = topic.score < 50;
                          const isModerate = topic.score >= 50 && topic.score < 75;
                          const isPriority = topic.status === "Priority Gap";

                          return (
                            <div
                              key={topic.topic}
                              className={`p-3 rounded-xl border transition-all ${
                                isPriority
                                  ? "bg-rose-950/20 border-rose-500/40"
                                  : "bg-slate-950/50 border-white/[0.05]"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-mono font-bold text-white">
                                    {topic.topic}
                                  </span>
                                  {isPriority && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold uppercase">
                                      Priority Gap
                                    </span>
                                  )}
                                </div>
                                <span
                                  className={`text-xs font-mono font-bold ${
                                    isLow
                                      ? "text-rose-400"
                                      : isModerate
                                      ? "text-amber-400"
                                      : "text-emerald-400"
                                  }`}
                                >
                                  {topic.score}%
                                </span>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isLow
                                      ? "bg-rose-500"
                                      : isModerate
                                      ? "bg-amber-400"
                                      : "bg-emerald-400"
                                  }`}
                                  style={{ width: `${topic.score}%` }}
                                />
                              </div>

                              {/* Practice CTA for priority or lower score */}
                              {topic.score < 65 && (
                                <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-white/[0.04]">
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {isPriority ? "Targeted sprint available" : "Practice recommended"}
                                  </span>
                                  <Link
                                    href={`/learning/intervention?topic=${topic.topic.toLowerCase().includes("trig") ? "trigonometry" : topic.topic.toLowerCase().includes("photo") ? "photosynthesis" : "trigonometry"}`}
                                    className="text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                                  >
                                    <span>Practice</span>
                                    <ChevronRight className="h-3 w-3" />
                                  </Link>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer of Subject Card */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{subject.topics.length} Evaluated Topics</span>
                      <Link
                        href="/learning/assistant"
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        Ask Assistant
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </SlideUp>

        {/* AI EDUCATION ASSISTANT SHOWCASE */}
        <SlideUp delay={0.2}>
          <GlassCard className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    AI Education Assistant
                  </span>
                  <Badge variant="cyber" size="sm" className="font-mono text-[9px]">
                    English • Hindi • Hinglish
                  </Badge>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white font-mono">
                  Concept Confused? Need Homework Help? Ask in Any Language.
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Support across all 7 student areas: Subject explanations, Socratic homework guidance, concept
                  clarification, practice questions, vocational career queries (ITI/Polytechnic), scholarships, and
                  focused study planning.
                </p>

                {/* Example query bubble */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-start gap-3">
                  <span className="text-xs font-mono text-cyan-400 font-bold whitespace-nowrap">
                    Student:
                  </span>
                  <p className="text-xs font-mono text-slate-200 italic">
                    &quot;Bhai mujhe photosynthesis samajh nahi aa raha.&quot;
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 shrink-0">
                <Link href="/learning/assistant">
                  <Button variant="cyber" size="lg" className="w-full font-mono text-xs gap-2 shadow-glow">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <span>Launch AI Education Assistant</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono text-slate-400">
                  <span className="p-1.5 rounded bg-slate-950/60 border border-white/[0.06]">
                    ✓ Photosynthesis Explained
                  </span>
                  <span className="p-1.5 rounded bg-slate-950/60 border border-white/[0.06]">
                    ✓ Trigonometry Ratios
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </SlideUp>

        {/* ECOSYSTEM INTEGRATION GRID */}
        <SlideUp delay={0.25}>
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider">
              Connected Skillora Education Ecosystem
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/scholarships" className="group">
                <GlassCard className="p-4 rounded-xl border border-white/[0.08] hover:border-amber-500/40 transition-all bg-slate-900/40 h-full flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                        <Award className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-mono text-amber-300 font-bold">
                        3 Eligible
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono group-hover:text-amber-300">
                      Scholarships
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      MahaDBT Post-Matric (8 days left) &amp; NSP Pre-Matric matches with document checklists.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold mt-3 flex items-center gap-1">
                    Check Eligibility <ChevronRight className="h-3 w-3" />
                  </span>
                </GlassCard>
              </Link>

              <Link href="/practice" className="group">
                <GlassCard className="p-4 rounded-xl border border-white/[0.08] hover:border-cyan-500/40 transition-all bg-slate-900/40 h-full flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Zap className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold">
                        Interactive
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono group-hover:text-cyan-300">
                      Practice Arena
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Oral defense drills, concept challenges, and Socratic questioning room.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold mt-3 flex items-center gap-1">
                    Enter Arena <ChevronRight className="h-3 w-3" />
                  </span>
                </GlassCard>
              </Link>

              <Link href="/learning/planner" className="group">
                <GlassCard className="p-4 rounded-xl border border-white/[0.08] hover:border-emerald-500/40 transition-all bg-slate-900/40 h-full flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Calendar className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 font-bold">
                        Autonomous
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono group-hover:text-emerald-300">
                      Study Planner
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Auto-generate daily 30-min time-boxed sprint blocks balanced with rest.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold mt-3 flex items-center gap-1">
                    Open Schedule <ChevronRight className="h-3 w-3" />
                  </span>
                </GlassCard>
              </Link>

              <Link href="/opportunities" className="group">
                <GlassCard className="p-4 rounded-xl border border-white/[0.08] hover:border-violet-500/40 transition-all bg-slate-900/40 h-full flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                        <Compass className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-mono text-violet-300 font-bold">
                        Vocational &amp; ITI
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono group-hover:text-violet-300">
                      Career Pathways
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      ITI trades, polytechnic diplomas, apprenticeship schemes &amp; local opportunities.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-violet-400 font-bold mt-3 flex items-center gap-1">
                    Explore Paths <ChevronRight className="h-3 w-3" />
                  </span>
                </GlassCard>
              </Link>
            </div>
          </div>
        </SlideUp>
      </Container>
    </div>
  );
}

