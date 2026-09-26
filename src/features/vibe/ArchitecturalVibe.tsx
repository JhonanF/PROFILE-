import { workflowSteps } from "../../data/profile";

const OWNERSHIP_SIGNALS = [
  { label: "ARCHITECTURE", value: "ENGINEER-OWNED" },
  { label: "TRADE-OFFS", value: "DOCUMENTED" },
  { label: "QUALITY GATES", value: "ENFORCED" },
  { label: "AUTOMATION", value: "BOUNDED" },
] as const;

const METHOD_STYLES = `
  .engineering-method {
    --method-panel: rgba(5, 5, 9, 0.82);
    --method-panel-strong: rgba(8, 7, 12, 0.94);
    --method-line: rgba(255, 60, 85, 0.2);
  }

  .engineering-method__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--method-line);
  }

  .engineering-method__title {
    max-width: 15ch;
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    line-height: 0.88;
    letter-spacing: -0.055em;
  }

  .engineering-method__title-accent {
    display: block;
    color: var(--accent-red-light);
  }

  .engineering-method__status {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.35rem;
    padding-bottom: 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    color: var(--text-muted);
  }

  .engineering-method__status strong {
    color: var(--accent-red-light);
    font-weight: 600;
  }

  .engineering-method__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: clamp(1rem, 2.5vw, 2rem);
    margin-top: 2rem;
  }

  .engineering-method__panel {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border-default);
    border-radius: 0.9rem;
    background: var(--method-panel);
    backdrop-filter: blur(18px);
  }

  .engineering-method__panel::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 60, 85, 0.72), transparent);
  }

  .engineering-method__position {
    padding: clamp(1.5rem, 3vw, 2.25rem);
  }

  .engineering-method__statement {
    max-width: 19ch;
    margin-top: 1.25rem;
    font-size: clamp(1.75rem, 3.2vw, 2.65rem);
    line-height: 1.04;
    letter-spacing: -0.035em;
    color: var(--text-primary);
  }

  .engineering-method__statement span {
    color: var(--accent-red-light);
  }

  .engineering-method__copy {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .engineering-method__ownership {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    margin-top: 1.75rem;
    border: 1px solid var(--method-line);
    border-radius: 0.65rem;
    overflow: hidden;
    background: var(--method-line);
  }

  .engineering-method__signal {
    min-width: 0;
    padding: 0.9rem 1rem;
    background: var(--method-panel-strong);
  }

  .engineering-method__signal-label,
  .engineering-method__signal-value {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
  }

  .engineering-method__signal-label {
    color: var(--text-muted);
  }

  .engineering-method__signal-value {
    margin-top: 0.35rem;
    color: var(--accent-red-light);
  }

  .engineering-method__automation {
    margin-top: 1.25rem;
    padding: 1rem 1.1rem;
    border-left: 2px solid var(--accent-red);
    background: rgba(255, 0, 60, 0.045);
    color: var(--text-secondary);
    font-size: 0.82rem;
    line-height: 1.65;
  }

  .engineering-method__automation strong {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
  }

  .engineering-method__pipeline {
    padding: clamp(1.25rem, 2.5vw, 1.75rem);
  }

  .engineering-method__pipeline-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 0.25rem 1rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .engineering-method__pipeline-count {
    color: var(--accent-red-light);
  }

  .engineering-method__step {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 0.78fr) minmax(0, 1.22fr);
    align-items: center;
    gap: 1rem;
    min-height: 4.15rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .engineering-method__step:last-child {
    border-bottom: 0;
  }

  .engineering-method__step-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid rgba(255, 60, 85, 0.32);
    border-radius: 0.4rem;
    color: var(--accent-red-light);
    background: rgba(255, 0, 60, 0.06);
    font-family: var(--font-mono);
    font-size: 0.68rem;
  }

  .engineering-method__step-name {
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .engineering-method__step-description {
    color: var(--text-secondary);
    font-size: 0.78rem;
    line-height: 1.5;
  }

  @media (max-width: 860px) {
    .engineering-method__header,
    .engineering-method__grid {
      grid-template-columns: 1fr;
    }

    .engineering-method__status {
      align-items: flex-start;
    }

    .engineering-method__title {
      max-width: 12ch;
    }
  }

  @media (max-width: 560px) {
    .engineering-method__ownership {
      grid-template-columns: 1fr;
    }

    .engineering-method__step {
      grid-template-columns: 2.25rem minmax(0, 1fr);
      gap: 0.75rem;
      padding: 0.8rem 0;
    }

    .engineering-method__step-description {
      grid-column: 2;
      margin-top: -0.5rem;
    }
  }
`;

export function ArchitecturalVibe() {
  return (
    <section
      id="vibe"
      className="engineering-method section relative px-6"
      style={{ zIndex: 10 }}
      aria-labelledby="vibe-heading"
    >
      <style>{METHOD_STYLES}</style>

      <div className="mx-auto max-w-6xl">
        <header className="engineering-method__header">
          <div>
            <div
              className="mb-4 font-mono text-xs tracking-widest"
              style={{ color: "var(--accent-red-light)" }}
            >
              05 / ENGINEERING METHOD
            </div>
            <h2
              id="vibe-heading"
              className="engineering-method__title font-display font-black"
            >
              SYSTEMS
              <span className="engineering-method__title-accent">ENGINEERING</span>
            </h2>
          </div>

          <div className="engineering-method__status" aria-label="Engineering method status">
            <span>OPERATING MODEL / JF-01</span>
            <strong>DECISION-OWNED · EVIDENCE-DRIVEN</strong>
          </div>
        </header>

        <div className="engineering-method__grid">
          <article className="engineering-method__panel engineering-method__position">
            <div
              className="font-mono text-xs tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              ENGINEERING POSITION
            </div>

            <h3 className="engineering-method__statement font-display font-semibold">
              Architecture defines the system. <span>Evidence validates it.</span>
            </h3>

            <div className="engineering-method__copy">
              <p>
                I translate product goals into explicit constraints, system boundaries, contracts,
                data flows, failure modes, and measurable quality targets before implementation.
              </p>
              <p>
                I own the technical trade-offs across performance, reliability, security, and
                maintainability—from the first design decision through production telemetry.
              </p>
            </div>

            <div className="engineering-method__ownership" aria-label="Engineering ownership model">
              {OWNERSHIP_SIGNALS.map((signal) => (
                <div className="engineering-method__signal" key={signal.label}>
                  <span className="engineering-method__signal-label">{signal.label}</span>
                  <span className="engineering-method__signal-value">{signal.value}</span>
                </div>
              ))}
            </div>

            <div className="engineering-method__automation">
              <strong>AUTOMATION POLICY</strong>
              AI-assisted tools accelerate bounded mechanical work. Architecture, security,
              correctness, review, and release decisions remain engineer-owned.
            </div>
          </article>

          <div
            className="engineering-method__panel engineering-method__pipeline"
            role="list"
            aria-label="Engineering delivery pipeline"
          >
            <div className="engineering-method__pipeline-head font-mono text-xs tracking-widest">
              <span style={{ color: "var(--text-muted)" }}>DELIVERY PIPELINE</span>
              <span className="engineering-method__pipeline-count">07 STAGES</span>
            </div>

            {workflowSteps.map((step, index) => (
              <div className="engineering-method__step" key={step.step} role="listitem">
                <span className="engineering-method__step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="engineering-method__step-name">{step.step}</span>
                <span className="engineering-method__step-description">{step.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
