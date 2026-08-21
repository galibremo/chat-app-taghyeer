'use client';

import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Zap,
  Send,
} from "./icons";
import MockDashboard from "./mock-dashboard";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-obsidian-900 overflow-hidden bg-grid-pattern"
    >
      {/* Background Radial Glow Layer */}
      <div className="absolute inset-0 bg-radial-glow-primary pointer-events-none" />
      <div className="absolute top-[30%] left-[10%] w-87.5 h-87.5 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-100 h-100 rounded-full bg-brand-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* Introducing pill button tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-brand-primary tracking-wide mb-6 shadow-sm shadow-primary/5 hover:bg-primary/15 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next.js 15 SaaS Boilerplate — Launch Faster</span>
          </motion.div>

          {/* Main Huge Premium Typography Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1] text-glow-primary"
          >
            Launch your next SaaS in days, <br />
            <span className="bg-linear-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
              not months.
            </span>
          </motion.h1>

          {/* Descriptive body copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl"
          >
            Stop rebuilding authentication, dashboards, and billing for every project. Get a complete, production-ready codebase with Next.js 15, Tailwind, and Shadcn UI.
          </motion.p>

          {/* Primary Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary text-obsidian-950 px-7 py-3 rounded-xl font-bold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] cursor-pointer group"
            >
              Get Boilerplate
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              View Documentation
            </a>
          </motion.div>

          {/* Core high-value trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-200"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Full Auth Setup
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Database Integrations
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Premium UI/UX
            </span>
          </motion.div>
        </div>

        {/* Floating Product Dashboard Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          className="mt-16 md:mt-20 max-w-5xl mx-auto shadow-2xl relative"
        >
          {/* Subtle side glows on dashboard edge */}
          <div className="absolute -left-12 top-1/4 w-32 h-64 bg-brand-primary/10 blur-[60px] pointer-events-none" />
          <div className="absolute -right-12 top-1/4 w-32 h-64 bg-primary/10 blur-[60px] pointer-events-none" />

          <MockDashboard />
        </motion.div>

        {/* Messaging Channels Supported Section */}
        <div className="mt-20 border-t border-white/5 pt-12">
          <p className="text-center text-[11px] font-mono tracking-widest text-gray-200 uppercase">
            Supports All Your Essential Customer Channels
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 transition-opacity duration-300">
            {/* WhatsApp */}
            <div className="flex items-center gap-2 text-white font-display font-semibold text-sm tracking-wider">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-gray-200">WhatsApp Business</span>
            </div>
            {/* Instagram */}
            <div className="flex items-center gap-2 text-white font-display font-semibold text-sm tracking-wider">
              <MessageCircle className="w-4 h-4 text-pink-500" />
              <span className="text-gray-200">Instagram DM</span>
            </div>
            {/* Facebook Messenger */}
            <div className="flex items-center gap-2 text-white font-display font-semibold text-sm tracking-wider">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span className="text-gray-200">Facebook Messenger</span>
            </div>
            {/* Telegram Support */}
            <div className="flex items-center gap-2 text-white font-display font-semibold text-sm tracking-wider">
              <Send className="w-4 h-4 text-sky-400" />
              <span className="text-gray-200">Telegram Bot</span>
            </div>
            {/* Web Chat */}
            <div className="flex items-center gap-2 text-white font-display font-semibold text-sm tracking-wider">
              <MessageCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-gray-200">Web Live Chat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
