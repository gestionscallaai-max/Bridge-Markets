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
                lila: {
                    DEFAULT: '#9b51e0',
                    light: '#b983ff',
                    50: '#f3eafd',
                    100: '#e5cffb',
                },
                off: {
                    white: '#f8fafc'
                }
            },
            backgroundImage: {
                'mesh-gradient': 'radial-gradient(ellipse at 50% 50%, rgba(155, 81, 224, 0.08) 0%, transparent 60%)',
            },
            keyframes: {
                floatIn: {
                    '0%': { opacity: '0', transform: 'translateY(40px) scale(0.95) rotateX(10deg)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotateX(0deg)' },
                }
            },
            animation: {
                floatIn: 'floatIn 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
            }
        },
    },
    plugins: [],
};
export default config;
