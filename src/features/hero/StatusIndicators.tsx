import { useEffect, useState } from "react";
import { profile } from "../../data/profile";

const STATUS_ITEMS = [
  { label: "ESTADO_SISTEMA", value: "EN_LÍNEA", color: "#22c55e" },
  { label: "RUNTIME", value: "ACTIVO", color: "var(--accent-violet-light)" },
  { label: "UBICACIÓN", value: profile.location, color: "var(--text-secondary)" },
  { label: "COMPILACIÓN", value: profile.buildId, color: "var(--accent-blue-light)" },
  { label: "ESTADO_STACK", value: profile.status, color: "#22c55e" },
];

export function StatusIndicators() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    STATUS_ITEMS.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), 300 + i * 150);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <div
      className="absolute right-0 top-0 flex flex-col gap-1 font-mono text-xs"
      style={{ right: "-180px", top: "50%", transform: "translateY(-50%)" }}
      aria-label="Indicadores de estado del sistema"
    >
      {STATUS_ITEMS.map((item, i) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "none" : "translateX(10px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
          aria-hidden="true"
        >
          <span style={{ color: "var(--text-muted)" }}>{item.label}:</span>
          <span style={{ color: item.color, letterSpacing: "0.1em" }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
