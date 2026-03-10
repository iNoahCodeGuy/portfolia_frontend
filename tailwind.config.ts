import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#0A0A0A',
        'chat-surface': '#1A1A1A',
        'chat-border': '#2A2A2A',
        'chat-primary': '#8B5CF6',
        'chat-secondary': '#EC4899',
      },
    },
  },
  plugins: [],
};

export default config;
