import { defineConfig, Plugin } from 'vite';
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
      resolvers: [ElementPlusResolver()]
    }) as Plugin,
    Components({
      resolvers: [ElementPlusResolver()]
    }) as Plugin,
    ElementPlus({}) as Plugin
  ]
});
