import type { SectionId } from "../../types";
import { navItems } from "../../data/profile";

interface ScrollIndicatorProps {
  activeSection: SectionId;
  totalSections: number;
}

export function ScrollIndicator({ activeSection }: ScrollIndicatorProps) {
  const current = navItems.find((n) => n.section === activeSection);
  const index = current?.index ?? 1;
  const total = navItems.length;

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      {/* Counter */}
      <div
        className="font-mono text-xs"
        style={{
          color: "var(--text-muted)",
          writingMode: "vertical-rl",
          letterSpacing: "0.15em",
        }}
      >
        <span style={{ color: "var(--accent-violet-light)" }}>
          {String(index).padStart(2, "0")}
        </span>
        {" / "}
        {String(total).padStart(2, "0")}
      </div>

      {/* Dots */}
      <div className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = item.section === activeSection;
          return (
            <button
              key={item.section}
              onClick={() => {
                document.getElementById(item.section)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              style={{
                width: isActive ? 16 : 4,
                height: 4,
                borderRadius: 2,
                background: isActive
                  ? "var(--accent-violet)"
                  : "var(--text-muted)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
                boxShadow: isActive ? "var(--glow-violet)" : "none",
              }}
              aria-label={`Go to ${item.label}`}
            />
          );
        })}
      </div>
    </div>
  );
}
