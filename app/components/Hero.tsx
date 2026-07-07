"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import GridBackground from "./GridBackground";
import ScrambleText from "./ScrambleText";

// Avoids a Next.js SSR warning while still getting the "no flash" benefit
// of useLayoutEffect on the client.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const roles = ["Fullstack Developer", "AI-Native Builder"];

const greetings = [
  "Hello World",
  "Hola Mundo",        // Spanish
  "Bonjour le Monde",  // French
  "你好，世界",         // Mandarin Chinese
  "नमस्ते दुनिया",      // Hindi
  "مرحبا بالعالم",      // Arabic
  "Hallo Welt",      // German
  "Ndewo Ụwa",      // Igbo
  "こんにちは世界",   // Japanese
];

function FrameLine({ position, delay, visibility = "" }: { position: string, delay: number, visibility?: string }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: [0, 1, 1, 0] }}
      transition={{
        scaleY: { duration: 0.8, delay, ease: "easeOut" },
        opacity: {
          duration: 6.5,
          delay,
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`absolute inset-y-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent ${position} ${visibility}`}
    />
  );
}

function FrameLineHorizontal({ position, delay }: { position: string, delay: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
      transition={{
        scaleX: { duration: 0.8, delay, ease: "easeOut" },
        opacity: {
          duration: 6.5,
          delay,
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`absolute h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent ${position}`}
    />
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Runs before the browser paints, so isMobile is correct from the
  // very first frame the user sees — no post-mount flip, no animation restart.
  useIsomorphicLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const leftButtonVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: isMobile ? 1 : 0
      }
    }
  };

  const rightButtonVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: isMobile ? 1 : 0
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-black text-white overflow-hidden">
      <GridBackground />

      {/* Vertical Lines */}
      <FrameLine position="left-8 sm:left-12 md:left-16" delay={0.0} />
      <FrameLine position="right-8 sm:right-12 md:right-16" delay={0.0} />
      <FrameLine position="left-1/4" delay={2.5} />
      <FrameLine position="right-1/4" delay={2.5} />
      <FrameLine position="left-[42.5%]" delay={5.0} visibility="hidden md:block" />
      <FrameLine position="right-[42.5%]" delay={5.0} visibility="hidden md:block" />

      {/* Horizontal Lines */}
      <FrameLineHorizontal
        position="top-[25%] md:top-[15%] left-[10%] md:left-[25%] right-[10%] md:right-[25%]"
        delay={5.0}
      />
      <FrameLineHorizontal
        position="bottom-[15%] min-[481px]:max-[1023px]:bottom-[15%] md:bottom-[11%] left-[10%] md:left-[25%] right-[10%] md:right-[25%]"
        delay={5.0}
      />

      <div className="relative z-10 text-center px-4 pt-0 max-[600px]:pt-0 pt-32">
        {/* System Status + Cycling Console Greeting */}
        <div className="flex items-center justify-center gap-2 mb-6 px-4 py-1.5 border border-zinc-800 bg-zinc-950 rounded-full text-xs md:text-sm text-zinc-400 tracking-[0.15em]">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />

          <span className="font-mono normal-case text-zinc-300">
            <span className="text-zinc-300">console.log("</span>
            <ScrambleText texts={greetings} className="text-blue-400" />
            <span className="text-zinc-300">")</span>
          </span>
        </div>

        {/* Dynamic Heading */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
          I'm Kennedy, <br />
          <span className="text-blue-500 block h-[1.2em] text-5xl max-[480px]:text-4xl md:text-8xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="inline-block"
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto font-light">
          Always building performant web applications across digital fundraising and real estate.
          Currently building intelligent, high-converting platforms that drive maximum revenue generation.
        </p>

        {/* Micro-Metrics Strip */}
        <div className="flex flex-row items-center justify-center gap-3 md:gap-4 mt-8 text-base md:text-sm tracking-wide font-light text-zinc-500">
          <div>
            <span className="text-zinc-100 font-medium">Building</span> scalable apps
          </div>

          <span className="text-zinc-200">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-100 text-base font-medium leading-none">∞</span> Always Learning
          </div>
        </div>

        {/* Buttons Section with Animated Handlers */}
        <div className="flex flex-row gap-4 justify-center items-center mt-12 overflow-hidden px-4">
        <motion.button
           variants={leftButtonVariants}
           initial="hidden"
           animate={isMobile ? "visible" : undefined}
           whileInView={!isMobile ? "visible" : undefined}
           viewport={{ once: true, amount: 0.2 }}
           className="px-8 py-3 max-[480px]:px-5 max-[480px]:py-2.5 max-[480px]:text-xs bg-blue-500 text-black font-semibold rounded-none hover:bg-blue-600 transition-colors"
  
 
         onClick={() => {
           document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
         }}
       >
         My Projects →
       </motion.button>

          <motion.button
            variants={rightButtonVariants}
            initial="hidden"
            animate={isMobile ? "visible" : undefined}
            whileInView={!isMobile ? "visible" : undefined}
            viewport={{ once: true, amount: 0.2 }}
            className="px-8 py-3 max-[480px]:px-5 max-[480px]:py-2.5 max-[480px]:text-xs border border-zinc-700 text-white font-semibold rounded-none hover:bg-zinc-800 transition-colors"
            onClick={() => {
           document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
         }}
       >
         Contact Me →
       </motion.button>
        </div>
      </div>
    </section>
  );
}