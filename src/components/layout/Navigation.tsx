import { useState, useEffect, useRef } from "react";
import { navItems } from "../../data/profile";
import type { SectionId } from "../../types";

interface NavigationProps {
  activeSection: SectionId;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 60
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number | null = null;
    let previous = window.scrollY > 60;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const next = window.scrollY > 60;
        if (next !== previous) {
          previous = next;
          setScrolled(next);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuTrigger = menuTriggerRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        menuDrawerRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => {
      menuDrawerRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 240);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuTrigger?.focus();
    };
  }, [menuOpen]);

  const getScrollBehavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const scrollTo = (section: SectionId) => {
    setMenuOpen(false);
    const el = document.getElementById(section);
    el?.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  };

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className="site-navigation fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
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
        onClick={() => {
          setMenuOpen(false);
          window.scrollTo({ top: 0, behavior: getScrollBehavior() });
        }}
        className="font-mono font-bold tracking-widest"
        style={{
          color: "var(--accent-violet-light)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "0.9rem",
          letterSpacing: "0.25em",
          minWidth: 44,
          minHeight: 44,
        }}
        aria-label="Volver al inicio"
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
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  position: "relative",
                }}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Ir a la sección ${item.label}`}
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

      <button
        ref={menuTriggerRef}
        type="button"
        className="mobile-menu-trigger md:hidden"
        aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation-drawer"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
      </button>

      {/* System status badge */}
      <div
        className="hidden md:flex items-center gap-2 font-mono text-xs"
        style={{ color: "var(--text-muted)" }}
        aria-hidden="true"
      >
        <span className="status-dot" />
        <span>SISTEMA EN LÍNEA</span>
      </div>

      <div
        className={`mobile-drawer-backdrop md:hidden ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={menuDrawerRef}
        id="mobile-navigation-drawer"
        className={`mobile-navigation-drawer md:hidden ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        aria-label="Menú de navegación"
        aria-modal={menuOpen ? "true" : undefined}
        role="dialog"
      >
        <div className="mobile-navigation-drawer__header">
          <span>NAVEGACIÓN</span>
          <span>JF.OS / 01</span>
        </div>
        <ul role="list">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <li key={item.section}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.section)}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span>{String(item.index).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <span aria-hidden="true">→</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
