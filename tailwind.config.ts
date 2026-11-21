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
        moroccan: {
          terracotta: {
            DEFAULT: "#B85D36",
            light: "#CF744D",
            dark: "#984725",
          },
          gold: {
            DEFAULT: "#996733",
            light: "#B8844D",
            dark: "#7A4E22",
            amber: "#C68B3C",
          },
          cream: {
            DEFAULT: "#FAF7F2",
            light: "#FFFDF9",
            soft: "#F5EFE6",
            dark: "#EFE7D8",
          },
          dark: {
            DEFAULT: "#201610",
            surface: "#2A1E17",
            border: "#3D2E24",
          },
          green: {
            DEFAULT: "#1B4D3E",
            emerald: "#0E5C44",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'moroccan': '0 4px 20px -2px rgba(153, 103, 51, 0.12)',
        'moroccan-lg': '0 10px 30px -4px rgba(32, 22, 16, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
