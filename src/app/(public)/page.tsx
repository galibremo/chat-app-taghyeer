import BentoGrid from "@/modules/home/components/bento-grid";
import FAQAccordion from "@/modules/home/components/faq-accordion";
import Footer from "@/modules/home/components/footer";
import Hero from "@/modules/home/components/hero";
import InteractiveContactForm from "@/modules/home/components/interactive-contact-form";
import JsonLd from "@/modules/home/components/json-ld";
import Navbar from "@/modules/home/components/navbar";
import Pricing from "@/modules/home/components/pricing";
import TimelineRoadmap from "@/modules/home/components/timeline-roadmap";

export default function Landing() {
  return (
    <>
      <JsonLd />
      <div className="bg-slate-950 min-h-screen text-gray-100 flex flex-col font-sans">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <Pricing />
          <TimelineRoadmap />
          <FAQAccordion />
          <InteractiveContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
