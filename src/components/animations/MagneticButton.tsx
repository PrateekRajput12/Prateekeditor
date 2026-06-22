"use client";

import { useRef, useCallback, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  className,
  strength = 0.38,
}: Props) {
  const ref      = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const xTo      = useRef<((v: number) => void) | null>(null);
  const yTo      = useRef<((v: number) => void) | null>(null);
  const ixTo     = useRef<((v: number) => void) | null>(null);
  const iyTo     = useRef<((v: number) => void) | null>(null);
  const isTouch  = useRef(false);

  useEffect(() => {
    isTouch.current = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // Clean up any in-flight tweens when component unmounts
    const el = ref.current;
    const inner = innerRef.current;
    return () => {
      if (el)    gsap.killTweensOf(el);
      if (inner) gsap.killTweensOf(inner);
    };
  }, []);

  // Create quickTo instances lazily on first mouseenter, then reuse them.
  // Previously they were recreated on every mouseenter, leaking GSAP tween objects.
  const onEnter = useCallback(() => {
    if (isTouch.current || !ref.current || !innerRef.current) return;
    if (xTo.current) return; // already initialised
    xTo.current  = gsap.quickTo(ref.current,      "x", { duration: 0.55, ease: "power3" });
    yTo.current  = gsap.quickTo(ref.current,      "y", { duration: 0.55, ease: "power3" });
    ixTo.current = gsap.quickTo(innerRef.current, "x", { duration: 0.4,  ease: "power3" });
    iyTo.current = gsap.quickTo(innerRef.current, "y", { duration: 0.4,  ease: "power3" });
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch.current || !ref.current || !xTo.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const dx = (e.clientX - (left + width  / 2)) * strength;
      const dy = (e.clientY - (top  + height / 2)) * strength;
      xTo.current(dx);
      yTo.current?.(dy);
      ixTo.current?.(dx * 0.25);
      iyTo.current?.(dy * 0.25);
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    xTo.current?.(0);
    yTo.current?.(0);
    ixTo.current?.(0);
    iyTo.current?.(0);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
