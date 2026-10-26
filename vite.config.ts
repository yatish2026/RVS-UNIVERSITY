import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  root: fs.realpathSync(process.cwd()),
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
});
