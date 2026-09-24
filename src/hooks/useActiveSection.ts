import { useState, useEffect } from "react";
import type { SectionId } from "../types";
import { navItems } from "../data/profile";

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("identity");

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.section);

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return activeSection;
}
