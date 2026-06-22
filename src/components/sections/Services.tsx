"use client";

import { Film, Youtube, Clapperboard, Sparkles, Palette, Image, ArrowUpRight } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

const services = [
  {
    icon: Clapperboard,
    title: "Cinematic Reels",
    description:
      "Instagram & YouTube Shorts reels that hook in the first second. Fast cuts, dynamic transitions, and storytelling that converts views into followers.",
    tags: ["Instagram", "YouTube Shorts", "TikTok"],
    accent: "#FF6B35",
  },
  {
    icon: Youtube,
    title: "YouTube Videos",
    description:
      "Long-form and mid-form YouTube content optimised for watch time and engagement. Perfect pacing, graphics, and sound design included.",
    tags: ["Long-form", "Podcasts", "Tutorials"],
    accent: "#FF0000",
  },
  {
    icon: Film,
    title: "Brand Films",
    description:
      "Premium brand storytelling for product launches, company culture, and ads. High production value with cinematic colour grading.",
    tags: ["Ads", "Corporate", "Product"],
    accent: "#FFB800",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    description:
      "Custom animated intros, lower thirds, transitions, and graphic elements that lift your content from amateur to professional.",
    tags: ["Intros", "Transitions", "Titles"],
    accent: "#A855F7",
  },
  {
    icon: Palette,
    title: "Colour Grading",
    description:
      "Professional cinematic colour grading using DaVinci Resolve. Film emulation, custom LUTs, and mood-driven colour science.",
    tags: ["DaVinci Resolve", "LUTs", "Film Look"],
    accent: "#06B6D4",
  },
  {
    icon: Image,
    title: "Thumbnails",
    description:
      "Click-worthy YouTube thumbnails and social media creatives designed for maximum CTR. Data-driven design that gets the click.",
    tags: ["YouTube", "Social Media", "Ads"],
    accent: "#22C55E",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad border-b border-white/5">
      <div className="wrap">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <ScrollReveal from="bottom">
              <span className="tag mb-4 inline-block">What I Do</span>
            </ScrollReveal>
            <TextReveal as="h2" className="heading-lg" stagger={0.055}>
              Services built for creators and brands
            </TextReveal>
          </div>
          <ScrollReveal from="right" delay={0.2}>
            <p className="text-foreground-muted max-w-sm md:text-right leading-relaxed">
              Every project is crafted with precision, creativity, and a deep
              understanding of what makes content perform.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} from="bottom" delay={i * 0.08}>
              <div className="group relative p-7 rounded-2xl glass card-glass-hover cursor-default overflow-hidden h-full">
                {/* Per-card accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${service.accent}08 0%, transparent 60%)` }}
                  aria-hidden
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}25` }}
                >
                  <service.icon size={20} style={{ color: service.accent }} aria-hidden />
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center justify-between">
                  {service.title}
                  <ArrowUpRight
                    size={16}
                    className="text-foreground-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    aria-hidden
                  />
                </h3>

                <p className="text-foreground-muted text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium"
                      style={{
                        background: `${service.accent}10`,
                        color: service.accent,
                        border: `1px solid ${service.accent}20`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
