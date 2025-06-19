import { defineConfig } from 'vite'
import { corsMiddleware } from './src/middleware/cors'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false
      }
    },
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  plugins: [
    {
      name: 'configure-server',
      configureServer(server) {
        server.middlewares.use(corsMiddleware())
        
        // Handle client-side routing
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/auth') || req.url?.startsWith('/dashboard')) {
            req.url = '/'
          }
          next()
        })
      }
    },
    {
      name: 'rewrite-assets',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('.ts') || id.endsWith('.js')) {
          return {
            code: code.replace(/@Velari_Logo\.png/g, '/Velari_Logo.png'),
            map: null
          }
        }
      }
    }
  ]
}) 