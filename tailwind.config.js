/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,vue,js,ts}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: false, // false= only light + dark
  }
}
