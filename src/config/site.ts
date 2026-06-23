// ═══════════════════════════════════════════════════════════════════
//  SITE CONFIG — edit this file to update ALL content on the site
// ═══════════════════════════════════════════════════════════════════

export const SITE = {
  // ── Personal ──────────────────────────────────────────────────────
  name: "Prateek Rajput",
  nameShort: "Prateek",           // used in logo wordmark
  nameHindi: "प्रतीक",            // shown in the opening animation
  tagline: "Premium video editor creating cinematic reels, brand films, and YouTube content that stops the scroll and drives real results.",
  location: "India",
  since: "2026",              // shown as "JUNE · 2026" in the opening animation
  sinceLabel: "JUNE · 2026",      // full text shown in opening animation badge

  // ── Logo ──────────────────────────────────────────────────────────
  // Put your logo file inside the /public folder, then set the path here.
  // Supported: /logo.svg  /logo.png  /logo.webp  etc.
  // Set to null to use the auto-generated film-frame icon instead.
  logoPath: "/logo.png",

  // ── Contact ───────────────────────────────────────────────────────
  email: "prateekrajput1205@gmail.com",

  // "Book a Call" button destination — change to Calendly/WhatsApp/etc. if you have one.
  // This Gmail link opens the compose window in browser, no email app needed.
  contactLink: "https://mail.google.com/mail/?view=cm&to=prateekrajput1205@gmail.com&subject=Let%27s%20work%20together",

  // ── Social links ──────────────────────────────────────────────────
  socials: {
    instagram: "https://instagram.com/prateek.thakurrr",
    twitter: "https://twitter.com/PrateekRajput12",
    youtube: "https://youtube.com/@prateekrajput",
    linkedin: "https://linkedin.com/in/prateekrajput",
  },

  // ── SEO ───────────────────────────────────────────────────────────
  url: "https://prateekrajput.in",
  ogImage: "/og-image.jpg",
  twitterHandle: "@PrateekRajput12",
};

// ═══════════════════════════════════════════════════════════════════
//  SHOWREEL — the big featured video at the top of the page
// ═══════════════════════════════════════════════════════════════════
// How to find your YouTube ID:
//   https://youtu.be/dQw4w9WgXcQ        → dQw4w9WgXcQ
//   https://youtube.com/watch?v=XXXXXXX  → XXXXXXX
//   https://youtube.com/shorts/XXXXXXX   → XXXXXXX

export const SHOWREEL_VIDEO_ID = "YOUR_VIDEO_ID";

export const SHOWREEL_STATS = [
  { value: "5M+", label: "Total Views" },
  { value: "300+", label: "Reels Edited" },
  { value: "50+", label: "Happy Clients" },
  { value: "5yr", label: "Experience" },
];

// ═══════════════════════════════════════════════════════════════════
//  PORTFOLIO VIDEOS
// ═══════════════════════════════════════════════════════════════════

// ── Films (landscape 16:9 cards) ──────────────────────────────────
export const FILMS = [
  {
    id: "rYycnCMUdKg",           // ← replace with your YouTube video ID
    title: "Cinematic Brand Reel",
    client: "FashionLabel Co.",
    type: "Brand Film",
    views: "1.2M views",
  },
  {
    id: "eydOJEbUx5s",
    title: "YouTube Channel Trailer",
    client: "Noob Play",
    type: "YouTube",
    views: "850K views",
  },
  {
    id: "diIqlv7lLEE",
    title: "Travel Documentary",
    client: "Self-produced",
    type: "Short Film",
    views: "500K views",
  },
];

// ── Reels (portrait 9:16 cards — use YouTube Shorts IDs) ──────────
export const REELS = [
  {
    id: "FkgPGw02XAA ",           // ← replace with your Shorts / Reel ID
    title: "Dr Reel",
    client: "Dr",
    type: "Reel",
    views: "2.1M views",
  },
  {
    id: "UEwi0VnW9PU",
    title: "Dr Edit",
    client: "Doctor",
    type: "Reel",
    views: "980K views",
  },
  {
    id: "jPUkpK4Kj6U",
    title: "Motion Graphics Reel  ",
    client: "EventCo.",
    type: "Reel",
    views: "430K views",
  },
  {
    id: "zONgHFvJWY4",
    title: "Podcast EDit",
    client: "Self",
    type: "Reel",
    views: "1.6M views",
  },
];

// ═══════════════════════════════════════════════════════════════════
//  TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════
// color: pick any hex colour for the avatar background

export const TESTIMONIALS = [
  {
    name: "Rahul Mehta",
    role: "YouTube Creator",
    handle: "@rahulmehta",
    followers: "850K",
    avatar: "RM",
    color: "#DC2626",
    rating: 5,
    text: "Prateek completely transformed my channel. My watch time increased by 70% after just 3 videos. The pacing, transitions, and color grading are absolutely cinematic. I get DMs daily asking who edits my content.",
  },
  {
    name: "Ananya Singh",
    role: "Instagram Influencer",
    handle: "@ananyalifestyle",
    followers: "210K",
    avatar: "AS",
    color: "#A855F7",
    rating: 5,
    text: "The reels Prateek edits for me consistently hit 500K+ views. He understands trends, timing, and storytelling better than anyone I've worked with. Completely hands-off once you brief him — he just delivers magic.",
  },
  {
    name: "Vikram Nair",
    role: "Brand Director, NovaTech",
    handle: "@novatech",
    followers: "Brand",
    avatar: "VN",
    color: "#FFB800",
    rating: 5,
    text: "We needed a product launch video in 3 days. Prateek not only delivered on time but exceeded every expectation. The film is now our most-viewed piece of content. Highly recommend for any premium brand project.",
  },
  {
    name: "Kavya Reddy",
    role: "Fitness Coach",
    handle: "@kavyafitness",
    followers: "125K",
    avatar: "KR",
    color: "#22C55E",
    rating: 5,
    text: "I was spending 8+ hours editing each video. Prateek took that completely off my plate. His turnaround is fast, quality is elite, and he genuinely cares about the growth of your channel. Worth every rupee.",
  },
  {
    name: "Arjun Kapoor",
    role: "Travel Creator",
    handle: "@arjunexplores",
    followers: "430K",
    avatar: "AK",
    color: "#06B6D4",
    rating: 5,
    text: "The cinematic quality Prateek brings to travel content is unmatched. My vlogs feel like actual films now. He has a natural eye for storytelling and makes every destination look breathtaking.",
  },
];
