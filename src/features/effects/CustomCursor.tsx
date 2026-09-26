import { useEffect, useRef, useState } from "react";
import { usePerformanceProfile } from "../../performance/profile";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const performance = usePerformanceProfile();

  useEffect(() => {
    if (!performance.documentVisible) return;

    const animate = () => {
      const ring = ringPositionRef.current;
      const target = targetRef.current;
      ring.x += (target.x - ring.x) * 0.12;
      ring.y += (target.y - ring.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 20}px, ${ring.y - 20}px, 0)`;
      }

      if (Math.abs(target.x - ring.x) > 0.1 || Math.abs(target.y - ring.y) > 0.1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX - 3}px, ${event.clientY - 3}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${event.clientX - 150}px, ${event.clientY - 150}px, 0)`;
      }
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [performance.documentVisible]);

  useEffect(() => {
    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      setIsHovering(
        target instanceof Element && Boolean(target.closest("a, button, [role='button'], [data-hover]"))
      );
    };

    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    return () => document.removeEventListener("pointerover", handlePointerOver);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? "cursor-ring--active" : ""}`} aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  );
}
