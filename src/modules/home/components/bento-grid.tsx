"use client";

import { motion } from "motion/react";
import {
  MessageSquareText,
  GitBranch,
  Sparkles,
  Users,
  UserCheck,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Search,
} from "./icons";
import { FEATURES } from "@/dummy/data";
import { Feature } from "@/types/types";

export default function BentoGrid() {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case "unified-inbox":
        return <ShieldCheck className="w-6 h-6 text-primary" />;
      case "ai-replies":
        return <GitBranch className="w-6 h-6 text-amber-400" />;
      case "team-collab":
        return <BarChart3 className="w-6 h-6 text-brand-blue" />;
      case "automation":
        return <MessageSquareText className="w-6 h-6 text-primary" />;
      case "human-handoff":
        return <Sparkles className="w-6 h-6 text-rose-400" />;
      case "analytics":
        return <Search className="w-6 h-6 text-indigo-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-gray-200" />;
    }
  };

  return (
    <section
      id="features"
      aria-label="Features"
      className="py-24 bg-obsidian-900 border-t border-white/5 relative"
    >
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-150 h-75 bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full">
            Product Scope
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Features Tailored for Unified Support
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-200 leading-relaxed">
            From official API connectivity to advanced n8n workflow integrations
            and AI draft suggestion, Onedesk Pro is built to eliminate support
            bottlenecks.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {FEATURES.map((feat: Feature, idx: number) => {
            const isUpcoming = feat.isUpcoming;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="salix-card p-6 flex flex-col justify-between min-h-55 relative overflow-hidden group"
              >
                {/* Visual Glow background on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-white/1 to-transparent pointer-events-none" />

                <div>
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-obsidian-800 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {getFeatureIcon(feat.id)}
                    </div>

                    <span
                      className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded border ${
                        isUpcoming
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-base text-gray-100 group-hover:text-white transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-200 leading-relaxed mt-2.5">
                    {feat.description}
                  </p>
                </div>

                {/* Micro Action Link */}
                <div className="mt-6 flex items-center gap-1 text-[11px] font-mono font-semibold text-gray-200 group-hover:text-white transition-colors">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Extra Info Box */}
        <div className="mt-12 bg-obsidian-950/40 border border-white/5 p-6 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-200">
                Security-First Platform Architecture
              </h4>
              <p className="text-xs text-gray-200 mt-1">
                Your conversations are fully encrypted and secure. Ask our sales
                team for detailed security, privacy, compliance, and custom
                data-handling documentation.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-mono font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-lg transition-all shrink-0 cursor-pointer"
          >
            Request Security Pack
          </a>
        </div>
      </div>
    </section>
  );
}
