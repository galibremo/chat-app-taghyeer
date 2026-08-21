import {
  Feature,
  RoadmapPhase,
  FAQItem,
  PricingTier,
  Testimonial,
} from "@/types/types";

export const FEATURES: Feature[] = [
  {
    id: "unified-inbox",
    title: "Authentication Ready",
    description:
      "Secure login, signup, magic links, and OAuth providers are pre-configured out of the box with complete session management.",
    badge: "Auth",
  },
  {
    id: "ai-replies",
    title: "Database Integrated",
    description:
      "Connect instantly with Postgres or your database of choice. We use Prisma ORM for type-safe queries.",
    badge: "Data",
  },
  {
    id: "team-collab",
    title: "Stripe Subscriptions",
    description:
      "Accept payments on day one. We include webhook handlers, subscription plans, and customer portals.",
    badge: "Payments",
  },
  {
    id: "automation",
    title: "Email Templates",
    description:
      "Send transactional emails easily with built-in React Email templates and multiple provider integrations.",
    badge: "Comms",
  },
  {
    id: "human-handoff",
    title: "User Dashboard",
    description:
      "A complete admin dashboard built with Shadcn UI components for managing your users and application settings.",
    badge: "UI",
  },
  {
    id: "analytics",
    title: "SEO Optimized",
    description:
      "Perfect Lighthouse scores, dynamic sitemaps, robots.txt, and optimized metadata for maximum visibility.",
    badge: "SEO",
  },
];

export const ROADMAP: RoadmapPhase[] = [
  {
    stage: "Step 1",
    title: "Clone & Configure",
    status: "Setup",
    description:
      "Clone the repository, run the setup script, and configure your environment variables. Your foundation is ready in 2 minutes.",
    items: [
      "pnpm install dependencies",
      "Connect your database URL",
      "Setup OAuth credentials",
      "Configure Stripe keys",
    ],
  },
  {
    stage: "Step 2",
    title: "Build Your Product",
    status: "Development",
    description:
      "Focus 100% of your time on building your unique features rather than reinventing the authentication and billing wheel.",
    items: [
      "Use our expansive UI library",
      "Create your custom data models",
      "Build your core application logic",
      "Design your marketing pages",
    ],
  },
  {
    stage: "Step 3",
    title: "Launch to the World",
    status: "Production",
    description:
      "Deploy seamlessly to Vercel or your hosting platform of choice. You are ready to accept real paying customers on day one.",
    items: [
      "Deploy to Vercel with one click",
      "Enable production Stripe mode",
      "Watch the signups roll in",
      "Scale with confidence",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "This boilerplate saved me literally 3 weeks of development time. I cloned it on Friday and launched my AI SaaS on Sunday evening.",
    author: "Elena Rostova",
    role: "Indie Hacker",
    company: "SaaSify Global",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    quote:
      "The code quality is exceptional. Everything is strictly typed, components are incredibly modular, and the UI looks premium out of the box.",
    author: "Marc Dupond",
    role: "Senior Full Stack Dev",
    company: "AppLaunch Inc.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    quote:
      "I've tried 5 different Next.js boilerplates and this is by far the most complete. The Stripe integration alone is worth the price.",
    author: "Sarah Jenkins",
    role: "Founder",
    company: "EduSphere",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I get lifetime updates?",
    answer:
      "Yes! Once you purchase the boilerplate, you get access to the private GitHub repository with lifetime updates, bug fixes, and new features.",
  },
  {
    question: "Is this built with Next.js App Router?",
    answer:
      "Absolutely. The entire boilerplate is built using the latest Next.js App Router, React Server Components, and Server Actions for optimal performance.",
  },
  {
    question: "Can I use a different database?",
    answer:
      "Yes, we use Prisma ORM which means you can easily swap between PostgreSQL, MySQL, SQLite, or MongoDB by changing a single line in your schema file.",
  },
  {
    question: "Do I need to know Tailwind CSS?",
    answer:
      "While it helps, you don't need to be an expert. We use Shadcn UI which gives you beautiful, accessible components that you can easily customize without writing complex CSS.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Due to the non-returnable nature of digital code, we do not offer refunds once you have accessed the repository. Please read the documentation and features carefully before purchasing.",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Standard",
    priceMonthly: 149,
    priceAnnual: 149,
    description:
      "The complete boilerplate for solo developers and indie hackers.",
    features: [
      "Next.js App Router Codebase",
      "Supabase Auth & Database",
      "Stripe Payments Integration",
      "React Email Templates",
      "Lifetime Updates",
      "Community Discord Access",
    ],
    ctaText: "Get Standard",
  },
  {
    name: "Premium",
    priceMonthly: 249,
    priceAnnual: 249,
    description:
      "For serious founders who want priority support and design assets.",
    features: [
      "Everything in Standard",
      "Figma Design Files",
      "Priority Email Support",
      "1-on-1 Onboarding Call",
      "Advanced SEO components",
      "Blog/CMS Integration",
    ],
    ctaText: "Get Premium",
    popular: true,
  },
];

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  joinedAt: string;
}

export const USERS_MOCK: DashboardUser[] = [
  {
    id: "usr_1",
    name: "Alex Rivera",
    email: "alex@example.com",
    plan: "Pro",
    status: "Active",
    joinedAt: "Today, 10:24 AM",
  },
  {
    id: "usr_2",
    name: "Sarah Chen",
    email: "sarah.chen@startup.io",
    plan: "Enterprise",
    status: "Active",
    joinedAt: "Yesterday",
  },
  {
    id: "usr_3",
    name: "Michael Chang",
    email: "m.chang@designco.com",
    plan: "Free",
    status: "Inactive",
    joinedAt: "Oct 12, 2025",
  },
  {
    id: "usr_4",
    name: "Emma Watson",
    email: "emma@watson.dev",
    plan: "Pro",
    status: "Active",
    joinedAt: "Oct 08, 2025",
  },
];
