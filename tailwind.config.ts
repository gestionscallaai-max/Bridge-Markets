import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    DEFAULT: '#865BFF',
                    light: '#a07eff',
                    dark: '#6b3fd6',
                    subtle: '#f3efff',
                    50: '#f3efff',
                    100: '#e6deff',
                    200: '#c9b5ff',
                    500: '#865BFF',
                    600: '#6b3fd6',
                    700: '#5530b0',
                },
                accent: {
                    DEFAULT: '#865BFF',
                    light: '#a07eff',
                    dark: '#6b3fd6',
                    subtle: '#f3efff',
                    50: '#f3efff',
                    100: '#e6deff',
                    500: '#865BFF',
                    600: '#6b3fd6',
                    700: '#5530b0',
                },
                lila: {
                    DEFAULT: '#865BFF',
                    light: '#a07eff',
                    50: '#f3efff',
                    100: '#e6deff',
                },
                sidebar: {
                    DEFAULT: '#140633',
                    hover: '#1e0e45',
                    active: '#2a1560',
                },
            },
            borderRadius: {
                'card': '12px',
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                'sidebar': '4px 0 16px rgba(20,6,51,0.2)',
            },
            keyframes: {
                floatIn: {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                floatIn: 'floatIn 0.4s ease-out forwards',
                fadeIn: 'fadeIn 0.3s ease-out forwards',
            },
        },
    },
    plugins: [],
};
export default config;
