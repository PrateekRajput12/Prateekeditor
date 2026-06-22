"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/config/site";

export default function Template({ children }: { children: React.ReactNode }) {
  const topRef  = useRef<HTMLDivElement>(null);
  const botRef  = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1 — radial glow blooms first
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" },
        0.05
      )

      // 2 — logo mark appears with blur-in
      .fromTo(
        markRef.current,
        { opacity: 0, scale: 0.6, filter: "blur(22px)" },
        { opacity: 1, scale: 1,   filter: "blur(0px)", duration: 0.65, ease: "expo.out" },
        0.15
      )

      // 3 — scan line sweeps across seam
      .fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 1, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.55, ease: "expo.out" },
        0.85
      )

      // 4 — mark fades out as panels begin to open
      .to([markRef.current, glowRef.current],
        { opacity: 0, scale: 1.1, filter: "blur(14px)", duration: 0.36, ease: "power2.in" },
        1.15
      )
      .to(lineRef.current, { opacity: 0, duration: 0.2 }, 1.15)

      // 5 — curtain split
      .to(topRef.current, { yPercent: -100, duration: 1.12, ease: "expo.inOut" }, 1.30)
      .to(botRef.current, { yPercent:  100, duration: 1.12, ease: "expo.inOut" }, "<");
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Top curtain panel (deep maroon) ── */}
      <div
        ref={topRef}
        aria-hidden
        className="fixed inset-x-0 top-0 z-[200] pointer-events-none overflow-hidden"
        style={{
          height: "50vh",
          background: "linear-gradient(170deg, #3D0606 0%, #4A0808 40%, #3A0505 80%, #2C0404 100%)",
        }}
      >
        {/* Subtle warm glow — top right */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "-25%", right: "5%",
            width: "480px", height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 65%)",
          }}
        />
        {/* Inner-edge shimmer */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.6) 25%, rgba(255,200,100,0.45) 50%, rgba(220,38,38,0.6) 75%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Bottom curtain panel (deep maroon) ── */}
      <div
        ref={botRef}
        aria-hidden
        className="fixed inset-x-0 bottom-0 z-[200] pointer-events-none overflow-hidden"
        style={{
          height: "50vh",
          background: "linear-gradient(190deg, #2C0404 0%, #3A0505 40%, #4A0808 80%, #3D0606 100%)",
        }}
      >
        {/* Subtle warm glow — bottom left */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            bottom: "-25%", left: "5%",
            width: "480px", height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(185,28,28,0.12) 0%, transparent 65%)",
          }}
        />
        {/* Inner-edge shimmer */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.6) 25%, rgba(255,200,100,0.45) 50%, rgba(220,38,38,0.6) 75%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Scan line at the seam ── */}
      <div
        ref={lineRef}
        aria-hidden
        className="fixed inset-x-0 z-[201] pointer-events-none"
        style={{
          top: "50vh",
          height: "2px",
          opacity: 0,
          background:
            "linear-gradient(90deg, transparent 0%, #DC2626 20%, #FFB800 50%, #DC2626 80%, transparent 100%)",
          boxShadow:
            "0 0 16px 3px rgba(220,38,38,0.7), 0 0 32px 6px rgba(255,184,0,0.35)",
        }}
      />

      {/* ── Logo mark — centered at seam ── */}
      <div
        aria-hidden
        className="fixed inset-0 z-[202] flex items-center justify-center pointer-events-none"
      >
        {/* Soft radial glow behind mark */}
        <div
          ref={glowRef}
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            opacity: 0,
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,38,38,0.28) 0%, rgba(139,28,28,0.15) 40%, transparent 68%)",
          }}
        />

        {/* Mark card — replicates the brand logo */}
        <div
          ref={markRef}
          aria-hidden
          className="flex flex-col items-center gap-3"
          style={{ opacity: 0 }}
        >
          {/* Outer badge frame — maroon card like the physical logo */}
          <div
            style={{
              background: "linear-gradient(160deg, #5C0A0A 0%, #3D0606 60%, #2A0404 100%)",
              border: "1px solid rgba(220,38,38,0.45)",
              borderRadius: "18px",
              padding: "28px 36px 22px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              boxShadow:
                "0 0 0 1px rgba(220,38,38,0.2), 0 0 60px rgba(220,38,38,0.3), 0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Devanagari name */}
            <p
              className="font-devanagari font-bold text-white text-center leading-none"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.01em",
                textShadow: "0 0 24px rgba(255,255,255,0.25)",
              }}
            >
              {SITE.nameHindi}
            </p>

            {/* Leopard SVG silhouette */}
            <svg
              viewBox="0 0 120 58"
              width="110" height="52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              style={{ opacity: 0.92 }}
            >
              {/* Simplified leopard/big-cat walking silhouette */}
              <path
                d="
                  M8 40 C10 38 13 36 17 35 L20 28 C22 24 26 22 30 23
                  L35 20 C38 18 42 17 46 18 L54 16 C58 15 63 15 68 17
                  L76 20 C80 21 84 22 87 25 L92 30 C95 32 97 35 96 38
                  L93 41 C91 43 89 44 87 43 L85 40 C83 38 81 38 80 40
                  L79 44 C78 46 76 46 75 44 L74 40 C73 38 71 37 70 39
                  L68 43 C67 45 65 46 64 44
                  M64 44 L62 40
                  M62 40 C61 38 59 37 57 38 L55 42 C54 44 52 45 51 43
                  L50 39 C49 37 47 36 45 37 L43 41 C42 44 40 44 39 42
                  L38 38 C37 36 35 35 33 36 L31 40 C30 43 28 43 27 41
                  L26 37 C25 35 23 34 21 35
                  M8 40 C6 42 5 44 5 46 L6 48 C7 49 9 49 10 48 L12 44 C12 42 10 40 8 40 Z
                  M21 35 L19 41 C18 44 19 46 21 46 L23 45 C24 43 24 41 23 39 Z
                "
                fill="white"
                fillRule="evenodd"
              />
              {/* Spots — small filled circles */}
              <circle cx="48" cy="24" r="1.8" fill="rgba(0,0,0,0.35)" />
              <circle cx="54" cy="22" r="1.5" fill="rgba(0,0,0,0.35)" />
              <circle cx="60" cy="21" r="1.8" fill="rgba(0,0,0,0.35)" />
              <circle cx="66" cy="23" r="1.5" fill="rgba(0,0,0,0.35)" />
              <circle cx="72" cy="25" r="1.8" fill="rgba(0,0,0,0.35)" />
              <circle cx="44" cy="30" r="1.5" fill="rgba(0,0,0,0.35)" />
              <circle cx="51" cy="29" r="1.8" fill="rgba(0,0,0,0.35)" />
              <circle cx="58" cy="28" r="1.5" fill="rgba(0,0,0,0.35)" />
              <circle cx="65" cy="30" r="1.8" fill="rgba(0,0,0,0.35)" />
              <circle cx="78" cy="30" r="1.5" fill="rgba(0,0,0,0.35)" />
              {/* Head detail */}
              <ellipse cx="92" cy="27" rx="7" ry="6" fill="white" />
              <circle cx="95" cy="25" r="1.2" fill="rgba(0,0,0,0.4)" />
              <path d="M96 28 L99 30 L96 29 Z" fill="rgba(0,0,0,0.3)" />
              <path d="M87 24 C88 22 90 21 92 22" stroke="white" strokeWidth="0.8" fill="none" />
              {/* Tail */}
              <path d="M5 40 C3 36 2 33 4 30 C5 28 7 29 8 31" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>

            {/* Date text */}
            <p
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.65)",
                fontFamily: "var(--font-jakarta), sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              {SITE.sinceLabel}
            </p>
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
