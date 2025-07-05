import { defineConfig } from 'vite';
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin';

export default defineConfig({
  base: '/', // 线上打包路径改为绝对路径，防止打包后，资源文件路径出现上述错误
  plugins: [viteDemoPreviewPlugin()]
});
