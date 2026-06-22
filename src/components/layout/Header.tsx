"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/animations/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { scrollTo } from "@/lib/scroll";
import { SITE } from "@/config/site";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Stats", href: "#stats" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// Film-frame play icon — premium video editor mark
function LogoMark() {
  return (
    <svg
      width="36" height="36" viewBox="0 0 36 36" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <linearGradient id="logo-glow" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Outer rounded-rect frame */}
      <rect x="1" y="1" width="34" height="34" rx="9" fill="url(#logo-glow)" stroke="url(#logo-grad)" strokeWidth="1.5" />

      {/* Film sprocket holes — left */}
      <rect x="4" y="7" width="3.5" height="4.5" rx="1" fill="url(#logo-grad)" />
      <rect x="4" y="15.5" width="3.5" height="4.5" rx="1" fill="url(#logo-grad)" />
      <rect x="4" y="24" width="3.5" height="4.5" rx="1" fill="url(#logo-grad)" />

      {/* Film sprocket holes — right */}
      <rect x="28.5" y="7" width="3.5" height="4.5" rx="1" fill="url(#logo-grad)" />
      <rect x="28.5" y="15.5" width="3.5" height="4.5" rx="1" fill="url(#logo-grad)" />
      <rect x="28.5" y="24" width="3.5" height="4.5" rx="1" fill="url(#logo-grad)" />

      {/* Play triangle — center */}
      <path d="M14.5 12.5 L14.5 23.5 L24 18 Z" fill="url(#logo-grad)" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = useCallback((href: string) => {
    setMenuOpen(false);
    scrollTo(href);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 bg-background/88 backdrop-blur-2xl border-b border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "py-5"
        )}
      >
        <div className="wrap flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              {/* Hover glow behind the icon */}
              <div
                className="absolute inset-0 rounded-[9px] opacity-0 group-hover:opacity-100 blur-[10px] transition-all duration-500"
                style={{ background: "linear-gradient(135deg, #DC2626, #8B5CF6)", transform: "scale(1.2)" }}
                aria-hidden
              />
              <img src="/logo.png" alt="Prateek" className="w-8 h-8" />
            </div>
            <span className="font-display font-bold text-[17px] tracking-tight text-foreground leading-none">
              Prateek<span className="text-gradient">.</span>
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className="text-[13px] font-medium text-foreground-muted hover:text-foreground transition-colors duration-200 relative group"
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300"
                  aria-hidden
                />
              </button>
            ))}
          </nav>

          {/* ── Right cluster: theme icon + single CTA ── */}
          <div className="flex items-center gap-1">
            <ThemeToggle />

            {/* CTA — desktop only */}
            <div className="hidden md:block ml-1">
              <MagneticButton strength={0.28}>
                <a
                  href={SITE.contactLink} target="_blank" rel="noopener noreferrer"
                  data-cursor-label="MAIL"
                  className="btn-shimmer block px-5 py-2.5 rounded-full text-[13px] font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                    boxShadow: "0 0 0 1px rgba(220,38,38,0.35), 0 2px 14px rgba(220,38,38,0.22)",
                  }}
                >
                  Book a Call ↗
                </a>
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/8 transition-all duration-200"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-background/95 backdrop-blur-2xl border-b border-white/5 md:hidden"
          >
            <nav className="wrap py-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNav(href)}
                  className="text-left text-base font-medium text-foreground-muted hover:text-foreground hover:bg-white/5 transition-all px-3 py-2.5 rounded-lg"
                >
                  {label}
                </button>
              ))}
              <a
                href={SITE.contactLink} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white text-sm"
                style={{ background: "linear-gradient(135deg, #DC2626, #B91C1C)" }}
                onClick={() => setMenuOpen(false)}
              >
                Book a Call ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
