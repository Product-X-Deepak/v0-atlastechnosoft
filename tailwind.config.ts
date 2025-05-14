import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/utils/**/*.{ts,tsx}",
    "./lib/hooks/**/*.{ts,tsx}",
    "./lib/config/**/*.{ts,tsx}",
    "./lib/constants/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "var(--font-sans)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-heading)", "var(--font-montserrat)", "var(--font-sans)"],
        montserrat: ["var(--font-montserrat)", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        xxs: "0.625rem", // 10px
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "3.75rem", // 60px
        "7xl": "4.5rem", // 72px
        // Add fluid typography
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.3rem + 1vw, 1.875rem)",
        "fluid-3xl": "clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)",
        "fluid-4xl": "clamp(2.25rem, 1.9rem + 1.75vw, 3rem)",
        "fluid-5xl": "clamp(3rem, 2.5rem + 2.5vw, 4rem)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "premium-orange": "hsl(27, 96%, 61%)",
        "vibrant-purple": "hsl(246, 60%, 60%)",
        "vibrant-blue": "hsl(199, 89%, 48%)",
        "rich-green": "hsl(162, 94%, 30%)",
        "vibrant-pink": "hsl(340, 82%, 52%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "pulse-slower": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.6" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" }
        },
        "ping-slower": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" }
        },
        "slow-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "reverse-slow-spin": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "scroll-rtl": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "pulse-slower": "pulse-slower 6s ease-in-out infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-slower": "ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "slow-spin": "slow-spin 20s linear infinite",
        "reverse-slow-spin": "reverse-slow-spin 15s linear infinite",
        "scroll-rtl": "scroll-rtl 30s linear infinite",
      },
      spacing: {
        // Add fluid spacing values
        "fluid-1": "clamp(0.25rem, 0.5vw, 0.5rem)",
        "fluid-2": "clamp(0.5rem, 1vw, 1rem)",
        "fluid-4": "clamp(1rem, 2vw, 1.5rem)",
        "fluid-8": "clamp(1.5rem, 4vw, 2rem)",
        "fluid-16": "clamp(2rem, 8vw, 4rem)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
