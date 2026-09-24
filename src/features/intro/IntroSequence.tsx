import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const BOOT_LINES = [
  { text: "INITIALIZING PROFILE...", delay: 0, color: "var(--text-secondary)" },
  { text: "LOADING SYSTEMS...", delay: 300, color: "var(--text-secondary)" },
  { text: "RUNTIME ONLINE", delay: 600, color: "var(--accent-cyan)" },
  { text: "IDENTITY VERIFIED", delay: 900, color: "#22c55e" },
];

const STORAGE_KEY = "jf-intro-seen";

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [hasSeen, setHasSeen] = useLocalStorage<boolean>(STORAGE_KEY, false);
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showName, setShowName] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isFinishingRef = useRef(false);

  const finish = () => {
    if (isFinishingRef.current) return;

    isFinishingRef.current = true;
    timerRefs.current.forEach(clearTimeout);
    setExiting(true);
    const exitTimer = setTimeout(() => {
      setDone(true);
      setHasSeen(true);
      onComplete();
    }, 600);
    timerRefs.current.push(exitTimer);
  };

  useEffect(() => {
    // Skip intro for returning visitors or reduced motion
    if (hasSeen || reducedMotion) {
      setDone(true);
      onComplete();
      return;
    }

    // Show lines with staggered delay
    BOOT_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, BOOT_LINES[i]!.delay);
      timerRefs.current.push(t);
    });

    // Show name
    const nameTimer = setTimeout(() => setShowName(true), 1100);
    timerRefs.current.push(nameTimer);

    // Auto complete
    const doneTimer = setTimeout(() => finish(), 2000);
    timerRefs.current.push(doneTimer);

    const timers = timerRefs.current;

    return () => {
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "#09090f",
        zIndex: 10000,
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s ease",
        cursor: "default",
      }}
      role="status"
      aria-label="Loading Jhonan Factor profile"
    >
      {/* Scan line overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-6 px-8">
        {/* Boot lines */}
        <div className="flex flex-col gap-2" style={{ minWidth: 300 }}>
          {BOOT_LINES.map((line, i) => (
            <div
              key={line.text}
              className="font-mono text-sm tracking-widest"
              style={{
                color: line.color,
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? "none" : "translateY(4px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <span style={{ color: "var(--accent-violet-light)" }}>{">"}</span>{" "}
              {line.text}
            </div>
          ))}
        </div>

        {/* Name reveal */}
        <div
          className="font-display font-black tracking-[0.2em] text-center"
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)",
            opacity: showName ? 1 : 0,
            transform: showName ? "none" : "translateY(12px) scale(0.97)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)",
            background: "linear-gradient(135deg, #e8e8f0 0%, #a78bfa 50%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}
        >
          [ JHONAN FACTOR ]
        </div>

        {/* Skip button */}
        <button
          onClick={finish}
          className="font-mono text-xs tracking-widest mt-4"
          style={{
            color: "var(--text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: showName ? 0.6 : 0,
            transition: "opacity 0.3s ease",
            padding: "8px 16px",
          }}
          aria-label="Skip intro animation"
        >
          PRESS ANYWHERE TO SKIP
        </button>
      </div>
    </div>
  );
}
