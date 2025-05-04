import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version)
  }
});
