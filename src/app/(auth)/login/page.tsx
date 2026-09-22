"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  UserCheck,
  GraduationCap,
  Briefcase,
  BookOpen,
  Building2,
  ShieldAlert,
  Zap,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/auth-context";
import { loginSchema, LoginInput } from "@/lib/auth/schemas";
import { FadeIn, SlideUp } from "@/components/animations/motion-wrapper";
import { SkilloraIcon } from "@/components/ui/logo";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    const res = await login(data);
    if (!res.success) {
      setServerError(res.error || "Authentication failed");
    }
  };

  const handleDemoLogin = (email: string) => {
    setValue("email", email);
    setValue("password", "TitanSecure#2026");
    onSubmit({ email, password: "TitanSecure#2026" });
  };

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] py-6 sm:py-8 lg:py-10 flex items-center justify-center w-full overflow-hidden">
      {/* Ambient background glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] max-w-full bg-gradient-to-tr from-cyan-500/20 via-violet-500/12 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-[560px] sm:max-w-[600px] lg:max-w-[640px] px-4 sm:px-6 md:scale-[1.02] lg:scale-[1.06] xl:scale-[1.10] 2xl:scale-[1.14] transition-transform duration-300 origin-center">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8 space-y-2">
            <div className="flex items-center justify-center mb-1">
              <SkilloraIcon size={64} className="shadow-cyan-500/35 shadow-2xl transition-transform hover:scale-105 duration-300" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                Authorized Identity Portal
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <Badge variant="emerald" size="sm" className="font-mono text-[10px] px-2 py-0.5 font-bold">
                SECURE ACCESS
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black tracking-tight text-foreground font-mono leading-tight">
              Sign In to <span className="text-white">Skill</span>
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">ora</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md font-mono font-medium">
              Learn Smart • Improve Continuously • Own Your Future
            </p>
          </div>
        </FadeIn>

        <SlideUp delay={0.1}>
          <GlassCard
            className="p-7 sm:p-9 md:p-10 border-cyan-500/40 bg-slate-950/92 backdrop-blur-3xl shadow-[0_0_60px_rgba(6,182,212,0.2),0_25px_60px_rgba(0,0,0,0.85)] space-y-6 relative overflow-hidden rounded-2xl sm:rounded-3xl"
            glow
          >
            {/* Ambient edge highlight line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />

            {serverError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-mono flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-mono">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                  Email Address
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

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    leftIcon={<Lock className="h-5 w-5 text-cyan-400" />}
                    className="h-12 sm:h-13 bg-slate-900/90 border-white/15 text-sm sm:text-base font-mono rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 pl-11 pr-11"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs sm:text-sm text-rose-400">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full justify-center h-12 sm:h-14 mt-3 text-sm sm:text-base font-mono font-bold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] cursor-pointer"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Authenticate & Enter →
              </Button>
            </form>

            {/* Switch to Register */}
            <div className="pt-4 border-t border-white/10 text-center font-mono">
              <p className="text-xs sm:text-sm text-slate-300">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/50 hover:decoration-cyan-300"
                >
                  Register Here →
                </Link>
              </p>
            </div>

            {/* Fast Demo One-Click Personas */}
            <div className="pt-4 border-t border-white/10 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-300 font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span>Quick Demo Access (1-Click)</span>
                </span>
                <Badge variant="cyber" size="sm" className="text-[10px] px-2 py-0.5 font-bold">
                  DEMO PASS
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("student@titan.ai")}
                  className="p-3 sm:p-3.5 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800/90 hover:border-cyan-400/60 text-left transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm font-bold">
                    <GraduationCap className="h-4 w-4 shrink-0" />
                    <span>Student</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-cyan-200/90 transition-colors truncate block mt-0.5">student@titan.ai</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin("teacher@skillora.edu")}
                  className="p-3 sm:p-3.5 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800/90 hover:border-emerald-400/60 text-left transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-bold">
                    <BookOpen className="h-4 w-4 shrink-0" />
                    <span>Teacher / Faculty</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-emerald-200/90 transition-colors truncate block mt-0.5">teacher@skillora.edu</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin("parent@skillora.edu")}
                  className="p-3 sm:p-3.5 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800/90 hover:border-amber-400/60 text-left transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>Parent Portal</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-amber-200/90 transition-colors truncate block mt-0.5">parent@skillora.edu</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin@titan.ai")}
                  className="p-3 sm:p-3.5 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800/90 hover:border-rose-400/60 text-left transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 text-rose-400 text-xs sm:text-sm font-bold">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span>System Admin</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-rose-200/90 transition-colors truncate block mt-0.5">admin@titan.ai</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </SlideUp>
      </div>
    </div>
  );
}

