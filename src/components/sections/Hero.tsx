"use client";

import { useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import { ArrowDownRight, Play } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";
import MorphText from "@/components/animations/MorphText";
import { scrollTo } from "@/lib/scroll";

const subtitle =
  "Premium video editor creating cinematic reels, brand films, and YouTube content that stops the scroll and drives real results.";


const tools = ["Premiere Pro", "DaVinci", "After Effects", "Audition"];

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const orbTopRef    = useRef<HTMLDivElement>(null);
  const orbRightRef  = useRef<HTMLDivElement>(null);
  const orbLeftRef   = useRef<HTMLDivElement>(null);
  const orbPurpleRef = useRef<HTMLDivElement>(null);
  const orbCyanRef   = useRef<HTMLDivElement>(null);

  // ── Entrance + scroll parallax ───────────────────────────────────────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.8 });

        tl.from(".hero-tag",       { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" })
          .from(".hero-line .hero-word", {
            yPercent: 110, opacity: 0, duration: 1,
            stagger: 0.07, ease: "power4.out",
          }, "-=0.2")
          .from(".hero-morph",    { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .from(".hero-sub .sub-word", {
            yPercent: 100, opacity: 0, duration: 0.7,
            stagger: 0.025, ease: "power3.out",
          }, "-=0.55")
          .from(".hero-tool", { scale: 0.8, opacity: 0, duration: 0.35, stagger: 0.05, ease: "back.out(1.5)" }, "-=0.3")
          .from(".hero-btn",  { y: 24, opacity: 0, duration: 0.5, stagger: 0.1,  ease: "power3.out" }, "-=0.25");

        const scrubBase = { trigger: sectionRef.current, start: "top top", end: "bottom top" };
        gsap.to(orbTopRef.current,    { yPercent: -30, ease: "none", scrollTrigger: { ...scrubBase, scrub: 1.5 } });
        gsap.to(orbRightRef.current,  { yPercent: 40, xPercent:  10, ease: "none", scrollTrigger: { ...scrubBase, scrub: 2   } });
        gsap.to(orbLeftRef.current,   { yPercent: 60, ease: "none", scrollTrigger: { ...scrubBase, scrub: 2.5 } });
        gsap.to(orbPurpleRef.current, { yPercent: 35, xPercent: -10, ease: "none", scrollTrigger: { ...scrubBase, scrub: 1.8 } });
        gsap.to(orbCyanRef.current,   { yPercent: 50, ease: "none", scrollTrigger: { ...scrubBase, scrub: 2.2 } });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-tag", ".hero-line .hero-word", ".hero-morph", ".hero-sub .sub-word", ".hero-tool", ".hero-btn"], {
          yPercent: 0, opacity: 1, scale: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // ── Mouse parallax on orbs ───────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { width, height, left, top } = el.getBoundingClientRect();
        const x = ((e.clientX - left) / width  - 0.5) * 2;
        const y = ((e.clientY - top)  / height - 0.5) * 2;

        gsap.to(orbTopRef.current,    { x: x * -28, y: y * -18, duration: 1.5, ease: "power2.out", overwrite: "auto" });
        gsap.to(orbRightRef.current,  { x: x *  18, y: y *  14, duration: 2,   ease: "power2.out", overwrite: "auto" });
        gsap.to(orbLeftRef.current,   { x: x * -14, y: y *  24, duration: 2.5, ease: "power2.out", overwrite: "auto" });
        gsap.to(orbPurpleRef.current, { x: x *  22, y: y * -16, duration: 1.8, ease: "power2.out", overwrite: "auto" });
        gsap.to(orbCyanRef.current,   { x: x * -10, y: y *  20, duration: 2.2, ease: "power2.out", overwrite: "auto" });
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => { el.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  // ── Cursor spotlight ─────────────────────────────────────────────────────
  const onSpotlightMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = spotlightRef.current;
    if (!el) return;
    const { left, top } = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(220,38,38,0.055) 0%, rgba(139,92,246,0.03) 35%, transparent 70%)`;
  }, []);

  const onSpotlightLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.background = "transparent";
  }, []);

  const subWords = subtitle.split(" ");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      onMouseMove={onSpotlightMove}
      onMouseLeave={onSpotlightLeave}
    >
      {/* ── Cursor spotlight layer ── */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-[1] transition-[background] duration-200"
        aria-hidden
      />

      {/* ── Multi-color background orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Orange – top centre */}
        <div ref={orbTopRef}    className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[130px]"
             style={{ background: "rgba(220,38,38,0.12)" }} />
        {/* Gold – right */}
        <div ref={orbRightRef}  className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl"
             style={{ background: "rgba(255,184,0,0.07)" }} />
        {/* Orange – bottom left */}
        <div ref={orbLeftRef}   className="absolute bottom-1/4 -left-20 w-56 h-56 rounded-full blur-3xl"
             style={{ background: "rgba(220,38,38,0.07)" }} />
        {/* Purple – right side */}
        <div ref={orbPurpleRef} className="absolute top-[25%] right-[12%] w-[380px] h-[380px] rounded-full blur-[100px]"
             style={{ background: "rgba(139,92,246,0.12)" }} />
        {/* Cyan – lower right */}
        <div ref={orbCyanRef}   className="absolute bottom-[28%] right-[32%] w-[260px] h-[260px] rounded-full blur-[80px]"
             style={{ background: "rgba(6,182,212,0.08)" }} />
      </div>

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden />


      <div className="wrap relative z-10 pt-36 pb-20">
        {/* Available tag */}
        <div className="hero-tag inline-flex items-center gap-2 px-4 py-2 rounded-full glass card-border mb-10 text-sm">
          <span
            className="w-2 h-2 rounded-full bg-green-400"
            style={{ animation: "pulseDot 2s ease-in-out infinite" }}
            aria-hidden
          />
          <span className="text-foreground-muted">Available for new projects</span>
        </div>

        {/* ── Heading ── */}
        <h1
          className="font-display font-bold tracking-[-0.04em] leading-[1.03] mb-8"
          style={{ fontSize: "clamp(3.2rem, 7.5vw, 7rem)" }}
        >
          {/* Line 1: static */}
          <span className="hero-line block overflow-hidden">
            <span className="hero-word inline-block">I&nbsp;Turn&nbsp;</span>
            <span className="hero-word inline-block text-gradient">Ideas</span>
            <span className="hero-word inline-block">&nbsp;Into</span>
          </span>
          {/* Line 2: cycling morph word */}
          <span className="hero-morph block" aria-label="Reels, Films, Stories, Visuals and more">
            <MorphText />
          </span>
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="hero-sub text-lg md:text-xl text-foreground-muted max-w-xl leading-relaxed mb-10"
          aria-label={subtitle}
        >
          {subWords.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
              style={{ marginRight: "0.28em" }}
              aria-hidden
            >
              <span className="sub-word inline-block">{word}</span>
            </span>
          ))}
        </p>

        {/* ── Tool stack badges ── */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10" aria-label="Tools I use">
          {tools.map((tool) => (
            <span
              key={tool}
              className="hero-tool px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-foreground-muted uppercase"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Primary — shimmer sweep */}
          <MagneticButton className="hero-btn">
            <a
              href="#reel"
              data-cursor-label="PLAY"
              className="btn-shimmer flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                boxShadow: "0 0 0 1px rgba(220,38,38,0.4), 0 4px 20px rgba(220,38,38,0.3)",
              }}
              onClick={(e) => { e.preventDefault(); scrollTo("#reel"); }}
            >
              <Play size={14} className="fill-white" aria-hidden />
              Watch My Reel
            </a>
          </MagneticButton>

          {/* Secondary — gradient border */}
          <MagneticButton className="hero-btn">
            <a
              href="#work"
              className="card-border inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-foreground hover:text-foreground transition-colors duration-200"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
              }}
              onClick={(e) => { e.preventDefault(); scrollTo("#work"); }}
            >
              See My Work <ArrowDownRight size={16} aria-hidden />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden>
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-muted to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          style={{ transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
