"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

const stats = [
  { value: 300, suffix: "+", label: "Projects Completed", description: "Across genres and platforms" },
  { value: 50,  suffix: "+", label: "Happy Clients",      description: "Brands, creators & businesses" },
  { value: 5,   suffix: "M+",label: "Views Generated",    description: "Combined across all content" },
  { value: 5,   suffix: "+", label: "Years Experience",   description: "In professional video editing" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    // rAF-based approach: always takes ~1.8s regardless of target magnitude
    const DURATION = 1800;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      // Ease-out cubic — fast start, smooth finish
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="section-pad border-b border-white/5">
      <div className="wrap">
        <div className="text-center mb-16">
          <ScrollReveal from="scale">
            <span className="tag mb-5 inline-block">By the Numbers</span>
          </ScrollReveal>
          <TextReveal as="h2" className="heading-lg text-gradient-subtle" stagger={0.06}>
            Results that speak for themselves
          </TextReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} from="bottom" delay={i * 0.1}>
              <div className="bg-background p-8 md:p-10 flex flex-col items-center text-center hover:bg-accent/3 transition-colors duration-300 h-full">
                <div className="font-display font-bold text-4xl md:text-5xl text-gradient mb-3">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-foreground-muted">{stat.description}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
