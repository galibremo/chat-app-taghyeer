"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "./icons";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Features", targetId: "features" },
    { name: "Pricing", targetId: "pricing" },
    { name: "How It Works", targetId: "how-it-works" },
    { name: "FAQ", targetId: "faq" },
  ];

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const elementHeight = element.offsetHeight;
    const viewportHeight = window.innerHeight;
    const targetPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      viewportHeight / 2 +
      elementHeight / 2;

    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  return (
    <nav
      id="app-navbar"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all py-3 duration-300 ${
        scrolled ? "bg-obsidian-950/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              loading="eager"
              src="/dummy-logo.png"
              alt="Onedesk Pro Logo"
              width={1437}
              height={294}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.targetId)}
                className="text-sm font-medium text-gray-200 hover:text-white transition-colors duration-200 relative group bg-transparent border-none cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              nativeButton={false}
              render={
                <Link
                  href="/chat"
                  className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200"
                />
              }
            >
              Start Chatting
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-200 hover:text-white transition-colors focus:outline-none"
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
            className="md:hidden bg-obsidian-900"
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
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 rounded-lg text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/chat"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 rounded-lg text-base font-semibold bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
                >
                  Start Chatting
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
