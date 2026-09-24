import { useState, useEffect } from "react";
import { navItems } from "../../data/profile";
import type { SectionId } from "../../types";

interface NavigationProps {
  activeSection: SectionId;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (section: SectionId) => {
    const el = document.getElementById(section);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: scrolled
          ? "rgba(9,9,15,0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
        transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-mono font-bold tracking-widest"
        style={{
          color: "var(--accent-violet-light)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "0.9rem",
          letterSpacing: "0.25em",
        }}
        aria-label="Scroll to top"
      >
        JF_
      </button>

      {/* Nav items — hidden on mobile, show hamburger later */}
      <ul
        className="hidden md:flex items-center gap-8 list-none"
        style={{ margin: 0, padding: 0 }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.section;
          return (
            <li key={item.section}>
              <button
                onClick={() => scrollTo(item.section)}
                className="font-mono text-xs tracking-widest"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: isActive
                    ? "var(--accent-violet-light)"
                    : "var(--text-muted)",
                  transition: "color 0.2s ease",
                  padding: "4px 0",
                  position: "relative",
                }}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Navigate to ${item.label} section`}
                data-hover
              >
                {item.label}
                {/* Active underline */}
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "var(--accent-violet)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* System status badge */}
      <div
        className="hidden md:flex items-center gap-2 font-mono text-xs"
        style={{ color: "var(--text-muted)" }}
        aria-hidden="true"
      >
        <span className="status-dot" />
        <span>SYSTEM ONLINE</span>
      </div>
    </nav>
  );
}
