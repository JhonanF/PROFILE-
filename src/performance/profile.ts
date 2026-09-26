import { createContext, useContext } from "react";

export type PerformanceTier = "high" | "medium" | "low";

export interface PerformanceProfile {
  tier: PerformanceTier;
  isMobile: boolean;
  isTouch: boolean;
  reducedMotion: boolean;
  documentVisible: boolean;
  dpr: number;
  particleMultiplier: number;
  enableBackgroundCanvas: boolean;
  enableParallax: boolean;
  enableCursor: boolean;
  enableBlur: boolean;
  animationIntensity: number;
}

export function readCapabilities(): PerformanceProfile {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isLow = reducedMotion || window.matchMedia("(max-width: 480px)").matches;
  const isMedium = !isLow && (isTouch || window.matchMedia("(max-width: 1024px)").matches);
  const tier: PerformanceTier = isLow ? "low" : isMedium ? "medium" : "high";
  const dprCap = tier === "high" ? 2 : tier === "medium" ? 1.25 : 1;

  return {
    tier,
    isMobile,
    isTouch,
    reducedMotion,
    documentVisible: !document.hidden,
    dpr: Math.min(window.devicePixelRatio || 1, dprCap),
    particleMultiplier: tier === "high" ? 1 : tier === "medium" ? 0.5 : 0.2,
    enableBackgroundCanvas: tier === "high" && !isTouch && !reducedMotion,
    enableParallax: canHover && !reducedMotion,
    enableCursor: canHover && tier === "high" && !reducedMotion,
    enableBlur: tier === "high",
    animationIntensity: reducedMotion ? 0 : tier === "high" ? 1 : tier === "medium" ? 0.55 : 0.25,
  };
}

export const PerformanceContext = createContext<PerformanceProfile | null>(null);

export function usePerformanceProfile(): PerformanceProfile {
  const profile = useContext(PerformanceContext);
  if (!profile) throw new Error("usePerformanceProfile must be used within PerformanceProvider");
  return profile;
}
