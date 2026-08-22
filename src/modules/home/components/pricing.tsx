"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "@/components/custom-ui/icons";
import { PricingTier } from "@/types/types";
import { PRICING_TIERS } from "@/dummy/data";


export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="py-24 bg-obsidian-900 border-t border-white/5 relative"
    >
      <div className="absolute top-[40%] right-10 w-87.5 h-87.5 bg-brand-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-brand-primary uppercase bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full">
            Transparent Tiers
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Plans Built for Teams of Any Size
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-200 leading-relaxed">
            Pay once, own the code forever. Choose the plan that best fits your needs.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span
              className={`text-xs font-semibold ${!isAnnual ? "text-white" : "text-gray-200"}`}
            >
              Monthly Billing
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-obsidian-800 p-0.5 border border-white/10 relative transition-colors duration-300 cursor-pointer"
              aria-label="Toggle annual pricing"
            >
              <div
                className={`w-5 h-5 rounded-full bg-brand-primary shadow-sm transform transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-xs font-semibold flex items-center gap-1 ${isAnnual ? "text-white" : "text-gray-200"}`}
            >
              Annual Billing
              <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-brand-primary/10">
                Save 20%
              </span>
            </span>
          </div>
        </div>


        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
          {PRICING_TIERS.map((tier: PricingTier) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            const isPopular = tier.popular;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`salix-card p-8 rounded-2xl flex flex-col justify-between relative ${
                  isPopular
                    ? "border-primary/40 shadow-xl"
                    : "border-white/5"
                }`}
              >
                {/* Popular or Recommended Tag Badge */}
                {isPopular ? (
                  <span className="absolute top-0 right-6 -translate-y-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider font-mono">
                    <Sparkles className="w-3 h-3 fill-white/80" />
                    Most Popular
                  </span>
                ) : null}

                {/* Card Top */}
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-gray-200 uppercase">
                      {tier.name} Plan
                    </span>
                    <h3 className="font-display font-bold text-2xl text-white mt-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-gray-200 mt-2 leading-relaxed min-h-10">
                      {tier.description}
                    </p>
                  </div>

                  {/* Pricing Rate */}
                  <div className="border-y border-white/5 py-5 mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                      ${price}
                    </span>
                    <span className="text-sm text-gray-200 font-semibold">
                      / month
                    </span>
                    {isAnnual && (
                      <span className="text-[10px] text-primary font-mono ml-2">
                        (Billed Annually)
                      </span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-xs text-gray-300"
                      >
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-brand-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Call-to-action */}
                <a
                  href="#contact"
                  className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-all duration-200 text-center cursor-pointer group flex items-center justify-center gap-1 ${
                    isPopular
                      ? "bg-primary text-white hover:bg-primary/90 shadow shadow-primary/20"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {tier.ctaText}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Help Footer */}
        <div className="mt-12 text-center text-xs text-gray-200 flex items-center justify-center gap-2 font-mono">
          <HelpCircle className="w-4 h-4 text-gray-600" />
          <span>
            Have custom compliance parameters or database requirements?
          </span>
          <a href="#contact" className="text-brand-primary hover:underline">
            Contact Enterprise Engineers
          </a>
        </div>
      </div>
    </section>
  );
}
