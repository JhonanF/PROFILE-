import { useRef } from "react";
import { useInViewport } from "../../hooks/useInViewport";
import { usePerformanceProfile } from "../../performance/profile";

export function HolographicAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const performance = usePerformanceProfile();
  const isInViewport = useInViewport(containerRef, "80px", performance.tier === "high");
  const shouldAnimate =
    isInViewport && performance.documentVisible && performance.tier === "high";

  return (
    <div
      ref={containerRef}
      className="holographic-avatar relative flex items-center justify-center"
      style={{ width: 220, height: 220 }}
      aria-label="Profile avatar"
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* Ring 1 */}
      <div
        className={`avatar-ring avatar-ring--one absolute inset-0 rounded-full ${shouldAnimate ? "is-animating" : ""}`}
        style={{
          border: "1px solid rgba(124,58,237,0.4)",
          transform: "rotate(0deg) rotateX(60deg)",
          transition: "none",
        }}
        aria-hidden="true"
      />

      {/* Ring 2 */}
      <div
        className={`avatar-ring avatar-ring--two absolute rounded-full ${shouldAnimate ? "is-animating" : ""}`}
        style={{
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          border: "1px solid rgba(59,130,246,0.3)",
          transform: "rotate(0deg) rotateY(70deg)",
          transition: "none",
        }}
        aria-hidden="true"
      />

      {/* Orbital node */}
      <div
        className={`avatar-orbit absolute ${shouldAnimate ? "is-animating" : ""}`}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--accent-violet)",
          boxShadow: "0 0 12px var(--accent-violet)",
          top: "50%",
          left: "50%",
          transform: "translate(80px, 0)",
          transition: "none",
        }}
        aria-hidden="true"
      />

      {/* Avatar container */}
      <div
        className="avatar-photo-frame relative z-10 rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: 160,
          height: 160,
          background: "var(--bg-elevated)",
          border: "2px solid var(--border-accent)",
          boxShadow: "var(--glow-violet), inset 0 0 30px rgba(176,0,24,0.16)",
        }}
      >
        <picture className="block h-full w-full">
          <source srcSet="/jhonan-profile-320.webp" type="image/webp" />
          <img
            src="/jhonan-profile.png"
            alt="Retrato de Jhonan Factor"
            width={160}
            height={160}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 48%" }}
            decoding="async"
            fetchPriority="high"
          />
        </picture>

        {/* Scanline overlay on avatar */}
        <div
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Corner decorations */}
      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <div
          key={corner}
          className="absolute"
          style={{
            width: 12,
            height: 12,
            top: corner.startsWith("t") ? 8 : "auto",
            bottom: corner.startsWith("b") ? 8 : "auto",
            left: corner.endsWith("l") ? 8 : "auto",
            right: corner.endsWith("r") ? 8 : "auto",
            borderTop: corner.startsWith("t") ? "2px solid var(--accent-violet)" : "none",
            borderBottom: corner.startsWith("b") ? "2px solid var(--accent-violet)" : "none",
            borderLeft: corner.endsWith("l") ? "2px solid var(--accent-violet)" : "none",
            borderRight: corner.endsWith("r") ? "2px solid var(--accent-violet)" : "none",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
