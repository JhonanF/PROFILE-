import type { SocialLink } from "../types";

// ============================================================
// Update these URLs before deploying
// ============================================================
export const socials: readonly SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/jhonanfactor",
    icon: "github",
    ariaLabel: "Jhonan Factor on GitHub",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com/in/jhonanfactor",
    icon: "linkedin",
    ariaLabel: "Jhonan Factor on LinkedIn",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://instagram.com/jhonanfactor",
    icon: "instagram",
    ariaLabel: "Jhonan Factor on Instagram",
  },
  {
    id: "telegram",
    label: "Telegram",
    url: "https://t.me/jhonanfactor",
    icon: "telegram",
    ariaLabel: "Contact Jhonan Factor on Telegram",
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:contact@jhonanfactor.dev",
    icon: "mail",
    ariaLabel: "Email Jhonan Factor",
  },
] as const;
