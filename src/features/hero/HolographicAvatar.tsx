import { useEffect, useRef } from "react";

export function HolographicAvatar() {
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const angleRef = useRef(0);

  useEffect(() => {
    let t = 0;
    const loop = () => {
      t += 0.008;
      angleRef.current = t;

      if (ring1Ref.current) {
        ring1Ref.current.style.transform = `rotate(${t * 30}deg) rotateX(60deg)`;
      }
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `rotate(${-t * 20}deg) rotateY(70deg)`;
      }
      if (orbitRef.current) {
        const x = Math.cos(t) * 85;
        const y = Math.sin(t) * 30;
        orbitRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
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
        ref={ring1Ref}
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(124,58,237,0.4)",
          transform: "rotate(0deg) rotateX(60deg)",
          transition: "none",
        }}
        aria-hidden="true"
      />

      {/* Ring 2 */}
      <div
        ref={ring2Ref}
        className="absolute rounded-full"
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
        ref={orbitRef}
        className="absolute"
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
        className="relative z-10 rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: 160,
          height: 160,
          background: "var(--bg-elevated)",
          border: "2px solid var(--border-accent)",
          boxShadow: "var(--glow-violet), inset 0 0 30px rgba(176,0,24,0.16)",
        }}
      >
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
