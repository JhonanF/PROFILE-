import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

const STATUS_CONFIG = {
  active: { label: "ACTIVO", symbol: "●" },
  research: { label: "INVESTIGACIÓN", symbol: "●" },
  archived: { label: "ARCHIVADO", symbol: "○" },
} as const;

export function ProjectCard({ project }: ProjectCardProps) {
  const status = STATUS_CONFIG[project.status];

  return (
    <article
      className="project-card"
      aria-label={`Proyecto: ${project.name}`}
      tabIndex={0}
      data-status={project.status}
    >
      <header className="project-card__header">
        <div className="project-card__topline">
          <span className="project-card__code">{project.code}</span>
          <span
            className="project-card__status"
            aria-label={`Estado: ${status.label}`}
          >
            <span aria-hidden="true">{status.symbol}</span>
            {status.label}
          </span>
        </div>
        <h3>{project.name}</h3>
      </header>

      <div className="project-card__body">
        <p className="project-card__description">{project.description}</p>

        <dl className="project-card__metadata">
          <div>
            <dt>MOTOR</dt>
            <dd>{project.technologies.slice(0, 2).join(" / ")}</dd>
          </div>
          <div>
            <dt>TIPO</dt>
            <dd>{project.category[0]}</dd>
          </div>
        </dl>

        <div className="project-card__tags" aria-label="Tecnologías">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-card__highlights">
          <p>ASPECTOS CLAVE</p>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <span aria-hidden="true">—</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
