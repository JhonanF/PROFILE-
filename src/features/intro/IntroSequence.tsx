import { useEffect, useRef, useState } from "react";

const NORMAL_LINES = [
  { text: "INICIALIZANDO PERFIL...", delay: 0 },
  { text: "CARGANDO SISTEMAS...", delay: 400 },
  { text: "MONTANDO /dev/sda1...", delay: 800 },
];

const GLITCH_LINES = [
  { text: "C0RRUPC10N D3L S1ST3MA D3T3CTADA", delay: 1200 },
  { text: "ACCESO NO AUTORIZADO", delay: 1300 },
  { text: "BRECHA_BRECHA_BRECHA", delay: 1400 },
];

const ORIGINAL_TITLE = "[ JHONAN FACTOR ]";
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#_";

const INTRO_STYLES = `
  @keyframes intro-shake {
    0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
    20% { transform: translate3d(-3px, 2px, 0) rotate(-0.3deg); }
    40% { transform: translate3d(3px, -2px, 0) rotate(0.3deg); }
    60% { transform: translate3d(-2px, -2px, 0) rotate(0deg); }
    80% { transform: translate3d(2px, 2px, 0) rotate(0.3deg); }
  }

  @keyframes intro-flash-red {
    0%, 20%, 40%, 60%, 80%, 100% { opacity: 0; }
    10%, 30%, 50%, 70%, 90% { opacity: 0.34; }
  }

  @keyframes intro-flash-white {
    0%, 10%, 30%, 50%, 70%, 90%, 100% { opacity: 0; }
    20%, 40%, 60%, 80% { opacity: 0.1; }
  }

  @keyframes intro-chromatic-red {
    0%, 100% { transform: translate3d(3px, 2px, 0); }
    25% { transform: translate3d(-3px, 2px, 0); }
    50% { transform: translate3d(3px, -2px, 0); }
    75% { transform: translate3d(-4px, 0, 0); }
  }

  @keyframes intro-chromatic-cyan {
    0%, 100% { transform: translate3d(-3px, -2px, 0); }
    25% { transform: translate3d(3px, -2px, 0); }
    50% { transform: translate3d(-3px, 2px, 0); }
    75% { transform: translate3d(4px, 0, 0); }
  }

  .intro-horror-container {
    contain: strict;
    isolation: isolate;
    overflow: hidden;
    background: #09090f;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .intro-flash-layer {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .intro-flash-layer.red { background: #ff003c; }
  .intro-flash-layer.white { background: #ffffff; }

  .intro-noise {
    z-index: 1;
    opacity: 0.035;
    transform: translateZ(0);
    backface-visibility: hidden;
    transition: opacity 100ms linear;
  }

  .intro-scanlines { z-index: 2; }
  .intro-content { z-index: 3; }

  .intro-copy,
  .intro-skip {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
    transition: opacity 100ms linear, transform 100ms steps(2, end), visibility 0s;
  }

  .intro-skip { opacity: 0.6; }
  .intro-skip.is-emphasized { opacity: 1; }

  .intro-line {
    opacity: 0;
    visibility: hidden;
    transform: translate3d(-8px, 0, 0);
    transition: opacity 100ms linear, transform 100ms steps(2, end), visibility 0s 100ms;
  }

  .intro-line.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
    transition-delay: 0s;
  }

  .intro-glitch-line { color: var(--accent-red); }

  .intro-reveal {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate3d(0, 0, 0) scale(0.96);
  }

  .intro-horror-title {
    position: relative;
    width: 100%;
    color: #ffffff;
    font-size: clamp(1.35rem, 6.4vw, 5.75rem);
    line-height: 1;
    letter-spacing: clamp(0.08em, 0.9vw, 0.2em);
    white-space: nowrap;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .intro-horror-title::before,
  .intro-horror-title::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    mix-blend-mode: screen;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  .intro-horror-title::before { color: #ff0000; }
  .intro-horror-title::after { color: #00ffff; }

  .intro-horror-container.is-jumpscare {
    animation: intro-shake 110ms steps(2, end) 6;
    will-change: transform;
  }

  .intro-horror-container.is-jumpscare .intro-flash-layer.red {
    animation: intro-flash-red 300ms steps(1) 2;
    will-change: opacity;
  }

  .intro-horror-container.is-jumpscare .intro-flash-layer.white {
    animation: intro-flash-white 300ms steps(1) 2;
    will-change: opacity;
  }

  .intro-horror-container.is-jumpscare .intro-noise {
    opacity: 0.14;
    transition: none;
    will-change: opacity;
  }

  .intro-horror-container.is-jumpscare .intro-copy,
  .intro-horror-container.is-jumpscare .intro-skip {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate3d(0, -12px, 0);
    transition-delay: 0s, 0s, 100ms;
  }

  .intro-horror-container.is-jumpscare .intro-reveal {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0) scale(1.04);
    will-change: transform, opacity;
  }

  .intro-horror-container.is-jumpscare .intro-horror-title::before {
    animation: intro-chromatic-red 100ms steps(2, end) infinite;
    will-change: transform;
  }

  .intro-horror-container.is-jumpscare .intro-horror-title::after {
    animation: intro-chromatic-cyan 100ms steps(2, end) infinite;
    will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    .intro-horror-container,
    .intro-horror-container *,
    .intro-horror-container *::before,
    .intro-horror-container *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [phase, setPhase] = useState<"boot" | "corrupted" | "jumpscare" | "done">("boot");
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRefs = useRef<number[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const isFinishingRef = useRef(false);
  const reducedMotionQueryRef = useRef<MediaQueryList | null>(null);
  const reducedMotionHandlerRef = useRef<((event: MediaQueryListEvent) => void) | null>(null);

  const clearScheduledWork = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    rafRefs.current.forEach(cancelAnimationFrame);
    rafRefs.current = [];
  };

  const restoreTitle = () => {
    const element = titleRef.current;
    if (!element) return;
    element.textContent = ORIGINAL_TITLE;
    element.dataset.text = ORIGINAL_TITLE;
  };

  const removeReducedMotionListener = () => {
    const query = reducedMotionQueryRef.current;
    const handler = reducedMotionHandlerRef.current;
    if (query && handler) query.removeEventListener("change", handler);
    reducedMotionQueryRef.current = null;
    reducedMotionHandlerRef.current = null;
  };

  const finish = () => {
    if (isFinishingRef.current) return;
    isFinishingRef.current = true;
    clearScheduledWork();
    removeReducedMotionListener();
    restoreTitle();

    const timeout = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 100);
    timeoutRefs.current.push(timeout);
  };

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      setPhase("done");
      onComplete();
      return;
    }

    const scheduleTimeout = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay);
      timeoutRefs.current.push(timeout);
    };

    const startScramble = () => {
      let currentText = ORIGINAL_TITLE;
      let iterations = 0;

      const queueFrame = () => {
        scheduleTimeout(() => {
          const frame = requestAnimationFrame(() => {
            const element = titleRef.current;
            if (!element || isFinishingRef.current) return;

            if (iterations >= 5) {
              restoreTitle();
              return;
            }

            currentText = currentText
              .split("")
              .map((character, index) => {
                if (
                  index === 0 ||
                  index === currentText.length - 1 ||
                  ORIGINAL_TITLE[index] === " "
                ) {
                  return character;
                }
                if (Math.random() >= 0.5) return character;
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
              })
              .join("");

            element.textContent = currentText;
            element.dataset.text = currentText;
            iterations += 1;
            queueFrame();
          });
          rafRefs.current.push(frame);
        }, 50);
      };

      queueFrame();
    };

    NORMAL_LINES.forEach((line, index) => {
      scheduleTimeout(() => {
        setVisibleLines((previous) => [...previous, index]);
      }, line.delay);
    });

    scheduleTimeout(() => {
      setPhase("corrupted");
      GLITCH_LINES.forEach((line, index) => {
        scheduleTimeout(() => {
          setVisibleLines((previous) => [...previous, index + NORMAL_LINES.length]);
        }, line.delay - 1200);
      });
    }, 1200);

    scheduleTimeout(() => {
      setPhase("jumpscare");
      startScramble();
    }, 1900);

    scheduleTimeout(finish, 2600);

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) finish();
    };

    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    reducedMotionQueryRef.current = reducedMotionQuery;
    reducedMotionHandlerRef.current = handleReducedMotionChange;

    return () => {
      removeReducedMotionListener();
      clearScheduledWork();
      restoreTitle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  const isJumpScare = phase === "jumpscare";

  return (
    <>
      <style>{INTRO_STYLES}</style>

      <div
        className={`intro-horror-container fixed inset-0 flex flex-col items-center justify-center${
          isJumpScare ? " is-jumpscare" : ""
        }`}
        style={{ zIndex: 10000, cursor: "default" }}
        role="status"
        aria-label="Cargando el perfil de Jhonan Factor"
        aria-live="polite"
        onClick={finish}
      >
        <div className="intro-flash-layer red" aria-hidden="true" />
        <div className="intro-flash-layer white" aria-hidden="true" />

        <div
          className="intro-noise absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
          }}
          aria-hidden="true"
        />

        <div
          className="intro-scanlines scanlines absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />

        <div className="intro-content relative flex w-full max-w-2xl flex-col items-center gap-6 px-8">
          <div className="intro-copy flex w-full flex-col gap-2 text-left font-mono text-sm tracking-widest sm:text-base md:text-xl">
            {NORMAL_LINES.map((line, index) => (
              <div
                key={line.text}
                className={`intro-line${visibleLines.includes(index) ? " is-visible" : ""}`}
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--accent-violet-light)" }}>{">"}</span> {line.text}
              </div>
            ))}

            {GLITCH_LINES.map((line, index) => {
              const lineIndex = index + NORMAL_LINES.length;
              return (
                <div
                  key={line.text}
                  className={`intro-line intro-glitch-line font-bold${
                    visibleLines.includes(lineIndex) ? " is-visible" : ""
                  }`}
                >
                  <span style={{ color: "var(--accent-red)" }}>{">"}</span> {line.text}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={finish}
            className={`intro-skip mt-10 border-0 bg-transparent px-4 py-2 font-mono text-xs tracking-widest${
              phase === "corrupted" ? " is-emphasized" : ""
            }`}
            style={{ color: "var(--text-muted)", cursor: "pointer" }}
          >
            PULSA PARA OMITIR
          </button>
        </div>

        <div className="intro-reveal" aria-hidden="true">
          <div
            ref={titleRef}
            className="intro-horror-title text-center font-display font-black"
            data-text={ORIGINAL_TITLE}
            translate="no"
          >
            {ORIGINAL_TITLE}
          </div>
        </div>
      </div>
    </>
  );
}
