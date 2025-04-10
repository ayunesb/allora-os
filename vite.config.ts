
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
    // Add extensions to automatically resolve
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    // Output directory
    outDir: 'dist',
    
    // Disable source maps in production to avoid the errors with @tanstack/react-query
    sourcemap: mode !== 'production',
    
    // Configure rollup options
    rollupOptions: {
      output: {
        // Chunk files to improve caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui/button', '@/components/ui/card', '@/components/ui/dialog'],
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
