import { useEffect, useMemo, useState, type ReactNode } from "react";
import { PerformanceContext, readCapabilities } from "./profile";

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(readCapabilities);

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 480px)"),
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(max-width: 1024px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(hover: hover) and (pointer: fine)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    let resizeFrame: number | null = null;

    const updateProfile = () => setProfile(readCapabilities());
    const handleResize = () => {
      if (resizeFrame !== null) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = null;
        updateProfile();
      });
    };

    queries.forEach((query) => query.addEventListener("change", updateProfile));
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", updateProfile);
    return () => {
      queries.forEach((query) => query.removeEventListener("change", updateProfile));
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", updateProfile);
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    };
  }, []);

  const value = useMemo(() => profile, [profile]);
  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
}
