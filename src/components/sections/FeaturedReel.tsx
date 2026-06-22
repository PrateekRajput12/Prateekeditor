"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

import { SHOWREEL_VIDEO_ID, SHOWREEL_STATS } from "@/config/site";

const REEL_VIDEO_ID = SHOWREEL_VIDEO_ID;
const IS_PLACEHOLDER = REEL_VIDEO_ID === "YOUR_VIDEO_ID";
const reelStats = SHOWREEL_STATS;

// Module-level constants so animate objects are not re-created on re-render
const BLOB_VARIANTS = [
  {
    animate: { x: [0, 30, 0],  y: [0, -20, 0] },
    transition: { duration: 10, repeat: Infinity as number, ease: "easeInOut" as const, delay: 0 },
    style: { background: "radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)" },
    className: "absolute top-[-20%] left-[10%] w-[55%] h-[80%] rounded-full",
  },
  {
    animate: { x: [0, -25, 0], y: [0, 18,  0] },
    transition: { duration: 12, repeat: Infinity as number, ease: "easeInOut" as const, delay: 1.5 },
    style: { background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" },
    className: "absolute bottom-[-15%] right-[5%] w-[50%] h-[75%] rounded-full",
  },
  {
    animate: { x: [0, 18,  0], y: [0, 28,  0] },
    transition: { duration: 9,  repeat: Infinity as number, ease: "easeInOut" as const, delay: 3 },
    style: { background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)" },
    className: "absolute top-[30%] right-[15%] w-[35%] h-[55%] rounded-full",
  },
];

const RING_1 = {
  animate: { scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] },
  transition: { duration: 2.8, repeat: Infinity as number, ease: "easeOut" as const },
};
const RING_2 = {
  animate: { scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] },
  transition: { duration: 2.8, repeat: Infinity as number, ease: "easeOut" as const, delay: 0.7 },
};

export default function FeaturedReel() {
  const [playing, setPlaying] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <section id="reel" className="section-pad relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[130px]"
          style={{ background: "rgba(255,107,53,0.08)" }}
        />
        <div
          className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[110px]"
          style={{ background: "rgba(139,92,246,0.07)" }}
        />
      </div>

      <div className="wrap relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 tag mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden />
              Featured Work
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="heading-lg">
              My <span className="text-gradient">Showreel</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-foreground-muted mt-4 max-w-xl mx-auto text-base leading-relaxed">
              A collection of my finest cuts — cinematic reels, brand stories, and viral content, all in one frame.
            </p>
          </ScrollReveal>
        </div>

        {/* Video frame */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-5xl mx-auto">
            {/* Ambient glow */}
            <div
              className="absolute -inset-6 rounded-3xl pointer-events-none opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(255,107,53,0.2) 0%, transparent 60%), " +
                  "radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.15) 0%, transparent 60%)",
              }}
              aria-hidden
            />

            <div
              className="relative aspect-video rounded-2xl overflow-hidden card-border"
              style={{ background: "#0A0A0C" }}
            >
              {playing && !IS_PLACEHOLDER ? (
                <>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${REEL_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`}
                    title="Prateek Rajput — Showreel"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Close button — prevents iframe keyboard trap */}
                  <button
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                    onClick={() => setPlaying(false)}
                    aria-label="Stop playing showreel"
                  >
                    <X size={14} aria-hidden />
                  </button>
                </>
              ) : (
                /* Placeholder / thumbnail state */
                <div
                  className="w-full h-full relative flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0C0C10 0%, #131020 45%, #0C1320 100%)" }}
                >
                  {/* Animated colour blobs — disabled when prefers-reduced-motion */}
                  {!prefersReduced && (
                    <div className="absolute inset-0 overflow-hidden" aria-hidden>
                      {BLOB_VARIANTS.map((blob, i) => (
                        <motion.div
                          key={i}
                          className={blob.className}
                          style={blob.style}
                          animate={blob.animate}
                          transition={blob.transition}
                        />
                      ))}
                    </div>
                  )}

                  {/* Dot grid */}
                  <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />

                  {/* Frame lines */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" aria-hidden />

                  {/* Play button */}
                  <motion.button
                    onClick={() => { if (!IS_PLACEHOLDER) setPlaying(true); }}
                    className="relative z-10 flex flex-col items-center gap-5 group"
                    aria-label={IS_PLACEHOLDER ? "Showreel coming soon" : "Play showreel"}
                    aria-disabled={IS_PLACEHOLDER}
                    whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                  >
                    <div className="relative">
                      {/* Pulsing rings — disabled when prefers-reduced-motion */}
                      {!prefersReduced && (
                        <>
                          <motion.div
                            className="absolute rounded-full border border-accent/20"
                            style={{ inset: "-20px" }}
                            animate={RING_1.animate}
                            transition={RING_1.transition}
                          />
                          <motion.div
                            className="absolute rounded-full border border-accent/30"
                            style={{ inset: "-10px" }}
                            animate={RING_2.animate}
                            transition={RING_2.transition}
                          />
                        </>
                      )}
                      {/* Core */}
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: "linear-gradient(135deg, #FF6B35, #E55A24)",
                          boxShadow: "0 0 30px rgba(255,107,53,0.5), 0 0 60px rgba(255,107,53,0.2)",
                        }}
                      >
                        <Play size={28} className="fill-white text-white ml-1" aria-hidden />
                      </div>
                    </div>

                    <span className="text-sm font-medium tracking-widest uppercase text-foreground-muted">
                      {IS_PLACEHOLDER ? "Coming Soon" : "Watch Showreel"}
                    </span>
                  </motion.button>

                  {/* Watermark */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2.5" aria-hidden>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)" }}
                    >
                      <span className="text-accent font-display font-bold text-xs">P</span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold font-display">Prateek Rajput</p>
                      <p className="text-foreground-muted text-[10px] tracking-wide">Video Editor</p>
                    </div>
                  </div>

                  {/* Year badge */}
                  <div
                    className="absolute top-5 right-5 px-2.5 py-1 rounded text-[11px] font-mono text-foreground-muted glass"
                    aria-hidden
                  >
                    REEL 2024
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Stats strip */}
        <ScrollReveal delay={0.3}>
          <div
            className="flex flex-wrap justify-center mt-10 max-w-3xl mx-auto rounded-2xl overflow-hidden divide-x divide-white/[0.06]"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {reelStats.map(({ value, label }) => (
              <div key={label} className="flex-1 min-w-[120px] flex flex-col items-center py-6 px-4 glass">
                <span className="text-2xl font-display font-bold text-gradient tabular-nums">{value}</span>
                <span className="text-[11px] text-foreground-muted tracking-wide mt-1">{label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
