import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /\.(js|jsx|ts|tsx)$/, // Include .js and .jsx files
    exclude: [],
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
