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
      className="terminal-section section"
      aria-labelledby="terminal-heading"
    >
      <div className="terminal-section__shell">
        <header className="terminal-section__heading">
          <p className="terminal-section__eyebrow" aria-hidden="true">
            06 / INTERACTIVO
          </p>
          <h2 id="terminal-heading" className="blood-title">
            <span className="blood-ink blood-ink--light blood-ink--line">TERMINAL</span>
            <span className="blood-ink blood-ink--red">DEL SISTEMA</span>
          </h2>
          <p className="terminal-section__intro">Escribe “help” para empezar</p>
        </header>

        <div
          className="terminal-window"
          role="region"
          aria-label="Terminal interactiva"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal-bar" aria-hidden="true">
            <div className="terminal-bar__dots">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
            </div>
            <span className="terminal-bar__session">jhonan@system:~</span>
            <span className="terminal-bar__status">
              <span className="status-dot" />
              <span className="terminal-bar__status-full">SISTEMA ACTIVO</span>
              <span className="terminal-bar__status-short">ACTIVO</span>
            </span>
          </div>

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
                    <span className="terminal-prompt">{prompt}</span>
                    <span className="terminal-command">{line.content}</span>
                  </div>
                );
              }
              if (line.type === "error") {
                return (
                  <div
                    key={line.id}
                    className="terminal-output terminal-output--error"
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

            <div className="terminal-prompt-line terminal-input-line">
              <span className="terminal-prompt">{prompt}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                aria-label="Entrada de la terminal"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div
          className="terminal-shortcuts"
          aria-label="Comandos rápidos"
        >
          {["help", "whoami", "skills", "projects", "stack", "contact"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus();
              }}
              className="terminal-quick-command"
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
