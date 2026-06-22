import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // RGB-channel variables → opacity modifiers like bg-background/80 work
        background:          "rgb(var(--bg)          / <alpha-value>)",
        surface:             "rgb(var(--surface)     / <alpha-value>)",
        card:                "rgb(var(--card)        / <alpha-value>)",
        border:              "rgb(var(--border-clr)  / <alpha-value>)",
        foreground:          "rgb(var(--fg)          / <alpha-value>)",
        "foreground-muted":  "rgb(var(--fg-muted)    / <alpha-value>)",
        muted:               "rgb(var(--color-muted) / <alpha-value>)",
        // Fixed accent colours — same in both themes
        accent: {
          DEFAULT: "#DC2626",
          light:   "#EF4444",
          dark:    "#B91C1C",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          light:   "#A78BFA",
          dark:    "#7C3AED",
        },
        cyan: "#06B6D4",
        gold: "#FFB800",
      },
      fontFamily: {
        sans:    ["var(--font-inter)",   "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee-left":  "marqueeLeft  var(--duration, 40s) linear infinite",
        "marquee-right": "marqueeRight var(--duration, 40s) linear infinite",
        "pulse-dot":     "pulseDot  2s ease-in-out infinite",
        "float":         "float     6s ease-in-out infinite",
        "float-delayed": "float     6s ease-in-out infinite 2s",
        "spin-slow":     "spin    20s linear infinite",
        "gradient-x":    "gradientX 8s ease infinite",
      },
      keyframes: {
        marqueeLeft:  { "0%":   { transform: "translateX(0)"    }, "100%": { transform: "translateX(-50%)" } },
        marqueeRight: { "0%":   { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)"    } },
        pulseDot:     { "0%,100%": { opacity:"1", transform:"scale(1)"  }, "50%": { opacity:".5", transform:"scale(.8)" } },
        float:        { "0%,100%": { transform:"translateY(0px)" },   "50%": { transform:"translateY(-18px)" } },
        gradientX: {
          "0%,100%": { backgroundPosition: "0% 50%"   },
          "50%":     { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
