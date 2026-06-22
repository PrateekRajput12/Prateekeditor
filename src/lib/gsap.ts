import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once — GSAP deduplicates but this eliminates scattered registerPlugin() calls
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
