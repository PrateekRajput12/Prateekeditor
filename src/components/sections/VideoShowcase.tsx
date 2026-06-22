"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { FILMS, REELS, SITE } from "@/config/site";

const TABS = [
  { key: "all",   label: "All"         },
  { key: "films", label: "Films"       },
  { key: "reels", label: "Reels"       },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// ── Film card (landscape 16:9) ────────────────────────────────────────────
function FilmCard({ video, priority = false }: { video: (typeof FILMS)[0]; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article
      className="group relative rounded-2xl overflow-hidden aspect-video glass cursor-pointer"
      onClick={() => { if (!playing) setPlaying(true); }}
      role="button"
      tabIndex={0}
      aria-label={playing ? `Now playing: ${video.title}` : `Play ${video.title}`}
      aria-pressed={playing}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !playing) { e.preventDefault(); setPlaying(true); }
        if (e.key === "Escape" && playing) setPlaying(false);
      }}
    >
      {!playing ? (
        <>
          <Image
            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
            alt={video.title}
            fill unoptimized priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <motion.div
              className="w-16 h-16 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 0 40px rgba(220,38,38,0.45)" }}
            >
              <Play size={22} className="fill-white text-white ml-1" />
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none" aria-hidden>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-accent tracking-widest uppercase px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                {video.type}
              </span>
              <span className="text-xs text-foreground-muted">{video.views}</span>
            </div>
            <h3 className="font-display font-bold text-lg leading-tight">{video.title}</h3>
            <p className="text-sm text-foreground-muted mt-0.5">{video.client}</p>
          </div>
        </>
      ) : (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen title={video.title}
          />
          <button
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            onClick={(e) => { e.stopPropagation(); setPlaying(false); }}
            onKeyDown={(e) => e.stopPropagation()}
            aria-label={`Stop playing ${video.title}`}
          >
            <X size={13} aria-hidden />
          </button>
        </>
      )}
    </article>
  );
}

// ── Reel card (portrait 9:16) ─────────────────────────────────────────────
function ReelCard({ video }: { video: (typeof REELS)[0] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article
      className="group relative rounded-2xl overflow-hidden glass cursor-pointer"
      style={{ aspectRatio: "9/16" }}
      onClick={() => { if (!playing) setPlaying(true); }}
      role="button"
      tabIndex={0}
      aria-label={playing ? `Now playing: ${video.title}` : `Play reel: ${video.title}`}
      aria-pressed={playing}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !playing) { e.preventDefault(); setPlaying(true); }
        if (e.key === "Escape" && playing) setPlaying(false);
      }}
    >
      {!playing ? (
        <>
          <Image
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            fill unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" aria-hidden />

          {/* Reel badge top-right */}
          <div className="absolute top-3 right-3" aria-hidden>
            <span className="text-[9px] font-bold text-white tracking-widest uppercase px-2 py-0.5 rounded-full bg-purple/80 backdrop-blur-sm">
              REEL
            </span>
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <motion.div
              className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20"
              whileHover={{ scale: 1.15, backgroundColor: "rgba(220,38,38,0.85)" }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2 }}
            >
              <Play size={16} className="fill-white text-white ml-0.5" />
            </motion.div>
          </div>

          {/* Metadata */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none" aria-hidden>
            <h3 className="font-display font-bold text-sm leading-tight">{video.title}</h3>
            <p className="text-xs text-foreground-muted mt-0.5">{video.client}</p>
            <p className="text-[10px] text-accent mt-1 font-semibold">{video.views}</p>
          </div>
        </>
      ) : (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen title={video.title}
          />
          <button
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            onClick={(e) => { e.stopPropagation(); setPlaying(false); }}
            onKeyDown={(e) => e.stopPropagation()}
            aria-label={`Stop playing ${video.title}`}
          >
            <X size={13} aria-hidden />
          </button>
        </>
      )}
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function VideoShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const showFilms = activeTab === "all" || activeTab === "films";
  const showReels = activeTab === "all" || activeTab === "reels";

  return (
    <section id="work" className="section-pad border-b border-white/5">
      <div className="wrap">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <ScrollReveal from="bottom">
              <span className="tag mb-4 inline-block">Portfolio</span>
            </ScrollReveal>
            <TextReveal as="h2" className="heading-lg" stagger={0.055}>
              Work that speaks volumes
            </TextReveal>
          </div>

          <ScrollReveal from="right" delay={0.2}>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground-muted hover:text-accent transition-colors font-medium group"
            >
              View all on YouTube
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden />
            </a>
          </ScrollReveal>
        </div>

        {/* Tab filter */}
        <ScrollReveal from="bottom" delay={0.1}>
          <div className="flex items-center gap-2 mb-10">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250",
                  activeTab === key
                    ? "text-white"
                    : "text-foreground-muted hover:text-foreground"
                )}
                style={activeTab === key ? {
                  background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                  boxShadow: "0 0 0 1px rgba(220,38,38,0.35), 0 2px 12px rgba(220,38,38,0.2)",
                } : {
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
                aria-pressed={activeTab === key}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Films grid — 16:9 landscape */}
        <AnimatePresence>
          {showFilms && (
            <motion.div
              key="films"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: -8  }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-10"
            >
              {activeTab === "all" && (
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-foreground-muted mb-5">
                  Films & Long-form
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FILMS.map((video, i) => (
                  <ScrollReveal key={video.id + i} from="bottom" delay={i * 0.08}>
                    <FilmCard video={video} priority={i === 0} />
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reels grid — 9:16 portrait */}
        <AnimatePresence>
          {showReels && (
            <motion.div
              key="reels"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: -8  }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {activeTab === "all" && (
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-foreground-muted mb-5">
                  Reels & Short-form
                </p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {REELS.map((video, i) => (
                  <ScrollReveal key={video.id + "reel" + i} from="bottom" delay={i * 0.06}>
                    <ReelCard video={video} />
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer CTA */}
        <ScrollReveal from="bottom" delay={0.3} className="mt-12 text-center">
          <p className="text-foreground-muted text-sm">
            Want to see more?{" "}
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4"
            >
              Visit my YouTube channel →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Inline cn helper to keep the file self-contained
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
