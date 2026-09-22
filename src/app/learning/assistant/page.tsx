"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  BookOpen,
  Clock,
  Languages,
  CheckCircle2,
  HelpCircle,
  History,
  Radio,
  Dna,
  Layers,
  Bot,
  Calendar,
  Award,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CoachChatWorkbench } from "@/components/ai/coach/coach-chat-workbench";
import { CoachContextSidebar } from "@/components/ai/coach/coach-context-sidebar";
import {
  StudentCareerContext,
  DEFAULT_STUDENT_CAREER_CONTEXT,
} from "@/lib/ai/career-coach-engine";
import { FadeIn } from "@/components/animations/motion-wrapper";
import { StudyPlannerDashboard } from "@/components/learning/study-planner-dashboard";

const LEARNING_PROMPT_PRESETS = [
  { label: "Bhai mujhe photosynthesis samajh nahi aa raha.", icon: Languages, category: "Concept in Hinglish" },
  { label: "Trigonometry formulas yaad kaise karein?", icon: HelpCircle, category: "Priority Learning Gap" },
  { label: "Homework help on Quadratic Equations.", icon: BookOpen, category: "Homework Guidance" },
  { label: "MahaDBT scholarship form ke documents batao.", icon: Award, category: "Scholarship Help" },
  { label: "10th ke baad ITI ya Polytechnic?", icon: GraduationCap, category: "Career Guidance" },
  { label: "Give me a 30-minute daily study plan.", icon: Clock, category: "Study Planning" },
  { label: "Give me 3 practice questions on Ohm's Law.", icon: Zap, category: "Practice Probe" },
];

export default function LearningAssistantPage() {
  const [context, setContext] = useState<StudentCareerContext>(DEFAULT_STUDENT_CAREER_CONTEXT);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"tutor" | "planner">("tutor");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContext() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/ai/coach");
        if (res.ok) {
          const data = await res.json();
          setContext(data.context || DEFAULT_STUDENT_CAREER_CONTEXT);
        }
      } catch (err) {
        console.error("Failed to load context:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadContext();
  }, []);

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    setActiveView("tutor");
  };

  return (
    <div className="min-h-screen py-8 md:py-10 bg-slate-950 text-foreground">
      <Container size="xl" className="space-y-6 max-w-7xl">
        {/* Header Banner */}
        <FadeIn>
          <GlassCard className="p-6 border-cyan-500/30 bg-slate-900/60 relative overflow-hidden" glow>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <Bot className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                      AI Education Assistant
                    </h1>
                    <Badge variant="cyber" size="sm" className="font-mono text-[9px]">
                      Socratic School &amp; Career Companion
                    </Badge>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Supports English • हिंदी • Hinglish
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Your 24/7 personal learning assistant for concept explanations, homework guidance, practice drills, scholarship advice, and study planning.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/learning">
                  <Button variant="outline" size="sm" className="text-xs font-mono border-white/10 hover:border-cyan-500/30">
                    <Layers className="h-3.5 w-3.5 text-cyan-400 mr-1.5" />
                    Subject Readiness
                  </Button>
                </Link>
                <Link href="/learning/intervention?topic=trigonometry">
                  <Button variant="cyber" size="sm" className="text-xs font-mono gap-1.5 shadow-glow">
                    <span>Trigonometry Practice</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Domain Indicator Tags */}
            <div className="pt-4 mt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="text-slate-400 font-bold">Ask me about:</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">1. Subject Explanations</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">2. Homework Guidance</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">3. Concept Clarification</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">4. Practice Questions</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">5. Career Questions (ITI / Polytechnic)</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">6. Scholarship Guidance</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">7. Study Planning</span>
            </div>
          </GlassCard>
        </FadeIn>

        {/* View Switcher Tabs (Chat vs Planner) */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("tutor")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeView === "tutor"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>AI Education Assistant</span>
            </button>

            <button
              onClick={() => setActiveView("planner")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeView === "planner"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Autonomous Study Planner</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Assistant Live &amp; Ready</span>
          </div>
        </div>

        {/* Prompts Quick-Launcher Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-[11px] font-mono text-muted-foreground uppercase shrink-0 font-bold pl-1">
            Quick Prompts:
          </span>
          {LEARNING_PROMPT_PRESETS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSelectPrompt(p.label)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900/80 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Icon className="h-3 w-3 text-cyan-400" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Work Area */}
        {activeView === "tutor" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Interactive Chat Workbench */}
            <div className="lg:col-span-3">
              <CoachChatWorkbench
                context={context}
                externalTriggerPrompt={selectedPrompt}
                onClearTriggerPrompt={() => setSelectedPrompt(null)}
              />
            </div>

            {/* Side Context Telemetry */}
            <div className="lg:col-span-1">
              <CoachContextSidebar
                context={context}
                isLoading={isLoading}
                onSelectPrompt={handleSelectPrompt}
              />
            </div>
          </div>
        ) : (
          <StudyPlannerDashboard />
        )}
      </Container>
    </div>
  );
}
