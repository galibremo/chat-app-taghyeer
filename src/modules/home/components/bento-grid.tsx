"use client";

import { motion } from "motion/react";
import {
  MessageCircle,
  Zap,
  ShieldCheck,
  Sparkles,
  Send,
} from "@/components/custom-ui/icons";

export default function BentoGrid() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Socket.io Real-Time Engine",
      description:
        "Instant bidirection messaging powered by WebSockets with automatic HTTP polling fallback for maximum reliability.",
      badge: "Real-Time",
      colSpan: "col-span-1 md:col-span-2",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Direct & Group Messaging",
      description:
        "Start 1-to-1 private conversations or build multi-participant group rooms with dedicated admin roles.",
      badge: "Group & DM",
      colSpan: "col-span-1",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Optimistic UI & Sent Indicators",
      description:
        "Zero latency message rendering with instant pending status loaders transitioning to verified sent checkmarks.",
      badge: "Optimistic UX",
      colSpan: "col-span-1",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Group Admin Privileges",
      description:
        "Promote team members to admin, rename group channels, and remove participants with confirmation alert dialogs.",
      badge: "Admin Privileges",
      colSpan: "col-span-1 md:col-span-2",
    },
    {
      icon: <Send className="w-6 h-6 text-primary" />,
      title: "Shadcn UI Design System",
      description:
        "Standardized CSS theme variables and responsive layout optimized for desktop and mobile viewports.",
      badge: "Design Tokens",
      colSpan: "col-span-1 md:col-span-3",
    },
  ];

  return (
    <section id="features" aria-label="Features" className="py-20 md:py-28 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3">
            Core Messaging Features
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Built for modern, reliable team communication
          </p>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Everything you need for seamless real-time direct chats and collaborative team groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 sm:p-8 rounded-2xl bg-background border border-border hover:border-primary/40 transition-all duration-300 shadow-xs flex flex-col justify-between ${feature.colSpan}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
