"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is Souqivo?",
    answer:
      "Souqivo is a unified client collaboration and project management workspace designed specifically for freelancers, independent contractors, creative studios, and boutique agencies. It brings project planning, Kanban tasks, deliverable reviews, client communication, shared files, and invoicing into one clear, connected platform.",
  },
  {
    question: "Who can use Souqivo?",
    answer:
      "Souqivo is built for two distinct roles: Service Providers (freelancers and agency owners) who create and manage projects, tasks, reviews, and invoices; and Clients who are invited into dedicated project workspaces to track progress, download files, communicate, and approve deliverables.",
  },
  {
    question: "How do clients access their projects?",
    answer:
      "When a freelancer creates a project and adds a client, the client logs in to a dedicated, clutter-free Client Portal. Clients only see the specific projects, tasks, reviews, files, and invoices they have been invited to, without any exposure to other clients or sensitive settings.",
  },
  {
    question: "Can clients approve or request changes on deliverables?",
    answer:
      "Yes. Souqivo includes a structured deliverable review workflow. Freelancers submit deliverables with asset links and descriptive notes, and clients can either approve the submission or request revisions with actionable feedback comments directly in the workspace.",
  },
  {
    question: "Can freelancers manage multiple projects simultaneously?",
    answer:
      "Yes. Freelancers have access to an overarching Freelancer Studio dashboard that aggregates active client projects, overall completion progress, upcoming deadlines, pending review requests, and total invoiced volume across all client relationships.",
  },
  {
    question: "What file types can be shared in Souqivo?",
    answer:
      "Souqivo supports sharing images, videos, documents (PDFs, docs, spreadsheets), and design assets. Uploads are securely scoped to project members with strict row-level security and permission boundaries.",
  },
  {
    question: "How does project messaging work?",
    answer:
      "Each project has a dedicated, real-time message stream. Instead of conversations getting fragmented across email threads, WhatsApp, and Slack, all project messages remain contextualized directly within the project workspace alongside the tasks and deliverables they reference.",
  },
  {
    question: "Is there a free way to get started?",
    answer:
      "Yes! You can sign up for a free account right now. Creating an account takes less than a minute, with no credit card required, allowing you to create your first client project and experience the workspace immediately.",
  },
];

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto w-full max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface shadow-xs">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="px-5 sm:px-6 py-4">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 text-left font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-accent" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground animate-in fade-in duration-150">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

