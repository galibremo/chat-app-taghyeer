"use client";

import { motion } from "motion/react";
import { Zap, ShieldCheck, MessageCircle, Sparkles } from "@/components/custom-ui/icons";

export default function TimelineRoadmap() {
  const steps = [
    {
      step: "01",
      title: "Secure Handshake & Authentication",
      desc: "Client sends HTTP-only auth token via Edge proxy. Socket.io initiates handshake with fallback transport.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      badge: "Auth & Handshake",
    },
    {
      step: "02",
      title: "Optimistic Local Dispatch",
      desc: "Message immediately renders in sender's chat feed with a pending spinner, ensuring zero perceived UI latency.",
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      badge: "Optimistic UX",
    },
    {
      step: "03",
      title: "REST API Persistence & Socket Emission",
      desc: "POST request persists message to MongoDB while backend broadcasts `message:new` event to all active room participants.",
      icon: <Zap className="w-5 h-5 text-primary" />,
      badge: "Real-Time Sync",
    },
    {
      step: "04",
      title: "Delivery Status & Cache Invalidation",
      desc: "Pending loader transforms to verified checkmark ✓ and React Query updates thread state seamlessly.",
      icon: <MessageCircle className="w-5 h-5 text-primary" />,
      badge: "Verified Delivery",
    },
  ];

  return (
    <section
      id="architecture"
      aria-label="Real-Time System Architecture"
      className="py-20 md:py-28 bg-transparent border-t border-border relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3">
            System Architecture
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            How Real-Time Messaging Works
          </p>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            A breakdown of our end-to-end socket broadcast pipeline and optimistic UI state management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between shadow-xs relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-primary/40 group-hover:text-primary transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <span className="text-[10px] font-mono font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                  {item.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
