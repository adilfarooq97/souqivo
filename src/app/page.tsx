import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  FolderKanban,
  KanbanSquare,
  Layers,
  MessageSquare,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users2,
  XCircle,
  Zap,
} from "lucide-react";
import LandingNav from "@/components/marketing/LandingNav";
import HeroPreview from "@/components/marketing/HeroPreview";
import ProductShowcase from "@/components/marketing/ProductShowcase";
import LandingFaq from "@/components/marketing/LandingFaq";

const description =
  "Manage projects, tasks, client communication, deliverable approvals, files, and invoices in one organized workspace with Souqivo.";

export const metadata: Metadata = {
  title: {
    absolute: "Souqivo — Client Collaboration & Project Management",
  },
  description,
  alternates: {
    canonical: "https://souqivo.com/",
  },
  openGraph: {
    type: "website",
    siteName: "Souqivo",
    title: "Souqivo — Client Collaboration & Project Management",
    description,
    url: "https://souqivo.com/",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Souqivo: One workspace from kickoff to approval.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Souqivo — Client Collaboration & Project Management",
    description,
    images: ["/twitter-image"],
  },
};

const problemPoints = [
  {
    title: "Fragmented Client Conversations",
    description: "Feedback and change requests scattered across emails, WhatsApp, and Slack get buried and forgotten.",
  },
  {
    title: "Opaque Project Progress",
    description: "Clients constantly asking for status updates because tasks and timelines live in separate agency spreadsheets.",
  },
  {
    title: "Lost Deliverable Feedback",
    description: "Design revisions and review decisions lack a formal approval trail, resulting in costly scope creep.",
  },
  {
    title: "Disorganized File Links",
    description: "Expired WeTransfer links and scattered cloud folders leave clients confused about which file is the final version.",
  },
  {
    title: "Disconnected Billing",
    description: "Invoices sent separately from the actual delivered work create payment delays and awkward follow-ups.",
  },
];

const coreFeatures = [
  {
    icon: FolderKanban,
    title: "Project Management",
    badge: "Workspace Hub",
    description:
      "Organize every client initiative with clear briefs, target delivery dates, milestone progress bars, and team ownership.",
  },
  {
    icon: KanbanSquare,
    title: "Kanban Task Boards",
    badge: "Visual Pipeline",
    description:
      "Break projects into Todo, In Progress, Review, and Done workflows. Assign task priorities and track status in real time.",
  },
  {
    icon: Users2,
    title: "Client Collaboration",
    badge: "Dedicated Portals",
    description:
      "Invite clients into clean, role-scoped portals where they see only their deliverables, tasks, and discussions.",
  },
  {
    icon: FileCheck2,
    title: "Deliverable Reviews & Approvals",
    badge: "Sign-Off Workflow",
    description:
      "Submit designs, documents, and videos for official review. Clients can formally approve or request revisions with comments.",
  },
  {
    icon: FileText,
    title: "Secure File Sharing",
    badge: "Asset Vault",
    description:
      "Upload and manage project documents, design assets, and video files with row-level security and quick member access.",
  },
  {
    icon: MessageSquare,
    title: "Project-Scoped Messaging",
    badge: "Contextual Chat",
    description:
      "Real-time messaging channels built directly into each project. Keep every client discussion anchored to the work.",
  },
  {
    icon: Receipt,
    title: "Milestone Invoicing",
    badge: "Billing Control",
    description:
      "Generate itemized project invoices, monitor Draft, Pending, Paid, and Overdue statuses, and track revenue seamlessly.",
  },
  {
    icon: BellRing,
    title: "Notifications & Activity Tracking",
    badge: "Real-Time Updates",
    description:
      "Stay in sync with instant notifications for newly assigned tasks, deliverable responses, project messages, and payments.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Create a Project",
    description:
      "Define your project title, target completion deadline, and initial milestone scope in seconds.",
  },
  {
    step: "02",
    title: "Invite Your Client",
    description:
      "Assign your client to the workspace with secure, role-restricted access to their dedicated portal.",
  },
  {
    step: "03",
    title: "Organize Tasks & Files",
    description:
      "Populate the visual Kanban task board and upload kickoff briefs, brand assets, and reference files.",
  },
  {
    step: "04",
    title: "Collaborate in Context",
    description:
      "Exchange real-time project messages and task progress updates without switching between apps.",
  },
  {
    step: "05",
    title: "Submit for Approval",
    description:
      "Deliver completed milestones for structured client review, collecting comments and official sign-offs.",
  },
  {
    step: "06",
    title: "Invoice & Deliver",
    description:
      "Issue project-connected invoices, track payment fulfillment, and celebrate project completion.",
  },
];

const freelancerBenefits = [
  "Consolidate all client relationships and active projects into one command center",
  "Visual Kanban pipeline to prioritize tasks, deadlines, and project milestones",
  "Structured deliverable review portal that eliminates endless feedback ambiguity",
  "Integrated milestone invoicing with real-time status tracking alongside deliverables",
  "Professional, branded workspace presentation that builds long-term client trust",
];

const clientBenefits = [
  "Dedicated Client Portal with zero learning curve and instant project clarity",
  "Always know what is currently in progress and what milestone is coming next",
  "Review deliverable submissions and approve or request changes with one click",
  "Centralized asset repository to find project files and deliverables anytime",
  "Direct communication channel with your agency without lost email threads",
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://souqivo.com/#website",
        url: "https://souqivo.com/",
        name: "Souqivo",
        inLanguage: "en-US",
        mainEntity: {
          "@id": "https://souqivo.com/#software",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://souqivo.com/#software",
        name: "Souqivo",
        url: "https://souqivo.com/",
        mainEntityOfPage: {
          "@id": "https://souqivo.com/#website",
        },
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Client Collaboration & Project Management",
        operatingSystem: "Web",
        description,
        audience: {
          "@type": "Audience",
          audienceType: "Freelancers, independent contractors, creative studios, and boutique agencies",
        },
        featureList: [
          "Multi-project management and progress tracking",
          "Visual Kanban task boards with status and priority workflows",
          "Deliverable review and client sign-off approval system",
          "Secure project file sharing and document management",
          "Real-time project messaging and contextual discussions",
          "Project-linked invoice creation and payment status tracking",
          "Role-based security for freelancers and clients",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Navigation Header */}
      <LandingNav />

      <main className="flex-1">
        {/* ==================================================================== */}
        {/* HERO SECTION */}
        {/* ==================================================================== */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-surface to-background pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
          {/* Subtle decorative grid pattern */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Product Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted-foreground shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>Souqivo · Client Collaboration &amp; Project Management</span>
              </div>

              {/* Exact Primary Headline */}
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                Your projects. Your clients.{" "}
                <span className="text-accent underline decoration-accent/25 underline-offset-8">
                  One workspace.
                </span>
              </h1>

              {/* Exact Supporting Copy */}
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                From the first conversation to the final approval, manage projects,
                tasks, files, feedback, and invoices in one organized workspace.
              </p>

              {/* Call-to-Action Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-white shadow-md shadow-accent/20 transition hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#features"
                  className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-base font-semibold text-foreground transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Explore Features
                </Link>
              </div>

              {/* Audience Subtext */}
              <p className="mt-4 text-xs font-medium text-subtle-foreground">
                Tailored for freelancers, independent contractors, creative studios, and boutique agencies.
              </p>
            </div>

            {/* High-Fidelity Product UI Preview */}
            <div className="mt-14 sm:mt-16 lg:mt-20">
              <HeroPreview />
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* PROBLEM & SOLUTION SECTION */}
        {/* ==================================================================== */}
        <section className="border-b border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                The Friction in Client Service
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Client work gets messy when your tools don&rsquo;t talk to each other.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Jumping between email threads, task boards, cloud drives, and billing apps wastes hours every week and leaves clients feeling disconnected.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* The Fragmented Reality */}
              <div className="rounded-2xl border border-danger/20 bg-danger-muted/30 p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-danger">
                  <XCircle className="h-6 w-6" aria-hidden="true" />
                  <h3 className="text-lg font-bold">The Fragmented Approach</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Using 5 different apps for every single client engagement:
                </p>

                <ul className="mt-6 space-y-4">
                  {problemPoints.map((point) => (
                    <li key={point.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger text-xs font-bold">
                        ✕
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{point.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Souqivo Solution */}
              <div className="rounded-2xl border border-success/30 bg-success-muted/30 p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-success">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  <h3 className="text-lg font-bold">The Souqivo Workspace</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Everything organized in one transparent project home:
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Project-Scoped Messaging</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Every message, file, and update lives permanently attached to the project.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Transparent Visual Pipelines</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Kanban task boards show progress instantly, removing repetitive status emails.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Definitive Review Decisions</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Formal client approvals and change requests with structured feedback comments.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Centralized Project Asset Vault</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Documents, designs, and videos are securely organized without expired links.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Connected Milestone Billing</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Invoices visible right alongside the deliverables for clear, prompt payments.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* CORE FEATURES SECTION */}
        {/* ==================================================================== */}
        <section id="features" className="scroll-mt-16 border-b border-border bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Core Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything you need to deliver client projects on time.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Engineered specifically for the workflows of independent service providers, creative studios, and their clients.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coreFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <article
                    key={feat.title}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-2xs transition-all duration-200 hover:border-accent/40 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-muted text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {feat.badge}
                        </span>
                      </div>
                      <h3 className="mt-5 text-base font-bold text-foreground">
                        {feat.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {feat.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      <span>Explore capability</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* HOW IT WORKS SECTION */}
        {/* ==================================================================== */}
        <section id="how-it-works" className="scroll-mt-16 border-b border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Simple &amp; Predictable Workflow
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                From initial kickoff to final approval in six steps.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                A structured process that guides your projects smoothly through every milestone.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workflowSteps.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-border bg-background p-6 shadow-2xs hover:border-border-strong transition"
                >
                  <span className="font-mono text-2xl font-black text-accent/80">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEPARATE FREELANCER & CLIENT BENEFITS */}
        {/* ==================================================================== */}
        <section id="for-freelancers" className="scroll-mt-16 border-b border-border bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              {/* Freelancers & Agencies Box */}
              <div className="rounded-3xl border border-border bg-surface p-7 sm:p-10 shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-xs">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      Service Providers
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">
                      For Freelancers &amp; Studios
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Take full command of your agency pipeline, manage deliverables, and give clients a collaborative experience that commands premium rates.
                </p>

                <ul className="mt-6 space-y-3.5">
                  {freelancerBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-muted text-accent">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs sm:text-sm text-foreground/90 font-medium">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/signup"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-accent-hover"
                  >
                    Start as a Freelancer
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Clients Box */}
              <div id="for-clients" className="scroll-mt-24 rounded-3xl border border-border bg-surface p-7 sm:p-10 shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success text-white shadow-xs">
                    <Users2 className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-success">
                      Invited Collaborators
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">
                      For Clients &amp; Stakeholders
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Stay informed on exactly what is moving without being bombarded by emails or overwhelmed by complicated project management tools.
                </p>

                <ul className="mt-6 space-y-3.5">
                  {clientBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-muted text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs sm:text-sm text-foreground/90 font-medium">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/signup"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
                  >
                    Join as a Client
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* PRODUCT SHOWCASE INTERACTIVE SECTION */}
        {/* ==================================================================== */}
        <section id="showcase" className="scroll-mt-16 border-b border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Interactive Walkthrough
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Explore the Souqivo experience in action.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Switch through the tabs below to preview the actual interfaces for dashboards, tasks, reviews, client views, and invoicing.
              </p>
            </div>

            <div className="mt-12">
              <ProductShowcase />
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* FAQ SECTION */}
        {/* ==================================================================== */}
        <section id="faq" className="scroll-mt-16 border-b border-border bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Frequently Asked Questions
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Common questions about Souqivo.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Everything you need to know about how projects, roles, and client collaboration work.
              </p>
            </div>

            <div className="mt-12">
              <LandingFaq />
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* FINAL CLOSING CTA SECTION */}
        {/* ==================================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted px-3.5 py-1 text-xs font-semibold text-accent">
                <Zap className="h-3.5 w-3.5" />
                <span>Ready to modernize your client workspace?</span>
              </div>

              {/* Exact Closing Headline */}
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Bring every client project into one workspace.
              </h2>

              {/* Exact Supporting Copy */}
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Spend less time organizing work across different tools and more time delivering great results.
              </p>

              {/* CTA Action Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 text-base font-semibold text-white shadow-md shadow-accent/20 transition hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-base font-medium text-foreground transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Sign in to Your Account
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-subtle-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  No credit card required
                </span>
                <span>·</span>
                <span>Instant workspace setup</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/* FOOTER */}
      {/* ==================================================================== */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4 md:gap-12">
            {/* Logo and Tagline */}
            <div className="md:col-span-2 space-y-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white shadow-2xs">
                  <Layers className="h-4 w-4" />
                </span>
                <span>Souqivo</span>
              </Link>
              <p className="text-xs font-semibold text-accent">
                One workspace from kickoff to approval.
              </p>
              <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                A unified platform where service providers and clients manage projects, task pipelines, deliverable reviews, file sharing, and invoices together.
              </p>
            </div>

            {/* Product Navigation */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground transition">
                    Core Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#for-freelancers" className="text-muted-foreground hover:text-foreground transition">
                    For Freelancers
                  </Link>
                </li>
                <li>
                  <Link href="#for-clients" className="text-muted-foreground hover:text-foreground transition">
                    For Clients
                  </Link>
                </li>
                <li>
                  <Link href="#showcase" className="text-muted-foreground hover:text-foreground transition">
                    Product Showcase
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-muted-foreground hover:text-foreground transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Access & Account */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <Link href="/signup" className="text-muted-foreground hover:text-foreground transition font-medium">
                    Create Free Account
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-muted-foreground hover:text-foreground transition font-medium">
                    Sign in to Workspace
                  </Link>
                </li>
                <li>
                  <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground transition">
                    Forgot Password
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-border pt-6 text-xs text-subtle-foreground gap-3">
            <p>© {new Date().getFullYear()} Souqivo. All rights reserved.</p>
            <p>One workspace from kickoff to approval.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
