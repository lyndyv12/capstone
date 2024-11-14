import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'; 


console.log(`api need to run on ${serverPort} for vite server`);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: import.meta.env.PORT || 3000,
    proxy: {
      '/api': backendUrl,
    }
  },
  build: {
    rollupOptions: {
      external: ['@mui/material/*', '@mui/icons-material/*'],
    },
  },
})
