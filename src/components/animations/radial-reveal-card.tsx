"use client";

import * as React from "react";
import Link from "next/link";
import {
  useAnimate,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";

export interface RadialRevealCardProps {
  href: string;
  category: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  accentColor?: "teal" | "cyan" | "purple";
  style?: React.CSSProperties;
}

export function RadialRevealCard({
  href,
  category,
  title,
  badge,
  icon,
  accentColor = "cyan",
  style,
}: RadialRevealCardProps) {
  const [scope, animate] = useAnimate();
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const clipCtrl = React.useRef<AnimationPlaybackControls | null>(null);
  const reducedMotion = useReducedMotion();
  const clip = React.useRef({ r: 0, x: 50, y: 50, max: 150 });

  const applyClip = () => {
    const el = overlayRef.current;
    if (!el) return;
    const { r, x, y } = clip.current;
    const value = `circle(${r}% at ${x}% ${y}%)`;
    el.style.clipPath = value;
    (el.style as any).webkitClipPath = value;
  };

  const anchorTo = (e: React.PointerEvent) => {
    const el = scope.current as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const unit = Math.hypot(r.width, r.height) / Math.SQRT2;
    const far = Math.max(
      Math.hypot(px, py),
      Math.hypot(r.width - px, py),
      Math.hypot(px, r.height - py),
      Math.hypot(r.width - px, r.height - py)
    );
    clip.current.x = (px / r.width) * 100;
    clip.current.y = (py / r.height) * 100;
    clip.current.max = (far / unit) * 100 + 4;
  };

  const growTo = (to: number) => {
    clipCtrl.current?.stop();
    if (reducedMotion) {
      clip.current.r = to;
      applyClip();
      return;
    }
    clipCtrl.current = animate(clip.current.r, to, {
      type: "tween",
      ease: "easeInOut",
      duration: 0.45,
      onUpdate: (v: number) => {
        clip.current.r = v;
        applyClip();
      },
    });
  };

  const onEnter = (e: React.PointerEvent) => {
    anchorTo(e);
    applyClip();
    growTo(clip.current.max);
  };

  const onLeave = (e: React.PointerEvent) => {
    if (clip.current.r >= clip.current.max - 0.5) {
      anchorTo(e);
      clip.current.r = clip.current.max;
      applyClip();
    }
    growTo(0);
  };

  React.useEffect(() => {
    applyClip();
    return () => clipCtrl.current?.stop();
  }, []);

  // Theme variant styles
  const theme = {
    teal: {
      borderResting: "border-teal-500/40",
      borderHover: "border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.35)]",
      glowBg:
        "radial-gradient(ellipse at center, rgba(20,184,166,0.22) 0%, rgba(6,182,212,0.12) 50%, #030b17 100%)",
      titleHover: "text-teal-300 drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]",
      iconBoxHover: "bg-teal-500/20 border-teal-400 text-teal-300",
      pillHover: "bg-teal-500/25 border-teal-400 text-teal-200",
    },
    cyan: {
      borderResting: "border-cyan-500/40",
      borderHover: "border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)]",
      glowBg:
        "radial-gradient(ellipse at center, rgba(6,182,212,0.25) 0%, rgba(59,130,246,0.12) 50%, #030b17 100%)",
      titleHover: "text-cyan-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]",
      iconBoxHover: "bg-cyan-500/20 border-cyan-400 text-cyan-300",
      pillHover: "bg-cyan-500/25 border-cyan-400 text-cyan-200",
    },
    purple: {
      borderResting: "border-purple-500/40",
      borderHover: "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.35)]",
      glowBg:
        "radial-gradient(ellipse at center, rgba(168,85,247,0.25) 0%, rgba(6,182,212,0.12) 50%, #030b17 100%)",
      titleHover: "text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]",
      iconBoxHover: "bg-purple-500/20 border-purple-400 text-purple-300",
      pillHover: "bg-purple-500/25 border-purple-400 text-purple-200",
    },
  }[accentColor];

  return (
    <Link href={href} className="group block h-full select-none">
      <div
        ref={scope}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={`relative rounded-2xl border-2 ${theme.borderResting} bg-[#040b17]/90 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] overflow-hidden backdrop-blur-xl shadow-xl`}
        style={style}
      >
        {/* ---------------- 1. RESTING FACE (Visible by default) ---------------- */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            {category}
          </span>
          <div className="h-9 w-9 rounded-2xl bg-[#031c26] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
            {icon}
          </div>
        </div>

        <div className="py-2">
          <div
            className="font-black text-white tracking-tight"
            style={{ fontSize: "clamp(1.35rem, 1.9vw, 1.75rem)" }}
          >
            {title}
          </div>
        </div>

        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#021d20]/90 border border-teal-500/40 font-mono text-[#2dd4bf] font-semibold w-fit text-xs sm:text-[13px] leading-tight">
          <span>{badge}</span>
        </div>

        {/* ---------------- 2. REVEALED HOVER FACE (Clipped circle expanding from cursor entry point) ---------------- */}
        <div
          ref={overlayRef}
          aria-hidden
          className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-between border-2 ${theme.borderHover} rounded-2xl pointer-events-none z-10 transition-shadow duration-300`}
          style={{
            background: theme.glowBg,
            clipPath: "circle(0% at 50% 50%)",
            WebkitClipPath: "circle(0% at 50% 50%)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-white font-bold drop-shadow">
              {category}
            </span>
            <div
              className={`h-9 w-9 rounded-2xl border flex items-center justify-center transition-all duration-300 ${theme.iconBoxHover} shadow-glow-sm`}
            >
              {icon}
            </div>
          </div>

          <div className="py-2">
            <div
              className={`font-black tracking-tight ${theme.titleHover} transition-all duration-300`}
              style={{ fontSize: "clamp(1.35rem, 1.9vw, 1.75rem)" }}
            >
              {title}
            </div>
          </div>

          <div
            className={`inline-flex items-center px-3.5 py-1.5 rounded-full border font-mono font-bold w-fit text-xs sm:text-[13px] leading-tight shadow-md ${theme.pillHover} transition-all duration-300`}
          >
            <span>{badge}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
