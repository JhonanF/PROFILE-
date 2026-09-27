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
  const getScrollBehavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  return (
    <div
      className="scroll-indicator fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      aria-label="Section navigation"
    >
      {/* Counter */}
      <div
        className="font-mono text-xs"
        aria-hidden="true"
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
      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.section === activeSection;
          return (
            <button
              key={item.section}
              onClick={() => {
                document.getElementById(item.section)?.scrollIntoView({
                  behavior: getScrollBehavior(),
                });
              }}
              style={{
                display: "grid",
                placeItems: "center",
                width: 28,
                height: 24,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive ? "location" : undefined}
            >
              <span
                aria-hidden="true"
                style={{
                  width: isActive ? 16 : 4,
                  height: 4,
                  borderRadius: 2,
                  background: isActive
                    ? "var(--accent-violet)"
                    : "var(--text-muted)",
                  transition: "width 0.3s ease, background 0.3s ease",
                  boxShadow: isActive ? "var(--glow-violet)" : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
