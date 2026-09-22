"use client";

import React, { useRef } from "react";
import { Award, QrCode } from "lucide-react";

export interface SkilloraCertificateProps {
  studentName: string;
  domainTitle: string;
  score: number;
  certificateId: string;
  issueDate?: string;
  skillsCovered?: string[];
  id?: string;
}

export function SkilloraCertificate({
  studentName,
  domainTitle,
  score,
  certificateId,
  issueDate,
  skillsCovered,
  id = "printable-certificate",
}: SkilloraCertificateProps) {
  const certName = studentName && studentName.trim() ? studentName : "Certified Scholar";
  const certDomain = domainTitle && domainTitle.trim() ? domainTitle : "Generative AI & Large Language Model Systems";
  const certScore = score || 94;
  const certId = certificateId || "SKILLORA-CERT-AI-9482-VERIFIED";

  return (
    <div
      id={id}
      className="relative w-full aspect-[1.414/1] max-w-4xl mx-auto bg-[#FCFCFD] text-[#0B1938] overflow-hidden rounded-2xl shadow-2xl border border-[#E2E8F0] select-none flex flex-col justify-between p-6 sm:p-10 md:p-12 transition-all"
      style={{
        boxShadow: "0 25px 50px -12px rgba(11, 25, 56, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.3)",
      }}
    >
      {/* ========================================================================= */}
      {/* 1. GEOMETRIC CORNER ACCENTS & BORDERS (Matching uploaded template)        */}
      {/* ========================================================================= */}

      {/* TOP-LEFT GEOMETRIC CORNER ACCENT */}
      <div className="absolute top-0 left-0 w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 pointer-events-none z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Main Deep Navy Polygon */}
          <polygon points="0,0 200,0 0,200" fill="#0B1B3D" />
          {/* Inner Navy Facet */}
          <polygon points="0,0 160,0 0,160" fill="#132F68" />
          {/* Deep Navy Dark Corner */}
          <polygon points="0,0 110,0 0,110" fill="#08142C" />
          {/* First Gold Stripe */}
          <polygon points="175,0 200,0 0,200 0,175" fill="#D4AF37" opacity="0.9" />
          {/* Second Gold Stripe */}
          <polygon points="135,0 148,0 0,148 0,135" fill="#F3E5AB" opacity="0.8" />
          {/* Third Outer Gold Accent */}
          <polygon points="208,0 215,0 0,215 0,208" fill="#C5A059" opacity="0.85" />
        </svg>
      </div>

      {/* BOTTOM-RIGHT GEOMETRIC CORNER ACCENT */}
      <div className="absolute bottom-0 right-0 w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 pointer-events-none z-10 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Main Deep Navy Polygon */}
          <polygon points="0,0 200,0 0,200" fill="#0B1B3D" />
          {/* Inner Navy Facet */}
          <polygon points="0,0 160,0 0,160" fill="#132F68" />
          {/* Deep Navy Dark Corner */}
          <polygon points="0,0 110,0 0,110" fill="#08142C" />
          {/* First Gold Stripe */}
          <polygon points="175,0 200,0 0,200 0,175" fill="#D4AF37" opacity="0.9" />
          {/* Second Gold Stripe */}
          <polygon points="135,0 148,0 0,148 0,135" fill="#F3E5AB" opacity="0.8" />
          {/* Third Outer Gold Accent */}
          <polygon points="208,0 215,0 0,215 0,208" fill="#C5A059" opacity="0.85" />
        </svg>
      </div>

      {/* SUBTLE RIGHT WATERMARK (Skillora AI Icon Ring) */}
      <div className="absolute -right-12 top-1/4 w-72 sm:w-96 h-72 sm:h-96 opacity-[0.035] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#0B1938] fill-none" strokeWidth="8">
          <circle cx="50" cy="50" r="38" />
          <circle cx="50" cy="22" r="5" fill="#0B1938" />
        </svg>
      </div>

      {/* ORNATE DOUBLE GOLD INNER KEYLINE FRAME */}
      <div className="absolute inset-3 sm:inset-5 md:inset-6 border border-[#D4AF37]/50 pointer-events-none rounded-lg" />
      <div className="absolute inset-4 sm:inset-6 md:inset-7 border border-[#D4AF37]/25 pointer-events-none rounded-md" />

      {/* CORNER INSET L-ACCENTS */}
      <div className="absolute top-7 left-7 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none hidden sm:block" />
      <div className="absolute top-7 right-7 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none hidden sm:block" />
      <div className="absolute bottom-7 left-7 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none hidden sm:block" />
      <div className="absolute bottom-7 right-7 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none hidden sm:block" />

      {/* ========================================================================= */}
      {/* 2. CERTIFICATE CONTENT                                                    */}
      {/* ========================================================================= */}

      <div className="relative z-20 flex flex-col justify-between h-full space-y-4 sm:space-y-6 text-center">
        {/* TOP BRAND HEADER */}
        <div className="pt-2 sm:pt-4">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <div className="relative flex items-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#0B1938] font-sans">
                SKILL
              </span>
              {/* Custom 'O' with Cyan AI Dot */}
              <div className="relative inline-flex items-center justify-center mx-[1px]">
                <div className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 rounded-full border-[3px] sm:border-[4px] border-[#0B1938] flex items-center justify-center relative">
                  <div className="absolute -top-1 -right-1 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
                </div>
              </div>
              <span className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#0B1938] font-sans">
                RA
              </span>
            </div>
          </div>
          <div className="text-[8px] sm:text-[10px] md:text-[11px] font-sans font-bold tracking-[0.35em] text-[#475569] uppercase mt-0.5">
            AI Skill Intelligence
          </div>
        </div>

        {/* CERTIFICATE TITLE & OF DEMONSTRATED MASTERY */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-wide text-[#0B1938] uppercase">
            CERTIFICATE
          </h1>
          <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]" />
            <span className="text-[10px] sm:text-xs md:text-sm font-serif font-bold tracking-[0.25em] text-[#B8860B] uppercase whitespace-nowrap">
              OF DEMONSTRATED MASTERY
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]" />
          </div>
        </div>

        {/* RECIPIENT INTRODUCTION */}
        <div className="space-y-1">
          <span className="text-[8px] sm:text-[10px] md:text-xs font-sans uppercase tracking-[0.25em] text-[#64748B] font-bold block">
            THIS CERTIFICATE IS AWARDED TO
          </span>
          <div className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-wider text-[#0B1938] py-0.5">
            {certName}
          </div>
          {/* Small Gold Diamond */}
          <div className="text-[#D4AF37] text-xs sm:text-sm leading-none flex justify-center">
            ◆
          </div>
        </div>

        {/* DOMAIN & SPECIALIZATION STATEMENT */}
        <div className="space-y-2 max-w-3xl mx-auto px-4">
          <span className="text-[8px] sm:text-[10px] md:text-[11px] font-sans uppercase tracking-[0.2em] text-[#64748B] font-bold block">
            FOR SUCCESSFULLY ACHIEVING THE SKILLORA CERTIFICATION IN
          </span>
          <div className="text-lg sm:text-2xl md:text-3xl font-sans font-black tracking-wide text-[#0B1938] uppercase leading-tight">
            {certDomain}
          </div>
        </div>

        {/* DEMONSTRATED SCORE BADGE & CREDENTIAL ID */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-[#0B1938] text-white shadow-md border border-[#D4AF37]">
            <span className="text-[#FBBF24] text-xs sm:text-sm">★</span>
            <span className="text-xs sm:text-sm font-sans font-bold tracking-wide">
              {certScore}% Demonstrated Score
            </span>
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-mono font-medium tracking-widest text-[#64748B] uppercase">
            CERTIFICATE ID: {certId}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SIGNATURES & OFFICIAL SEAL ROW                                        */}
        {/* ========================================================================= */}
        <div className="pt-2 sm:pt-4 border-t border-[#E2E8F0]/60 flex items-center justify-between gap-2 px-2 sm:px-6">
          {/* LEFT SIGNATURE: Dr. Arvind Rao */}
          <div className="flex-1 text-center sm:text-left space-y-0.5 max-w-[170px] sm:max-w-[200px]">
            <div className="h-8 sm:h-10 flex items-end justify-center sm:justify-start">
              <span className="font-serif italic font-medium text-lg sm:text-2xl text-[#0B1938] tracking-wider transform -rotate-1">
                Arvind Rao
              </span>
            </div>
            <div className="h-[1px] w-full bg-[#CBD5E1]" />
            <div className="text-[10px] sm:text-xs font-sans font-bold text-[#0B1938]">
              Dr. Arvind Rao
            </div>
            <div className="text-[8px] sm:text-[9px] font-sans text-[#64748B]">
              Director of AI Assessment
            </div>
          </div>

          {/* CENTER: OFFICIAL MEDALLION & QR CODE */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 shrink-0">
            {/* Scalloped Gold Medallion */}
            <div className="relative h-14 w-14 sm:h-18 sm:w-18 md:h-20 md:w-20 rounded-full flex items-center justify-center p-1 shadow-lg bg-gradient-to-tr from-[#B8860B] via-[#D4AF37] to-[#F3E5AB]">
              <div className="h-full w-full rounded-full bg-[#D4AF37] border-2 border-dashed border-[#8B6508] flex flex-col items-center justify-center p-1 text-center shadow-inner">
                {/* Center Ring Icon */}
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-[#593E07] flex items-center justify-center mb-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#593E07]" />
                </div>
                <span className="text-[6px] sm:text-[7px] font-sans font-black tracking-tighter text-[#422E04] uppercase leading-tight">
                  SKILLORA
                </span>
                <span className="text-[5px] sm:text-[6px] font-sans font-bold text-[#422E04] uppercase leading-none">
                  CERTIFIED
                </span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-1 sm:p-1.5 bg-white rounded-lg border border-[#CBD5E1] shadow-sm">
                <QrCode className="h-7 w-7 sm:h-9 sm:w-9 text-[#0B1938]" />
              </div>
              <span className="text-[7px] sm:text-[8px] font-sans font-semibold text-[#64748B] mt-0.5">
                Scan to Verify
              </span>
            </div>
          </div>

          {/* RIGHT SIGNATURE: Prof. Elena Rostova */}
          <div className="flex-1 text-center sm:text-right space-y-0.5 max-w-[170px] sm:max-w-[200px]">
            <div className="h-8 sm:h-10 flex items-end justify-center sm:justify-end">
              <span className="font-serif italic font-medium text-lg sm:text-2xl text-[#0B1938] tracking-wider transform -rotate-1">
                Elena Rostova
              </span>
            </div>
            <div className="h-[1px] w-full bg-[#CBD5E1]" />
            <div className="text-[10px] sm:text-xs font-sans font-bold text-[#0B1938]">
              Prof. Elena Rostova
            </div>
            <div className="text-[8px] sm:text-[9px] font-sans text-[#64748B]">
              Dean of Technical Certification
            </div>
          </div>
        </div>

        {/* BOTTOM MOTTO FOOTER */}
        <div className="pt-1">
          <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.3em] text-[#B8860B] uppercase">
              LEARN • BUILD • GROW
            </span>
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
