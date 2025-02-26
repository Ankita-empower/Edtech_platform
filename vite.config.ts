import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['1594-103-15-66-85.ngrok-free.app'],
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://96c8-103-15-66-85.ngrok-free.app', // Your backend URL
  //       changeOrigin: true,   // Ensures the origin header matches the target server
  //       secure: false,        // If using HTTPS with self-signed certificates, set this to false
  //       rewrite: (path) => path.replace(/^\/api/, ''), // Strips the /api prefix
  //     },
  //   },
  // },
});
