"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Instagram,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Brain,
  Zap,
  MessageCircle,
  Users,
  GraduationCap,
  Building2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "./container";
import { SkilloraLogo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-sm bg-transparent pt-10 sm:pt-16">
      <Container size="xl" className="pb-10 md:pb-14 space-y-12">
        {/* ─────────────────── REAL-TIME PLATFORM INSIGHTS BANNER ─────────────────── */}
        <div className="rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.4)] mt-2 sm:mt-6">
          {/* Top subtle glow accent line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                REAL-TIME PLATFORM INSIGHTS
              </span>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono font-semibold hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all group w-fit"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 4 Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Stat 1 */}
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-full bg-[#021827] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.18)] shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  25,000<span className="text-cyan-400">+</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1.5 leading-snug">
                  Students Empowered and Growing
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-full bg-[#1c0b30] border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.18)] shrink-0">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  1,200<span className="text-purple-400">+</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1.5 leading-snug">
                  Opportunities Live Worldwide
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-full bg-[#03202e] border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(14,165,233,0.18)] shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  350<span className="text-sky-400">+</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1.5 leading-snug">
                  Institutions Onboarded
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-full bg-[#271502] border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.18)] shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  85<span className="text-amber-400">%</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1.5 leading-snug">
                  Students Career Readiness Improved
                </div>
              </div>
            </div>
          </div>

          {/* Bottom subtle glow accent line */}
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        </div>

        {/* Main Navigation & Ecosystem Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand & Mission Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <SkilloraLogo size="md" showTagline={false} />
            </Link>

            <div className="space-y-2">
              <p className="font-bold text-white text-base tracking-tight leading-snug">
                AI Personalized Learning Assistant & Skill Intelligence.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Empowering students through adaptive diagnostic probes, tailored multi-modal study resources, and empirical mastery tracking.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="font-semibold tracking-wider text-[11px]">ADAPTIVE INTELLIGENCE LOOP ACTIVE</span>
            </div>

            {/* Quick Social & Contact Badges */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SITE_CONFIG.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Skillora on Instagram"
                className="h-8 w-8 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/60 flex items-center justify-center transition-all shadow-sm"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Email Skillora Official"
                className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/60 flex items-center justify-center transition-all shadow-sm"
              >
                <Mail className="h-4 w-4" />
              </a>

              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                title="Call Skillora Support"
                className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/60 flex items-center justify-center transition-all shadow-sm"
              >
                <Phone className="h-4 w-4" />
              </a>

              <a
                href={SITE_CONFIG.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Skillora on WhatsApp"
                className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 flex items-center justify-center transition-all shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 1: MY LEARNING */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
              My Learning
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="/career-coach" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500/60">•</span>
                  <span>AI Learning Assistant</span>
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500/60">•</span>
                  <span>My Skill DNA</span>
                </Link>
              </li>
              <li>
                <Link href="/ai-career" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500/60">•</span>
                  <span>Learning Roadmap</span>
                </Link>
              </li>
              <li>
                <Link href="/learning/resources" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500/60">•</span>
                  <span>Recommended Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500/60">•</span>
                  <span>Practice Arena</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: MY PROGRESS & GOALS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              Progress & Goals
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="/career-readiness" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500/60">•</span>
                  <span>Performance Readiness</span>
                </Link>
              </li>
              <li>
                <Link href="/progress/growth" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500/60">•</span>
                  <span>Skill Growth Velocity</span>
                </Link>
              </li>
              <li>
                <Link href="/progress/history" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500/60">•</span>
                  <span>Learning History</span>
                </Link>
              </li>
              <li>
                <Link href="/learning/goals" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500/60">•</span>
                  <span>Goal-Based Learning</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: CAREER TOOLS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              Career & Proofs
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="/resume-analyzer" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  <span className="text-violet-500/60">•</span>
                  <span>Resume ATS Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/mock-interview" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  <span className="text-violet-500/60">•</span>
                  <span>AI Mock Interview</span>
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  <span className="text-violet-500/60">•</span>
                  <span>Opportunities</span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  <span className="text-violet-500/60">•</span>
                  <span>Verified Portfolio</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: ECOSYSTEM & STAKEHOLDERS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-amber-400" />
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="/assessment" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500/60">•</span>
                  <span>Diagnostic Assessment</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/institution" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500/60">•</span>
                  <span>Institution Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/academician" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500/60">•</span>
                  <span>Academician Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-500/60">•</span>
                  <span>1-on-1 Mentorship</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Interactive Connect & Communications Hub */}
        <div className="p-6 rounded-2xl bg-slate-950/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Official Contact & Support Channels</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Tap any channel below to directly launch the respective app, email, or dialer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Instagram */}
            <a
              href={SITE_CONFIG.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-slate-950/80 border border-pink-500/25 hover:border-pink-500/60 hover:bg-pink-950/30 transition-all flex items-center gap-3 group"
            >
              <div className="h-9 w-9 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Instagram className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono text-pink-400 font-semibold uppercase block">Instagram</span>
                <span className="text-xs font-bold text-white group-hover:text-pink-300 truncate block">
                  {SITE_CONFIG.contact.instagramHandle}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-pink-400/60 group-hover:text-pink-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* 2. Gmail / Email */}
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/25 hover:border-rose-500/60 hover:bg-rose-950/30 transition-all flex items-center gap-3 group"
            >
              <div className="h-9 w-9 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono text-rose-400 font-semibold uppercase block">Official Gmail</span>
                <span className="text-xs font-bold text-white group-hover:text-rose-300 truncate block">
                  {SITE_CONFIG.contact.email}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-rose-400/60 group-hover:text-rose-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* 3. Phone / Direct Call */}
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/25 hover:border-cyan-500/60 hover:bg-cyan-950/30 transition-all flex items-center gap-3 group"
            >
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase block">Direct Call</span>
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 truncate block">
                  {SITE_CONFIG.contact.phone}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-cyan-400/60 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* 4. WhatsApp Chat */}
            <a
              href={SITE_CONFIG.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/25 hover:border-emerald-500/60 hover:bg-emerald-950/30 transition-all flex items-center gap-3 group"
            >
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase block">WhatsApp Chat</span>
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 truncate block">
                  +91 93228 33495
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© 2026 Skillora. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">ASSESS → UNDERSTAND → PRIORITIZE → LEARN → PRACTICE → PROVE → REASSESS → ADAPT</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

