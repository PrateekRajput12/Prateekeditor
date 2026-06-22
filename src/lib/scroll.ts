/**
 * Centralised smooth-scroll utility.
 * Uses the Lenis instance (stored by SmoothScroll.tsx on window.__lenis) so that
 * programmatic scrolls go through the same engine as user-driven scrolls, keeping
 * ScrollTrigger's position tracking in sync. Falls back to native scrollIntoView
 * if Lenis is not yet initialised (e.g. during the first paint).
 */
import type Lenis from "lenis";

type WindowWithLenis = Window & { __lenis?: Lenis };

export function scrollTo(id: string, duration = 1.2) {
  const el = document.querySelector(id);
  if (!el) return;
  const lenis = (window as WindowWithLenis).__lenis;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { duration });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
