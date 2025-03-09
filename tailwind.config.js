import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                shine: "shine 1.5s infinite alternate",
                glow: "glow 1.5s infinite alternate",
            },
            keyframes: {
                shine: {
                    "0%": { filter: "brightness(1)" },
                    "100%": { filter: "brightness(1.5)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" },
                    "100%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.9)" },
                },
            },
        },
    },

    plugins: [forms],
};
