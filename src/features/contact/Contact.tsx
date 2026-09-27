import { About } from "../about/About";
import { SocialLinks } from "./SocialLinks";

const OPPORTUNITIES = [
  "Ingeniería de Sistemas",
  "Investigación en Seguridad",
  "ML aplicado",
  "Desarrollo creativo",
  "Consultoría técnica",
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-shell">
        <header className="contact-heading">
          <p className="contact-eyebrow" aria-hidden="true">07 / CONTACTO</p>
          <h2 id="contact-heading" className="blood-title">
            <span className="blood-ink blood-ink--light blood-ink--line">CONTACTA</span>
            <span className="blood-ink blood-ink--red">CON ÉL</span>
          </h2>
          <p className="contact-intro">
            Disponible para construir sistemas exigentes, resolver problemas complejos y colaborar con intención.
          </p>
        </header>

        <div className="contact-layout">
          <About />

          <div className="contact-side">
            <div className="contact-panel contact-channels">
              <div className="contact-panel__label" aria-hidden="true">CANALES</div>
              <SocialLinks />
            </div>

            <div className="contact-panel contact-opportunities">
              <div className="contact-opportunities__heading">
                <span className="status-dot" aria-hidden="true" />
                <span>ABIERTO A OPORTUNIDADES</span>
              </div>

              <ul>
                {OPPORTUNITIES.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-footer" aria-label="Pie de página">
          <div className="contact-footer__metadata">
            <span>JHONAN FACTOR</span>
            <span>COMPILACIÓN <strong>JF.01</strong></span>
            <span className="contact-footer__status">
              <span className="status-dot" aria-hidden="true" />
              SISTEMA ACTIVO
            </span>
          </div>
          <p>Diseñado y construido por Jhonan Factor</p>
        </div>
      </div>
    </section>
  );
}
