/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        //White
        white: "#FFFF",
        //black
        black: "#OOOO",
        //Blue
        darkBlue: "#293241",
        deepBlue: "#3D5A80",
        mediumBlue: "#98C1D9",
        lightBlue: "#E0FBFC",
        //orange
        darkOrange: "#CC2C00",
        deepOrange: "#F25600",
        mediumOrange: "#FF9913",
        lightOrange: "#FFC523",
        //gray
        darkGray: "#3C3C3C",
        deepGray: "#7A7A7A",
        mediumGray: "#BEBEBE",
        lightGray: "#E4E4E5",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // texto general, UI
        mono: ["Fira Code", "monospace"], // Titulos Botones, ect
      },
    },
  },
  plugins: [],
  content: ["./**/*.{js,ts,jsx,tsx}"],
  exclude: [
    "node_modules",
    "dist",
    "build",
    "coverage",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
  ],
};
