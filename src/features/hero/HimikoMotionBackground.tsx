import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { usePerformanceProfile } from "../../performance/profile";

type HimikoMotionBackgroundProps = {
  backgroundSrc: string;
  mobileBackgroundSrc?: string;
  characterSrc?: string;
  hairBackSrc?: string;
  hairFrontSrc?: string;
  eyesSrc?: string;
};

type SceneStyle = CSSProperties & {
  "--himiko-background-image": string;
  "--himiko-mobile-background-image": string;
};

const DESKTOP_PARTICLES = 18;
const MOBILE_PARTICLES = 7;

export function HimikoMotionBackground({
  backgroundSrc,
  mobileBackgroundSrc = backgroundSrc,
  characterSrc,
  hairBackSrc,
  hairFrontSrc,
  eyesSrc,
}: HimikoMotionBackgroundProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const performance = usePerformanceProfile();
  const particleCount = performance.isMobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, index) => ({
        id: index,
        x: (index * 37 + 11) % 96,
        y: (index * 53 + 17) % 92,
        size: 1 + (index % 3),
        delay: -((index * 1.7) % 13),
        duration: 9 + (index % 8),
        drift: -9 + ((index * 7) % 19),
      })),
    [particleCount],
  );

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !performance.enableParallax) return;

    let heroVisible = false;
    let frame: number | null = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      frame = null;
      if (!heroVisible || document.hidden) return;

      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      scene.style.setProperty("--himiko-bg-x", `${(currentX * 10).toFixed(2)}px`);
      scene.style.setProperty("--himiko-bg-y", `${(currentY * 10).toFixed(2)}px`);
      scene.style.setProperty("--himiko-character-x", `${(currentX * 16).toFixed(2)}px`);
      scene.style.setProperty("--himiko-character-y", `${(currentY * 16).toFixed(2)}px`);
      scene.style.setProperty("--himiko-foreground-x", `${(currentX * 24).toFixed(2)}px`);
      scene.style.setProperty("--himiko-foreground-y", `${(currentY * 24).toFixed(2)}px`);

      if (Math.abs(targetX - currentX) > 0.004 || Math.abs(targetY - currentY) > 0.004) {
        frame = requestAnimationFrame(render);
      }
    };

    const requestRender = () => {
      if (frame === null && heroVisible && !document.hidden) frame = requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      requestRender();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry?.isIntersecting ?? false;
        scene.dataset.active = String(heroVisible);
        if (!heroVisible && frame !== null) {
          cancelAnimationFrame(frame);
          frame = null;
        }
      },
      { threshold: 0.05 },
    );
    const hero = document.querySelector("#identity");
    if (hero) observer.observe(hero);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [performance.enableParallax]);

  const style: SceneStyle = {
    "--himiko-background-image": `url("${backgroundSrc}")`,
    "--himiko-mobile-background-image": `url("${mobileBackgroundSrc}")`,
  };

  return (
    <div ref={sceneRef} className="himiko-scene" style={style} data-active="true" aria-hidden="true">
      <div className="himiko-layer himiko-camera-drift">
        <div className="himiko-layer himiko-bg" />
        <div className="himiko-layer himiko-back-glow" />
        {hairBackSrc && <img className="himiko-layer himiko-hair himiko-hair--back" src={hairBackSrc} alt="" />}
        {characterSrc && <img className="himiko-layer himiko-character" src={characterSrc} alt="" />}
        {hairFrontSrc && <img className="himiko-layer himiko-hair himiko-hair--front" src={hairFrontSrc} alt="" />}
        {eyesSrc ? (
          <img className="himiko-layer himiko-eyes himiko-eyes--asset" src={eyesSrc} alt="" />
        ) : (
          <div className="himiko-layer himiko-eyes himiko-eyes--fallback" />
        )}
      </div>
      <div className="himiko-layer himiko-front-particles">
        {particles.map((particle) => (
          <i
            key={particle.id}
            className="himiko-particle"
            style={{
              "--particle-x": `${particle.x}%`,
              "--particle-y": `${particle.y}%`,
              "--particle-size": `${particle.size}px`,
              "--particle-delay": `${particle.delay}s`,
              "--particle-duration": `${particle.duration}s`,
              "--particle-drift": `${particle.drift}px`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="himiko-layer himiko-vignette" />
    </div>
  );
}
