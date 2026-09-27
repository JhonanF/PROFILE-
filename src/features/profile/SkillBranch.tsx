import { useState } from "react";
import type { SkillCategory } from "../../types";

interface SkillBranchProps {
  category: SkillCategory;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

const COLOR_MAP: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  violet: {
    border: "rgba(124,58,237,0.4)",
    glow: "rgba(124,58,237,0.15)",
    text: "var(--accent-violet-light)",
    bg: "rgba(124,58,237,0.06)",
  },
  red: {
    border: "rgba(239,68,68,0.4)",
    glow: "rgba(239,68,68,0.12)",
    text: "var(--accent-red-light)",
    bg: "rgba(239,68,68,0.05)",
  },
  blue: {
    border: "rgba(59,130,246,0.4)",
    glow: "rgba(59,130,246,0.12)",
    text: "var(--accent-blue-light)",
    bg: "rgba(59,130,246,0.05)",
  },
};

export function SkillBranch({ category, isSelected, onSelect, index }: SkillBranchProps) {
  const [hovered, setIsHovered] = useState(false);
  const colors = COLOR_MAP[category.color] ?? COLOR_MAP["violet"]!;
  const active = isSelected || hovered;

  return (
    <div className={`skill-branch ${isSelected ? "is-open" : ""}`}>
      {/* Branch header */}
      <button
        onClick={() => onSelect(category.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="skill-branch__trigger w-full text-left flex items-center gap-4 py-3 px-4 rounded-lg"
        style={{
          background: active ? colors.bg : "transparent",
          border: `1px solid ${active ? colors.border : "var(--border-subtle)"}`,
          boxShadow: active ? `0 0 20px ${colors.glow}` : "none",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        aria-expanded={isSelected}
        aria-label={`Toggle ${category.label} skills`}
        data-hover
      >
        {/* Tree prefix */}
        <span
          className="skill-branch__prefix font-mono text-xs shrink-0"
          style={{ color: "var(--text-muted)" }}
          aria-hidden="true"
        >
          {index === 5 ? "└──" : "├──"}
        </span>

        {/* Icon */}
        <span
          className="skill-branch__icon"
          style={{ color: active ? colors.text : "var(--text-muted)", fontSize: "1.1rem" }}
          aria-hidden="true"
        >
          {category.icon}
        </span>

        {/* Label */}
        <span
          className="skill-branch__label font-mono text-sm font-medium tracking-widest"
          style={{
            color: active ? colors.text : "var(--text-secondary)",
            transition: "color 0.3s ease",
            letterSpacing: "0.12em",
          }}
        >
          {category.label}
        </span>

        {/* Count badge */}
        <span
          className="skill-branch__count ml-auto font-mono text-xs px-2 py-0.5 rounded"
          style={{
            background: active ? colors.bg : "transparent",
            border: `1px solid ${active ? colors.border : "transparent"}`,
            color: active ? colors.text : "var(--text-muted)",
            transition: "all 0.3s ease",
          }}
          aria-label={`${category.technologies.length} technologies`}
        >
          {category.technologies.length}
        </span>

        {/* Expand arrow */}
        <span
          className="skill-branch__chevron"
          style={{
            color: "var(--text-muted)",
            transform: isSelected ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            fontSize: "0.75rem",
          }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Technology grid — revealed on select */}
      <div
        className="skill-branch__content"
        style={{
          maxHeight: isSelected ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        role="region"
        aria-label={`${category.label} technologies`}
      >
        <div className="skill-branch__tags ml-10 mt-2 mb-2 flex flex-wrap gap-2">
          {category.technologies.map((tech) => (
            <span
              key={tech.name}
              className="skill-branch__tag font-mono text-xs px-3 py-1.5 rounded"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.text,
                letterSpacing: "0.06em",
              }}
              title={tech.description}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
