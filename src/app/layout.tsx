import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ClientProviders from "@/components/ClientProviders";
import { SITE } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Premium Video Editor`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "video editor India",
    "reel editor",
    "YouTube editor",
    "cinematic editing",
    "brand films",
    "motion graphics",
    "content creator",
    "DaVinci Resolve editor",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    title: `${SITE.name} | Premium Video Editor`,
    description: "Premium video editor specialising in cinematic reels, brand films, and YouTube content.",
    siteName: `${SITE.name} Portfolio`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} — Video Editor` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Premium Video Editor`,
    description: "Cinematic reels, brand films, and YouTube content.",
    creator: SITE.twitterHandle,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: "Video Editor",
  description: SITE.tagline,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage}`,
  sameAs: [
    SITE.socials.instagram,
    SITE.socials.youtube,
    SITE.socials.twitter,
    SITE.socials.linkedin,
  ],
  offers: {
    "@type": "Offer",
    description: "Professional video editing services",
    priceCurrency: "INR",
    seller: { "@type": "Person", name: SITE.name },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* FOUC prevention — runs before first paint so there's no colour flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.add("light");else if(!t&&window.matchMedia("(prefers-color-scheme: light)").matches)document.documentElement.classList.add("light");}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased"
            style={{ transition: "background-color var(--theme-speed) ease, color var(--theme-speed) ease" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[9999] focus:top-4 focus:left-4 focus:px-5 focus:py-2.5 focus:bg-accent focus:text-white focus:rounded-full focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <div className="grain" aria-hidden="true" />
        <ClientProviders />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
