import type { SocialLink } from "../types";

export const socials: readonly SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/JhonanF",
    icon: "github",
    ariaLabel: "Jhonan Factor on GitHub",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://instagram.com/jhonan_f",
    icon: "instagram",
    ariaLabel: "Jhonan Factor on Instagram",
  },
  {
    id: "telegram",
    label: "Telegram",
    url: "https://t.me/zaa_1k",
    icon: "telegram",
    ariaLabel: "Contact Jhonan Factor on Telegram",
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:jhonanfactor@gmail.com",
    icon: "mail",
    ariaLabel: "Email Jhonan Factor",
  },
] as const;
