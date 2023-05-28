/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontSize: {
      xs: '0.8rem',
      xsm: '1.6rem',
      sm: '1.8rem',
      base: '2rem',
      md: '2.4rem',
      xl: '2.8rem',
      '2xl': '3.2rem',
      '3xl': '1.953rem',
      '4xl': '3.8rem',
      '5xl': '5rem',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.4',
      relaxed: '1.6',
      loose: '2.4',
    },
    fontFamily: {
      sans: ['Rajdhani', 'Vazirmatn', 'sans-serif'],
      serif: ['Rajdhani', 'Vazirmatn', 'serif'],
    },
    screens: {
      mobile: '560px',
      tablet: '760px',
      desktop: '960px',
      wide: '1370px',
    },
    container: {
      center: true,
      padding: '3rem',
      screens: {
        mobile: '100%',
        tablet: '500px',
        desktop: '700px',
        wide: '900px',
      },
    },
    extend: {
      keyframes: {
        skeleton: {
          '0%': { transform: ['translateX(-200px)', 'skewX(-30deg)'] },
          '100%': { transform: ['translateX(150px)'] },
        },
      },
      boxShadow: {
        ctaBorder: '0px 0px 0 1px rgb(var(--accent-0))',
      },
      colors: {
        accent: {
          0: 'rgb(var(--accent-0) / <alpha-value>)',
          1: 'rgb(var(--accent-1) / <alpha-value>)',
        },
        light: {
          0: '#e6e6e6',
          1: '#b3b3b3',
          muted: 'rgb(255 255 255 / 0.2)',
          inactive: 'rgb(255 255 255 / 0.3)',
        },
        dark: {
          0: 'rgb(var(--bg) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
