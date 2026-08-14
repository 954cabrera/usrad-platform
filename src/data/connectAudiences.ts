// ──────────────────────────────────────────────────────────────────────────
// connectAudiences.ts
//
// Single source of truth for the /connect audience routing system.
// Each audience record drives both the picker on /connect and the
// per-audience page at /connect/[audience].
//
// To update copy or routing for a track, edit the relevant object below.
// To add a track, append a new entry and create a matching .astro page.
// ──────────────────────────────────────────────────────────────────────────

export type AudienceId =
  | "provider"
  | "payor"
  | "employer"
  | "broker"
  | "investor"
  | "other";

export interface ConnectAudience {
  id: AudienceId;
  // Picker (on /connect)
  pickerLabel: string;
  pickerSublabel: string;
  // Per-audience page (on /connect/[audience])
  headline: string;
  acknowledgment: string;
  body: string;
  proofLine?: string;
  cta: {
    label: string;
    href: string;
    eventLabel: string; // GA4 cta_clicked event parameter
  };
  // SEO / meta
  metaTitle: string;
}

// Source param convention: connect-{audienceId}
// Matches existing site convention: /provider, /employer use ?source=<page>
const SOURCE = (id: AudienceId) => `connect-${id}`;

export const CONNECT_AUDIENCES: Record<AudienceId, ConnectAudience> = {
  provider: {
    id: "provider",
    pickerLabel: "I'm a provider",
    pickerSublabel: "Imaging center, radiologist, operations",
    headline: "For imaging providers.",
    acknowledgment:
      "Welcome. You're looking at USRad as a potential demand channel for your imaging center.",
    body: "USRad routes cash-pay and direct-contracted patients to ACR-accredited imaging centers nationwide. Providers join the network with transparent pricing, predictable reimbursement, and zero billing friction with patients. Centers stay in control of their schedule, modalities, and patient mix — USRad handles patient routing, pricing, and the booking layer.",
    proofLine:
      "Founded by the team behind AnciCare PPO (1994), the original imaging network for workers' compensation, which grew to 1,200+ contracted centers before its acquisition.",
    cta: {
      label: "See how providers join the network",
      href: `/provider?source=${SOURCE("provider")}`,
      eventLabel: "provider_learn_more",
    },
    metaTitle: "For imaging providers · USRad",
  },

  payor: {
    id: "payor",
    pickerLabel: "I'm a payor / health plan",
    pickerSublabel: "Network development, medical director",
    headline: "For health plans and payors.",
    acknowledgment:
      "Welcome. You're looking at USRad as a possible imaging supply network.",
    body: "USRad operates a nationwide, ACR-accredited imaging network with transparent contracted pricing. For health plans evaluating partnership, the platform offers a pre-contracted imaging tier that can plug into self-funded plans, ACA marketplace products, or network adequacy gaps — without the credentialing overhead of building a network from scratch.",
    proofLine:
      "Built on the AnciCare PPO playbook, which scaled the original imaging-focused network to 1,200+ centers nationwide.",
    cta: {
      label: "Explore partnership options",
      href: `/partner?source=${SOURCE("payor")}`,
      eventLabel: "payor_partnership",
    },
    metaTitle: "For health plans and payors · USRad",
  },

  employer: {
    id: "employer",
    pickerLabel: "I'm an employer",
    pickerSublabel: "Self-funded plan, HR, benefits, CFO",
    headline: "For employers and self-funded plans.",
    acknowledgment:
      "Welcome. You're looking at USRad as a way to lower imaging spend while maintaining member access.",
    body: "USRad gives self-funded employers transparent, contracted prices on diagnostic imaging at ACR-accredited centers nationwide. Members pay published rates with no surprise billing; employers see imaging spend drop without redesigning their benefits stack.",
    proofLine:
      "AnciCare PPO managed imaging for the workers' compensation industry on the same architecture — transparent pricing, contracted centers, predictable cost.",
    cta: {
      label: "See the employer model",
      href: `/employer?source=${SOURCE("employer")}`,
      eventLabel: "employer_learn_more",
    },
    metaTitle: "For employers and self-funded plans · USRad",
  },

  broker: {
    id: "broker",
    pickerLabel: "I'm a broker or TPA",
    pickerSublabel: "Benefits advisor, third-party administrator",
    headline: "For brokers and TPAs.",
    acknowledgment:
      "Welcome. You're looking at USRad as a product to recommend to your employer clients.",
    body: "USRad is a transparent-price imaging layer brokers and TPAs can introduce to self-funded employer clients. The platform reduces imaging spend and improves member experience. Co-branded materials and broker support are available.",
    proofLine:
      "Designed for the broker channel: clean economics to present to a CFO, simple onboarding, and direct broker support from the founding team.",
    cta: {
      label: "See the employer model",
      href: `/employer?source=${SOURCE("broker")}`,
      eventLabel: "broker_learn_more",
    },
    metaTitle: "For brokers and TPAs · USRad",
  },

  investor: {
    id: "investor",
    pickerLabel: "I'm an investor or strategic acquirer",
    pickerSublabel: "VC, family office, strategic partner",
    headline: "For investors and strategic partners.",
    acknowledgment:
      "Welcome. You're looking at USRad as a capital or partnership opportunity.",
    body: "USRad addresses the ~90 million uninsured and underinsured Americans who pay cash for diagnostic imaging — a market that has lacked transparent-price infrastructure. The platform combines proven founder-market fit with modern network architecture: credentialed providers, contracted pricing tiers, and a member-facing booking layer.",
    proofLine:
      "Founder built AnciCare PPO (1994) — the first imaging network for workers' compensation — to 1,200+ centers before its acquisition. The same playbook, applied to a much larger market.",
    cta: {
      label: "Review the investor materials",
      href: `/investor?source=${SOURCE("investor")}`,
      eventLabel: "investor_materials",
    },
    metaTitle: "For investors and strategic partners · USRad",
  },

  other: {
    id: "other",
    pickerLabel: "Something else",
    pickerSublabel: "Press, general inquiry, anything else",
    headline: "How can we help?",
    acknowledgment:
      "Welcome. Tell us how we can help.",
    body: "USRad operates a nationwide marketplace for diagnostic imaging. If you're looking for press information, general inquiries, or anything else we haven't anticipated, we'll route you to the right person.",
    cta: {
      label: "Contact us",
      href: `/contact?source=${SOURCE("other")}`,
      eventLabel: "other_contact",
    },
    metaTitle: "Contact USRad · USRad",
  },
};

// Ordered list for the picker. Provider first (largest expected audience);
// "other" last (fallback).
export const AUDIENCE_ORDER: AudienceId[] = [
  "provider",
  "payor",
  "employer",
  "broker",
  "investor",
  "other",
];