import { useState, useEffect } from "react";
import type { SectionId } from "../types";
import { navItems } from "../data/profile";

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("identity");

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.section);
    let frame: number | null = null;

    const updateActiveSection = () => {
      frame = null;

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        setActiveSection(sectionIds.at(-1) ?? "contact");
        return;
      }

      const focusLine = window.innerHeight * 0.45;
      let nextSection = sectionIds[0] ?? "identity";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element || element.getBoundingClientRect().top > focusLine) break;
        nextSection = id;
      }

      setActiveSection(nextSection);
    };

    const queueUpdate = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(updateActiveSection);
    };

    const observer = new IntersectionObserver(
      queueUpdate,
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    queueUpdate();

    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return activeSection;
}
