import { useRef, useEffect } from "react";
import { useTerminal } from "./useTerminal";

export function Terminal() {
  const { lines, input, setInput, handleKeyDown, prompt } = useTerminal();
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = bodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  return (
    <section
      id="terminal"
      className="relative section px-6"
      style={{ zIndex: 10 }}
      aria-labelledby="terminal-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div
            className="font-mono text-xs tracking-widest mb-3"
            style={{ color: "var(--accent-violet)" }}
            aria-hidden="true"
          >
            06 / INTERACTIVE
          </div>
          <h2
            id="terminal-heading"
            className="font-display font-black"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text-primary)",
            }}
          >
            SYSTEM
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-violet-light), var(--accent-blue-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginLeft: "0.4em",
              }}
            >
              TERMINAL
            </span>
          </h2>
          <p
            className="font-mono text-xs mt-3 tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Type "help" to begin
          </p>
        </div>

        {/* Terminal window */}
        <div
          className="terminal-window"
          role="region"
          aria-label="Interactive terminal"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Window chrome */}
          <div className="terminal-bar" aria-hidden="true">
            <div className="terminal-dot" style={{ background: "#ef4444" }} />
            <div className="terminal-dot" style={{ background: "#f59e0b" }} />
            <div className="terminal-dot" style={{ background: "#22c55e" }} />
            <span
              className="ml-3 font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              jhonan@system:~
            </span>
            <span
              className="ml-auto font-mono text-xs flex items-center gap-1.5"
              style={{ color: "#22c55e" }}
            >
              <span className="status-dot" />
              RUNTIME ACTIVE
            </span>
          </div>

          {/* Output body */}
          <div
            ref={bodyRef}
            className="terminal-body"
            aria-live="polite"
            aria-atomic="false"
          >
            {lines.map((line) => {
              if (line.type === "prompt") {
                return (
                  <div key={line.id} className="terminal-prompt-line">
                    <span style={{ color: "var(--accent-violet-light)", userSelect: "none" }}>
                      {prompt}
                    </span>
                    <span style={{ color: "var(--text-primary)" }}>{line.content}</span>
                  </div>
                );
              }
              if (line.type === "error") {
                return (
                  <div
                    key={line.id}
                    className="terminal-output"
                    style={{ color: "var(--accent-red-light)" }}
                    role="alert"
                  >
                    {line.content}
                  </div>
                );
              }
              return (
                <div
                  key={line.id}
                  className="terminal-line"
                  translate="no"
                >
                  {line.content || "\u00A0"}
                </div>
              );
            })}

            {/* Input line */}
            <div className="terminal-prompt-line mt-1">
              <span style={{ color: "var(--accent-violet-light)", userSelect: "none" }}>
                {prompt}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none border-none font-mono text-sm flex-1"
                style={{
                  color: "var(--text-primary)",
                  caretColor: "var(--accent-violet-light)",
                  minWidth: 0,
                }}
                aria-label="Terminal input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <span
                className="terminal-cursor"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Quick commands */}
        <div
          className="mt-4 flex flex-wrap gap-2 justify-center"
          aria-label="Quick commands"
        >
          {["help", "whoami", "skills", "projects", "stack", "contact"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus();
              }}
              className="terminal-quick-command font-mono text-xs px-3 py-1.5 rounded"
              style={{
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.15)",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              data-hover
              aria-label={`Run command: ${cmd}`}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
