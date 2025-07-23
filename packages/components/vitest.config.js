import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 为了解决 TypeError: Unknown file extension ".css" 的报错，需要添加以下 ssr 配置
  // 配置 SSR 选项，将 element-plus 标记为不需要外部化的依赖
  // 这样可以确保在服务端渲染时正确处理 element-plus 的样式文件
  ssr: {
    noExternal: ['element-plus']
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/index.ts', 'src/**/*.test.*']
    },
    setupFiles: ['test/setup.ts']
  }
});
