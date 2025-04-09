
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Output directory
    outDir: 'dist',
    
    // Enable source maps in production (helps with debugging without impacting performance)
    sourcemap: true,
    
    // Configure rollup options
    rollupOptions: {
      output: {
        // Chunk files to improve caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
          admin: ['@/components/admin'],
          dashboard: ['@/components/dashboard'],
        },
      },
    },
    
    // Enable aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console.log in production
        drop_debugger: mode === 'production', // Remove debugger statements in production
      },
    },
    
    // Improve chunk loading with modulepreload
    modulePreload: {
      polyfill: true,
    },
  },
  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  
  // Compiler options
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
}));
