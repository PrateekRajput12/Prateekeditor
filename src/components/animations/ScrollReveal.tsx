"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type From = "bottom" | "left" | "right" | "scale" | "clip";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: From;
  start?: string;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.75,
  from = "bottom",
  start = "top 90%",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const fromVars: gsap.TweenVars = {};
      const toVars: gsap.TweenVars = { ease: "power3.out" };

      if (from === "bottom") {
        fromVars.y = 55; fromVars.opacity = 0;
        toVars.y = 0;   toVars.opacity = 1;
      } else if (from === "left") {
        fromVars.x = -55; fromVars.opacity = 0;
        toVars.x = 0;    toVars.opacity = 1;
      } else if (from === "right") {
        fromVars.x = 55; fromVars.opacity = 0;
        toVars.x = 0;   toVars.opacity = 1;
      } else if (from === "scale") {
        fromVars.scale = 0.88; fromVars.opacity = 0;
        toVars.scale = 1;      toVars.opacity = 1;
        toVars.ease = "back.out(1.4)";
      } else if (from === "clip") {
        fromVars.clipPath = "inset(0 100% 0 0)";
        toVars.clipPath  = "inset(0 0% 0 0)";
        toVars.ease = "power4.inOut";
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Apply will-change only during animation, remove after
        el.style.willChange = "transform, opacity";

        gsap.fromTo(el, fromVars, {
          ...toVars,
          duration,
          delay,
          onComplete() { el.style.willChange = "auto"; },
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Skip animation; show immediately
        const visible: gsap.TweenVars = {};
        if ("y" in fromVars || "x" in fromVars) { visible.y = 0; visible.x = 0; }
        if ("opacity" in fromVars) visible.opacity = 1;
        if ("scale" in fromVars) visible.scale = 1;
        if ("clipPath" in fromVars) visible.clipPath = "inset(0 0% 0 0)";
        gsap.set(el, visible);
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay, duration, from, start, once] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
