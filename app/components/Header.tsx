"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Tech Stack", id: "tech-stack" },
  { label: "Contact", id: "contact" },
];

const whatsappNumber = "23409061645790";
const whatsappMessage = "Hi Kennedy! I came across your portfolio and I'd love to chat about a project.";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-zinc-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        {/* Name / Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 font-bold text-white text-lg"
        >
          Kennedy Ezebilo
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </button>

        {/* Desktop: nav + button, grouped on the right */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-mono text-xs uppercase tracking-[0.2em] pb-1 border-b-2 transition-colors duration-300 ${
                    isActive
                      ? "text-blue-500 border-blue-500"
                      : "text-zinc-400 border-transparent hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* 🌟 FIXED: Restored the opening <a tag here */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-blue-500 text-black font-bold text-sm uppercase tracking-wide hover:bg-blue-400 transition-colors"
          >
            Say Hello
          </a>
        </div>

        {/* Mobile: hamburger trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-white"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile: 50% height dropdown panel */}
<AnimatePresence>
  {mobileOpen && (
    <>
      {/* 1. Backdrop overlay covering the rest of the screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-50 bg-black md:hidden"
      />

      {/* 2. Top-down panel occupying exactly 50% height */}
      <motion.div
        initial={{ y: "-100%" }} // 🌟 Slides down from the top
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 h-auto z-50 bg-zinc-950 border-b border-zinc-800 md:hidden flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-zinc-800 shrink-0">
          <span className="flex items-center gap-2 font-bold text-white text-base">
            Kennedy Ezebilo
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable links container if they overflow the 50% height */}
        <nav className="flex flex-col overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left px-4 py-4 border-b border-zinc-900 font-mono text-base uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto shrink-0">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block text-center py-3 bg-blue-500 text-black font-mono font-bold text-base uppercase tracking-wider hover:bg-blue-400 transition-colors"
          >
            Say Hello
          </a>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </header>
  );
}