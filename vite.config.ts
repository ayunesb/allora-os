
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [],
      },
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add explicit alias for three to ensure consistent versioning
      'three': path.resolve(__dirname, './node_modules/three'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    // Exclude problematic packages from optimization
    exclude: ['@react-three/drei/node_modules/three-mesh-bvh'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
      // Explicitly tell Rollup to ignore the BatchedMesh import issue
      onwarn(warning, warn) {
        if (warning.code === 'MISSING_EXPORT' && warning.message.includes('BatchedMesh')) {
          return;
        }
        warn(warning);
      },
    },
  },
  server: {
    port: 8080,
    host: '::',
    allowedHosts: ['.lovableproject.com'],
    hmr: {
      clientPort: 443,
      overlay: true,
    },
  },
  preview: {
    port: 8080,
    host: '::',
  },
}));
