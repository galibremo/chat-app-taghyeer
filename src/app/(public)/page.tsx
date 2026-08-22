import BentoGrid from "@/modules/home/components/bento-grid";
import FAQAccordion from "@/modules/home/components/faq-accordion";
import Footer from "@/modules/home/components/footer";
import Hero from "@/modules/home/components/hero";
import InteractiveContactForm from "@/modules/home/components/interactive-contact-form";
import JsonLd from "@/modules/home/components/json-ld";
import Navbar from "@/modules/home/components/navbar";

export default function Landing() {
  return (
    <>
      <JsonLd />
      <div className="bg-background min-h-screen text-foreground flex flex-col font-sans overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <FAQAccordion />
          <InteractiveContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
