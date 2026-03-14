import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' sem importar
    environment: 'jsdom', // Simula o navegador para testar componentes React
    setupFiles: './src/setupTests.ts', // Arquivo para configurar o jest-dom
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
