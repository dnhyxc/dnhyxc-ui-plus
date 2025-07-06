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
    outDir: 'es',
    // 构建库模式
    lib: {
      // 组件库入口文件
      entry: './index.ts',
      // name: 'dnhyxc-ui',
      // // 根据不同格式输出到不同目录
      // fileName: (format, entryName) => {
      //   if (format === 'es') {
      //     return `${entryName}.mjs`;
      //   }
      //   return `${entryName}.js`;
      // },
      // 输出格式
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // 外部化处理依赖
      external,
      input: ['./index.ts'],
      output: [
        {
          // 输出文件名格式
          entryFileNames: '[name].js',
          // 输出格式为 ES Module
          format: 'es',
          // ES Module 格式文件的输出目录
          dir: './es',
          // 保持目录结构
          preserveModules: true,
          // 指定输出文件的根目录，将所有模块放在 components 目录下，这样可以保持更清晰的目录结构
          preserveModulesRoot: 'src',
          assetFileNames: 'index.[ext]',
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus'
          }
        },
        {
          entryFileNames: '[name].js',
          format: 'cjs',
          name: 'dnhyxc-ui-plus',
          // 输出文件夹
          dir: './lib',
          // 保持目录结构
          preserveModules: true,
          // 输出目录
          preserveModulesRoot: 'src',
          assetFileNames: 'index.[ext]',
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus'
          }
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
    // Components({
    //   // 关键配置：禁止自动导入样式
    //   resolvers: [ElementPlusResolver({})]
    // }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()]
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // }),
    // 生成组件的类型声明文件
    dts({
      include: ['./**/*'],
      outDir: ['./es', './lib']
    })
  ]
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, '.')
  //   }
  // }
});
