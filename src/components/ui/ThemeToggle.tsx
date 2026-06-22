"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try { localStorage.setItem("theme", next ? "light" : "dark"); } catch {}
  };

  // Render a same-size invisible shell during SSR / before hydration
  // so the header layout doesn't shift when JS loads.
  return (
    <button
      onClick={mounted ? toggle : undefined}
      className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/8 transition-all duration-200"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      suppressHydrationWarning
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isLight ? "sun" : "moon"}
            className="block"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{    opacity: 0, rotate: 90,   scale: 0.5 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {isLight ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        ) : (
          // Static placeholder — same size, invisible, prevents layout shift
          <span className="block w-[15px] h-[15px] opacity-0" aria-hidden />
        )}
      </AnimatePresence>
    </button>
  );
}
