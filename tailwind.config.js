/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2649ff',
          dark: '#1a3acc',
        },
        dark: {
          DEFAULT: '#000000',
          900: '#111827',
        },
        light: {
          bg: '#f0f0f0',
          DEFAULT: 'rgba(255, 255, 255)',
          text: 'rgba(255, 255, 255, 0.65)',
          footer: 'rgba(255, 255, 255, 0.76)',
        },
      },
      spacing: {
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        20: '5rem',
        25: '6.25rem',
        27: '6.75rem',
        30: '7.5rem',
        32: '8rem',
        35: '8.75rem',
        38: '9.5rem',
        40: '10rem',
        42: '10.5rem',
        45: '11.25rem',
        48: '12rem',
        50: '12.5rem',
        52: '13rem',
        55: '13.75rem',
        58: '14.5rem',
        60: '15rem',
        62: '15.5rem',
        65: '16.25rem',
        68: '17rem',
        70: '17.5rem',
        72: '18rem',
        75: '18.75rem',
        78: '19.5rem',
        80: '20rem',
        82: '20.5rem',
        85: '21.25rem',
        88: '22rem',
        90: '22.5rem',
        92: '23rem',
        95: '23.75rem',
        98: '24.5rem',
        100: '25rem',
      },
      fontSize: {
        // 响应式标题
        // 'heading-xl': ['clamp(2rem, 5vw, 3.75rem)', { lineHeight: '1.2' }],
        // 'heading-lg': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3' }],
        // 'heading-md': ['clamp(1.125rem, 2vw, 1.875rem)', { lineHeight: '1.4' }],
        // 'heading-sm': ['clamp(1rem, 1.5vw, 1.5rem)', { lineHeight: '1.5' }],
        // 响应式正文
        // 'body-lg': ['clamp(0.875rem, 1vw, 1.125rem)', { lineHeight: '1.6' }],
        // 'body-md': ['clamp(0.75rem, 0.9vw, 1rem)', { lineHeight: '1.6' }],
        // 'body-sm': ['clamp(0.625rem, 0.8vw, 0.875rem)', { lineHeight: '1.5' }],
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
    },
  },
  plugins: [],
}
