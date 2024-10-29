import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["ProseMirror"],
  plugins: [
    nextui(),
    tailwindTypography({
      target: "modern",
    }),
  ],
};

export default config;
