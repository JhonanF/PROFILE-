import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "../../hooks/useMousePosition";
import { isTouchDevice } from "../../lib/utils";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch] = useState(() => isTouchDevice());

  // Smooth ring interpolation
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTouch) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y, isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const onEnter = (e: Event) => {
      if (
        e.target instanceof Element &&
        (e.target.matches("a, button, [role='button'], [data-hover]") ||
          e.target.closest("a, button, [role='button'], [data-hover]"))
      ) {
        setIsHovering(true);
      }
    };
    const onLeave = () => setIsHovering(false);

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{
          left: x,
          top: y,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent-violet-light)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 8px var(--accent-violet)",
          transition: "transform 0.1s ease",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          width: isHovering ? 50 : 40,
          height: isHovering ? 50 : 40,
          borderRadius: "50%",
          border: `1px solid ${isHovering ? "var(--accent-violet-light)" : "rgba(167,139,250,0.4)"}`,
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          boxShadow: isHovering ? "0 0 12px rgba(124,58,237,0.5)" : "none",
        }}
      />

      {/* Ambient cursor glow */}
      <div
        ref={glowRef}
        className="cursor-glow"
        aria-hidden="true"
        style={{
          width: 300,
          height: 300,
          left: x,
          top: y,
          zIndex: 0,
        }}
      />
    </>
  );
}
