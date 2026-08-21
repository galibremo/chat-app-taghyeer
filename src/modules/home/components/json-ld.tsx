import { FAQS } from "@/dummy/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://onedeskpro.com";

function softwareApplication() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Onedesk Pro",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Unified customer communication workspace. Manage WhatsApp, Instagram, Facebook, Telegram & Web Chat in one intelligent inbox with AI-powered reply suggestions.",
    url: siteUrl,
    offers: [
      {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
        name: "Standard Plan",
        description: "Up to 5 team members, unified inbox, basic automation.",
      },
      {
        "@type": "Offer",
        price: "129",
        priceCurrency: "USD",
        name: "Pro Plan",
        description:
          "Up to 20 team members, AI reply suggestions, full automation workflows.",
      },
    ],
  };
}

function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Onedesk Pro",
    url: siteUrl,
    description:
      "Sovereign team-centric customer communication workspace. Meeting customers on official WhatsApp, Instagram, Messenger, SMS, and Web Chat channels seamlessly.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@typetechit.com",
      contactType: "sales",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mirpur DOHS",
      addressCountry: "BD",
    },
  };
}

function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplication()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage()) }}
      />
    </>
  );
}
