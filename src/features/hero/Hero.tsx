import { useEffect, useState } from "react";
import { HolographicAvatar } from "./HolographicAvatar";
import { profile } from "../../data/profile";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="identity"
      className={`hero-section ${visible ? "is-visible" : ""}`}
      aria-labelledby="hero-name"
    >
      <div className="hero-section__wash" aria-hidden="true" />

      <div className="hero-shell">
        <header className="hero-topline hero-reveal">
          <div className="hero-section-index">
            <span>01</span>
            <span>Perfil</span>
          </div>

          <div className="hero-availability">
            <span className="hero-availability__dot" aria-hidden="true" />
            <span className="hero-availability__label">
              <span className="hero-availability__desktop">Disponible para proyectos seleccionados</span>
              <span className="hero-availability__mobile">Disponible</span>
            </span>
            <span className="hero-availability__location">{profile.location}</span>
          </div>
        </header>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow hero-reveal">
              Software <span>/</span> Seguridad <span>/</span> Inteligencia
            </p>

            <h1 id="hero-name" className="hero-name" translate="no">
              <span
                className="hero-name__line hero-name__texture hero-name__texture--light hero-reveal"
                data-text="JHONAN"
              >
                JHONAN
              </span>
              <span
                className="hero-name__line hero-name__line--accent hero-name__texture hero-name__texture--red hero-reveal"
                data-text="FACTOR"
              >
                FACTOR
              </span>
            </h1>

            <div className="hero-introduction hero-reveal">
              <p className="hero-title">{profile.title}</p>
              <p className="hero-statement">{profile.tagline}</p>
            </div>

            <div className="hero-actions hero-reveal" aria-label="Acciones principales">
              <a className="hero-button hero-button--primary" href="#projects" data-hover>
                <span>Explora mi trabajo</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a className="hero-button hero-button--secondary" href="#contact" data-hover>
                <span>Hablemos</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <ul className="hero-disciplines hero-reveal" aria-label="Disciplinas principales">
              {profile.roles.map((role, index) => (
                <li key={role}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual hero-reveal">
            <HolographicAvatar />
          </div>
        </div>

        <div className="hero-footer hero-reveal" aria-hidden="true">
          <span>Desplázate para descubrir</span>
          <span className="hero-footer__line" />
          <span>Sistemas construidos con intención</span>
        </div>
      </div>
    </section>
  );
}
