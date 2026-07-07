"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as Si from "react-icons/si";
import type { IconType } from "react-icons";

interface Project {
  index: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  link: string;
}

// 1. Safe icon resolver map
const getTechIcon = (tech: string): IconType | null => {
  const mapping: Record<string, string> = {
    "HTML5": "SiHtml5",
    "CSS3": "SiCss3",
    "JavaScript": "SiJavascript",
    "Next.js": "SiNextdotjs",
    "Tailwind CSS": "SiTailwindcss",
    "Vercel": "SiVercel",
    "TypeScript": "SiTypescript",
    "OpenAI API": "SiOpenai",
  };

  const iconName = mapping[tech];
  if (!iconName) return null;

  return (Si as any)[iconName] || (Si as any)[iconName.toLowerCase()] || null;
};

// 2. Defined Brand Colors map so it's fully accessible globally in the file
const brandColors: Record<string, string> = {
  HTML5: "text-[#E34F26]",        // HTML5 Orange
  CSS3: "text-[#1572B6]",         // CSS3 Blue
  JavaScript: "text-[#F7DF1E]",   // JavaScript Yellow
  "Next.js": "text-white",        // Next.js White
  "Tailwind CSS": "text-[#06B6D4]",// Tailwind Cyan
  Vercel: "text-white",           // Vercel White
  TypeScript: "text-[#3178C6]",   // TypeScript Blue
  "OpenAI API": "text-[#10A37F]",  // OpenAI Green
};

const projects: Project[] = [
  {
    index: "01",
    title: "Pandora Homes",
    description:
      "A real estate discovery platform connecting buyers with verified property listings across Lagos, Abuja, Enugu, and Port Harcourt — with dynamic filtering by location, property type, and price range.",
    image: "/projects/pandora-homes.png",
    stack: ["HTML5", "CSS3", "JavaScript"],
    link: "https://pandorahomes.vercel.app/",
  },
  {
    index: "02",
    title: "AllStars Against Cancer",
    description:
      "A nonprofit fundraising platform built to turn visitor trust into donations. Featuring transparent impact reporting, patient stories, and a streamlined giving flow for cancer research funding.",
    image: "/projects/allstars-against-cancer.png",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "neon"],
    link: "https://allstars-against-cancer.vercel.app/",
  },
  {
    index: "03",
    title: "Developer Portfolio",
    description: "A high-performance, responsive developer portfolio built with Next.js and Tailwind CSS. Features custom Framer Motion interactions and a clean, mobile-optimized layout.",
    image: "/projects/portfolio.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "#", 
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative bg-black text-white py-24 px-4 md:px-12 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16">
        
        {/* 1. "Selected Work" Subtitle */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-0.5 bg-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 font-mono">
            Selected Work
          </span>
        </motion.div>

        {/* 2. "Featured Projects" Main Title */}
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold tracking-tighter mb-4"
        >
          Featured <span className="text-blue-500">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-400 text-base md:text-lg font-light max-w-xl"
        >
          A selection of platforms I&apos;ve designed, built, and shipped end to end.
        </motion.p>
      </div>

      {/* Project Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            className="group block overflow-hidden border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-colors duration-300"
          >
            {/* Screenshot */}
            <div className="relative w-full h-56 overflow-hidden bg-zinc-900">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* External link indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Card Text */}
            <div className="p-6">
              <span className="text-blue-500 font-mono text-sm">{project.index}</span>
              <h3 className="text-xl md:text-2xl font-bold mt-2 mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack Rendering with Brand Colors */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => {
                  const Icon = getTechIcon(tech);
                  const iconColorClass = brandColors[tech] || "text-zinc-300";

                  return (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-1 border border-zinc-700 text-zinc-300 font-mono"
                    >
                      {Icon && <Icon className={`w-3 h-3 shrink-0 ${iconColorClass}`} />}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}