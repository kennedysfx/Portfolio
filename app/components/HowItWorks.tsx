"use client";

import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "A relaxed conversation about your business, your customers, and what's not working right now, so the site we build actually solves the problem, not just looks nice. No pressure, no tech talk.",
  },
  {
    number: "02",
    title: "Proposal & Scope",
    description:
      "You get a clear scope, timeline, and price before any code is written, so there's no ambiguity and no surprise costs later.",
  },
  {
    number: "03",
    title: "Build & Check-ins",
    description:
      "Development happens in the open with regular progress updates and live preview links, never a black box until launch day.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "Your site goes live, plus a support window after launch for fixes and small tweaks, so you're covered once you're live.",
  },
];

// Defined locally, same pattern TechStack.tsx originally used, no separate
// file needed since only this component uses it right now.
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block">
    <span className="relative z-10">{children}</span>

    {/* The Curvy Underline */}
    <svg
      className="absolute -bottom-1 left-0 w-full overflow-visible"
      height="10"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <path
        d="M0 5 Q 50 10 100 5"
        stroke="white"
        strokeWidth="2"
        fill="transparent"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-black text-white py-24 px-4 md:px-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-0.5 bg-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 font-mono">
            The 4-Step Process
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold tracking-tighter mb-4"
        >
          How It <span className="text-blue-500">Works</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-400 text-base md:text-lg font-light max-w-xl"
        >
          A simple process that turns your idea into a site your customers can find, trust, and buy from, with full clarity on cost and timeline.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto relative">
        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-zinc-800" />
        <motion.div
  initial={{ scaleX: 0 }}
  whileInView={{ scaleX: 1 }}
  exit={{ scaleX: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  style={{ transformOrigin: "left" }}
  className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600"
/>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-blue-500 bg-zinc-950 flex items-center justify-center mb-6 relative z-10 shrink-0">
                <span className="text-blue-500 font-mono font-bold text-lg md:text-xl">
                  {step.number}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div className="md:hidden w-px h-10 bg-zinc-800 -mt-16 mb-10 translate-y-24" />
              )}

              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

{/* CTA, moved here from TechStack */}
<div className="max-w-4xl mx-auto text-center mt-24 md:mt-32">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
  >
    Got an idea? Let&apos;s <span className="text-blue-600">Build Together</span>
  </motion.h2>
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    className="text-zinc-400 text-lg md:text-xl font-light"
  >
          I build from zero to launch. Whether it&apos;s frontend, backend or
          full-stack{" "}
          <Highlight>
            <span className="text-blue-500">web applications</span>
          </Highlight>
          . I work across the entire development lifecycle. From UI/UX to
          deployment, I&apos;m less concerned with{" "}
          <Highlight>
            <span className="text-blue-500">technical trends</span>
          </Highlight>{" "}
          and more concerned with one thing: delivering work that people
          genuinely love to use.
        </motion.p>
      </div>
    </section>
  );
}