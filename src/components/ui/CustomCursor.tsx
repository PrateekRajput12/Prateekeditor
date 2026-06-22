"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted,   setMounted]   = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [label,     setLabel]     = useState("");

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot: near-instant tracking
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 60, mass: 0.08 });
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 60, mass: 0.08 });
  // Ring: smooth lag
  const ringX = useSpring(rawX, { stiffness: 200, damping: 22, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 200, damping: 22, mass: 0.6 });

  const onMove = useCallback((e: MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  }, [rawX, rawY]);

  const onOver = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    // Check for explicit label first, then fallback to generic interactive
    const labeled = target.closest("[data-cursor-label]");
    const interactive = target.closest('a, button, [role="button"], input, select, textarea');

    if (labeled) {
      setIsPointer(true);
      setLabel(labeled.getAttribute("data-cursor-label") ?? "");
    } else if (interactive) {
      setIsPointer(true);
      setLabel("");
    } else {
      setIsPointer(false);
      setLabel("");
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setMounted(true);
    document.documentElement.dataset.cursor = "custom";
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [onMove, onOver]);

  if (!mounted) return null;

  const ringSize  = isPointer ? (label ? 72 : 48) : 34;
  const ringBorder = isPointer ? 1.5 : 1;
  const ringColor  = isPointer ? "rgba(255,107,53,0.7)" : "rgba(255,255,255,0.28)";
  const ringFill   = isPointer ? "rgba(255,107,53,0.07)" : "transparent";

  return (
    <>
      {/* Dot */}
      <motion.span
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-accent"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", width: 7, height: 7 }}
        animate={{ scale: isPointer ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring + optional label */}
      <motion.span
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderStyle: "solid",
        }}
        animate={{
          width:           ringSize,
          height:          ringSize,
          borderWidth:     ringBorder,
          borderColor:     ringColor,
          backgroundColor: ringFill,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label && (
          <motion.span
            className="text-accent font-bold text-[9px] tracking-[0.14em] uppercase select-none"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1   }}
            exit={{    opacity: 0, scale: 0.7  }}
            transition={{ duration: 0.18 }}
          >
            {label}
          </motion.span>
        )}
      </motion.span>
    </>
  );
}
