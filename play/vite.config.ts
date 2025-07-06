import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass', // 使用 sass 原始样式
          directives: true, // 指令按需导入
          version: '2.3.4' // 指定 Element-Plus 版本
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass', // 使用 sass 原始样式
          directives: true, // 指令按需导入
          version: '2.3.4' // 指定 Element-Plus 版本
        })
      ]
    }),
    ElementPlus({})
  ]
});
