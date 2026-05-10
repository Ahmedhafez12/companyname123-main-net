import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Dev-only middleware: proxy /.netlify/functions/* to the function handlers.
// Lets `npm run dev` invoke Netlify Functions without needing `netlify dev`.
function netlifyFunctionsDev(env: Record<string, string>): Plugin {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      // Make function env vars available to handlers loaded below.
      for (const [k, v] of Object.entries(env)) {
        if (!process.env[k]) process.env[k] = v;
      }
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/.netlify/functions/')) return next();
        const fnName = req.url.replace('/.netlify/functions/', '').split('?')[0];
        try {
          const mod = await server.ssrLoadModule(`/netlify/functions/${fnName}.ts`);
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const body = Buffer.concat(chunks).toString('utf8');
          const result = await mod.handler({ httpMethod: req.method || 'GET', body });
          res.statusCode = result.statusCode;
          for (const [k, v] of Object.entries(result.headers || {})) res.setHeader(k, v as string);
          res.end(result.body);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(`[netlify-fn dev] ${fnName} failed:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Function failed in dev', detail: String(err) }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'react-error-boundary'],
  },
  plugins: [
    react(),
    netlifyFunctionsDev(loadEnv(mode, process.cwd(), '')),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion'],
          'gsap-vendor': ['gsap'],
          'styled-vendor': ['styled-components'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
}));