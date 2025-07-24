import { defineConfig, Plugin } from 'vite';
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin';
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons';

export default defineConfig({
  base: '/', // 线上打包路径改为绝对路径，防止打包后，资源文件路径出现上述错误
  // 为了解决打包 element-plus css 无法处理而报错问题的问题，需要添加以下 ssr 配置
  ssr: {
    noExternal: ['element-plus', 'dnhyxc-ui-plus']
  },
  plugins: [viteDemoPreviewPlugin(), groupIconVitePlugin() as Plugin]
});
