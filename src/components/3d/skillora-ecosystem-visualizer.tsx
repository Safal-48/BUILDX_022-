"use client";

import * as React from "react";
import { User, Briefcase, GraduationCap, Building2, Target, Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkilloraEcosystemVisualizer({ className }: { className?: string }) {
  const [activeNode, setActiveNode] = React.useState<string | null>(null);

  return (
    <div
      className={cn(
        "w-full relative rounded-3xl border border-cyan-500/25 bg-slate-950/85 backdrop-blur-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden group/canvas",
        className
      )}
    >
      {/* Top Header: 🔘 SKILLORA ECOSYSTEM | Interactive Topology */}
      <div className="flex items-center justify-between mb-2 px-1 sm:px-2">
        <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
          <span className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 border border-cyan-200 shadow-[0_0_8px_#06b6d4]"></span>
          </span>
          <span>SKILLORA ECOSYSTEM</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400/80 tracking-wide hidden sm:inline">
          Interactive Topology
        </span>
      </div>

      {/* SVG Canvas with Animated Topology & Glowing Radial Lines */}
      <div className="relative w-full aspect-[700/490] max-h-[520px]">
        <svg
          viewBox="0 0 700 490"
          className="w-full h-full select-none pointer-events-none"
          style={{ filter: "drop-shadow(0 0 25px rgba(6,182,212,0.1))" }}
        >
          <defs>
            {/* Gradients for connecting beams */}
            <linearGradient id="beamStudents" x1="350" y1="210" x2="235" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="beamIndustry" x1="350" y1="210" x2="465" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="beamAcademia" x1="350" y1="210" x2="235" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="beamInstitutions" x1="350" y1="210" x2="465" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="beamOpportunities" x1="350" y1="210" x2="310" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Background Concentric Radar Orbit Rings */}
          <circle
            cx="350"
            cy="210"
            r="135"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
          />
          <circle
            cx="350"
            cy="210"
            r="195"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="6 6"
            fill="none"
          />

          {/* 5 Radial Connecting Lines */}
          <g>
            {/* STUDENTS Line (Top-Left) */}
            <line
              x1="350"
              y1="210"
              x2="235"
              y2="120"
              stroke={activeNode === "students" ? "#06b6d4" : "rgba(6,182,212,0.5)"}
              strokeWidth={activeNode === "students" ? "2.5" : "1.5"}
              strokeDasharray="4 3"
              className="transition-all duration-300"
            />
            {/* INDUSTRY Line (Top-Right) */}
            <line
              x1="350"
              y1="210"
              x2="465"
              y2="120"
              stroke={activeNode === "industry" ? "#a855f7" : "rgba(168,85,247,0.5)"}
              strokeWidth={activeNode === "industry" ? "2.5" : "1.5"}
              strokeDasharray="4 3"
              className="transition-all duration-300"
            />
            {/* ACADEMIA Line (Bottom-Left) */}
            <line
              x1="350"
              y1="210"
              x2="235"
              y2="300"
              stroke={activeNode === "academia" ? "#10b981" : "rgba(16,185,129,0.5)"}
              strokeWidth={activeNode === "academia" ? "2.5" : "1.5"}
              strokeDasharray="4 3"
              className="transition-all duration-300"
            />
            {/* INSTITUTIONS Line (Bottom-Right) */}
            <line
              x1="350"
              y1="210"
              x2="465"
              y2="300"
              stroke={activeNode === "institutions" ? "#f59e0b" : "rgba(245,158,11,0.5)"}
              strokeWidth={activeNode === "institutions" ? "2.5" : "1.5"}
              strokeDasharray="4 3"
              className="transition-all duration-300"
            />
            {/* OPPORTUNITIES Line (Bottom-Center) */}
            <line
              x1="350"
              y1="210"
              x2="310"
              y2="400"
              stroke={activeNode === "opportunities" ? "#0ea5e9" : "rgba(14,165,233,0.5)"}
              strokeWidth={activeNode === "opportunities" ? "2.5" : "1.5"}
              strokeDasharray="4 3"
              className="transition-all duration-300"
            />
          </g>

          {/* Central Hub Glowing Ring */}
          <g transform="translate(350, 210)">
            <circle
              r="68"
              fill="rgba(3, 7, 18, 0.95)"
              stroke="#06b6d4"
              strokeWidth="2.5"
              className="shadow-[0_0_25px_rgba(6,182,212,0.55)]"
            />
            <circle
              r="75"
              fill="none"
              stroke="rgba(6, 182, 212, 0.35)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="animate-[spin_25s_linear_infinite]"
            />
            <circle
              r="82"
              fill="none"
              stroke="rgba(16, 185, 129, 0.25)"
              strokeWidth="1"
              strokeDasharray="8 6"
              className="animate-[spin_40s_linear_infinite_reverse]"
            />

            {/* Central Content: Skillora Logo & Mission */}
            <foreignObject x="-62" y="-62" width="124" height="124" className="pointer-events-none">
              <div className="flex flex-col items-center justify-center h-full text-center select-none">
                {/* Stylized 'S' Badge */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-[1.5px] mb-1 shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                  <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                    <span className="font-extrabold text-sm bg-gradient-to-r from-cyan-300 to-teal-200 bg-clip-text text-transparent">
                      S
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-[15px] tracking-tight text-white leading-none">
                  Skillora
                </span>
                <span className="text-[9px] text-cyan-300 font-medium tracking-wide mt-1 leading-tight">
                  Learn • Grow • Build
                </span>
                <span className="text-[8px] text-slate-400 font-mono tracking-wider mt-0.5">
                  Your Future
                </span>
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* ---------------- 5 FLOATING INTERACTIVE ROLE NODES ---------------- */}

        {/* 1. STUDENTS (Top Left) */}
        <div
          className="absolute left-[2%] sm:left-[4%] md:left-[5%] top-[10%] flex items-center gap-3 sm:gap-3.5 cursor-pointer transition-all duration-300 group"
          onMouseEnter={() => setActiveNode("students")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <div className="text-right hidden sm:block">
            <h4 className="font-bold text-xs tracking-wider text-cyan-400 group-hover:text-cyan-300 uppercase">
              STUDENTS
            </h4>
            <ul className="text-[10px] text-slate-300 space-y-0.5 mt-1 font-sans">
              <li>• Skill Assessment</li>
              <li>• Career Guidance</li>
              <li>• Opportunities</li>
              <li>• Portfolio</li>
            </ul>
          </div>
          <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-slate-950/90 border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
          </div>
          <div className="text-left sm:hidden">
            <h4 className="font-bold text-[11px] text-cyan-400 uppercase">STUDENTS</h4>
          </div>
        </div>

        {/* 2. INDUSTRY (Top Right) */}
        <div
          className="absolute right-[2%] sm:right-[4%] md:right-[5%] top-[10%] flex items-center gap-3 sm:gap-3.5 cursor-pointer transition-all duration-300 group"
          onMouseEnter={() => setActiveNode("industry")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-slate-950/90 border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all duration-300">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
          </div>
          <div className="text-left hidden sm:block">
            <h4 className="font-bold text-xs tracking-wider text-purple-400 group-hover:text-purple-300 uppercase">
              INDUSTRY
            </h4>
            <ul className="text-[10px] text-slate-300 space-y-0.5 mt-1 font-sans">
              <li>• Talent Discovery</li>
              <li>• Internships &amp; Jobs</li>
              <li>• Projects &amp; Training</li>
              <li>• Industry Insights</li>
            </ul>
          </div>
          <div className="text-left sm:hidden">
            <h4 className="font-bold text-[11px] text-purple-400 uppercase">INDUSTRY</h4>
          </div>
        </div>

        {/* 3. ACADEMIA (Middle/Bottom Left) */}
        <div
          className="absolute left-[2%] sm:left-[4%] md:left-[5%] top-[48%] sm:top-[50%] flex items-center gap-3 sm:gap-3.5 cursor-pointer transition-all duration-300 group"
          onMouseEnter={() => setActiveNode("academia")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <div className="text-right hidden sm:block">
            <h4 className="font-bold text-xs tracking-wider text-emerald-400 group-hover:text-emerald-300 uppercase">
              ACADEMIA
            </h4>
            <ul className="text-[10px] text-slate-300 space-y-0.5 mt-1 font-sans">
              <li>• Faculty Development</li>
              <li>• Research Collaboration</li>
              <li>• Academic Programs</li>
              <li>• Mentorship</li>
            </ul>
          </div>
          <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-slate-950/90 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all duration-300">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          </div>
          <div className="text-left sm:hidden">
            <h4 className="font-bold text-[11px] text-emerald-400 uppercase">ACADEMIA</h4>
          </div>
        </div>

        {/* 4. INSTITUTIONS (Middle/Bottom Right) */}
        <div
          className="absolute right-[2%] sm:right-[4%] md:right-[5%] top-[48%] sm:top-[50%] flex items-center gap-3 sm:gap-3.5 cursor-pointer transition-all duration-300 group"
          onMouseEnter={() => setActiveNode("institutions")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-slate-950/90 border-2 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] transition-all duration-300">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
          </div>
          <div className="text-left hidden sm:block">
            <h4 className="font-bold text-xs tracking-wider text-amber-400 group-hover:text-amber-300 uppercase">
              INSTITUTIONS
            </h4>
            <ul className="text-[10px] text-slate-300 space-y-0.5 mt-1 font-sans">
              <li>• Student Analytics</li>
              <li>• Skill Gap Reports</li>
              <li>• Placement Insights</li>
              <li>• Outcome Tracking</li>
            </ul>
          </div>
          <div className="text-left sm:hidden">
            <h4 className="font-bold text-[11px] text-amber-400 uppercase">INSTITUTIONS</h4>
          </div>
        </div>

        {/* 5. OPPORTUNITIES (Bottom Center) */}
        <div
          className="absolute left-[8%] sm:left-[22%] md:left-[26%] bottom-[4%] flex items-center gap-3 cursor-pointer transition-all duration-300 group"
          onMouseEnter={() => setActiveNode("opportunities")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-950/90 border-2 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.8)] transition-all duration-300 shrink-0">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-xs tracking-wider text-sky-400 group-hover:text-sky-300 uppercase">
              OPPORTUNITIES
            </h4>
            <p className="text-[10px] text-slate-300 mt-0.5 font-sans whitespace-normal sm:whitespace-nowrap">
              • Internships &nbsp;• Jobs &nbsp;• Projects &nbsp;• Certifications
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Bullets Summary (compact list for small screens) */}
      <div className="grid grid-cols-2 gap-2 pt-3 sm:hidden border-t border-white/10 mt-2">
        <div className="p-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
          <span className="text-[10px] font-bold text-cyan-400 uppercase block">STUDENTS</span>
          <p className="text-[9px] text-slate-300 mt-0.5 leading-snug">
            Assessment • Guidance • Opportunities • Portfolio
          </p>
        </div>
        <div className="p-2 rounded-xl bg-purple-500/5 border border-purple-500/20">
          <span className="text-[10px] font-bold text-purple-400 uppercase block">INDUSTRY</span>
          <p className="text-[9px] text-slate-300 mt-0.5 leading-snug">
            Talent Discovery • Internships • Projects • Insights
          </p>
        </div>
        <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">ACADEMIA</span>
          <p className="text-[9px] text-slate-300 mt-0.5 leading-snug">
            Faculty • Research • Programs • Mentorship
          </p>
        </div>
        <div className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <span className="text-[10px] font-bold text-amber-400 uppercase block">INSTITUTIONS</span>
          <p className="text-[9px] text-slate-300 mt-0.5 leading-snug">
            Analytics • Skill Gap Reports • Placements • Outcomes
          </p>
        </div>
      </div>

      {/* ---------------- BOTTOM BAR: POWERED BY AI ---------------- */}
      <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 px-1 sm:px-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          <span>POWERED BY AI</span>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5 text-xs text-slate-300/90 font-sans">
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">•</span> Personalized Learning
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">•</span> Smart Matching
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">•</span> Intelligent Alerts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">•</span> Data-Driven Insights
          </span>
        </div>
      </div>
    </div>
  );
}

export default SkilloraEcosystemVisualizer;

