import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}', // Include JS and JSX files
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        foreground: '#f4f4f5',
        primary: '#00e0d0',
        secondary: '#1e1e2f',
        accent: '#3b82f6',
        muted: '#666',
        border: '#2a2a2a',
        mutedForeground: '#a1a1aa', // For muted text
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'ui-monospace'],
      },
      boxShadow: {
        glowing: '0 0 12px rgba(0, 224, 208, 0.3)',
      },
      borderRadius: {
        md: '10px',
        lg: '14px',
        xl: '0.75rem',
        full: '9999px',
      },
      backdropBlur: {
        md: '6px',
      },
      typography: (theme) => ({
        invert: {
          css: {
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary/90'),
              },
            },
            h1: {
              color: theme('colors.foreground'),
            },
            h2: {
              color: theme('colors.foreground'),
            },
            h3: {
              color: theme('colors.foreground'),
            },
            blockquote: {
              color: theme('colors.mutedForeground'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
  resolve: {
    alias: {
      '@': './src', // Ensure alias for '@' is defined
    },
  },
};
export default config;
