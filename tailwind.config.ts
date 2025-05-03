import { type Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

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
        primary: 'var(--primary)',
        card: 'var(--card-bg)',
        background: 'var(--background-start)',
        foreground: 'var(--foreground)',
        secondary: '#63B3ED',
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
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
  plugins: [forms, typography],
};

export default config;
