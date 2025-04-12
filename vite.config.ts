
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Vite Configuration
 * 
 * Configures the build process, development server,
 * and optimization settings for the application.
 */
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
        // Improved chunk splitting strategy for better caching
        manualChunks: (id) => {
          // Create separate chunks for large libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('lucide')) {
              return 'vendor-icons';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            return 'vendor-other';
          }
          
          // Create feature-based chunks for application code
          if (id.includes('/components/campaigns')) {
            return 'feature-campaigns';
          }
          if (id.includes('/components/social-media')) {
            return 'feature-social-media';
          }
          if (id.includes('/components/dashboard')) {
            return 'feature-dashboard';
          }
          if (id.includes('/components/ui')) {
            return 'ui-components';
          }
          if (id.includes('/hooks/')) {
            return 'app-hooks';
          }
          if (id.includes('/utils/')) {
            return 'app-utils'; 
          }
        }
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
  
  // Optimize dependencies during build
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@tanstack/react-query',
      'date-fns',
      'lucide-react',
      'sonner'
    ]
  }
}));
