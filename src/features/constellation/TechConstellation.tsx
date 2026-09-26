import { useState, useRef, useEffect, useCallback } from "react";
import { constellationNodes } from "../../data/profile";
import type { ConstellationNode } from "../../types";
import { usePerformanceProfile } from "../../performance/profile";

const MOBILE_NODE_IDS = new Set(["jhonan", "rust", "python", "typescript", "luau", "threejs", "react"]);

const CATEGORY_COLORS: Record<string, string> = {
  core: "#a78bfa",
  systems: "#7c3aed",
  ai: "#3b82f6",
  fullstack: "#06b6d4",
  security: "#ef4444",
  data: "#f59e0b",
  creative: "#ec4899",
  infra: "#6b7280",
};

export function TechConstellation() {
  const performance = usePerformanceProfile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 700, h: 500 });
  const isTouch = performance.isTouch;
  const displayedNodes = isTouch
    ? constellationNodes.filter((node) => MOBILE_NODE_IDS.has(node.id))
    : constellationNodes;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setDimensions({ w: width, h: Math.max(400, height) });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const getNodePos = useCallback(
    (node: ConstellationNode) => ({
      x: (node.x / 100) * dimensions.w,
      y: (node.y / 100) * dimensions.h,
    }),
    [dimensions]
  );

  const hoveredNode = constellationNodes.find((n) => n.id === hoveredId);
  const highlightedIds = hoveredNode
    ? new Set([hoveredNode.id, ...hoveredNode.connections])
    : null;

  return (
    <section
      id="constellation"
      className="relative section px-6"
      style={{ zIndex: 10 }}
      aria-labelledby="constellation-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div
            className="font-mono text-xs tracking-widest mb-3"
            style={{ color: "var(--accent-violet)" }}
            aria-hidden="true"
          >
            03 / TECH STACK
          </div>
          <h2
            id="constellation-heading"
            className="font-display font-black"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              background: "linear-gradient(135deg, var(--text-primary), var(--accent-violet-light))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            TECH CONSTELLATION
          </h2>
          <p
            className="font-body mt-3"
            style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
          >
            {isTouch ? "Tap" : "Hover"} a node to explore connections
          </p>
        </div>

        {/* SVG canvas */}
        <div
          ref={containerRef}
          className="relative rounded-xl overflow-hidden"
          style={{
            height: 480,
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)",
          }}
          role="img"
          aria-label="Technology constellation showing connected skill nodes"
        >
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            aria-hidden="true"
          >
            {/* Connection lines */}
            {displayedNodes.map((node) =>
              node.connections.map((targetId) => {
                const target = displayedNodes.find((n) => n.id === targetId);
                if (!target || node.id >= targetId) return null;

                const a = getNodePos(node);
                const b = getNodePos(target);

                const isHighlighted =
                  highlightedIds !== null &&
                  highlightedIds.has(node.id) &&
                  highlightedIds.has(targetId);

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={
                      isHighlighted
                        ? "rgba(167,139,250,0.6)"
                        : "rgba(255,255,255,0.06)"
                    }
                    strokeWidth={isHighlighted ? 1.5 : 1}
                    style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
                  />
                );
              })
            )}
          </svg>

          {/* Nodes */}
          {displayedNodes.map((node) => {
            const { x, y } = getNodePos(node);
            const color = CATEGORY_COLORS[node.category] ?? "#a78bfa";
            const isHovered = hoveredId === node.id;
            const isCore = node.category === "core";
            const dimmed =
              highlightedIds !== null && !highlightedIds.has(node.id);

            return (
              <button
                key={node.id}
                onMouseEnter={() => !isTouch && setHoveredId(node.id)}
                onMouseLeave={() => !isTouch && setHoveredId(null)}
                onClick={() => isTouch && setHoveredId(hoveredId === node.id ? null : node.id)}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  minWidth: 48,
                  minHeight: 48,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  opacity: dimmed ? 0.2 : 1,
                  transition: "opacity 0.3s ease",
                  zIndex: isHovered ? 20 : 10,
                }}
                aria-label={`${node.label}: ${node.description}`}
                data-hover
              >
                {/* Node circle */}
                <div
                  style={{
                    width: isCore ? 56 : isHovered ? 40 : 32,
                    height: isCore ? 56 : isHovered ? 40 : 32,
                    borderRadius: "50%",
                    background: isCore
                      ? `radial-gradient(circle, ${color}40, ${color}20)`
                      : `${color}18`,
                    border: `${isCore ? 2 : 1}px solid ${color}${isHovered ? "cc" : "66"}`,
                    boxShadow: isHovered || isCore ? `0 0 20px ${color}50` : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition:
                      "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: isCore ? 10 : 6,
                      height: isCore ? 10 : 6,
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  className="font-mono font-medium pointer-events-none"
                  style={{
                    fontSize: isCore ? "0.85rem" : "0.7rem",
                    color: isHovered || isCore ? color : "var(--text-secondary)",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    textShadow: isHovered ? `0 0 12px ${color}80` : "none",
                    transition: "color 0.3s ease",
                    letterSpacing: "0.08em",
                  }}
                >
                  {node.label}
                </span>
              </button>
            );
          })}

          {/* Tooltip */}
          {hoveredNode && (
            <div
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 rounded-lg px-4 py-3 font-mono text-xs"
              style={{
                background: "rgba(9,9,15,0.95)",
                border: "1px solid var(--border-accent)",
                backdropFilter: "blur(12px)",
                boxShadow: "var(--glow-violet)",
                zIndex: 30,
              }}
              role="tooltip"
            >
              <div
                className="font-semibold mb-1"
                style={{ color: "var(--accent-violet-light)" }}
              >
                {hoveredNode.label}
              </div>
              <div style={{ color: "var(--text-secondary)" }}>
                {hoveredNode.description}
              </div>
              <div
                className="mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Connects to:{" "}
                {hoveredNode.connections
                  .map(
                    (id) =>
                      constellationNodes.find((n) => n.id === id)?.label ?? id
                  )
                  .join(", ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
