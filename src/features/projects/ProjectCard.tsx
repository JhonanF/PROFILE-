import { useEffect, useState, useRef } from "react";
import type { Project } from "../../types";
import { usePerformanceProfile } from "../../performance/profile";

interface ProjectCardProps {
  project: Project;
}

const STATUS_CONFIG = {
  active: { label: "● ACTIVE", color: "#22c55e" },
  research: { label: "◉ RESEARCH", color: "#f59e0b" },
  archived: { label: "○ ARCHIVED", color: "var(--text-muted)" },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const performance = usePerformanceProfile();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const status = STATUS_CONFIG[project.status];
  const enableTilt = performance.tier === "high" && !performance.isTouch;
  const showHighlights = isHovered || performance.isTouch;

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    tiltRef.current = { x: dy * 4, y: -dx * 4 };

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg) translateZ(4px)`;
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => enableTilt && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="card-3d rounded-xl overflow-hidden shimmer"
      style={{
        background: isHovered ? "var(--bg-glass-hover)" : "var(--bg-glass)",
        border: `1px solid ${isHovered ? "rgba(124,58,237,0.4)" : "var(--border-subtle)"}`,
        backdropFilter: performance.enableBlur ? "blur(12px)" : "none",
        transition:
          "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isHovered ? "var(--glow-violet)" : "none",
        willChange: enableTilt ? "transform" : "auto",
      }}
      role="article"
      aria-label={`Project: ${project.name}`}
    >
      {/* Card header */}
      <div
        className="px-5 pt-5 pb-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            {project.code}
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: status.color }}
            aria-label={`Status: ${project.status}`}
          >
            {status.label}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display font-bold leading-tight"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: isHovered ? "var(--accent-violet-light)" : "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
        >
          {project.name}
        </h3>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Description */}
        <p
          className="font-body text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs">
          <div>
            <span style={{ color: "var(--text-muted)" }}>ENGINE</span>
            <div
              className="mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.technologies.slice(0, 2).join(" / ")}
            </div>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)" }}>TYPE</span>
            <div
              className="mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.category[0]}
            </div>
          </div>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.15)",
                color: "var(--accent-violet-light)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Highlights — shown on hover */}
        <div
          style={{
            maxHeight: showHighlights ? "240px" : "0",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div
            className="pt-3"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <div
              className="font-mono text-xs tracking-widest mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              KEY HIGHLIGHTS
            </div>
            <ul className="flex flex-col gap-1.5" role="list">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="font-mono text-xs flex items-start gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent-violet)" }} aria-hidden="true">
                    ▸
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Animated border on hover */}
      {isHovered && enableTilt && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(124,58,237,0.08) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
