import { useRef } from "react";
import { useThreeScene } from "../../three/hooks/useThreeScene";
import { useMousePosition } from "../../hooks/useMousePosition";
import type { SceneConfig } from "../../types";

const SCENE_CONFIG: SceneConfig = {
  nodeCount: 80,
  connectionDistance: 0.6,
  particleSpeed: 0.4,
  maxDpr: 1.5,
};

export function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useThreeScene({
    canvasRef,
    config: SCENE_CONFIG,
    mouseX: normalizedX,
    mouseY: normalizedY,
  });

  return (
    <>
      {/* Hero background image — Toga cinematic artwork */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Soft overlay — only darkens bottom half, keeps Toga's face visible */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,3,3,0.1) 0%, rgba(3,3,3,0.15) 25%, rgba(3,3,3,0.5) 55%, rgba(3,3,3,0.85) 75%, rgba(9,9,15,0.95) 100%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Canvas network */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1, opacity: 0.4 }}
        aria-hidden="true"
      />

      {/* Noise overlay */}
      <div
        className="noise"
        aria-hidden="true"
        style={{ zIndex: 2 }}
      />

      {/* Ambient crimson glow */}
      <div
        className="fixed pointer-events-none"
        aria-hidden="true"
        style={{
          top: "5%",
          right: "20%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(176,0,24,0.08) 0%, transparent 70%)",
          zIndex: 2,
          filter: "blur(80px)",
        }}
      />
      <div
        className="fixed pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "15%",
          left: "5%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(176,0,24,0.05) 0%, transparent 70%)",
          zIndex: 2,
          filter: "blur(60px)",
        }}
      />
    </>
  );
}
