/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
      
            'primary': '#48cae4',
            'secondary': '#023e8a',
            'tertiary': '#caf0f8',
            'danger': '#e3342f',
              })
    },
  },
  plugins: [],
}

