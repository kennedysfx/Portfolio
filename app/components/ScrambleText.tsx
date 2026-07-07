"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#";

interface ScrambleTextProps {
  texts: string[];
  holdDuration?: number;   // ms each resolved word stays fully visible
  scrambleSpeed?: number;  // ms between scramble frames
  className?: string;
}

export default function ScrambleText({
  texts,
  holdDuration = 2200,
  scrambleSpeed = 30,
  className = "",
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(texts[0]);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let textIndex = 0;

    const scrambleTo = (target: string) => {
      let frame = 0;
      const totalFrames = target.length * 3;

      if (frameRef.current) clearInterval(frameRef.current);

      frameRef.current = setInterval(() => {
        const revealCount = Math.floor((frame / totalFrames) * target.length);
        let output = "";

        for (let i = 0; i < target.length; i++) {
          if (target[i] === " ") {
            output += " ";
          } else if (i < revealCount) {
            output += target[i];
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(output);
        frame++;

        if (frame > totalFrames) {
          if (frameRef.current) clearInterval(frameRef.current);
          setDisplay(target);
        }
      }, scrambleSpeed);
    };

    scrambleTo(texts[textIndex]);

    cycleRef.current = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      scrambleTo(texts[textIndex]);
    }, holdDuration);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [texts, holdDuration, scrambleSpeed]);

  return (
    <span className={className} dir="auto">
      {display}
    </span>
  );
}