/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            colors: {
                'luxe-beige': '#FBF9F4', // The main background color
                'luxe-dark': '#1A1A1A',  // Almost black
                'luxe-tan': '#EFE8D8',   // Secondary beige for banners
            }
        },
    },
    plugins: [],
}