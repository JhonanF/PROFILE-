/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#09090f",
          surface: "#0f0f1a",
          elevated: "#141428",
        },
        accent: {
          violet: "#7c3aed",
          "violet-light": "#a78bfa",
          blue: "#3b82f6",
          "blue-light": "#93c5fd",
          red: "#ef4444",
          "red-light": "#fca5a5",
          cyan: "#06b6d4",
        },
        text: {
          primary: "#e8e8f0",
          secondary: "#8888aa",
          muted: "#444466",
          accent: "#c4b5fd",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          default: "rgba(255,255,255,0.1)",
          accent: "rgba(124,58,237,0.4)",
        },
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        hero: "clamp(3rem, 8vw, 7rem)",
        section: "clamp(1.5rem, 3vw, 2.5rem)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-violet":
          "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "spin-slow": "spin 8s linear infinite",
        "spin-reverse": "spin 12s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "status-pulse": "statusPulse 2s ease-in-out infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        statusPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-violet":
          "0 0 30px rgba(124, 58, 237, 0.35), 0 0 60px rgba(124, 58, 237, 0.1)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-red": "0 0 20px rgba(239, 68, 68, 0.25)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
};
