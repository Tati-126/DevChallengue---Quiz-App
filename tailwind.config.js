/** @type {import('tailwindcss').Config} */
export default {
  // 'class' permite alternar el tema con la clase `dark` en <html>.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
