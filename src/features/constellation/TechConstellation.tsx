import { useMemo, useState, type CSSProperties } from "react";
import { constellationNodes } from "../../data/profile";

const CATEGORY_COLORS: Record<string, string> = {
  core: "#f4f1ed",
  systems: "#a78bfa",
  ai: "#60a5fa",
  fullstack: "#22d3ee",
  security: "#fb7185",
  data: "#fbbf24",
  creative: "#f472b6",
  infra: "#94a3b8",
};

const MOBILE_POSITIONS: Record<string, { x: number; y: number }> = {
  jhonan: { x: 50, y: 43 },
  rust: { x: 17, y: 16 },
  python: { x: 48, y: 12 },
  catboost: { x: 81, y: 18 },
  sqlite: { x: 16, y: 39 },
  threejs: { x: 83, y: 40 },
  luau: { x: 16, y: 66 },
  docker: { x: 49, y: 64 },
  webgl: { x: 82, y: 64 },
  typescript: { x: 29, y: 84 },
  react: { x: 70, y: 84 },
};

const nodeById = new Map(constellationNodes.map((node) => [node.id, node]));
const connections = Array.from(
  new Map(
    constellationNodes.flatMap((node) =>
      node.connections.flatMap((targetId) => {
        if (!nodeById.has(targetId)) return [];
        const source = node.id < targetId ? node.id : targetId;
        const target = node.id < targetId ? targetId : node.id;
        return [[`${source}--${target}`, { source, target }] as const];
      }),
    ),
  ).values(),
);

function areConnected(sourceId: string, targetId: string) {
  return connections.some(
    (connection) =>
      (connection.source === sourceId && connection.target === targetId) ||
      (connection.source === targetId && connection.target === sourceId),
  );
}

function ConnectionLayer({
  activeId,
  mobile = false,
}: {
  activeId: string | null;
  mobile?: boolean;
}) {
  return (
    <svg
      className={`constellation-lines constellation-lines--${mobile ? "mobile" : "desktop"}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {connections.map((connection) => {
        const source = nodeById.get(connection.source);
        const target = nodeById.get(connection.target);
        if (!source || !target) return null;

        const sourcePosition = mobile ? (MOBILE_POSITIONS[source.id] ?? source) : source;
        const targetPosition = mobile ? (MOBILE_POSITIONS[target.id] ?? target) : target;
        const selected =
          activeId === null || connection.source === activeId || connection.target === activeId;

        return (
          <line
            key={`${connection.source}-${connection.target}`}
            className={activeId === null ? "" : selected ? "is-active" : "is-muted"}
            x1={sourcePosition.x}
            y1={sourcePosition.y}
            x2={targetPosition.x}
            y2={targetPosition.y}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

export function TechConstellation() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeNode = constellationNodes.find((node) => node.id === activeId) ?? null;
  const relatedIds = useMemo(() => {
    if (!activeId) return null;
    return new Set(
      constellationNodes
        .filter((node) => node.id === activeId || areConnected(node.id, activeId))
        .map((node) => node.id),
    );
  }, [activeId]);

  return (
    <section
      id="constellation"
      className="tech-constellation section"
      aria-labelledby="constellation-heading"
    >
      <div className="constellation-shell">
        <header className="constellation-heading">
          <p className="constellation-eyebrow">03 / STACK TECNOLÓGICO</p>
          <h2 id="constellation-heading" className="blood-title blood-ink blood-ink--light">CONSTELACIÓN TECNOLÓGICA</h2>
          <p className="constellation-intro">
            Selecciona una tecnología para descubrir los sistemas detrás de mi trabajo.
          </p>
        </header>

        <div className="constellation-stage">
          <div
            className="constellation-map"
            aria-label="Constelación tecnológica con nodos de habilidades conectados"
          >
            <ConnectionLayer activeId={activeId} />
            <ConnectionLayer activeId={activeId} mobile />

            {constellationNodes.map((node) => {
              const color = CATEGORY_COLORS[node.category] ?? "#f4f1ed";
              const mobilePosition = MOBILE_POSITIONS[node.id] ?? node;
              const selected = activeId === node.id;
              const related = relatedIds?.has(node.id) ?? false;
              const muted = relatedIds !== null && !related;
              const style = {
                "--node-x": `${node.x}%`,
                "--node-y": `${node.y}%`,
                "--node-mobile-x": `${mobilePosition.x}%`,
                "--node-mobile-y": `${mobilePosition.y}%`,
                "--node-color": color,
              } as CSSProperties;

              return (
                <button
                  key={node.id}
                  type="button"
                  className={`constellation-node${node.category === "core" ? " is-core" : ""}${selected ? " is-selected" : ""}${related ? " is-related" : ""}${muted ? " is-muted" : ""}`}
                  style={style}
                  onMouseEnter={() => setActiveId(node.id)}
                  onMouseLeave={(event) => {
                    if (document.activeElement !== event.currentTarget) setActiveId(null);
                  }}
                  onFocus={() => setActiveId(node.id)}
                  onBlur={() => setActiveId(null)}
                  onClick={() => setActiveId(node.id)}
                  aria-label={`${node.label}: ${node.description}`}
                  aria-pressed={selected}
                >
                  <span className="constellation-node__marker" aria-hidden="true">
                    <span />
                  </span>
                  <span className="constellation-node__label">{node.label}</span>
                </button>
              );
            })}
          </div>

          <div className="constellation-detail" aria-live="polite">
            <span className="constellation-detail__index" aria-hidden="true">
              {activeNode ? "NODO / ACTIVO" : "SISTEMA / MAPA"}
            </span>
            <strong>{activeNode?.label ?? "JHONAN"}</strong>
            <p>
              {activeNode?.description ??
                "Una práctica conectada entre software, seguridad, sistemas inteligentes y tecnología creativa."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
