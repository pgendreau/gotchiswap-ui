/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        gotchi: ["Gotchi", "sans-serif"],
      },
      colors: {
        gotchi: {
            '50': '#fff3fe',
            '100': '#fee6ff',
            '200': '#ffccff',
            '300': '#ffa3fd',
            '400': '#ff6dfa',
            '500': '#ff1dff',
            '600': '#e316de',
            '700': '#bd0eb6',
            '800': '#9a0e93',
            '900': '#7e1176',
            '950': '#55004f',
        },
        'light-pink': '#FFE8FF',
        'off-black': '#1A0335',
        'g-yellow': '#FEF87D',
      }
    },
  },
  plugins: [],
};
