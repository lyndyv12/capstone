import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const serverPort = process.env.PORT || 3000;
const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:3000'; 


console.log(`api need to run on ${serverPort} for vite server`);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
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
