"use client";

import { useState } from "react";

import { CheckCircle2, CircleDot, ArrowRight } from "./icons";
import { ROADMAP } from "@/dummy/data";
import { RoadmapPhase } from "@/types/types";

export default function TimelineRoadmap() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const getStatusIcon = (status: string) => {
    return <CircleDot className="w-4 h-4 text-brand-primary" />;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Setup":
        return "bg-primary/10 text-primary border-primary/20";
      case "Development":
        return "bg-primary/10 text-primary border-primary/20";
      case "Production":
        return "bg-blue-500/10 text-brand-blue border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-200 border-gray-500/20";
    }
  };

  return (
    <section
      id="how-it-works"
      aria-label="How It Works"
      className="py-24 bg-obsidian-900 border-t border-white/5 relative"
    >
      <div className="absolute top-[30%] left-10 w-75 h-75 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full">
            Getting Started
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-200 leading-relaxed">
            Launch your application in three simple steps. Clone the repository, build your custom features, and deploy to production.
          </p>
        </div>

        {/* Interactive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Timeline Stages Selector Navigation (Lg: 4/12) */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            <span className="text-xs font-mono font-bold tracking-wider text-gray-200 uppercase ml-2">
              Select Onboarding Step
            </span>

            {ROADMAP.map((phase: RoadmapPhase, idx: number) => {
              const isActive = activeStageIdx === idx;
              return (
                <button
                  key={phase.stage}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? "bg-white/3 border-white/10 ring-1 ring-white/5 shadow-xl"
                      : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/0.5"
                  }`}
                >
                  {/* Left indicator accent color */}
                  {isActive && (
                    <span className="absolute left-0 top-4 bottom-4 w-1 bg-brand-primary rounded-r" />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-gray-200">
                      {phase.stage}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getStatusBadgeClass(phase.status)}`}
                    >
                      {phase.status}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-sm text-gray-200 group-hover:text-white transition-colors">
                    {phase.title}
                  </h3>
                </button>
              );
            })}

            {/* Extra Info */}
            <div className="p-4 rounded-xl border border-white/5 bg-obsidian-950/40 space-y-2 mt-4">
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Onboarding Support
              </span>
              <p className="text-[11px] text-gray-200 leading-relaxed">
                Our customer engineering team is here to assist you at every
                step, ensuring a smooth, secure connection of your communication
                lines.
              </p>
            </div>
          </div>

          {/* Timeline Phase Active Details (Lg: 8/12) */}
          <div className="lg:col-span-8 salix-card p-8 bg-obsidian-950/20 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-wider">
                    Currently Viewing: {ROADMAP[activeStageIdx].stage}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
                    {ROADMAP[activeStageIdx].title}
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border ${getStatusBadgeClass(ROADMAP[activeStageIdx].status)}`}
                >
                  {getStatusIcon(ROADMAP[activeStageIdx].status)}
                  {ROADMAP[activeStageIdx].status}
                </span>
              </div>

              {/* Phase Description */}
              <p className="text-sm text-gray-200 mt-6 leading-relaxed">
                {ROADMAP[activeStageIdx].description}
              </p>

              {/* Milestone Bullet Grid */}
              <div className="mt-8 space-y-4">
                <h4 className="text-xs font-mono font-bold text-gray-200 uppercase tracking-widest">
                  Key Deliverables & Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ROADMAP[activeStageIdx].items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-obsidian-850/50 rounded-xl border border-white/5 flex items-start gap-2.5 hover:border-white/10 transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-brand-primary text-xs font-mono shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-gray-300 leading-relaxed font-sans">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage bottom action link */}
            <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-200 font-mono">
                * Onboarding assistance is fully included with all Onedesk Pro
                plans.
              </span>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-mono text-xs font-semibold px-4.5 py-2 rounded-lg border border-brand-primary/20 transition-all cursor-pointer group"
              >
                See the Product in Action
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
