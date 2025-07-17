import { defineConfig } from 'vite';
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  base: '/', // 线上打包路径改为绝对路径，防止打包后，资源文件路径出现上述错误
  ssr: {
    noExternal: ['element-plus', 'dnhyxc-ui-plus-beta1']
  },
  plugins: [
    viteDemoPreviewPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    ElementPlus({})
  ]
});
