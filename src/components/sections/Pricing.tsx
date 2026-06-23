"use client";

import { useRef, useCallback, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { Check, Zap, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import { SITE } from "@/config/site";

const plans = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/month",
    description: "Perfect for new creators ready to level up their content quality.",
    badge: null,
    featured: false,
    cta: "Get Started",
    features: [
      "4 short-form videos/month (up to 3 min)",
      "Basic color grading",
      "Music sync & sound design",
      "2 revision rounds",
      "5-day delivery",
      "720p–1080p export",
      "Email support",
    ],
    notIncluded: ["Motion graphics", "Custom intros/outros", "Rush delivery"],
  },
  {
    name: "Pro",
    price: "14,999",
    period: "/month",
    description: "For serious creators and brands who need consistent, premium output.",
    badge: "Most Popular",
    featured: true,
    cta: "Start with Pro",
    features: [
      "8 videos/month (up to 10 min)",
      "Advanced cinematic color grading",
      "Custom motion graphics",
      "Animated intro/outro",
      "Sound design & mixing",
      "Unlimited revisions",
      "3-day delivery",
      "1080p export ready",
      "Priority Slack/WhatsApp support",
      "Monthly strategy call",
    ],
    notIncluded: [],
  },
  {
    name: "Premium",
    price: "34,999",
    period: "/month",
    description: "Full-service video production for brands and high-volume creators.",
    badge: "Best Value",
    featured: false,
    cta: "Go Premium",
    features: [
      "Unlimited videos",
      "Full cinematic production",
      "Custom brand guidelines",
      "Thumbnail design included",
      "Shorts/Reels repurposing",
      "Rush 24h delivery available",
      "Dedicated editor + manager",
      "Monthly analytics review",
      "Exclusive brand kit",
      "NDA & contract included",
    ],
    notIncluded: [],
  },
];

// ── 3-D tilt card powered by GSAP quickTo ──────────────────────────────────
type TiltCardProps = {
  children: ReactNode;
  className?: string;
  featured?: boolean;
};

function TiltCard({ children, className, featured }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const rX = useRef<((v: number) => void) | null>(null);
  const rY = useRef<((v: number) => void) | null>(null);
  const sc = useRef<((v: number) => void) | null>(null);

  const onEnter = useCallback(() => {
    if (!cardRef.current) return;
    gsap.set(cardRef.current, { transformPerspective: 900, transformStyle: "preserve-3d" });
    rX.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.5, ease: "power2" });
    rY.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.5, ease: "power2" });
    sc.current = gsap.quickTo(cardRef.current, "scale", { duration: 0.4, ease: "power2" });
    sc.current(1.025);
    if (spotRef.current) gsap.to(spotRef.current, { opacity: 1, duration: 0.3 });
  }, []);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !rX.current || !rY.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - left) / width;   // 0 → 1
    const ny = (e.clientY - top) / height;  // 0 → 1
    rX.current((0.5 - ny) * 14);
    rY.current((nx - 0.5) * 14);
    if (spotRef.current) {
      gsap.set(spotRef.current, {
        x: e.clientX - left - 140,
        y: e.clientY - top - 140,
      });
    }
  }, []);

  const onLeave = useCallback(() => {
    rX.current?.(0);
    rY.current?.(0);
    sc.current?.(1);
    if (spotRef.current) gsap.to(spotRef.current, { opacity: 0, duration: 0.4 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn("relative rounded-2xl p-7 md:p-8 flex flex-col will-change-transform", className)}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        className="absolute w-72 h-72 rounded-full pointer-events-none opacity-0"
        style={{
          background: featured
            ? "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="wrap relative">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal from="scale" delay={0}>
            <span className="tag mb-5 inline-block">Pricing</span>
          </ScrollReveal>
          <TextReveal
            as="h2"
            className="heading-lg mb-4"
            stagger={0.05}
          >
            Transparent pricing premium results
          </TextReveal>
          <ScrollReveal from="bottom" delay={0.3}>
            <p className="text-foreground-muted max-w-md mx-auto">
              No hidden fees. Cancel anytime. All plans include a free 15-minute discovery call.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, idx) => (
            <ScrollReveal key={plan.name} from="bottom" delay={idx * 0.12}>
              <TiltCard
                featured={plan.featured}
                className={
                  plan.featured
                    ? "border border-accent/40 bg-accent/5 shadow-[0_0_60px_rgba(255,107,53,0.12)] md:-mt-4 md:pb-12"
                    : "card-glass"
                }
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={cn(
                        "px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase",
                        plan.featured
                          ? "bg-accent text-white"
                          : "bg-gold/20 text-gold border border-gold/30"
                      )}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6 pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    {plan.featured && <Zap size={14} className="text-accent fill-accent" />}
                    <h3 className="font-display font-bold text-xl">{plan.name}</h3>
                  </div>
                  <p className="text-foreground-muted text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-7">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-4xl">{plan.price}</span>
                    <span className="text-foreground-muted text-sm">{plan.period}</span>
                  </div>
                </div>

                <MagneticButton className="mb-7 w-full" strength={0.25}>
                  <a
                    href={SITE.contactLink} target="_blank" rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all w-full",
                      plan.featured
                        ? "bg-accent hover:bg-accent-light text-white glow-accent-sm"
                        : "card-glass card-glass-hover text-foreground border border-white/10 hover:border-accent/30"
                    )}
                  >
                    {plan.cta}
                    <ArrowUpRight size={14} />
                  </a>
                </MagneticButton>

                <div className="w-full h-px bg-white/6 mb-6" />

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        size={15}
                        className={cn("flex-shrink-0 mt-0.5", plan.featured ? "text-accent" : "text-green-400")}
                      />
                      <span className="text-foreground-muted leading-snug">{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm opacity-30">
                      <span className="flex-shrink-0 mt-0.5 w-[15px] text-center text-xs">✕</span>
                      <span className="text-foreground-muted leading-snug line-through">{f}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-center text-sm text-foreground-muted mt-8">
          Need a custom plan?{" "}
          <a href={SITE.contactLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Let&apos;s talk →
          </a>
        </p>
      </div>
    </section>
  );
}
