"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORDS = ["Reels", "Films", "Stories", "Visuals", "Art"];

type Props = {
  className?: string;
  interval?: number;
};

export default function MorphText({ className, interval = 2600 }: Props) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), interval);
    return () => clearInterval(id);
  }, [reduced, interval]);

  const word = WORDS[index];

  return (
    <span
      className={`relative inline-block ${className ?? ""}`}
      style={{ minWidth: "5ch" }}
      aria-live="polite"
      aria-label={word}
    >
      {reduced ? (
        <span className="text-gradient">{word}</span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={word}
            className="inline-block text-gradient"
            initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
            exit={{    opacity: 0, y: -28, filter: "blur(12px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}
