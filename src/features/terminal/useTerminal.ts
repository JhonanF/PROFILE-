import { useState, useCallback } from "react";
import { terminalCommands, TERMINAL_PROMPT } from "../../data/terminal";

export interface TerminalLine {
  id: string;
  type: "prompt" | "output" | "error";
  content: string;
}

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "welcome",
      type: "output",
      content: 'Escribe "help" para ver los comandos disponibles.',
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState(-1);

  const execute = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [cmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);

    // Echo the command
    const promptLine: TerminalLine = {
      id: `p-${Date.now()}`,
      type: "prompt",
      content: cmd,
    };

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const found = terminalCommands.find((c) => c.command === cmd);

    if (!found) {
      setLines((prev) => [
        ...prev,
        promptLine,
        {
          id: `e-${Date.now()}`,
          type: "error",
          content: `Comando no encontrado: ${cmd}. Escribe "help" para ver los comandos disponibles.`,
        },
      ]);
    } else {
      const outputLines: TerminalLine[] = found.output.map((line, i) => ({
        id: `o-${Date.now()}-${i}`,
        type: "output" as const,
        content: line,
      }));
      setLines((prev) => [...prev, promptLine, ...outputLines]);
    }

    setInput("");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        execute(input);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const next = Math.min(prev + 1, history.length - 1);
          setInput(history[next] ?? "");
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const next = Math.max(prev - 1, -1);
          setInput(next === -1 ? "" : (history[next] ?? ""));
          return next;
        });
      }
    },
    [execute, history, input]
  );

  return {
    lines,
    input,
    setInput,
    execute,
    handleKeyDown,
    prompt: TERMINAL_PROMPT,
  };
}
