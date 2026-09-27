import { workflowSteps } from "../../data/profile";

const OWNERSHIP_SIGNALS = [
  { label: "ARQUITECTURA", value: "RESPONSABILIDAD TÉCNICA" },
  { label: "COMPENSACIONES", value: "DOCUMENTADAS" },
  { label: "PUERTAS DE CALIDAD", value: "OBLIGATORIAS" },
  { label: "AUTOMATIZACIÓN", value: "DELIMITADA" },
] as const;

const STEP_LABELS = [
  "DESCUBRIMIENTO",
  "DISEÑO DEL SISTEMA",
  "ANÁLISIS DE RIESGOS",
  "IMPLEMENTACIÓN",
  "VERIFICACIÓN",
  "PERFILADO",
  "OPERACIONES",
] as const;

const METHOD_STYLES = `
  .engineering-method {
    --method-panel: rgba(10, 9, 12, 0.88);
    --method-panel-strong: rgba(13, 11, 15, 0.92);
    --method-line: rgba(255, 76, 101, 0.16);
    position: relative;
    z-index: var(--z-profile-content);
    isolation: isolate;
    min-height: 100svh;
    padding: clamp(6.5rem, 9vw, 9rem) max(1.5rem, 5vw) clamp(5rem, 8vw, 8rem);
    overflow: hidden;
  }

  .engineering-method::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(3, 3, 3, 0.9), rgba(3, 3, 3, 0.66) 30%, rgba(3, 3, 3, 0.84)),
      radial-gradient(circle at 14% 60%, rgba(135, 14, 35, 0.06), transparent 34%);
  }

  .engineering-method__shell {
    width: min(100%, 76rem);
    margin-inline: auto;
  }

  .engineering-method__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: clamp(2rem, 5vw, 5rem);
    padding-bottom: clamp(1.75rem, 3vw, 2.5rem);
    border-bottom: 1px solid var(--method-line);
  }

  .engineering-method__eyebrow {
    margin-bottom: 0.8rem;
    color: rgba(255, 82, 105, 0.82);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
  }

  .engineering-method__title {
    max-width: 12ch;
    color: var(--text-primary);
    font-size: clamp(2.5rem, 5.4vw, 5.4rem);
    line-height: 0.9;
    letter-spacing: -0.055em;
  }

  .engineering-method__title-accent {
    display: block;
    color: rgba(255, 82, 105, 0.9);
  }

  .engineering-method__status {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.35rem;
    padding-bottom: 0.35rem;
    font-family: var(--font-mono);
    max-width: 31rem;
    font-size: 0.64rem;
    line-height: 1.55;
    letter-spacing: 0.16em;
    color: var(--text-muted);
  }

  .engineering-method__status strong {
    color: rgba(255, 255, 255, 0.66);
    font-weight: 600;
  }

  .engineering-method__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.06fr);
    gap: clamp(1rem, 2.5vw, 2rem);
    margin-top: clamp(2rem, 4vw, 3.25rem);
    align-items: stretch;
  }

  .engineering-method__panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    background: var(--method-panel);
    box-shadow: 0 18px 44px -38px rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .engineering-method__panel::before {
    content: "";
    position: absolute;
    top: 0;
    left: 1.5rem;
    width: 3.25rem;
    height: 1px;
    background: rgba(255, 76, 101, 0.68);
  }

  .engineering-method__position {
    padding: clamp(1.65rem, 3vw, 2.4rem);
  }

  .engineering-method__statement {
    max-width: 20ch;
    margin-top: 1.4rem;
    font-size: clamp(1.65rem, 2.8vw, 2.45rem);
    line-height: 1.08;
    letter-spacing: -0.035em;
    color: var(--text-primary);
  }

  .engineering-method__statement span {
    color: rgba(255, 88, 111, 0.94);
  }

  .engineering-method__copy {
    display: grid;
    gap: 1.05rem;
    max-width: 54ch;
    margin-top: 1.65rem;
    color: rgba(255, 255, 255, 0.66);
    font-size: 0.94rem;
    line-height: 1.72;
  }

  .engineering-method__ownership {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
    margin-top: 1.9rem;
  }

  .engineering-method__signal {
    min-width: 0;
    padding: 0.95rem 1rem;
    background: var(--method-panel-strong);
    border: 1px solid rgba(255, 255, 255, 0.075);
    border-radius: 0.55rem;
  }

  .engineering-method__signal-label,
  .engineering-method__signal-value {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.61rem;
    line-height: 1.35;
    letter-spacing: 0.1em;
  }

  .engineering-method__signal-label {
    color: rgba(255, 255, 255, 0.4);
  }

  .engineering-method__signal-value {
    margin-top: 0.35rem;
    color: rgba(255, 102, 122, 0.82);
  }

  .engineering-method__automation {
    margin-top: 1.4rem;
    padding: 1.15rem 1.2rem;
    border-left: 2px solid rgba(255, 60, 85, 0.65);
    background: rgba(120, 12, 30, 0.075);
    color: rgba(255, 255, 255, 0.64);
    font-size: 0.84rem;
    line-height: 1.68;
  }

  .engineering-method__automation strong {
    display: block;
    margin-bottom: 0.45rem;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
  }

  .engineering-method__pipeline {
    padding: clamp(1.35rem, 2.5vw, 1.9rem);
  }

  .engineering-method__pipeline-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 0.2rem 1.15rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .engineering-method__pipeline-count {
    color: var(--accent-red-light);
  }

  .engineering-method__step {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 0.84fr) minmax(0, 1.16fr);
    align-items: center;
    gap: 1rem;
    min-height: 4.65rem;
    padding-inline: 0.2rem;
    border-bottom: 1px solid var(--border-subtle);
    transition: background-color 220ms ease, border-color 220ms ease;
  }

  .engineering-method__step:hover {
    background: rgba(255, 255, 255, 0.018);
    border-color: rgba(255, 76, 101, 0.18);
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
    border: 1px solid rgba(255, 76, 101, 0.26);
    border-radius: 0.4rem;
    color: rgba(255, 105, 125, 0.86);
    background: rgba(120, 12, 30, 0.08);
    font-family: var(--font-mono);
    font-size: 0.68rem;
  }

  .engineering-method__step-name {
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.77rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .engineering-method__step-description {
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.8rem;
    line-height: 1.55;
  }

  @media (max-width: 960px) {
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
    .engineering-method {
      min-height: auto;
      padding: 5.5rem var(--mobile-gutter) 5rem;
    }

    .engineering-method__header {
      gap: 1.35rem;
      padding-bottom: 1.6rem;
    }

    .engineering-method__title {
      max-width: none;
      font-size: clamp(2.25rem, 11vw, 3rem);
    }

    .engineering-method__status {
      font-size: 0.6rem;
      letter-spacing: 0.11em;
    }

    .engineering-method__grid {
      gap: 1rem;
      margin-top: 2rem;
    }

    .engineering-method__panel {
      border-radius: 0.9rem;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    .engineering-method__position,
    .engineering-method__pipeline {
      padding: 1.25rem 1.15rem;
    }

    .engineering-method__statement {
      font-size: clamp(1.55rem, 7.5vw, 2rem);
    }

    .engineering-method__copy {
      font-size: 0.9rem;
    }

    .engineering-method__step {
      grid-template-columns: 2.25rem minmax(0, 1fr);
      gap: 0.75rem;
      min-height: 0;
      padding: 0.95rem 0.1rem;
    }

    .engineering-method__step-description {
      grid-column: 2;
      margin-top: -0.5rem;
    }
  }

  @media (max-width: 420px) {
    .engineering-method__ownership {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .engineering-method__step {
      transition: none;
    }
  }
`;

export function ArchitecturalVibe() {
  return (
    <section
      id="vibe"
      className="engineering-method section"
      aria-labelledby="vibe-heading"
    >
      <style>{METHOD_STYLES}</style>

      <div className="engineering-method__shell">
        <header className="engineering-method__header">
          <div>
            <div className="engineering-method__eyebrow">05 / MÉTODO DE INGENIERÍA</div>
            <h2
              id="vibe-heading"
              className="engineering-method__title blood-title font-display font-black"
            >
              <span className="blood-ink blood-ink--light blood-ink--line">SISTEMAS</span>
              <span className="engineering-method__title-accent blood-ink blood-ink--red">INGENIERÍA</span>
            </h2>
          </div>

          <div className="engineering-method__status" aria-label="Estado del método de ingeniería">
            <span>MODELO OPERATIVO / JF-01</span>
            <strong>DECISIONES PROPIAS · GUIADO POR EVIDENCIA</strong>
          </div>
        </header>

        <div className="engineering-method__grid">
          <article className="engineering-method__panel engineering-method__position">
            <div
              className="font-mono text-xs tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              POSICIÓN DE INGENIERÍA
            </div>

            <h3 className="engineering-method__statement font-display font-semibold">
              La arquitectura define el sistema. <span>La evidencia lo valida.</span>
            </h3>

            <div className="engineering-method__copy">
              <p>
                Traduzco los objetivos del producto en restricciones explícitas, límites del sistema,
                contratos, flujos de datos, modos de fallo y objetivos de calidad medibles antes de implementar.
              </p>
              <p>
                Asumo las decisiones técnicas entre rendimiento, confiabilidad, seguridad y
                mantenibilidad, desde el primer diseño hasta la telemetría en producción.
              </p>
            </div>

            <div className="engineering-method__ownership" aria-label="Modelo de responsabilidad técnica">
              {OWNERSHIP_SIGNALS.map((signal) => (
                <div className="engineering-method__signal" key={signal.label}>
                  <span className="engineering-method__signal-label">{signal.label}</span>
                  <span className="engineering-method__signal-value">{signal.value}</span>
                </div>
              ))}
            </div>

            <div className="engineering-method__automation">
              <strong>POLÍTICA DE AUTOMATIZACIÓN</strong>
              Las herramientas asistidas por IA aceleran el trabajo mecánico delimitado. Las decisiones de
              arquitectura, seguridad, precisión, revisión y despliegue siguen siendo responsabilidad del ingeniero.
            </div>
          </article>

          <div
            className="engineering-method__panel engineering-method__pipeline"
            role="list"
            aria-label="Pipeline de entrega de ingeniería"
          >
            <div className="engineering-method__pipeline-head font-mono text-xs tracking-widest">
              <span style={{ color: "var(--text-muted)" }}>PIPELINE DE ENTREGA</span>
              <span className="engineering-method__pipeline-count">07 ETAPAS</span>
            </div>

            {workflowSteps.map((step, index) => (
              <div className="engineering-method__step" key={step.step} role="listitem">
                <span className="engineering-method__step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="engineering-method__step-name">{STEP_LABELS[index]}</span>
                <span className="engineering-method__step-description">{step.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
