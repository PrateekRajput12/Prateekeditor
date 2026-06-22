"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip smooth-scroll for users who have requested reduced motion in their OS.
    // Lenis still intercepts scroll even at duration:0, so we skip initialisation
    // entirely — native scroll momentum is preserved.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose instance for scrollTo() utility in src/lib/scroll.ts
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // Keep ScrollTrigger in sync with Lenis-driven scroll position
    lenis.on("scroll", () => ScrollTrigger.update());

    function tick(time: number) {
      lenis.raf(time * 1000); // gsap ticker time is in seconds; Lenis expects ms
    }

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
