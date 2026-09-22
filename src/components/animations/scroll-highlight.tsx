"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type FontStyle = React.CSSProperties;
export type SplitBy = "characters" | "words";
export type ScrollPosition =
  | "top top"
  | "top center"
  | "top bottom"
  | "top 80%"
  | "top 70%"
  | "top 60%"
  | "center top"
  | "center center"
  | "center bottom"
  | "bottom top"
  | "bottom center"
  | "bottom bottom"
  | string;

export interface ScrollHighlightProps {
  className?: string;
  containerClassName?: string;
  text?: string;
  font?: FontStyle;
  dimColor?: string;
  highlightColor?: string;
  splitBy?: SplitBy;
  scrollStart?: ScrollPosition;
  scrollEnd?: ScrollPosition;
  scrub?: boolean | number;
  style?: React.CSSProperties;
}

const CHAR_STAGGER = 0.03;
const WORD_STAGGER = 0.06;

export default function ScrollHighlight({
  className,
  containerClassName,
  text = "Bridging the gap between where students are, and where their future can take them.\n\nConnecting learning, support, and opportunity — so every student can learn, grow, and move forward with confidence.",
  font = {
    fontFamily: "var(--font-sans), Inter, system-ui, sans-serif",
    fontSize: "clamp(1.75rem, 3.8vw, 3.25rem)",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    lineHeight: "1.35em",
    textAlign: "center",
  },
  dimColor = "rgba(255, 255, 255, 0.18)",
  highlightColor = "#FFFFFF",
  splitBy = "words",
  scrollStart = "top 75%",
  scrollEnd = "bottom 45%",
  scrub = 0.8,
  style,
}: ScrollHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Split text by double newlines or single newlines to preserve distinct paragraphs
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const stagger = splitBy === "characters" ? CHAR_STAGGER : WORD_STAGGER;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const targets = container.querySelectorAll(
      splitBy === "characters" ? ".char" : ".word"
    );

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        color: dimColor,
        opacity: 0.28,
      });

      gsap.to(targets, {
        color: highlightColor,
        opacity: 1,
        stagger,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: scrollStart,
          end: scrollEnd,
          scrub: scrub === true ? 1 : scrub,
        },
      });
    }, container);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [
    text,
    dimColor,
    highlightColor,
    splitBy,
    stagger,
    scrollStart,
    scrollEnd,
    scrub,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={cn("w-full py-8 sm:py-12 flex items-center justify-center relative", containerClassName)}
      style={style}
    >
      <div
        ref={containerRef}
        className={cn("max-w-4xl mx-auto px-4 leading-tight font-extrabold select-none text-center", className)}
        style={{
          margin: 0,
          color: dimColor,
          ...font,
        }}
      >
        {paragraphs.map((p, pIdx) => {
          const words = p.split(/\s+/).filter(Boolean);
          const chars = Array.from(p);

          return (
            <div
              key={`paragraph-${pIdx}`}
              className={cn("block", pIdx > 0 && "mt-6 sm:mt-8")}
            >
              {splitBy === "characters"
                ? chars.map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      className="char inline-block will-change-[color,opacity]"
                      style={{ color: dimColor, opacity: 0.28 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))
                : words.map((word, index) => (
                    <React.Fragment key={`${word}-${index}`}>
                      <span
                        className="word inline-block will-change-[color,opacity]"
                        style={{ color: dimColor, opacity: 0.28 }}
                      >
                        {word}
                      </span>
                      {index < words.length - 1 ? " " : null}
                    </React.Fragment>
                  ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ScrollHighlight };

