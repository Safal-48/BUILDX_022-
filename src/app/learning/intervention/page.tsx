"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Brain,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Zap,
  Target,
  Clock,
  Award,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TargetedInterventionRunner } from "@/components/learning/targeted-intervention-runner";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import { getInterventionByTopic } from "@/lib/learning/school-learning-engine";

function InterventionContent() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic") || "trigonometry";
  const intervention = getInterventionByTopic(topicParam);

  return (
    <div className="py-10 space-y-8 min-h-screen bg-slate-950 text-foreground">
      <Container size="xl" className="space-y-6 max-w-5xl">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/learning"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              title="Back to Learning Dashboard"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  Targeted Learning Intervention Studio
                </span>
                <Badge variant="cyber" size="sm" className="font-mono text-[9px]">
                  5-Step Core Loop
                </Badge>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Priority Remediation
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                15-Min Remediation: {intervention.topic}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/learning">
              <Button variant="outline" size="sm" className="text-xs font-mono border-white/10">
                Learning Dashboard
              </Button>
            </Link>
            <Link href="/learning/assistant">
              <Button variant="cyber" size="sm" className="text-xs font-mono gap-1.5 shadow-glow">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Ask AI Assistant</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 7-Step Targeted Runner Component */}
        <SlideUp delay={0.05}>
          <TargetedInterventionRunner
            intervention={intervention}
            returnHref="/learning"
            returnLabel="Back to Learning Readiness"
          />
        </SlideUp>
      </Container>
    </div>
  );
}

export default function TargetedInterventionPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-mono text-slate-400">Loading intervention studio...</div>}>
      <InterventionContent />
    </Suspense>
  );
}
