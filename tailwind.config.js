/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                teal: {
                    DEFAULT: '#E07A5F',
                    light: '#F2A68B',
                    dark: '#C1574A',
                },
                peach: {
                    DEFAULT: '#F2CC8F',
                    light: '#F7DBA7',
                    dark: '#D4A55A',
                },
                navy: {
                    DEFAULT: '#0F172A',
                    light: '#1E293B',
                    card: '#1E293B',
                    border: '#334155',
                },
                warm: {
                    orange: '#E8833A',
                    yellow: '#F5C542',
                    blue: '#F2A68B',
                    sky: '#89C4F4',
                },
            },
        },
    },
    // Safelist dynamic classes used with template literals in Vue
    safelist: [
        // bg-{color}/{opacity}
        { pattern: /^bg-(teal|peach|navy|warm)/, variants: ['hover', 'group-hover'] },
        { pattern: /^text-(teal|peach|navy|warm)/, variants: ['hover', 'group-hover'] },
        { pattern: /^border-(teal|peach|navy|warm)/, variants: ['hover'] },
        { pattern: /^from-(teal|peach|navy|warm)/ },
        { pattern: /^to-(teal|peach|navy|warm)/ },
        { pattern: /^via-(teal|peach|navy|warm)/ },
        // Specific dynamic classes used in HomeView
        'bg-green-400', 'bg-yellow-400', 'animate-pulse',
        'text-sky-400', 'text-pink-400', 'bg-sky-500/15', 'bg-pink-500/15',
        'bg-purple-500', 'text-purple-500',
        'bg-warm-sky', 'text-warm-sky',
    ],
    plugins: [],
}
