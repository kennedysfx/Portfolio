"use client";

import { motion } from "framer-motion";
import { Mail} from "lucide-react";
import { FaXTwitter, FaTiktok, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

// Custom Highlight component adapted as a clickable link
const HighlightLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="relative inline-block group cursor-pointer text-blue-500"
  >
    <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-400">
      {children}
    </span>
    {/* Curvy Underline SVG */}
    <svg 
      className="absolute -bottom-2 left-0 w-full overflow-visible transition-transform duration-300 group-hover:-translate-y-1" 
      height="10" 
      viewBox="0 0 100 10" 
      preserveAspectRatio="none"
    >
      <path 
        d="M0 5 Q 50 12 100 5" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="transparent" 
        strokeLinecap="round" 
      />
    </svg>
  </a>
);

export default function Contact() {
  // Global float navigation socials
  const socials = [
    { name: "GITHUB", url: "https://github.com/kennedysfx" },
    { name: "X", url: "https://x.com/kennedys_fx" },
    { name: "LINKEDIN", url: "https://linkedin.com" },
    { name: "TIKTOK", url: "https://www.tiktok.com/@web_dever?_r=1&_t=ZS-97oPgs1ed1N" },
  ];

  // Stacked descriptive list social data matching the layout reference
  const contactMethods = [
    {
      name: "Send a Mail",
      label: "Quick inquiries & questions",
      icon: Mail,
      color: "bg-red-500/10 text-red-400 border-red-500/20",
      url: "mailto:kennedysezebilo@gmail.com",
    },
    {
      name: "WhatsApp",
      label: "Instant messaging & chat",
      icon: FaWhatsapp,
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      url: "https://wa.me/09061645790?text=Hi%20Kennedy,%20I%20need%20a%20website!", 
    },
    {
      name: "kennedys",
      label: "Professional connect",
      icon: FaLinkedin,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      url: "https://linkedin.com",
    },
    {
      name: "@kennedysfx",
      label: "Check my code",
      icon: FaGithub,
      color: "bg-zinc-800/50 text-zinc-300 border-zinc-700/30",
      url: "https://github.com/kennedysfx",
    },
    {
      name: "@kennedys_fx",
      label: "Follow for updates",
      icon: FaXTwitter,
      color: "bg-zinc-900 text-white border-zinc-800",
      url: "https://x.com/kennedys_fx",
    },
    {
      name: "@web_dever",
      label: "Personal & creative",
      icon: FaTiktok,
      color: "bg-zinc-900 text-zinc-300 border-zinc-850",
      url: "https://www.tiktok.com/@web_dever?_r=1&_t=ZS-97oPgs1ed1N",
    },
  ];

  return (
    <section id="contact" className="relative bg-black text-white py-24 px-4 md:px-12 md:py-36 overflow-hidden min-h-[70vh] flex flex-col justify-center border-b border-zinc-900">
      <div className="max-w-6xl mx-auto w-full relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3, margin: "-120px 0px 0px 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8 md:mb-12"
        >
          <span className="w-12 h-px bg-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 font-mono">
            Get In Touch
          </span>
        </motion.div>

        {/* Main Copy */}
        <div className="max-w-4xl pr-8 md:pr-24 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium tracking-tight leading-[1.1]"
          >
            My inbox is always open. Whether it's a quick question or a project enquiry,{" "}
            <HighlightLink href="mailto:kennedysezebilo@gmail.com">
               let's connect.
            </HighlightLink>
          </motion.h2>
        </div>

        {/* Container Row to organize content on desktop side-by-side */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 w-full">

          {/* Detailed Stacked Contacts Section */}
          <div className="max-w-xl w-full">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-zinc-300 mb-6"
            >
              Socials & Contact
            </motion.h3>

            <div className="flex flex-col gap-3">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.name}
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-600 rounded-xl hover:border-zinc-800 hover:bg-zinc-950/80 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rounded Custom Box Wrapper */}
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl border ${method.color} transition-transform duration-300 group-hover:scale-150`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {/* Descriptive Identifiers */}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors duration-200">
                          {method.name}
                        </span>
                        <span className="text-xs text-zinc-500 mt-0.5">
                          {method.label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Subtle navigation handle arrow */}
                    <div className="text-zinc-400 group-hover:text-zinc-100 group-hover:translate-x-0.5 transition-all duration-200 text-sm font-mono opacity-60">
                      ➔
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right Block: Conversion Call-to-Action Buttons */}
          <div className="w-full lg:max-w-sm flex flex-col gap-5 pt-4 lg:pt-8 pr-4 md:pr-16 lg:pr-14">
            
            {/* Button 1 Segment with Top text label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full flex flex-col"
            >
              <span className="text-lg font-mono tracking-[0.2em] uppercase text-zinc-300 block mb-3">
                need a website?
              </span>
              <a 
                href="https://wa.me/09061645790?text=Hi%20Kennedy!%20I%20came%20across%20your%20portfolio%20and%20I'd%20love%20to%20chat%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-500 hover:bg-blue-600 text-black font-mono font-bold tracking-[0.25em] text-xs uppercase py-4 rounded-none flex items-center justify-center gap-2 transition-colors duration-300">
                YES
              </a>
            </motion.div>

            {/* Button 2 Segment (Outlined Email CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full pt-2"
            >
              <a 
                href="mailto:kennedysezebilo@gmail.com"
                className="w-full border-2 border-blue-400/50 hover:border-blue-600 text-white font-mono font-bold tracking-[0.25em] text-xs uppercase py-4 rounded-none flex items-center justify-center gap-2 transition-all duration-300 bg-transparent group"
              >
                SAY HELLO <span className="group-hover:translate-x-1 transition-transform duration-200">➔</span>
              </a>
            </motion.div>

          </div>

        </div>

        {/* Desktop Fixed Vertical Social Links */}
        <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-12">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-xs font-mono tracking-[0.2em] text-zinc-500 hover:text-blue-500 transition-colors duration-300"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {social.name}
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}