import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { DEFAULT: "var(--brand)", 600: "var(--brand-600)", 700: "var(--brand-700)" },
        accent: "var(--accent)",
        bg: "var(--bg)",
        card: "var(--card)",
        text: "var(--text)",
        muted: "var(--muted)",
        white: "var(--white)",
        glass: "var(--glass)"
      },
      backgroundImage: {
        "grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        "nebula": "radial-gradient(1000px 600px at -10% -10%, rgba(139,92,246,0.25), transparent 40%), radial-gradient(800px 600px at 120% 0%, rgba(88,28,135,0.25), transparent 40%)"
      },
      borderRadius: { xl: "var(--radius)" },
      boxShadow: { ring: "var(--ring)", glow: "0 10px 40px rgba(139,92,246,.25)" }
    },
  },
  plugins: [],
};
export default config;
