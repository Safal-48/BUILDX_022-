"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Mail, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/auth-context";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/auth/schemas";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsSubmitting(true);
    setServerError(null);
    setSuccessMessage(null);

    const res = await forgotPassword(data);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage(res.message || "Reset link sent successfully");
    } else {
      setServerError(res.error || "Failed to process recovery request");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] py-8 sm:py-12 flex items-center justify-center w-full overflow-hidden">
      {/* Ambient background glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-full bg-gradient-to-tr from-cyan-500/15 via-violet-500/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-[540px] px-4 sm:px-6 md:scale-[1.02] lg:scale-[1.06] xl:scale-[1.10] transition-transform duration-300 origin-center">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-8 space-y-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 shadow-glow-sm mb-2">
              <KeyRound className="h-7 w-7" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-mono">
              Recover Access
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm font-mono font-medium">
              Enter your registered email address and we will dispatch credentials recovery instructions.
            </p>
          </div>
        </FadeIn>

        <SlideUp delay={0.1}>
          <GlassCard className="p-7 sm:p-9 border-cyan-500/40 bg-slate-950/92 backdrop-blur-3xl shadow-[0_0_60px_rgba(6,182,212,0.18),0_25px_60px_rgba(0,0,0,0.85)] space-y-6 rounded-2xl sm:rounded-3xl relative overflow-hidden" glow>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />

            {successMessage ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 font-mono">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-foreground text-base">Recovery Dispatched</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {successMessage}
                </p>
                <div className="pt-4">
                  <Link href="/login">
                    <Button variant="glow" size="sm" className="font-mono text-xs" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-mono">
                {serverError && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                    Registered Email
                  </label>
                  <Input
                    type="email"
                    placeholder="name@organization.com"
                    leftIcon={<Mail className="h-5 w-5 text-cyan-400" />}
                    className="h-12 sm:h-13 bg-slate-900/90 border-white/15 text-sm sm:text-base font-mono rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 pl-11"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs sm:text-sm text-rose-400">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  className="w-full justify-center h-12 sm:h-14 mt-3 text-sm sm:text-base font-mono font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] cursor-pointer"
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Send Recovery Link
                </Button>

                <div className="pt-4 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Return to Login</span>
                  </Link>
                </div>
              </form>
            )}
          </GlassCard>
        </SlideUp>
      </div>
    </div>
  );
}

