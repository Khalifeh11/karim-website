// Mirrors the résumé — keep the two in sync when either changes.

export const ROLE = {
  company: "Storiad",
  title: "Software Developer",
  period: "Apr 2022 — present",
  location: "remote · united states",
  url: "https://www.storiad.com",
};

export const HIGHLIGHTS = [
  {
    name: "Backend ownership",
    desc: "Owned the Laravel backend architecture and data layer — core application logic, data modeling, and queued jobs — and partnered with the design team to ship the React interface.",
  },
  {
    name: "WordPress → Laravel migration",
    desc: "Led the move from WordPress to a custom Laravel/React/MySQL platform serving nearly 1,000 authors and publishers.",
  },
  {
    name: "AI assistant",
    desc: "Shipped an in-app assistant using OpenAI tool calling with parallel dispatch and token budgeting, plus usage metering that enforces monthly AI quotas per plan tier.",
  },
  {
    name: "Publisher Edition",
    desc: "Built the B2B tier: an admin portal, per-seat Stripe billing, and a dedicated OpenAI project per publisher with cost metering.",
  },
  {
    name: "One-click site provisioning",
    desc: "Automated SSL-secured author websites through the Laravel Forge API and queued jobs, replacing a multi-hour manual setup.",
  },
  {
    name: "Public demo environment",
    desc: "A read-only demo on its own subdomain with stateless auto-login, write protection, and hourly data sync from a live account.",
  },
];

export const SIDE_PROJECTS = [
  {
    name: "Reorder-Intelligence System",
    desc: "Turns a wholesaler's ERP sales history into automated reorder recommendations, with a Claude layer that writes weekly procurement briefings and per-SKU explanations. Built through the ZAKA Certified AI Consultant program.",
    tags: ["python", "streamlit", "sqlite", "claude"],
    url: "https://github.com/Khalifeh11/inventory-reorder-intelligence",
  },
  {
    name: "Voice Mood Journal",
    desc: "Voice-to-structured-data pipeline: GPT-4o-mini function calling extracts structured mood data from natural speech.",
    tags: ["react native", "function calling"],
    url: "https://github.com/Khalifeh11/mood-journaling-app",
  },
];
