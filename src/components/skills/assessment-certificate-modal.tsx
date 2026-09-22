"use client";

import React, { useRef, useState } from "react";
import {
  Award,
  Download,
  Share2,
  Copy,
  Check,
  X,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkilloraCertificate } from "./skillora-certificate";

export interface CertificateData {
  studentName: string;
  domainTitle: string;
  score: number;
  skillsCovered?: string[];
  certificateId: string;
  issueDate: string;
  isPassed: boolean;
}

interface AssessmentCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CertificateData;
}

export function AssessmentCertificateModal({
  isOpen,
  onClose,
  data,
}: AssessmentCertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/certificate?cert=${data.certificateId}&domain=${encodeURIComponent(
          data.domainTitle
        )}&name=${encodeURIComponent(data.studentName)}&score=${data.score}`
      : `https://buildathon-2-o.vercel.app/certificate?cert=${data.certificateId}`;

  const linkedInPostText =
    `🎓 Proud to announce that I have successfully completed the rigorous AI-proctored diagnostic assessment and earned a Certificate of Demonstrated Mastery in ${data.domainTitle} on Skillora! 🚀\n\n` +
    `📊 Demonstrated Score: ${data.score}%\n` +
    `🔒 Verification Credential: ${data.certificateId}\n` +
    `🏛️ Verified via Skillora Autonomous AI Learning Ecosystem\n\n` +
    `Verify my credential here: ${verificationUrl}\n\n` +
    `#Skillora #SkillCertified #${data.domainTitle.replace(/[^a-zA-Z0-9]/g, "")} #ContinuousLearning #TechSkills #CareerGrowth`;

  const handleShareToLinkedIn = () => {
    const postUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
      linkedInPostText
    )}`;
    window.open(postUrl, "_blank", "width=680,height=700,menubar=no,toolbar=no");
  };

  const handleCopyVerification = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyPostText = async () => {
    try {
      await navigator.clipboard.writeText(linkedInPostText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // fallback
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      {/* Print Stylesheet injection to print ONLY the certificate */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate,
          #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 24px;
            box-sizing: border-box;
            background: #FCFCFD !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="w-full max-w-4xl space-y-4 my-auto relative">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/95 border border-white/15 px-4 py-3 rounded-2xl shadow-2xl no-print">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>Verified Assessment Certificate</span>
                <Badge variant="cyber" size="sm" className="font-mono text-[9px]">
                  Tamper-Proof
                </Badge>
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                Issued for {data.domainTitle} • Score: {data.score}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Share to LinkedIn Primary CTA */}
            <button
              onClick={handleShareToLinkedIn}
              className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(10,102,194,0.4)] hover:scale-105 active:scale-95"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Share to LinkedIn</span>
            </button>

            {/* Download Original Foil Image */}
            <a
              href="/certificate-template.jpg"
              download={`${data.domainTitle.replace(/[^a-zA-Z0-9]/g, "_")}_Certificate.jpg`}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-medium flex items-center gap-1.5 transition-all text-slate-200 hover:border-cyan-500/40"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Download Image</span>
            </a>

            {/* Print / Download PDF */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrintCertificate}
              className="text-xs font-mono border-white/15 hover:border-cyan-500/40 text-slate-200"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
              <span>Print / PDF</span>
            </Button>

            {/* Copy Verification Link */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyVerification}
              className="text-xs font-mono border-white/15 hover:border-emerald-500/40 text-slate-200"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all ml-1"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE MASTER CERTIFICATE CANVAS (Replicating the user-uploaded template)   */}
        {/* ========================================================================= */}
        <SkilloraCertificate
          studentName={data.studentName}
          domainTitle={data.domainTitle}
          score={data.score}
          certificateId={data.certificateId}
          issueDate={data.issueDate}
          skillsCovered={data.skillsCovered}
          id="printable-certificate"
        />

        {/* Bottom Helper Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-mono text-slate-400 no-print">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Official Skillora Accredited Credential • Ready for LinkedIn, Resume &amp; Portfolios</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyPostText}
              className="hover:text-cyan-300 transition-colors underline flex items-center gap-1"
            >
              {copiedText ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>Post text copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy LinkedIn post text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
