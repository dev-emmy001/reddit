/** @type {import('tailwindcss').Config} */
module.exports = {
  // ⚠️ NEVER use "./**/*.{js,tsx}" as it scans node_modules and causes freezes
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"  // Include this only if you use a src folder
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}