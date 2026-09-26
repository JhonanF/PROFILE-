import { useEffect, useRef, useState } from "react";
import { HolographicAvatar } from "./HolographicAvatar";
import { profile } from "../../data/profile";
import { getProfileViews, formatViewCount } from "../../lib/analytics";

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [views, setViews] = useState<string>("000000");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getProfileViews().then((count) => setViews(formatViewCount(count)));
  }, []);

  return (
    <section
      id="identity"
      className="hero-section relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
      style={{ zIndex: 10 }}
      aria-label="Identity section"
    >
      <div
        ref={contentRef}
        className="hero-content flex flex-col items-center text-center gap-8 max-w-4xl"
        style={{
          transition: "transform 0.1s ease-out",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
        }}
      >
        {/* Top metadata */}
        <div
          className="hero-metadata flex items-center gap-6 font-mono text-xs tracking-widest"
          style={{ color: "var(--text-muted)" }}
          aria-hidden="true"
        >
          <span>NODE JF-01</span>
          <span style={{ color: "var(--border-default)" }}>│</span>
          <span className="flex items-center gap-1.5">
            <span className="status-dot" />
            ENCRYPTED
          </span>
          <span style={{ color: "var(--border-default)" }}>│</span>
          <span>MEMORY OK</span>
        </div>

        {/* Avatar with status */}
        <div className="relative">
          <HolographicAvatar />
        </div>

        {/* Name */}
        <div>
          <h1
            className="hero-name font-display font-black tracking-tight leading-none"
            translate="no"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              background:
                "linear-gradient(135deg, #ffffff 0%, #e8e8f0 30%, #ff3c55 70%, #ff4765 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <span>JHONAN</span> <span>FACTOR</span>
          </h1>

          <p
            className="hero-title font-mono text-sm md:text-base mt-3 tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            {profile.title}
          </p>
        </div>

        {/* Role pills */}
        <div className="hero-roles flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl">
          {profile.roles.map((role) => (
            <span
              key={role}
              className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(176,0,24,0.1)",
                border: "1px solid rgba(176,0,24,0.3)",
                color: "var(--accent-violet-light)",
                letterSpacing: "0.08em",
              }}
            >
              {role}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div className="flex flex-col items-center gap-2">
          <blockquote
            className="hero-tagline font-display font-semibold tracking-wide text-center"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: "var(--text-primary)",
              fontStyle: "normal",
            }}
          >
            "{profile.tagline}"
          </blockquote>

          <p
            className="hero-specializations font-mono text-xs tracking-widest"
            style={{ color: "var(--text-muted)" }}
            aria-label="Specializations"
          >
            Software Eng. • Pentesting • Reverse Eng. • Applied AI • Systems
          </p>
        </div>

        {/* Bottom stats */}
        <div
          className="hero-stats flex items-center gap-8 font-mono text-xs"
          style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2">
            <span>VIEWS</span>
            <span style={{ color: "var(--accent-violet-light)", fontWeight: 700 }}>
              {views}
            </span>
          </div>
          <span style={{ color: "var(--border-default)" }}>│</span>
          <div className="flex items-center gap-2">
            <span>LATENCY</span>
            <span style={{ color: "#22c55e" }}>12ms</span>
          </div>
          <span style={{ color: "var(--border-default)" }}>│</span>
          <div className="flex items-center gap-2">
            <span>BUILD</span>
            <span style={{ color: "var(--accent-blue-light)" }}>{profile.buildId}</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="flex flex-col items-center gap-2 mt-4"
          aria-hidden="true"
        >
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, var(--accent-violet), transparent)",
              animation: "float 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
