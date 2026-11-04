import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// Resolve symlink / junction if working directory doesn't match canonical realpath
if (fs.existsSync(process.cwd())) {
  const realCwd = fs.realpathSync(process.cwd());
  if (process.cwd() !== realCwd) {
    process.chdir(realCwd);
  }
}

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
});

