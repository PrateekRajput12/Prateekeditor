"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { SITE } from "@/config/site";

const faqs = [
  {
    q: "What's your typical turnaround time?",
    a: "Standard delivery is 3–5 business days per video. Rush 24–48 hour delivery is available on Pro and Premium plans. I always communicate timelines upfront so you can plan your content calendar.",
  },
  {
    q: "How do revisions work?",
    a: "Starter plan includes 2 revision rounds. Pro and Premium include unlimited revisions. All revision requests should be compiled into a single document per round. Revisions are typically completed within 24–48 hours.",
  },
  {
    q: "What footage formats do you accept?",
    a: "I accept all major video formats: MP4, MOV, MXF, BRAW, R3D, ARRI, and more. You can share footage via Google Drive, WeTransfer, Dropbox, or any cloud storage. I'll send you a secure upload link after onboarding.",
  },
  {
    q: "Do you provide the source files?",
    a: "Source files (Premiere Pro, DaVinci Resolve projects) are available on the Premium plan or as an add-on for ₹4,999 per project. Exported final files in all requested formats are always included.",
  },
  {
    q: "Can you handle multiple creators or brands at once?",
    a: "Yes — I manage multiple clients simultaneously while maintaining quality for each. However, I only take a limited number of clients per month to ensure dedicated attention. Contact me early to secure a spot.",
  },
  {
    q: "What information do you need to start a project?",
    a: "A quick brief covering: your target audience, platform (YouTube/Instagram/etc.), reference videos you like, brand colors/fonts if applicable, and your footage. I'll send you a detailed onboarding form after our discovery call.",
  },
  {
    q: "Do you sign NDAs or confidentiality agreements?",
    a: "Absolutely. NDAs and custom contracts are included in the Premium plan and available as an add-on for other plans. I take client confidentiality seriously and treat all projects with full discretion.",
  },
  {
    q: "What if I'm not happy with the final result?",
    a: "I offer a satisfaction guarantee. If you're not happy after the allotted revision rounds, we'll work together to find a resolution — whether that's additional revisions, a different approach, or a refund on a case-by-case basis.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section-pad border-b border-white/5">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 flex-shrink-0">
            <ScrollReveal from="bottom">
              <span className="tag mb-4 inline-block">FAQ</span>
            </ScrollReveal>
            <TextReveal as="h2" className="heading-lg mb-4" stagger={0.09}>
              Got questions?
            </TextReveal>
            <ScrollReveal from="bottom" delay={0.2}>
              <p className="text-foreground-muted leading-relaxed mb-6">
                Everything you need to know before we start working together. Still have questions?
              </p>
              <a
                href={SITE.contactLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium transition-colors"
              >
                Ask me directly →
              </a>
            </ScrollReveal>
          </div>

          {/* Accordion */}
          <div className="flex-1 flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const panelId = `faq-answer-${i}`;
              const isOpen  = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "card-glass border border-accent/20 bg-accent/3"
                      : "card-glass card-glass-hover"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span
                      className={`font-medium transition-colors ${
                        isOpen ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-accent text-white scale-110"
                          : "bg-white/5 text-foreground-muted"
                      }`}
                      aria-hidden
                    >
                      {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="content"
                        role="region"
                        aria-label={faq.q}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <p className="text-foreground-muted text-sm leading-relaxed border-t border-white/5 pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
