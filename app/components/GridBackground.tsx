"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Static grid lines — never animate this layer directly */}
      <div className="absolute inset-0 bg-grid-lines opacity-30" />

      {/* Slow-moving glow — this is what makes the grid appear/disappear */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-[120px]"
        style={{ mixBlendMode: "screen" }}
        animate={{
          x: ["-10%", "60%", "10%", "-10%"],
          y: ["10%", "50%", "70%", "10%"],
          opacity: [0.35, 0.7, 0.35, 0.35],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fades the grid into solid black at top/bottom edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
}