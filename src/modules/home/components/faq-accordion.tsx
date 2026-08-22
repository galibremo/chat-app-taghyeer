"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "./icons";

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the real-time message delivery work?",
      a: "Our app uses Socket.io with dual WebSocket and HTTP long-polling transports. When you send a message, it is optimistically displayed in your UI while being persisted via REST API and broadcast in real-time to active chat room members.",
    },
    {
      q: "Can I create both Direct and Group chats?",
      a: "Yes! You can search registered users by name or phone number to initiate 1-to-1 Direct chats, or select multiple team members to launch custom Group chats.",
    },
    {
      q: "What privileges do Group Admins have?",
      a: "Group creators automatically receive Admin privileges. Admins can rename the group, add new participants, promote existing members to Admin, or remove members from the group.",
    },
    {
      q: "How does authentication and route protection work?",
      a: "Authentication tokens are stored securely in HTTP-only cookies. Next.js 16 Proxy middleware protects private routes such as /chat, automatically redirecting unauthenticated users to the login screen.",
    },
    {
      q: "Is the interface responsive on mobile devices?",
      a: "Absolutely! The chat application uses a fully responsive layout with mobile navigation controls, allowing seamless switching between conversation lists and active message feeds.",
    },
  ];

  return (
    <section id="faq" aria-label="FAQ" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Everything you need to know
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-card border border-border overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base font-bold text-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
