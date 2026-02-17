import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Alhidayah Brand ──
        gold: {
          DEFAULT: "#C9A84C",
          light:   "#E8C97A",
          pale:    "#F5E6C0",
          dim:     "#8B6D2A",
        },
        teal: {
          DEFAULT: "#0EA5A4",
          light:   "#2DC4C3",
          dark:    "#0A7675",
          glow:    "rgba(14,165,164,0.15)",
        },
        dark: {
          DEFAULT: "#0A0A08",
          2:       "#111110",
          3:       "#1A1A17",
          4:       "#242420",
          5:       "#2E2E29",
        },
        cream: {
          DEFAULT: "#F7F2E8",
          dim:     "#DDD5C0",
        },
        muted: {
          DEFAULT: "#7A7A6E",
          dark:    "#4A4A42",
        },
        // ── shadcn/Radix ──
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans:    ["var(--font-dm-sans)", "sans-serif"],
        arabic:  ["var(--font-amiri)", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-right": {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.7s ease forwards",
        "fade-in":    "fade-in 0.5s ease forwards",
        "slide-right":"slide-right 0.6s ease forwards",
        "scale-in":   "scale-in 0.5s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
