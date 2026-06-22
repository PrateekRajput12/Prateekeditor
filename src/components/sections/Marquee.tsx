"use client";

import { motion } from "framer-motion";

const row1 = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Final Cut Pro",
  "Cinema 4D",
  "Photoshop",
  "Lightroom",
  "Figma",
  "CapCut",
  "Audition",
];

const row2 = [
  "Cinematic Reels",
  "Brand Films",
  "YouTube Content",
  "Short Films",
  "Music Videos",
  "Product Videos",
  "Event Coverage",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className={`flex ${animClass} whitespace-nowrap`}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
        whileHover={{ animationPlayState: "paused" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-0 flex-shrink-0">
            <span className="px-6 py-2.5 text-sm md:text-base font-medium text-foreground-muted hover:text-foreground transition-colors duration-200 cursor-default">
              {item}
            </span>
            <span className="text-accent/40 select-none">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="py-12 border-y border-white/5 overflow-hidden">
      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={45} />
      </div>
    </section>
  );
}
