"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import GridBackground from "./GridBackground";
import ScrambleText from "./ScrambleText";

const bootLines = [
  "Almost ready",
  "Fetching projects",
  "Compiling components",
  "Optimizing assets",
  "Warming up the grid",
  
];

const BAR_DURATION = 3; // seconds
const HOLD_AFTER_FULL = 500; // ms
const CONTENT_EXIT_DURATION = 500; // ms
const CURTAIN_EXIT_DURATION = 100; // ms

const overlayVariants: Variants = {
  visible: { y: 0 },
  exit: {
    y: "-100%",
    transition: { duration: CURTAIN_EXIT_DURATION / 1000, ease: [0.76, 0, 0.24, 1] },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.96,
    transition: { duration: CONTENT_EXIT_DURATION / 1000, ease: "easeIn" },
  },
};

export default function Loader({ onFinish }: { onFinish?: () => void }) {
  const [phase, setPhase] = useState<"loading" | "content-exit" | "curtain-exit" | "done">(
    "loading"
  );

  // A MotionValue updates the DOM directly (bar width + percentage text)
  // without triggering a React re-render on every frame. This is the fix
  // for the mobile slowdown — previously this was React state updated
  // inside requestAnimationFrame, which re-rendered the whole component
  // ~60x/sec and couldn't keep up on weaker mobile CPUs.
  const progress = useMotionValue(0);
  const barWidth = useTransform(progress, (v) => `${v}%`);
  const progressText = useTransform(progress, (v) => `${Math.floor(v)}%`);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    document.body.style.overflow = "hidden";

    const goToContentExit = () => {
      setTimeout(() => setPhase("content-exit"), HOLD_AFTER_FULL);
    };

    if (prefersReducedMotion) {
      progress.set(100);
      goToContentExit();
      return () => {
        document.body.style.overflow = "";
      };
    }

    const controls = animate(progress, 100, {
      duration: BAR_DURATION,
      ease: [0.33, 1, 0.68, 1],
      onComplete: goToContentExit,
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 useEffect(() => {
    if (phase === "content-exit") {
      const t = setTimeout(() => {
        setPhase("curtain-exit");
        // Trigger the main site to load behind the curtain
        onFinish?.();
      }, CONTENT_EXIT_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase, onFinish]);

  useEffect(() => {
    if (phase === "curtain-exit") {
      const t = setTimeout(() => {
        document.body.style.overflow = "";
        setPhase("done");
      }, CURTAIN_EXIT_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "done") return null;

  const showContent = phase === "loading";

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="visible"
        animate={phase === "curtain-exit" ? "exit" : "visible"}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <GridBackground />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, black 75%)",
          }}
        />

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={showContent ? "visible" : "exit"}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <div className="flex items-center gap-2 mb-8 px-4 py-1.5 border border-zinc-800 bg-zinc-950 rounded-full text-xs md:text-sm text-zinc-400 tracking-[0.15em]">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
            <span className="font-mono normal-case text-zinc-300">
              <span className="text-zinc-300">system.boot(&quot;</span>
              <ScrambleText texts={bootLines} className="text-blue-400" />
              <span className="text-zinc-300">&quot;)</span>
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 flex items-start"
          >
            Kennedy
            <span className="text-blue-500 text-3xl md:text-5xl leading-none ml-1">•</span>
          </motion.h1>

          <div className="w-64 md:w-80 flex items-center gap-4">
            <div className="relative flex-1 h-px bg-zinc-800 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500"
                style={{ width: barWidth }}
              />
            </div>
            <motion.span className="font-mono text-xs text-zinc-500 tabular-nums w-9 text-right">
              {progressText}
            </motion.span>
          </div>

          <div className="flex items-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-blue-500"
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center gap-1 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-zinc-600">
            <span>Loading portfolio</span>
            <motion.span
              animate={{ opacity: [1, 1, 0, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.49, 0.5, 0.99, 1] }}
              className="text-blue-500"
            >
              _
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}