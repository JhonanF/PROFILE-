import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <section
      id="projects"
      className="projects-section section"
      aria-labelledby="projects-heading"
    >
      <div className="projects-shell">
        <header className="projects-heading">
          <p className="projects-eyebrow" aria-hidden="true">
            04 / PROYECTOS
          </p>
          <h2 id="projects-heading" className="blood-title blood-ink blood-ink--light">SISTEMAS SELECCIONADOS</h2>
          <p className="projects-intro">
            Una selección de sistemas de alto impacto que abarca ingeniería de rendimiento,
            investigación en seguridad, ML aplicado y desarrollo creativo.
          </p>
        </header>

        <div
          className="projects-grid"
          role="list"
          aria-label="Lista de proyectos"
        >
          {projects.map((project) => (
            <div className="projects-grid__item" key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
