"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const codeLines = [
  "function startJourney() {",
  '  const goal = "Master Full Stack";',
  "  const steps = [",
  '    "Learn fundamentals",',
  '    "Build real projects",',
  '    "Write clean code",',
  '    "Understand systems",',
  '    "Collaborate in teams",',
  "  ];",
  "  return goal;",
  "}",
];

export const TerminalCard = ({ className }: { className?: string }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= codeLines.length) return;

    const timeout = setTimeout(() => {
      const line = codeLines[lineIndex];

      if (charIndex < line.length) {
        setCurrentLine((prev) => prev + line[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }
    }, 4); // typing speed

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, currentLine]);

  return (
    <div
      className={cn(
        "relative mx-auto max-w-3xl rounded-xl",
        "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
        "border border-white/10 shadow-[0_20px_60px_-20px_rgba(59,130,246,0.25)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="h-3 w-3 rounded-full bg-white/60" />
        <span className="h-3 w-3 rounded-full bg-white/40" />
        <span className="h-3 w-3 rounded-full bg-white/20" />
      </div>

      {/* Terminal */}
      <pre className="p-6 text-sm font-mono leading-relaxed text-slate-50">
        {displayedLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div>
          {currentLine}
          <span className="ml-1 animate-pulse">▍</span>
        </div>
      </pre>
    </div>
  );
};
 