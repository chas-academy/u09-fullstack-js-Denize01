/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Viktigt att alla filer täcks
  theme: {
    extend: {
      keyframes: {
        bounceOnce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }, // Märkbar studs
        },
      },
      animation: {
        bounceOnce: "bounceOnce 1s ease-in-out infinite", // Oändlig studs
      },
    },
  },
  plugins: [],
};
