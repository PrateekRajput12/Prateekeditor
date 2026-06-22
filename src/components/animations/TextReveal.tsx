"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
};

export default function TextReveal({
  children,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.06,
  start = "top 88%",
  once = true,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const words = useMemo(() => children.split(" "), [children]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const items = el.querySelectorAll<HTMLElement>(".tr-inner");
      if (!items.length) return;

      // Only animate if user hasn't requested reduced motion
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          items,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger,
            ease: "power4.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: once
                ? "play none none none"
                : "play reverse play reverse",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { yPercent: 0, opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [delay, stagger, start, once] }
  );

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={containerRef}
      className={className}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.28em" }}
          aria-hidden="true"
        >
          <span className="tr-inner inline-block">{word}</span>
        </span>
      ))}
    </Component>
  );
}

export { ScrollTrigger };
