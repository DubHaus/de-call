/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    ],
    theme: {
        extend: {
            transitionProperty: {
                width: 'width',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                DEFAULT: ['Inter', 'sans-serif'],
            },
            borderWidth: {
                DEFAULT: '1.5px',
            },
            textColor: {
                DEFAULT: colors.slate[900],
            },
            colors: {
                current: colors.slate[900],
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
