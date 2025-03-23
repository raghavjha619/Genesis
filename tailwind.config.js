/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Inter: [ "Inter"],
    },
    extend: {
      screens: {
        xxs: "400px",
      },
      colors: {
        border: "hsl(214.3, 31.8%, 91.4%)", // Same as the CSS variable
        "game-background": "hsl(260, 60%, 96%)",
        "game-tiger": "hsl(30, 80%, 50%)",
        "game-goat": "hsl(120, 60%, 40%)",
        "game-panel": "hsl(240, 40%, 20%)",
        // "game-background": "hsl(260, 60%, 96%)",
        "foreground": "hsl(222.2, 84%, 4.9%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
