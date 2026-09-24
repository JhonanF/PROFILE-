import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <section
      id="projects"
      className="relative section px-6"
      style={{ zIndex: 10 }}
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div
            className="font-mono text-xs tracking-widest mb-3"
            style={{ color: "var(--accent-violet)" }}
            aria-hidden="true"
          >
            04 / PROJECTS
          </div>
          <h2
            id="projects-heading"
            className="font-display font-black"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text-primary)",
            }}
          >
            SELECTED
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-violet-light), var(--accent-blue-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginLeft: "0.4em",
              }}
            >
              SYSTEMS
            </span>
          </h2>
          <p
            className="font-body mt-3 max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
          >
            A selection of high-impact systems spanning performance engineering, 
            security research, applied ML, and creative development.
          </p>
        </div>

        {/* Project grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
          role="list"
          aria-label="Project list"
        >
          {projects.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
