"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

// Same "no flash of wrong layout" trick used in Hero.tsx
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Frame 1 — settles at (12, 12), pushes out to (20, 20) on hover/loop
const frame1Variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  visible: {
    opacity: 1,
    x: 12,
    y: 12,
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
  },
  hover: {
    opacity: 1,
    x: 20,
    y: 20,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  loop: {
    opacity: 1,
    x: [12, 20, 12],
    y: [12, 20, 12],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

// Frame 2 — settles at (-8, -8), pushes out to (-16, -16) on hover/loop
// Slightly different loop duration so the two frames drift out of sync over time
const frame2Variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  visible: {
    opacity: 1,
    x: -8,
    y: -8,
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
  },
  hover: {
    opacity: 1,
    x: -16,
    y: -16,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  loop: {
    opacity: 1,
    x: [-8, -16, -8],
    y: [-8, -16, -8],
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function About() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [inView, setInView] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // matches your existing lg: breakpoint usage
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    // Cleaned up mobile padding: changed py-20 to pt-4 max-sm:pt-2 pb-20 to eliminate the dead space at 480px width
    <section id="about" className="relative min-h-screen flex flex-col justify-center bg-black text-white px-6 sm:px-12 md:px-16 pt-2 max-sm:pt-4 sm:py-20 overflow-hidden">
      
      {/* MOBILE-ONLY TITLE */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        
        viewport={{ once: false, amount: 0.5, margin: "-120px 0px 0px 0px" }}
        
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto w-full mb-8 lg:hidden"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-0.5 bg-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 font-mono">
            About Me
          </span>
        </div>
      </motion.div>

      {/* Main Structural Container */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: Visual Portrait Structure */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[360px] aspect-[3/4]"
          >
            {/* Architectural Frame 1: Blue — hover-driven on desktop, auto-looping on mobile/tablet */}
            <motion.div
              variants={frame1Variants}
              initial="hidden"
              animate={inView ? (isDesktop ? "visible" : ["visible", "loop"]) : "hidden"}
              whileHover={isDesktop ? "hover" : undefined}
              className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded-none"
            />

            {/* Architectural Frame 2: Pink — hover-driven on desktop, auto-looping on mobile/tablet */}
            <motion.div
              variants={frame2Variants}
              initial="hidden"
              animate={inView ? (isDesktop ? "visible" : ["visible", "loop"]) : "hidden"}
              whileHover={isDesktop ? "hover" : undefined}
              className="absolute inset-0 border-2 border-blue-500/80 pointer-events-none rounded-none"
            />

            {/* Main Portrait Mask Wrapper */}
            <div className="relative w-full h-full rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <Image
                src="/kennedyss.jpg" 
                alt="Kennedy"
                fill
                priority
                className="object-cover object-center transition-all duration-500"
                sizes="(max-width: 360px) 100vw, 360px"
              />
            </div>

            {/* Corner Badge Element with Continuous Float Animation */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-4 -right-4 bg-zinc-950 border border-zinc-800 p-4 rounded-none shadow-xl min-w-[110px] text-center backdrop-blur-md z-10"
            >
              <span className="block text-xl font-bold text-blue-500 font-mono tracking-tighter">3+</span>
              <span className="block text-[10px] text-zinc-400 font-medium tracking-widest uppercase mt-0.5">Live builds</span>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Narrative & Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* DESKTOP-ONLY TITLE */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            
            viewport={{ once: false, amount: 0.8, margin: "-120px 0px 0px 0px" }}
            
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-0.5 bg-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 font-mono">
              About Me
            </span>
          </motion.div>

          {/* Main Statement Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]"
          >
            I write code that makes web apps effortless to use and highly profitable.
          </motion.h2>

          {/* Core Descriptive Text Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 text-zinc-400 font-light text-base md:text-lg leading-relaxed"
          >
            <p>
              I look at software through a business lens. Instead of just slapping pages together, 
              I hunt down the annoying technical bugs that cause users to drop off—like a checkout 
              form that completely wipes out a user's data if they accidentally click away.
            </p>
            <p>
              By blending modern React engineering with smart, AI-driven workflows, I build products 
              fast without cutting corners, so your users stay happy and your platform keeps making money.
            </p>
          </motion.div>

          {/* Action Footer Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a 
              href="https://rxresu.me/kennedysfx/web-dever"
              download 
              className="px-6 py-3 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-medium text-sm rounded-none transition-all duration-200 inline-flex items-center gap-2"
            >
              Download CV ↓
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}