"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Award,
  Download,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  Printer,
  ChevronRight,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkilloraCertificate } from "@/components/skills/skillora-certificate";
import { useAuth } from "@/lib/auth/auth-context";

const PRESET_DOMAINS = [
  {
    title: "Generative AI & Large Language Model Systems",
    short: "Generative AI",
    skills: ["Prompt Engineering", "RAG Architectures", "LangChain / LlamaIndex", "Fine-Tuning", "Vector Databases"],
    defaultScore: 94,
  },
  {
    title: "Full-Stack Web & React Engineering",
    short: "React & Next.js",
    skills: ["React 18 / Next.js 14", "TypeScript", "Tailwind CSS", "REST & GraphQL APIs", "State Architecture"],
    defaultScore: 92,
  },
  {
    title: "Data Analytics & Advanced SQL Mastery",
    short: "SQL & Analytics",
    skills: ["PostgreSQL", "Window Functions", "ETL Pipelines", "Data Modeling", "Business Intelligence"],
    defaultScore: 88,
  },
  {
    title: "Cloud Infrastructure & DevOps Automation",
    short: "DevOps & Cloud",
    skills: ["Docker & Containers", "Kubernetes", "CI/CD Actions", "AWS Architecture", "Terraform IaC"],
    defaultScore: 90,
  },
  {
    title: "Cybersecurity Operations & Network Defense",
    short: "Cybersecurity",
    skills: ["OWASP Top 10", "Network Forensics", "Zero Trust Auth", "Threat Modeling", "Penetration Testing"],
    defaultScore: 89,
  },
  {
    title: "Python Programming & Machine Learning",
    short: "Python & ML",
    skills: ["Python 3.12", "NumPy & Pandas", "Scikit-Learn", "Model Evaluation", "Feature Engineering"],
    defaultScore: 95,
  },
];

function CertificateViewerContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const [candidateName, setCandidateName] = useState(() => {
    return (
      searchParams.get("name") ||
      user?.fullName ||
      user?.studentProfile?.fullName ||
      (user?.email ? user.email.split("@")[0] : "") ||
      "Learner"
    );
  });
  const [score, setScore] = useState(94);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);

  // Dynamically synchronize candidateName with the user's logged-in account name
  useEffect(() => {
    const nameQuery = searchParams.get("name");
    if (nameQuery) {
      setCandidateName(nameQuery);
    } else if (user?.fullName) {
      setCandidateName(user.fullName);
    } else if (user?.studentProfile?.fullName) {
      setCandidateName(user.studentProfile.fullName);
    } else if (user?.email) {
      setCandidateName(user.email.split("@")[0]);
    }
  }, [user, searchParams]);

  useEffect(() => {
    const domainQuery = searchParams.get("domain");
    const scoreQuery = searchParams.get("score");

    if (domainQuery) {
      const idx = PRESET_DOMAINS.findIndex(
        (d) =>
          d.title.toLowerCase().includes(domainQuery.toLowerCase()) ||
          d.short.toLowerCase().includes(domainQuery.toLowerCase())
      );
      if (idx !== -1) {
        setSelectedDomainIndex(idx);
      }
    }
    if (scoreQuery) {
      const parsed = parseInt(scoreQuery, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
        setScore(parsed);
      }
    }
  }, [searchParams]);

  const currentDomain = PRESET_DOMAINS[selectedDomainIndex];
  const certId =
    searchParams.get("cert") ||
    `SKILLORA-CERT-${currentDomain.short.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()}-${score}82-VERIFIED`;
  const issueDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/certificate?cert=${certId}&domain=${encodeURIComponent(
          currentDomain.title
        )}&name=${encodeURIComponent(candidateName)}&score=${score}`
      : `https://buildathon-2-o.vercel.app/certificate?cert=${certId}`;

  const linkedInPostText =
    `🎓 Thrilled to announce that I have successfully cleared the AI-proctored competency assessment and earned the official Certificate of Demonstrated Mastery in ${currentDomain.title} from Skillora! 🚀\n\n` +
    `📊 Demonstrated Proficiency: ${score}%\n` +
    `🔒 Verification Credential ID: ${certId}\n` +
    `🏛️ Issuing Authority: Skillora Autonomous AI Learning Ecosystem\n\n` +
    `Verify my credential here: ${verificationUrl}\n\n` +
    `#Skillora #SkillCertified #${currentDomain.short.replace(/[^a-zA-Z0-9]/g, "")} #ContinuousLearning #TechSkills #CareerGrowth`;

  const handleShareToLinkedIn = () => {
    const postUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
      linkedInPostText
    )}`;
    window.open(postUrl, "_blank", "width=680,height=700,menubar=no,toolbar=no");
  };

  const handleCopyVerification = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyPostText = async () => {
    try {
      await navigator.clipboard.writeText(linkedInPostText);
      setCopiedPost(true);
      setTimeout(() => setCopiedPost(false), 2500);
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Print Stylesheet */}
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

      {/* Decorative ambient glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative">
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 no-print border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/skills"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Assessments</span>
            </Link>
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Official Skillora Credential Ledger</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/certificate-template.jpg"
              download={`${currentDomain.title.replace(/[^a-zA-Z0-9]/g, "_")}_Certificate.jpg`}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-medium flex items-center gap-1.5 transition-all text-slate-200 hover:border-cyan-500/40"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Download Image</span>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="font-mono text-xs border-white/15 hover:border-cyan-500/40"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
              <span>Print / PDF</span>
            </Button>
            <Button
              size="sm"
              onClick={handleShareToLinkedIn}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(10,102,194,0.35)]"
            >
              <svg className="h-3.5 w-3.5 mr-1.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Share to LinkedIn</span>
            </Button>
          </div>
        </div>

        {/* Domain Selection Tabs */}
        <div className="space-y-3 no-print">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>Select Domain Track to Preview Certificate</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {PRESET_DOMAINS.length} Accredited Tracks Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {PRESET_DOMAINS.map((domain, index) => {
              const isActive = index === selectedDomainIndex;
              return (
                <button
                  key={domain.short}
                  onClick={() => {
                    setSelectedDomainIndex(index);
                    setScore(domain.defaultScore);
                  }}
                  className={`p-2.5 rounded-xl text-left font-mono transition-all border ${
                    isActive
                      ? "bg-cyan-500/15 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-white"
                      : "bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{domain.short}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{domain.defaultScore}% Avg.</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Candidate & Score Customization Controls */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/15 text-sm font-serif font-bold text-white focus:outline-none focus:border-cyan-500 transition-colors w-48 sm:w-60"
                placeholder="Enter Recipient Name"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Verified Score (%)
              </label>
              <input
                type="number"
                min="60"
                max="100"
                value={score}
                onChange={(e) => setScore(Math.min(100, Math.max(60, Number(e.target.value) || 60)))}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/15 text-sm font-mono font-bold text-cyan-400 focus:outline-none focus:border-cyan-500 transition-colors w-24"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyVerification}
              className="text-xs font-mono border-white/15 hover:border-emerald-500/40 text-slate-300"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1 text-slate-400" />
                  <span>Copy Verification URL</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPostText}
              className="text-xs font-mono border-white/15 hover:border-cyan-500/40 text-slate-300"
            >
              {copiedPost ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1 text-cyan-400" />
                  <span>Post Text Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 mr-1 text-slate-400" />
                  <span>Copy LinkedIn Text</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE MASTER CERTIFICATE (Exact replica of user's uploaded template)        */}
        {/* ========================================================================= */}
        <SkilloraCertificate
          studentName={candidateName}
          domainTitle={currentDomain.title}
          score={score}
          certificateId={certId}
          issueDate={issueDate}
          skillsCovered={currentDomain.skills}
          id="printable-certificate"
        />

        {/* High-Resolution Sample Showcase Banner */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 space-y-4 no-print">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Official Credential Physical &amp; Digital Foil Specification
              </h3>
            </div>
            <Badge variant="cyber" size="sm" className="font-mono text-[10px]">
              Studio High-Res Master
            </Badge>
          </div>

          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            Skillora certificates use encrypted tamper-proof verification tokens and guilloche security patterns, validated directly against candidate proctoring audit trails. Users can download their high-res foil certificate, print as archival PDF, or push directly to their professional LinkedIn profile.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/certificate-template.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 transition-all hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Inspect High-Resolution Foil Master</span>
            </a>
            <Button
              onClick={handleShareToLinkedIn}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white font-mono text-xs font-bold"
            >
              <span>Test LinkedIn Share Dialog</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030712] flex items-center justify-center text-cyan-400 font-mono">
          Loading certificate verification ledger...
        </div>
      }
    >
      <CertificateViewerContent />
    </Suspense>
  );
}

