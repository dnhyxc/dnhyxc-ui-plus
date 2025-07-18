import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/index.ts', 'src/**/*.test.*']
    },
    setupFiles: ['test/setup.ts']
  }
});
