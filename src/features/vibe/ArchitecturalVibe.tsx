import { workflowSteps } from "../../data/profile";

export function ArchitecturalVibe() {
  return (
    <section
      id="vibe"
      className="relative section px-6"
      style={{ zIndex: 10 }}
      aria-labelledby="vibe-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div
            className="font-mono text-xs tracking-widest mb-3"
            style={{ color: "var(--accent-violet)" }}
            aria-hidden="true"
          >
            05 / METHODOLOGY
          </div>
          <h2
            id="vibe-heading"
            className="font-display font-black"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}
          >
            ARCHITECTURAL
            <span
              style={{
                background: "linear-gradient(90deg, var(--accent-violet-light), var(--accent-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginLeft: "0.4em",
              }}
            >
              VIBE CODING
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: manifesto */}
          <div className="flex flex-col gap-6">
            <div
              className="rounded-xl p-6"
              style={{
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
              }}
            >
              <blockquote
                className="font-display font-semibold leading-tight"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "var(--text-primary)",
                  fontStyle: "normal",
                }}
              >
                AI accelerates{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, var(--accent-violet-light), var(--accent-blue-light))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  execution.
                </span>
                <br />
                Architecture remains{" "}
                <span style={{ color: "var(--accent-violet-light)" }}>intentional.</span>
              </blockquote>
            </div>

            <div className="flex flex-col gap-4 font-body" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <p>
                I use AI systems intensively as force multipliers — not as replacements for engineering judgment. Every system I build starts with a deliberate architectural decision before a single line is generated.
              </p>
              <p>
                The result is code that is fast to produce, intentional in structure, and systematically reviewed before deployment.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["AI-Assisted", "Architecture-First", "Manual Review", "Performance-Focused"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    color: "var(--accent-violet-light)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: workflow */}
          <div
            className="rounded-xl p-6"
            style={{
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
              backdropFilter: "blur(12px)",
            }}
            role="list"
            aria-label="Development workflow steps"
          >
            <div
              className="font-mono text-xs tracking-widest mb-6"
              style={{ color: "var(--text-muted)" }}
              aria-hidden="true"
            >
              WORKFLOW PIPELINE
            </div>

            {workflowSteps.map((step, index) => {
              const isLast = index === workflowSteps.length - 1;
              return (
                <div
                  key={step.step}
                  className="flex gap-4"
                  role="listitem"
                >
                  {/* Connector */}
                  <div className="flex flex-col items-center">
                    {/* Step number circle */}
                    <div
                      className="flex items-center justify-center shrink-0 font-mono text-xs font-bold"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(124,58,237,0.12)",
                        border: "1px solid rgba(124,58,237,0.4)",
                        color: "var(--accent-violet-light)",
                      }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {/* Vertical line */}
                    {!isLast && (
                      <div
                        style={{
                          width: 1,
                          flexGrow: 1,
                          background:
                            "linear-gradient(to bottom, rgba(124,58,237,0.3), rgba(124,58,237,0.05))",
                          minHeight: 20,
                          margin: "4px 0",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-${isLast ? "0" : "4"}`} style={{ paddingBottom: isLast ? 0 : 16 }}>
                    <div
                      className="font-mono font-semibold text-sm tracking-widest"
                      style={{ color: "var(--text-primary)", lineHeight: 2 }}
                    >
                      {step.step}
                    </div>
                    <div
                      className="font-body text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
