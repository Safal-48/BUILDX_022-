"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Activity,
  Compass,
  Users,
  User,
  GraduationCap,
  Sparkles,
  Brain,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  AlertTriangle,
  HeartHandshake,
  HardDrive,
  Calendar,
  Check,
  Lock,
  School,
  FileText,
  Briefcase,
  LayoutGrid,
  Workflow,
  Coins,
  Link2,
  Network,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/card";
import { useLowData } from "@/lib/accessibility/low-data-context";
import { RadialRevealCard } from "@/components/animations/radial-reveal-card";
import dynamic from "next/dynamic";

const ScrollHighlight = dynamic(
  () => import("@/components/animations/scroll-highlight"),
  {
    ssr: false,
    loading: () => (
      <div className="py-12 text-center text-slate-400 font-mono text-sm">
        Loading philosophy &amp; vision...
      </div>
    ),
  }
);

const SkilloraEcosystemVisualizer = dynamic(
  () => import("@/components/3d/skillora-ecosystem-visualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full rounded-3xl border border-emerald-500/20 bg-slate-950/70 flex items-center justify-center text-slate-400 font-mono text-sm">
        Loading ecosystem architecture...
      </div>
    ),
  }
);

export default function HomePage() {
  const { isLowData, toggleLowData, isOnline, estimatedDataSavedMb } = useLowData();
  const [activeEcosystemTab, setActiveEcosystemTab] = React.useState<"highlights" | "how_it_works" | "ecosystem" | "advantage">("highlights");

  return (
    <div className="relative pb-24 w-full max-w-full overflow-x-hidden">
      {/* ---------------- HERO SECTION (Balanced, User-Friendly & Visually Connected) ---------------- */}
      <section className="relative overflow-hidden min-h-[calc(100vh-82px)] flex flex-col justify-center items-center pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(6,182,212,0.16)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(139,92,246,0.1)_0%,transparent_60%)]" />
        </div>

        <Container size="xl" className="w-full">
          <div className="w-full max-w-7xl mx-auto text-center flex flex-col items-center">

            {/* 1. Main Headline — Moved Down with Generous Top Room */}
            <div className="space-y-2.5 sm:space-y-3">
              <h1 className="font-black tracking-tight leading-[1.08] text-center select-none">
                <span
                  className="text-white block"
                  style={{ fontSize: "clamp(2.35rem, 4.8vw, 4.5rem)" }}
                >
                  Empowering Careers with
                </span>
                <span
                  className="block mt-1 sm:mt-2"
                  style={{
                    fontSize: "clamp(2.35rem, 4.8vw, 4.5rem)",
                    color: "#55e4d0",
                    textShadow: "0 0 28px rgba(85, 228, 208, 0.6), 0 0 55px rgba(85, 228, 208, 0.25)",
                  }}
                >
                  Skillora
                </span>
              </h1>

              {/* Subtitle — Crisp & User-Friendly */}
              <p
                className="text-slate-300 font-normal text-center max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed pt-1"
                style={{ fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)" }}
              >
                Autonomous AI Personalized Learning Ecosystem &amp; Continuous Skill Intelligence<br className="hidden sm:inline" />{" "}
                Platform. Learn smart, improve continuously, and own your future.
              </p>
            </div>

            {/* 2. Hero CTAs — Brought Close to Subtitle (User-Friendly Proximity) */}
            <div className="flex flex-row items-center justify-center gap-3.5 sm:gap-5 mt-6 sm:mt-7">
              {/* Primary: Cyan → Blue → Purple gradient pill button */}
              <Link href="/register">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 sm:px-8 sm:py-3.5 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 shadow-[0_0_25px_rgba(0,180,216,0.35)] cursor-pointer text-sm sm:text-base"
                  style={{
                    background: "linear-gradient(90deg, #00b4d8 0%, #3b82f6 50%, #8338ec 100%)",
                  }}
                >
                  <span>Get Started / Register</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>

              {/* Secondary: Dark glass with cyan lock */}
              <Link href="/login">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 sm:px-8 sm:py-3.5 rounded-2xl font-bold text-white border border-slate-700/70 bg-[#0c1424]/90 hover:bg-slate-900/95 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md text-sm sm:text-base"
                >
                  <Lock className="h-4 w-4 text-[#38bdf8]" />
                  <span>Sign In to Portal</span>
                </button>
              </Link>
            </div>

            {/* 3. 4 Feature Cards — Radial Reveal Pointer Cursor Effect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-7xl mx-auto text-left mt-10 sm:mt-12 lg:mt-14">
              {/* Card 1: Skill Intelligence */}
              <RadialRevealCard
                href="/skills"
                category="SKILL INTELLIGENCE"
                title="AI-Powered"
                badge="Assess • Map • Identify Gaps"
                accentColor="teal"
                icon={<Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
                style={{ minHeight: "clamp(175px, 22vh, 230px)" }}
              />

              {/* Card 2: Smart Matching */}
              <RadialRevealCard
                href="/opportunities"
                category="SMART MATCHING"
                title="Explainable AI"
                badge="Skills • Opportunities"
                accentColor="cyan"
                icon={<Link2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
                style={{ minHeight: "clamp(175px, 22vh, 230px)" }}
              />

              {/* Card 3: Career Readiness */}
              <RadialRevealCard
                href="/career-readiness"
                category="CAREER READINESS"
                title="Personalized"
                badge="Learn • Improve • Get Ready"
                accentColor="cyan"
                icon={<ShieldCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
                style={{ minHeight: "clamp(175px, 22vh, 230px)" }}
              />

              {/* Card 4: Academia × Industry */}
              <RadialRevealCard
                href="/dashboard"
                category="ACADEMIA × INDUSTRY"
                title="Connected Hub"
                badge="Students • Campus • Industry"
                accentColor="purple"
                icon={<Network className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
                style={{ minHeight: "clamp(175px, 22vh, 230px)" }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- CORE PHILOSOPHY & VISION (Scroll Text Highlight Animation - Image 2 match) ---------------- */}
      <section className="relative py-28 sm:py-36 overflow-hidden border-y border-white/[0.08] bg-slate-950/70 backdrop-blur-md">
        {/* Subtle Ambient Cosmic Glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px]" />
        </div>

        <Container size="xl" className="text-center flex flex-col items-center">
          {/* Centered Badge (Image 2 match) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-4">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>CORE PHILOSOPHY &amp; VISION</span>
          </div>

          {/* Scroll Highlight Animation Component with user requested text */}
          <ScrollHighlight
            text={`Bridging the gap between where students are, and where their future can take them.

Connecting learning, support, and opportunity — so every student can learn, grow, and move forward with confidence.`}
            font={{
              fontFamily: "var(--font-sans), Inter, system-ui, sans-serif",
              fontSize: "clamp(1.85rem, 4vw, 3.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: "1.34em",
              textAlign: "center",
            }}
            containerClassName="py-4 md:py-8"
            scrollStart="top 80%"
            scrollEnd="bottom 45%"
            scrub={0.8}
          />
        </Container>
      </section>

      {/* ---------------- THE INTELLIGENT ECOSYSTEM FOR SKILLS AND OPPORTUNITIES ---------------- */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-t border-white/[0.08] bg-slate-950/80 backdrop-blur-md">
        {/* Ambient Glow matching site theme */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <Container size="xl">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            {/* Top Pill: BUILT FOR A BRIGHTER TOMORROW */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 20h10" />
                <path d="M12 20v-8" />
                <path d="M12 12c-2.5-3-5.5-3-7-1 0 4 3 6 7 5" />
                <path d="M12 9c2.5-3 5.5-3 7-1 0 4-3 6-7 5" />
              </svg>
              <span>BUILT FOR A BRIGHTER TOMORROW</span>
            </div>

            {/* Headline */}
            <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold tracking-tight text-white leading-[1.1]">
              The Intelligent Ecosystem
              <span className="block mt-2">
                for{" "}
                <span className="text-emerald-400 text-neon-emerald">Skills</span>
                {" "}and{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  Opportunities
                </span>
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
              A unified platform that helps students learn, get guidance, find scholarships and explore career opportunities — all in one place.
            </p>

            {/* 4 Interactive Switch Tabs */}
            <div className="pt-3">
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setActiveEcosystemTab("highlights")}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeEcosystemTab === "highlights"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>Platform Highlights</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEcosystemTab("how_it_works")}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeEcosystemTab === "how_it_works"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Workflow className="h-4 w-4" />
                  <span>How It Works</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEcosystemTab("ecosystem")}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeEcosystemTab === "ecosystem"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Ecosystem</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEcosystemTab("advantage")}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeEcosystemTab === "advantage"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Our Advantage</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Feature Cards (Platform Highlights) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {/* Card 1: Study After 12th (Emerald) */}
            <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-emerald-400/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] group">
              <div>
                <div className="h-14 w-14 rounded-full border-2 border-emerald-400/60 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:scale-110 transition-transform mb-5">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Study After{" "}
                  <span className="text-emerald-400">12th</span>
                </h3>
                <p className="text-sm font-semibold text-emerald-400 mt-1 mb-4">
                  Find Your Next Step
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200 font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Degree courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Diploma &amp; Polytechnic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>ITI &amp; Vocational courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Entrance exams &amp; admissions</span>
                  </li>
                </ul>
              </div>
              <Link href="/opportunities?category=higher_ed" className="mt-6 pt-4 border-t border-white/10 block">
                <Button
                  variant="glass"
                  className="w-full py-5 rounded-2xl border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group-hover:border-emerald-400/70"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Card 2: Scholarships (Amber/Gold) */}
            <div className="rounded-3xl border border-amber-500/30 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] group">
              <div>
                <div className="h-14 w-14 rounded-full border-2 border-amber-400/60 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-110 transition-transform mb-5">
                  <Coins className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  Scholarships
                </h3>
                <p className="text-sm font-semibold text-amber-400 mt-1 mb-4">
                  Get the Support You Deserve
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200 font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Scholarship opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Fee support &amp; loan options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Government schemes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Track application status</span>
                  </li>
                </ul>
              </div>
              <Link href="/scholarships" className="mt-6 pt-4 border-t border-white/10 block">
                <Button
                  variant="glass"
                  className="w-full py-5 rounded-2xl border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group-hover:border-amber-400/70"
                >
                  <span>Find Scholarships</span>
                  <ArrowRight className="h-4 w-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Card 3: Career Pathways (Cyan/Sky) */}
            <div className="rounded-3xl border border-cyan-500/30 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-cyan-400/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group">
              <div>
                <div className="h-14 w-14 rounded-full border-2 border-cyan-400/60 bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] group-hover:scale-110 transition-transform mb-5">
                  <Compass className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Career Pathways
                </h3>
                <p className="text-sm font-semibold text-cyan-400 mt-1 mb-4">
                  Plan Your Future
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200 font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Career guidance &amp; roadmap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Skill development programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Industry &amp; local opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>Higher education options</span>
                  </li>
                </ul>
              </div>
              <Link href="/opportunities" className="mt-6 pt-4 border-t border-white/10 block">
                <Button
                  variant="glass"
                  className="w-full py-5 rounded-2xl border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group-hover:border-cyan-400/70"
                >
                  <span>Explore Career Paths</span>
                  <ArrowRight className="h-4 w-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Card 4: Opportunities Near You (Purple) */}
            <div className="rounded-3xl border border-purple-500/30 bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-purple-400/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group">
              <div>
                <div className="h-14 w-14 rounded-full border-2 border-purple-400/60 bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)] group-hover:scale-110 transition-transform mb-5">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Opportunities Near You
                </h3>
                <p className="text-sm font-semibold text-purple-400 mt-1 mb-4">
                  Learn • Grow • Build
                </p>
                <ul className="space-y-2.5 text-sm text-slate-200 font-sans">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Nagpur</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>MIHAN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Hingna</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Butibori</span>
                  </li>
                </ul>
              </div>
              <Link href="/opportunities?location=nagpur" className="mt-6 pt-4 border-t border-white/10 block">
                <Button
                  variant="glass"
                  className="w-full py-5 rounded-2xl border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group-hover:border-purple-400/70"
                >
                  <span>View Opportunities</span>
                  <ArrowRight className="h-4 w-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>


      {/* ---------------- LOW DATA & OFFLINE HUB SPOTLIGHT ---------------- */}
      <section className="pt-14 pb-20 sm:pt-18 sm:pb-28 border-t border-white/[0.06] relative">
        <Container size="xl">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900/90 to-cyan-950/20 p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl mb-4 sm:mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                  <Zap className="h-3.5 w-3.5 text-emerald-400" />
                  <span>BUILT FOR LIMITED 2G/3G DATA &amp; SHARED HARDWARE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Zero Data Drain: Offline Notes &amp; Lightweight Practice
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Turn on <strong>⚡ Low Data Mode</strong> anytime to stop heavy 3D animations and prioritize text.
                  Students can download study notes as pure <code>.txt</code> files directly to their phone storage or SD card and complete practice quizzes offline with 0 KB data consumption.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={toggleLowData}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    isLowData
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-glow-sm"
                      : "bg-slate-900 text-white border-white/20 hover:border-emerald-500/50"
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>{isLowData ? "⚡ Low Data Active" : "⚡ Turn ON Low Data"}</span>
                </button>

                <Link href="/learning/saved" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full text-xs font-mono border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 gap-2 py-5">
                    <HardDrive className="h-4 w-4" />
                    <span>Offline Hub (0 KB)</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}

