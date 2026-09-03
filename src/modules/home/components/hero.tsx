"use client";

import Link from "next/link";
import { route } from "@/routes/routes";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, Zap } from "@/components/custom-ui/icons";
import MockDashboard from "./mock-dashboard";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative pt-28 pb-20 md:pt-36 md:pb-32 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* Pill button tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-bold text-primary tracking-wide mb-6 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>⚡ Real-Time Group & Direct Messaging</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-4xl sm:text-6xl font-bold text-foreground tracking-tight leading-[1.15]"
          >
            Connect instantly with <br />
            <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              real-time direct & group chat.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            Experience lightning-fast Socket.io communication, optimistic
            message updates, admin group management, and edge-protected
            authentication.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3.5 items-center justify-center w-full sm:w-auto"
          >
            <Link
              href={route.private.chat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 rounded-xl font-bold text-sm tracking-tight transition-all duration-200 shadow-md shadow-primary/20 active:scale-[0.98] cursor-pointer group"
            >
              Start Chatting
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={route.protected.login}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-card hover:bg-accent text-foreground border border-border px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer shadow-xs"
            >
              Sign In / Register
            </Link>
          </motion.div>

          {/* Core Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Socket.io WebSockets
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-border hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              Group Admin Management
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-border hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Edge Token Proxy
            </span>
          </motion.div>
        </div>

        {/* Product Chat Interface Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          className="mt-14 md:mt-16 max-w-5xl mx-auto relative"
        >
          <MockDashboard />
        </motion.div>
      </div>
    </section>
  );
}
