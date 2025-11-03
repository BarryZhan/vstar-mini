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
    },
  },
  plugins: [],
}
