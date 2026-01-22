"use client";

import { JSX, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const codeLines: JSX.Element[] = [
  <>
    <span className="text-purple-400">function</span>{" "}
    <span className="text-blue-400">startJourney</span>
    <span className="text-slate-400">()</span>{" "}
    <span className="text-slate-400">{"{"}</span>
  </>,
  <>
    {"  "}
    <span className="text-purple-400">const</span>{" "}
    <span className="text-orange-400">goal</span>{" "}
    <span className="text-slate-400">=</span>{" "}
    <span className="text-white">"Master Full Stack"</span>
    <span className="text-slate-400">;</span>
  </>,
  <>
    {"  "}
    <span className="text-purple-400">const</span>{" "}
    <span className="text-orange-400">steps</span>{" "}
    <span className="text-slate-400">=</span>{" "}
    <span className="text-slate-400">[</span>
  </>,
  <>
    {"    "}
    <span className="text-white">"Learn fundamentals"</span>
    <span className="text-slate-400">,</span>
  </>,
  <>
    {"    "}
    <span className="text-white">"Build real projects"</span>
    <span className="text-slate-400">,</span>
  </>,
  <>
    {"    "}
    <span className="text-white">"Write clean code"</span>
    <span className="text-slate-400">,</span>
  </>,
  <>
    {"    "}
    <span className="text-white">"Understand systems"</span>
    <span className="text-slate-400">,</span>
  </>,
  <>
    {"    "}
    <span className="text-white">"Collaborate in teams"</span>
  </>,
  <>
    {"  "}
    <span className="text-slate-400">]</span>
    <span className="text-slate-400">;</span>
  </>,
  <>
    {"  "}
    <span className="text-purple-400">return</span>{" "}
    <span className="text-orange-400 ">goal</span>
    <span className="text-slate-400">;</span>
  </>,
  <span className="text-slate-400">{"}"}</span>,
];



export const TerminalCard = ({ className }: { className?: string }) => {
  const [displayedLines, setDisplayedLines] = useState<JSX.Element[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= codeLines.length) return;

    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, codeLines[lineIndex]]);
      setLineIndex((prev) => prev + 1);
    }, 120); // typing speed per line

    return () => clearTimeout(timeout);
  }, [lineIndex]);

  return (
    <div
      className={cn(
        "relative mx-auto max-w-3xl rounded-xl",
        "bg-linear-to-br from-slate-950 via-slate-900 to-slate-950",
        "border border-white/10 shadow-[0_20px_60px_-20px_rgba(59,130,246,0.25)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
      </div>

      {/* Terminal */}
      <pre className="p-6 text-sm font-mono leading-relaxed">
        {displayedLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="text-slate-50 animate-pulse">▍</div>
      </pre>
    </div>
  );
};
