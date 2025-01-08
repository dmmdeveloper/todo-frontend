import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": {
        target: "https://todo-server-six-ashen.vercel.app",
        changeOrigin: true, // Ensures the Host header matches the target
        rewrite: (path) => path.replace(/^\/user/, ""), // Strips '/user' from the proxy path
      },
    },}
})
