"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "./icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Detect scroll position immediately on mount and after browser scroll restoration
    handleScroll();
    const rafId = requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "Features", targetId: "features" },
    { name: "Architecture", targetId: "architecture" },
    { name: "FAQ", targetId: "faq" },
  ];

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      id="app-navbar"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all py-3.5 pb-0 duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-xs"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-xs">
              💬
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">
              ChatFlow
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.targetId)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group bg-transparent border-none cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer")}
            >
              Sign In
            </Link>
            <Link
              href="/chat"
              className={cn(
                buttonVariants({ size: "sm" }),
                "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              Start Chatting →
            </Link>
          </div>

          {/* Mobile Menu Button & ThemeToggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-b border-border"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.targetId);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col gap-3 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 rounded-lg text-sm font-semibold text-foreground hover:bg-accent border border-border transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/chat"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Start Chatting →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
