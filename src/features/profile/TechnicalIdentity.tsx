import { useState } from "react";
import { skillCategories } from "../../data/skills";
import { SkillBranch } from "./SkillBranch";

const CATEGORY_SUMMARIES: Readonly<Record<string, string>> = {
  systems: "Performance, memory and data systems built close to the metal.",
  security: "Runtime inspection, interception and controlled execution.",
  ai: "Validated machine-learning pipelines and structured AI systems.",
  intel: "Collection, normalization and analysis of threat intelligence.",
  fullstack: "Reliable products spanning interfaces, APIs and infrastructure.",
  creative: "Immersive web experiences driven by graphics and motion.",
};

export function TechnicalIdentity() {
  const [selectedId, setSelectedId] = useState<string | null>("systems");
  const selectedCategory =
    skillCategories.find((category) => category.id === selectedId) ?? skillCategories[0];

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="dna"
      className="technical-identity relative section px-6 max-w-4xl mx-auto"
      style={{ zIndex: 10 }}
      aria-labelledby="dna-heading"
    >
      {/* Section heading */}
      <div className="mb-12">
        <div
          className="font-mono text-xs tracking-widest mb-3"
          style={{ color: "var(--accent-violet)" }}
          aria-hidden="true"
        >
          02 / TECHNICAL DNA
        </div>
        <h2
          id="dna-heading"
          className="font-display font-black tracking-tight"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--text-primary)",
          }}
        >
          TECHNICAL
          <span
            style={{
              background: "linear-gradient(90deg, var(--accent-violet-light), var(--accent-blue-light))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginLeft: "0.4em",
            }}
          >
            IDENTITY
          </span>
        </h2>
        <p
          className="font-body mt-3"
          style={{
            color: "var(--text-secondary)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
          }}
        >
          Six branches of technical expertise. Select any to explore the technology stack.
        </p>
      </div>

      {/* Mobile domain explorer */}
      <div className="skills-mobile" aria-label="Technical skill domains">
        <div className="skills-mobile__eyebrow" aria-hidden="true">
          <span>SELECT DOMAIN</span>
          <span>SWIPE</span>
        </div>

        <div className="skills-domain-track" role="tablist" aria-label="Skill domains">
          {skillCategories.map((category, index) => {
            const isActive = selectedCategory?.id === category.id;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`skill-tab-${category.id}`}
                aria-selected={isActive}
                aria-controls={`skill-panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                className="skills-domain-tab"
                onClick={() => setSelectedId(category.id)}
              >
                <span className="skills-domain-tab__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="skills-domain-tab__icon" aria-hidden="true">{category.icon}</span>
                <span className="skills-domain-tab__label">{category.label}</span>
                <span className="skills-domain-tab__count">{category.technologies.length}</span>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div
            id={`skill-panel-${selectedCategory.id}`}
            role="tabpanel"
            aria-labelledby={`skill-tab-${selectedCategory.id}`}
            className="skills-mobile__panel"
          >
            <div className="skills-mobile__panel-header">
              <div>
                <span className="skills-mobile__status">ACTIVE DOMAIN</span>
                <h3>{selectedCategory.label}</h3>
              </div>
              <span className="skills-mobile__total" aria-label={`${selectedCategory.technologies.length} technologies`}>
                {String(selectedCategory.technologies.length).padStart(2, "0")}
              </span>
            </div>

            <p className="skills-mobile__summary">
              {CATEGORY_SUMMARIES[selectedCategory.id]}
            </p>

            <div className="skills-mobile__stack-label" aria-hidden="true">
              <span>CORE STACK</span>
              <span className="skills-mobile__swipe-hint">DESLIZA →</span>
            </div>

            <div className="skills-chip-viewport">
              <div className="skills-chip-track">
                {selectedCategory.technologies.map((technology, index) => (
                  <article className="skill-chip" key={technology.name}>
                    <span className="skill-chip__number">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{technology.name}</strong>
                    {technology.description && <span>{technology.description}</span>}
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop tree structure */}
      <div
        className="skills-desktop rounded-xl p-6"
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(12px)",
        }}
        role="tree"
        aria-label="Technical skill tree"
      >
        {/* Root node */}
        <div
          className="flex items-center gap-3 mb-4 pb-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
          aria-hidden="true"
        >
          <span
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            [ROOT]
          </span>
          <span
            className="font-display font-bold tracking-widest"
            translate="no"
            style={{ color: "var(--accent-violet-light)" }}
          >
            JHONAN FACTOR
          </span>
        </div>

        {/* Branches */}
        <div className="flex flex-col gap-1" role="group" aria-label="Skill branches">
          {skillCategories.map((category, index) => (
            <SkillBranch
              key={category.id}
              category={category}
              isSelected={selectedId === category.id}
              onSelect={handleSelect}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
