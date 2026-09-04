"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface GradientBackgroundProps {
  className?: string;
}

export function GradientBackground({ className }: GradientBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className
      )}
    >
      {/* 1. TOP HERO RADIANT HALO (Centered on title and dashboard) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: [0.75, 1, 0.75],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[750px] sm:w-[1100px] lg:w-[1350px] h-[550px] sm:h-[750px] rounded-[100%] bg-radial from-primary/20 via-brand-purple/10 to-transparent blur-[110px] sm:blur-[160px] dark:from-primary/28 dark:via-brand-purple/18 dark:to-transparent transform-gpu"
      />

      {/* 2. TOP-RIGHT ELECTRIC BLUE / INDIGO ACCENT ORB */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.6, 1, 0.6],
          x: [0, -30, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[5%] -right-[5%] sm:right-[8%] w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-radial from-brand-blue/25 via-indigo-500/15 to-transparent blur-[120px] sm:blur-[160px] dark:from-brand-blue/35 dark:via-indigo-500/20 dark:to-transparent transform-gpu"
      />

      {/* 3. MID-PAGE LEFT ROYAL PURPLE / BLUE ACCENT ORB (Features / Bento area) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute top-[38%] -left-[12%] sm:left-[1%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-radial from-brand-purple/18 via-brand-blue/12 to-transparent blur-[130px] sm:blur-[160px] dark:from-brand-purple/25 dark:via-brand-blue/18 dark:to-transparent transform-gpu"
      />

      {/* 4. MID-PAGE RIGHT BLUE / SKY ACCENT GLOW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          x: [0, 15, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-[52%] -right-[10%] sm:right-[3%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-radial from-brand-blue/20 via-sky-500/12 to-transparent blur-[120px] sm:blur-[150px] dark:from-brand-blue/30 dark:via-sky-400/20 dark:to-transparent transform-gpu"
      />

      {/* 5. ARCHITECTURE & ROADMAP AREA GLOW (Lower section) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.45, 0.75, 0.45],
          scale: [0.98, 1.04, 0.98],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-[72%] left-1/2 -translate-x-1/2 w-[650px] sm:w-[950px] h-[450px] sm:h-[550px] rounded-full bg-radial from-brand-blue/18 via-brand-purple/12 to-transparent blur-[130px] sm:blur-[170px] dark:from-brand-blue/25 dark:via-brand-purple/18 dark:to-transparent transform-gpu"
      />

      {/* 6. SUBTLE LINEAR GRADIENT WASH AT TOP (Seamless navbar transition) */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-linear-to-b from-primary/6 via-primary/2 to-transparent dark:from-primary/12 dark:via-primary/4 dark:to-transparent" />

      {/* 7. BOTTOM SMOOTH FADE TO BACKGROUND */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-linear-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}

export default GradientBackground;
