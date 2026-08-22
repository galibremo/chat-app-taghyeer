import type { Metadata } from "next";
import BentoGrid from "@/modules/home/components/bento-grid";
import FAQAccordion from "@/modules/home/components/faq-accordion";
import Footer from "@/modules/home/components/footer";
import Hero from "@/modules/home/components/hero";
import InteractiveContactForm from "@/modules/home/components/interactive-contact-form";
import JsonLd from "@/modules/home/components/json-ld";
import Navbar from "@/modules/home/components/navbar";
import TimelineRoadmap from "@/modules/home/components/timeline-roadmap";

export const metadata: Metadata = {
  title: "ChatFlow - Real-Time Direct & Group Messaging",
  description:
    "Connect instantly with real-time direct & group chat. Experience lightning-fast Socket.io communication, optimistic message updates, and group management.",
  openGraph: {
    title: "ChatFlow - Real-Time Direct & Group Messaging",
    description:
      "Connect instantly with real-time direct & group chat. Experience lightning-fast Socket.io communication, optimistic message updates, and group management.",
    url: "/",
  },
};

export default function Landing() {
  return (
    <>
      <JsonLd />
      <div className="bg-background min-h-screen text-foreground flex flex-col font-sans overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <TimelineRoadmap />
          <FAQAccordion />
          <InteractiveContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
