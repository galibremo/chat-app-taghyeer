import {
  ShieldCheck,
  Mail,
  Globe,
  MapPin,
} from "./icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-obsidian-950 border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/5 pb-12">
          {/* COLUMN 1: BRAND LOGO & MOTTO (Lg: 4/12) */}
          <div className="lg:col-span-4 space-y-4 text-left">
             <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                loading="lazy"
                src="/logo.png"
                alt="Onedesk Pro homepage"
                width={1437}
                height={294}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-xs text-gray-200 leading-relaxed max-w-sm">
              Sovereign team-centric customer communication workspace. Meeting
              customers on official WhatsApp, Instagram, Messenger, SMS, and Web
              Chat channels seamlessly.
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-200 font-mono">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                All Systems Operational
              </span>
            </div>
          </div>

          {/* COLUMN 2: PRODUCTS & CHANNELS (Lg: 3/12) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-mono font-bold text-gray-200 uppercase tracking-widest mb-4">
              Integrated Channels
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-200">
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary transition-colors"
                >
                  WhatsApp Business API
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary transition-colors"
                >
                  Instagram Direct Messages
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary transition-colors"
                >
                  Facebook Pages Integration
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary transition-colors"
                >
                  Telegram Support Bot
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary transition-colors"
                >
                  Custom Web Live Chat
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: AUTOMATION & AI (Lg: 3/12) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-mono font-bold text-gray-200 uppercase tracking-widest mb-4">
              SaaS Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-200">
              <li>
                <a
                  href="#ai-demo"
                  className="hover:text-brand-primary transition-colors"
                >
                  Custom Automation Workflows
                </a>
              </li>
              <li>
                <a
                  href="#ai-demo"
                  className="hover:text-brand-primary transition-colors"
                >
                  AI Reply Assistance
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary transition-colors"
                >
                  Contact Management
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-brand-primary transition-colors"
                >
                  Multi-Language Support
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-brand-primary transition-colors"
                >
                  Team Performance Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: COMPANY INFO (Lg: 2/12) */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-200 uppercase tracking-widest mb-4">
              Contact & Links
            </h4>
            <div className="space-y-3 text-[11px] text-gray-200 font-mono">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <a href="https://www.typetechit.com/" rel="noopener noreferrer" className="hover:underline">
                  Typetech It
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>info@typetechit.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                <span>Mirpur DOHS, Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1.5 text-xs text-gray-200 font-mono">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>
              © {currentYear} Onedesk Pro Inc. All rights reserved. Enterprise
              Customer Workspace.
            </span>
          </div>

          {/* Social icons or credit labels */}
          <div className="flex items-center gap-4 text-[10px] text-gray-200 font-mono uppercase tracking-widest">
            <a href="/" className="hover:text-white transition-colors">
              Security Rules
            </a>
            <span>•</span>
            <a href="/terms-of-services" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="/" className="hover:text-white transition-colors">
              SLA Contract
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
