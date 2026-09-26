import { useMemo, useRef } from "react";
import { useThreeScene } from "../../three/hooks/useThreeScene";
import { usePerformanceProfile } from "../../performance/profile";
import { HimikoMotionBackground } from "../hero/HimikoMotionBackground";
import type { SceneConfig } from "../../types";

function BackgroundArtwork() {
  return (
    <>
      <HimikoMotionBackground
        backgroundSrc="/hero-desktop.webp"
        mobileBackgroundSrc="/hero-mobile.webp"
      />
      <div className="background-overlay" aria-hidden="true" />
    </>
  );
}

export function MobileBackgroundFallback() {
  return <BackgroundArtwork />;
}

export function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const performance = usePerformanceProfile();
  const config = useMemo<SceneConfig>(
    () => ({
      nodeCount: Math.round(64 * performance.particleMultiplier),
      connectionDistance: 0.6,
      particleSpeed: performance.animationIntensity,
      maxDpr: performance.dpr,
    }),
    [performance.animationIntensity, performance.dpr, performance.particleMultiplier]
  );

  useThreeScene({ canvasRef, config });

  return (
    <>
      <BackgroundArtwork />
      <canvas ref={canvasRef} className="background-network" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="background-glow background-glow--top" aria-hidden="true" />
      <div className="background-glow background-glow--bottom" aria-hidden="true" />
    </>
  );
}
