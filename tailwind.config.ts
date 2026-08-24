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
        background: {
          DEFAULT: "var(--bg-primary)",
          card: "var(--bg-card)",
          surface: "var(--bg-surface)",
          hover: "var(--bg-hover)",
          muted: "var(--bg-muted)",
        },
        foreground: {
          DEFAULT: "var(--text-primary)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          hover: "var(--accent-hover)",
          glow: "var(--accent-glow)",
        },
        border: {
          DEFAULT: "var(--border-subtle)",
          bright: "var(--border-bright)",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
