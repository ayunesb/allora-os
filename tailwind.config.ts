import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background-start))',
        foreground: 'var(--foreground)',
        primary: '#5A67D8',
        secondary: '#63B3ED',
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        card: 'rgba(15,15,35,0.7)',
        input: 'hsl(var(--input-bg))',
        border: 'hsl(var(--border))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
      },
    },
  },
  plugins: [forms],
};

export default config;
