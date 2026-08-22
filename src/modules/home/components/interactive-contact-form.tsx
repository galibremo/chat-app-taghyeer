"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Sparkles,
  LogIn,
  CheckCircle2,
  ArrowUpRight,
} from "@/components/custom-ui/icons";
import Link from "next/link";

export default function InteractiveContactForm() {
  const [showDirectLogin, setShowDirectLogin] = useState(false);

  return (
    <section
      id="contact"
      aria-label="Get started"
      className="py-24 bg-obsidian-900 border-t border-white/5 relative bg-radial-gradient"
    >
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-125 h-75 bg-brand-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT SIDE: CONVERSION VALUE PROPOSITIONS */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono tracking-widest text-brand-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full">
              Instant Access
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Start Building Your <br />
              Application Today
            </h2>

            <p className="text-sm text-gray-200 leading-relaxed">
              Stop wasting time on authentication, billing, and database setup. Get the complete codebase and launch your startup in days.
            </p>

            {/* List of benefits */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">
                    Lifetime Access
                  </h4>
                  <p className="text-[11px] text-gray-200">
                    Pay once and get access to the GitHub repository and all future updates forever.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">
                    Full Production Ready
                  </h4>
                  <p className="text-[11px] text-gray-200">
                    Built on Next.js 15 App Router, React Server Components, and Shadcn UI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DEDICATED LOGIN / INSTANT PORTAL ACCESS */}
          <div className="lg:col-span-7 salix-card p-6 sm:p-8 bg-obsidian-950/40 relative">
            <div className="absolute top-0 right-0 p-1 bg-white/5 text-gray-200 text-[9px] font-mono rounded-bl-lg uppercase">
              Secure Gateway
            </div>

            <div className="space-y-6">
              <div className="text-left space-y-1">
                <h3 className="font-display font-bold text-lg text-white">
                  Boilerplate Portal
                </h3>
                <p className="text-xs text-gray-200">
                  Log in to access your boilerplate repository or start building a new app.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Direct Login Panel */}
                <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/5 space-y-4 flex flex-col justify-between text-left">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/10">
                      Existing Users
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      Sign In Directly
                    </h4>
                    <p className="text-[11px] text-gray-200 leading-relaxed">
                      Enter your workspace coordinates to return to your team
                      inbox.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href="https://portal.onedeskpro.com"
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-[11px] py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5 text-brand-primary" />
                      Sign In to Workspace
                    </Link>
                  </div>
                </div>
              </div>

              {/* Direct Login Submodal simulated */}
              <AnimatePresence>
                {showDirectLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5 text-left space-y-3 relative"
                  >
                    <button
                      onClick={() => setShowDirectLogin(false)}
                      className="absolute top-2 right-3 text-gray-200 hover:text-white text-xs font-mono cursor-pointer"
                    >
                      ✕ Close
                    </button>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                      <span className="text-xs font-bold text-gray-200">
                        Dedicated Login Page Active
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-200 leading-relaxed">
                      Redirecting you to our secure, centralized single sign-on
                      (SSO) page. Please enter your registered email address or
                      Google credentials there to access your conversations.
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 bg-brand-primary text-obsidian-950 font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg hover:bg-primary transition-all"
                      >
                        Proceed to Login Page
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secure statement */}
              <p className="text-[10px] text-gray-200 leading-relaxed pt-2 text-left flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  All portals are hosted in compliant, highly available regions
                  with real-time end-to-end TLS encryption and persistent
                  database backups.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
