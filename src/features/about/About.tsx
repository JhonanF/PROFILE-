export function About() {
  return (
    <div
      className="rounded-xl p-8"
      style={{
        background: "var(--bg-glass)",
        border: "1px solid var(--border-subtle)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="font-mono text-xs tracking-widest mb-4"
        style={{ color: "var(--accent-violet)" }}
        aria-hidden="true"
      >
        ABOUT / BIO
      </div>
      <div className="flex flex-col gap-4 font-body" style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1rem" }}>
        <p>
          I build systems across multiple layers of the stack — from memory-aware
          backend processing and runtime analysis to applied machine learning and
          interactive WebGL experiences.
        </p>
        <p>
          My workflow combines software architecture, AI-assisted development and
          low-level technical experimentation to move rapidly from concept to
          working systems.
        </p>
      </div>
    </div>
  );
}
