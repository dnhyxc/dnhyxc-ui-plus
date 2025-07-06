import { defineConfig } from 'vite';
// import { rmSync } from 'fs';
import vue from '@vitejs/plugin-vue';
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import path from 'path';
import dts from 'vite-plugin-dts';
import { external } from './external';

// 打包前先删除 dist 目录
// rmSync('dist', { recursive: true, force: true });

// 组件库打包配置
export default defineConfig({
  build: {
    // 打包输出目录
    outDir: 'dist',
    // 构建库模式
    lib: {
      // 组件库入口文件
      entry: '',
      // 输出格式
      formats: ['es', 'umd']
      // // 输出文件名
      // fileName: (format) => `index.${format}.js`,
      // // 在 UMD 构建模式下为这个包指定一个全局变量名称
      // name: 'dnhyxc-ui-plus'
    },
    rollupOptions: {
      // 外部化处理依赖
      external,
      input: ['./index.ts'],
      output: [
        {
          // 输出文件名格式
          entryFileNames: '[name].mjs',
          // 输出格式为 ES Module
          format: 'es',
          // ES Module 格式文件的输出目录
          // dir: './dist',
          chunkFileNames: 'dist/index.mjs',
          // 保持目录结构
          // preserveModules: true,
          // 指定输出文件的根目录，将所有模块放在 components 目录下，这样可以保持更清晰的目录结构
          // preserveModulesRoot: 'src',
          assetFileNames: 'index.[ext]'
        },
        {
          entryFileNames: '[name].js',
          chunkFileNames: 'dist/index.cjs',
          format: 'cjs',
          name: 'dnhyxc-ui-plus',
          // 输出文件夹
          dir: './dist',
          // 保持目录结构
          // preserveModules: true,
          // // 输出目录
          // preserveModulesRoot: 'src',
          assetFileNames: 'index.[ext]'
          // UMD格式下需要指定全局变量名， 这样在浏览器中通过 <script> 标签引入时，就会从 window.Vue 获取 Vue 依赖
          // globals: {
          //   vue: 'Vue'
          // }
        }
      ]
    }
  },
  plugins: [
    vue(),
    // 生成组件的类型声明文件
    dts({
      include: ['./**/*'],
      outDir: ['./dist']
    })
  ]
});
