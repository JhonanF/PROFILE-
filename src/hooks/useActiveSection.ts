import { useState, useEffect } from "react";
import type { SectionId } from "../types";
import { navItems } from "../data/profile";

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("identity");

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.section);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry && sectionIds.includes(visibleEntry.target.id as SectionId)) {
          setActiveSection(visibleEntry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
