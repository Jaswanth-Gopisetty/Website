import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0A2A66",
          blueDark: "#061A40",
          teal: "#14B8A6",
          tealDark: "#0F766E",
          accent: "#7C3AED",
          ink: "#0B1220",
          surface: "#F6F9FC",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(20,184,166,0.35)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        kenBurns: {
          "0%": { 
            transform: "scale(1) translate(0, 0)",
          },
          "50%": { 
            transform: "scale(1.15) translate(-2%, -2%)",
          },
          "100%": { 
            transform: "scale(1.1) translate(2%, 1%)",
          },
        },
      },
      animation: { 
        floaty: "floaty 6s ease-in-out infinite",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
