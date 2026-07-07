"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Webhook } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiGit,
  SiClaude,
  SiGooglegemini,
  SiNeon,
} from "react-icons/si";
import type { IconType } from "react-icons";

const techCategories = [
  {
    title: "Full Stack",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "REST APIs", "Neon"],
  },
  {
    title: "Styling",
    items: ["Tailwind CSS", "CSS3"],
  },
  {
    title: "Tools & Others",
    items: ["Git", "VS Code", "Claude", "Gemini", "ChatGPT"],
  },
];

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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Tech {
  name: string;
  icon: IconType;
  color: string;
  isImage?: boolean;
}

const techStack: Tech[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "REST APIs", icon: Webhook, color: "#60A5FA" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  {
    name: "CSS3",
    icon: ({ className = "" }: { className?: string }) => (
      <img
        src="/css-icon.webp"
        alt="CSS3"
        className={`w-8 h-8 object-contain brightness-[0.7] grayscale contrast-[0.5] group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300 ${className}`}
      />
    ),
    color: "#1572B6",
    isImage: true,
  },
  { name: "Git", icon: SiGit, color: "#F05032" },
  {
    name: "VS Code",
    icon: ({ className = "" }: { className?: string }) => (
      <img
        src="/vscode.webp"
        alt="VS Code"
        className={`w-8 h-8 object-contain brightness-[0.7] grayscale contrast-[0.5] group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300 ${className}`}
      />
    ),
    color: "#007ACC",
    isImage: true,
  },
  {
    name: "Claude",
    icon: ({ className = "" }: { className?: string }) => (
      <img
        src="/claude.webp"
        alt="Claude"
        className={`w-8 h-8 object-contain brightness-[0.7] grayscale contrast-[0.5] group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300 ${className}`}
      />
    ),
    color: "#D97757",
    isImage: true,
  },
  {
    name: "Gemini",
    icon: ({ className = "" }: { className?: string }) => (
      <img
        src="/gemini.webp"
        alt="Gemini AI"
        className={`w-8 h-8 object-contain brightness-[0.7] grayscale contrast-[0.5] group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300 ${className}`}
      />
    ),
    color: "#8E75B2",
    isImage: true,
  },
  {
    name: "ChatGPT",
    icon: ({ className = "" }: { className?: string }) => (
      <img
        src="/chatgpt.webp"
        alt="ChatGPT"
        className={`w-8 h-8 object-contain brightness-[0.7] grayscale contrast-[0.5] group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300 ${className}`}
      />
    ),
    color: "#10A37F",
    isImage: true,
  },
  { name: "Neon", icon: SiNeon, color: "#00E599" },
];

const metrics = [
  { value: 14, label: "Technologies" },
  { value: 4, label: "Categories" },
  { value: 39, label: "Commits on GitHub" },
];

export default function TechStack() {
  // ---- Main grid "pairs" scroll spotlight (unchanged) ----
  const [isPairedLayout, setIsPairedLayout] = useState(false);
  const [activeRows, setActiveRows] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevSignsRef = useRef<number[]>([]);
  const flashTimersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useIsomorphicLayoutEffect(() => {
    const checkLayout = () => setIsPairedLayout(window.innerWidth < 640);
    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  useEffect(() => {
    if (!isPairedLayout) {
      setActiveRows(new Set());
      flashTimersRef.current.forEach((timer) => clearTimeout(timer));
      flashTimersRef.current.clear();
      prevSignsRef.current = [];
      return;
    }

    const rowCount = Math.ceil(techStack.length / 2);
    const triggerY = window.innerHeight * 0.75;

    const activateRow = (row: number) => {
      setActiveRows((prev) => {
        if (prev.has(row)) return prev;
        const next = new Set(prev);
        next.add(row);
        return next;
      });

      const existing = flashTimersRef.current.get(row);
      if (existing) clearTimeout(existing);

      const timer = setTimeout(() => {
        setActiveRows((prev) => {
          const next = new Set(prev);
          next.delete(row);
          return next;
        });
        flashTimersRef.current.delete(row);
      }, 500);

      flashTimersRef.current.set(row, timer);
    };

    const initSigns: number[] = [];
    for (let row = 0; row < rowCount; row++) {
      const el = cardRefs.current[row * 2];
      if (!el) {
        initSigns.push(0);
        continue;
      }
      const rect = el.getBoundingClientRect();
      const rowCenter = rect.top + rect.height / 2;
      initSigns.push(Math.sign(rowCenter - triggerY));
    }
    prevSignsRef.current = initSigns;

    let ticking = false;

    const checkCrossings = () => {
      for (let row = 0; row < rowCount; row++) {
        const el = cardRefs.current[row * 2];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const currentSign = Math.sign(rowCenter - triggerY);
        const prevSign = prevSignsRef.current[row];

        if (prevSign !== 0 && currentSign !== 0 && prevSign !== currentSign) {
          activateRow(row);
        }

        prevSignsRef.current[row] = currentSign;
      }
      ticking = false;
    };

    checkCrossings();

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkCrossings);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      flashTimersRef.current.forEach((timer) => clearTimeout(timer));
      flashTimersRef.current.clear();
    };
  }, [isPairedLayout]);

  // ---- NEW: Three Column Grouping scroll spotlight — per item, no border ----
  const [isMobileGrouping, setIsMobileGrouping] = useState(false);
  const [activeGroupItems, setActiveGroupItems] = useState<Set<string>>(new Set());
  const groupItemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const prevGroupSignsRef = useRef<Map<string, number>>(new Map());
  const flashGroupTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useIsomorphicLayoutEffect(() => {
    // This section goes 1-col -> 3-col at `md` (768px), not `sm` — matches its own layout, not the grid above.
    const checkLayout = () => setIsMobileGrouping(window.innerWidth < 768);
    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  useEffect(() => {
    if (!isMobileGrouping) {
      setActiveGroupItems(new Set());
      flashGroupTimersRef.current.forEach((timer) => clearTimeout(timer));
      flashGroupTimersRef.current.clear();
      prevGroupSignsRef.current.clear();
      return;
    }

    const allItemNames = techCategories.flatMap((g) => g.items);
    const triggerY = window.innerHeight * 0.75;

    const activateItem = (name: string) => {
      setActiveGroupItems((prev) => {
        if (prev.has(name)) return prev;
        const next = new Set(prev);
        next.add(name);
        return next;
      });

      const existing = flashGroupTimersRef.current.get(name);
      if (existing) clearTimeout(existing);

      const timer = setTimeout(() => {
        setActiveGroupItems((prev) => {
          const next = new Set(prev);
          next.delete(name);
          return next;
        });
        flashGroupTimersRef.current.delete(name);
      }, 500);

      flashGroupTimersRef.current.set(name, timer);
    };

    // Baseline, same reasoning as the main grid: avoid a false crossing on the first tick.
    allItemNames.forEach((name) => {
      const el = groupItemRefs.current.get(name);
      if (!el) {
        prevGroupSignsRef.current.set(name, 0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      prevGroupSignsRef.current.set(name, Math.sign(center - triggerY));
    });

    let ticking = false;

    const checkCrossings = () => {
      allItemNames.forEach((name) => {
        const el = groupItemRefs.current.get(name);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const currentSign = Math.sign(center - triggerY);
        const prevSign = prevGroupSignsRef.current.get(name) ?? 0;

        if (prevSign !== 0 && currentSign !== 0 && prevSign !== currentSign) {
          activateItem(name);
        }

        prevGroupSignsRef.current.set(name, currentSign);
      });
      ticking = false;
    };

    checkCrossings();

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkCrossings);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      flashGroupTimersRef.current.forEach((timer) => clearTimeout(timer));
      flashGroupTimersRef.current.clear();
    };
  }, [isMobileGrouping]);

  return (
    <>
      <section id="tech-stack" className="relative bg-black text-white py-24 px-4 md:px-12 overflow-hidden">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 font-mono">
              Tech Stack
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-4"
          >
            Tools &amp; <span className="text-blue-500">Technologies</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-zinc-400 text-base md:text-lg font-light max-w-xl"
          >
            The languages, frameworks, and tools I rely on to ship fast and reliably.
          </motion.p>
        </div>

        {/* Tech Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            const isActive = isPairedLayout && activeRows.has(Math.floor(i / 2));

            const borderClass = isActive ? "border-blue-500" : "border-zinc-800";
            const labelClass = isActive ? "text-white" : "text-zinc-300";
            const iconColorClass = isActive ? "text-[var(--brand-color)]" : "text-zinc-500";
            const imageActiveOverride = isActive ? "!grayscale-0 !brightness-100 !contrast-100" : "";

            return (
              <motion.div
                key={tech.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                style={{ "--brand-color": tech.color } as React.CSSProperties}
                className={`group flex flex-col items-center justify-center gap-3 border ${borderClass} hover:border-blue-500 bg-zinc-950/50 py-8 px-4 transition-colors duration-500`}
              >
                {tech.isImage ? (
                  <Icon className={imageActiveOverride} />
                ) : (
                  <Icon
                    className={`w-8 h-8 ${iconColorClass} group-hover:text-[var(--brand-color)] transition-colors duration-500`}
                  />
                )}
                <span
                  className={`text-sm font-medium ${labelClass} group-hover:text-white transition-colors duration-500`}
                >
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Three Column Grouping - Horizontal Flow */}
        <div className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {techCategories.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="border-2 border-zinc-800 p-6 bg-zinc-950/30"
            >
              <h3 className="w-fit text-blue-500 font-mono text-xs uppercase tracking-[0.2em] mb-6 border-b-2 border-zinc-700 pb-2">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {group.items.map((itemName) => {
                  const tech = techStack.find((t) => t.name === itemName);
                  if (!tech) return null;
                  const Icon = tech.icon;

                  const isActive = isMobileGrouping && activeGroupItems.has(tech.name);
                  const iconStateClass = tech.isImage
                    ? isActive
                      ? "!grayscale-0 !brightness-100 !contrast-100"
                      : ""
                    : isActive
                    ? "grayscale-0 text-[var(--brand-color)]"
                    : "grayscale";

                  return (
                    <div
                      key={tech.name}
                      ref={(el) => {
                        groupItemRefs.current.set(tech.name, el);
                      }}
                      style={{ "--brand-color": tech.color } as React.CSSProperties}
                      className="group flex items-center gap-2 text-zinc-300 cursor-default"
                    >
                      <Icon
                        className={`w-5 h-5 transition-all duration-300 ${iconStateClass} group-hover:grayscale-0 ${
                          tech.isImage
                            ? "group-hover:brightness-100 group-hover:contrast-100"
                            : "group-hover:text-[var(--brand-color)]"
                        }`}
                      />
                      <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>


{/* Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto mt-20 grid grid-cols-3 divide-x divide-zinc-600"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center px-2 sm:px-4">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              {metric.value}
              <span className="text-blue-500">+</span>
            </p>
            <div className="w-10 h-1 bg-blue-600 mx-auto my-3" />
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base">{metric.label}</p>
          </div>
        ))}
      </motion.div>
    </section>

<section className="relative bg-black text-white py-24 px-4 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Got an idea? Let's <span className="text-blue-600">Build Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-zinc-400 text-lg md:text-xl font-light"
          >

  I build from zero to launch. Whether it's frontend, backend or full-stack 
  <Highlight>
    <span className="text-blue-500">web applications</span>
  </Highlight>.
  I work across the entire development lifecycle. From UI/UX to deployment, 
  I’m less concerned with  
   <Highlight>
    <span className="text-blue-500">technical trends</span>
  </Highlight> 
  and more concerned with one thing: delivering work that people genuinely love to use.


          </motion.p>
        </div>
      </section>
    </>
  );
}
