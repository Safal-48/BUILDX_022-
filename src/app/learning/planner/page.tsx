"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Brain,
  Dna,
  Bot,
  Layers,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudyPlannerDashboard } from "@/components/learning/study-planner-dashboard";
import { FadeIn } from "@/components/animations/motion-wrapper";

export default function StudyPlannerPage() {
  return (
    <div className="min-h-screen py-8 md:py-10 bg-slate-950 text-foreground">
      <Container size="xl" className="space-y-6 max-w-7xl">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/dashboard" className="hover:text-cyan-300">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/learning/assistant" className="hover:text-cyan-300">
              Learning Assistant
            </Link>
            <span>/</span>
            <span className="text-cyan-400 font-bold">AI Study Planner</span>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/learning/assistant">
              <Button variant="outline" size="sm" className="text-xs font-mono border-white/10 hover:border-cyan-500/30">
                <Bot className="h-3.5 w-3.5 text-cyan-400 mr-1.5" />
                Socratic AI Tutor
              </Button>
            </Link>
            <Link href="/learning/roadmap">
              <Button variant="outline" size="sm" className="text-xs font-mono border-white/10 hover:border-emerald-500/30">
                <Layers className="h-3.5 w-3.5 text-emerald-400 mr-1.5" />
                Adaptive Roadmap
              </Button>
            </Link>
          </div>
        </div>

        {/* Master AI Study Planner Dashboard */}
        <FadeIn>
          <StudyPlannerDashboard />
        </FadeIn>
      </Container>
    </div>
  );
}
