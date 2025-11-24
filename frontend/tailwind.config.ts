import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eaf3ff",
          100: "#d6e7ff",
          200: "#a6c7ff",
          300: "#75a6ff",
          400: "#3c7dff",
          500: "#1554f6",
          600: "#0f40c4",
          700: "#0a2d92",
          800: "#051961",
          900: "#010b31"
        },
        accent: "#07c8b5"
      }
    }
  },
  plugins: []
};

export default config;

