"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  text: string;
  seconds?: number; // total time to type the whole text
  className?: string;
  cursor?: boolean;
};

export const Typewriter = ({
  text,
  seconds = 2,
  className,
  cursor = true,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  const speed = Math.max(
    10,
    Math.floor((seconds * 1000) / Math.max(text.length, 1))
  );

  useEffect(() => {
    if (index >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, text, speed]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="whitespace-pre-wrap">{displayedText}</span>
      {cursor && index < text.length && (
       <span
  className="
    ml-1 inline-block
    h-[1em] w-[1.5px]
    bg-current
    animate-pulse
    align-middle
  "
/>

      )}
    </span>
  );
};
