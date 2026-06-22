"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS as testimonials } from "@/config/site";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [autoplay, next]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="section-pad border-b border-white/5 overflow-hidden">
      <div className="wrap">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tag mb-4 inline-block">Testimonials</span>
          <h2 className="heading-lg">
            Loved by creators
            <br />
            <span className="text-gradient">& brands alike</span>
          </h2>
        </div>

        {/* Slider */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: t.color }}
              />

              {/* Quote icon */}
              <Quote
                size={40}
                className="mb-6 opacity-20"
                style={{ color: t.color }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0"
                    style={{ background: `${t.color}30`, border: `1.5px solid ${t.color}50` }}
                  >
                    <span style={{ color: t.color }}>{t.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-foreground-muted">
                      {t.role}
                      {t.followers !== "Brand" && (
                        <span className="ml-1 text-accent">· {t.followers} followers</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-foreground-muted px-3 py-1 card-glass rounded-full">
                  {t.handle}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full card-glass hover:border-accent/30 flex items-center justify-center text-foreground-muted hover:text-foreground transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); setAutoplay(false); }}
                  className="transition-all duration-300"
                  aria-label={`Testimonial ${i + 1}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-6 h-2 bg-accent"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full card-glass hover:border-accent/30 flex items-center justify-center text-foreground-muted hover:text-foreground transition-all"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-14">
          {[
            "100% Satisfaction Guarantee",
            "Fast Turnaround",
            "Unlimited Revisions*",
            "NDA Available",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm text-foreground-muted"
            >
              <span className="text-accent text-base">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
