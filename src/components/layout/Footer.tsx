import { Mail, ArrowUpRight } from "lucide-react";
import { SITE } from "@/config/site";

// Inline SVGs for brand icons — lucide deprecated all social icons
const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);
const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconYouTube = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const socials = [
  { icon: IconInstagram, href: SITE.socials.instagram, label: "Instagram" },
  { icon: IconX,         href: SITE.socials.twitter,   label: "Twitter"   },
  { icon: IconYouTube,   href: SITE.socials.youtube,   label: "YouTube"   },
  { icon: IconLinkedIn,  href: SITE.socials.linkedin,  label: "LinkedIn"  },
];

const footerLinks: Record<string, Array<{ label: string; href?: string }>> = {
  Work: [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#work" },
    { label: "Case Studies" },
    { label: "Process" },
  ],
  Connect: [
    { label: "Book a Call", href: SITE.contactLink },
    { label: "Email Me",    href: SITE.contactLink },
    { label: "Instagram",   href: SITE.socials.instagram },
    { label: "YouTube",     href: SITE.socials.youtube   },
  ],
  Legal: [
    { label: "Privacy Policy" },
    { label: "Terms of Use" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(255,107,53,0.05)" }}
        aria-hidden
      />

      <div className="wrap py-20 relative">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between mb-16">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-white group-hover:scale-110 transition-transform">
                P
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Prateek<span className="text-accent">.</span>
              </span>
            </a>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
              Turning ideas into visual stories. Premium video editing for creators, brands, and businesses.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full card-glass flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent/30 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-4">
                  {section}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {label}
                        </a>
                      ) : (
                        // No destination yet — use span to prevent focus-teleport to page top
                        <span className="text-sm text-foreground-muted opacity-50 cursor-default" aria-disabled="true">
                          {label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card-glass rounded-2xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Ready to elevate your content?
            </h3>
            <p className="text-foreground-muted">
              Let&apos;s create something unforgettable together.
            </p>
          </div>
          <a
            href={SITE.contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-light rounded-full font-semibold text-white whitespace-nowrap transition-colors glow-accent-sm"
          >
            <Mail size={16} aria-hidden />
            Get in Touch
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <span className="text-accent" aria-label="love">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
