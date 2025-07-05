import { defineConfig } from 'vite';
import { rmSync } from 'fs';
import dts from 'vite-plugin-dts';

// 打包前先删除 dist 目录
rmSync('dist', { recursive: true, force: true });

// 组件库打包配置
export default defineConfig({
  build: {
    // 打包输出目录
    outDir: 'es',
    // 构建库模式
    lib: {
      // 组件库入口文件
      entry: './index.ts'
      // // 输出格式
      // formats: ['es']
    },
    rollupOptions: {
      // 外部化处理依赖
      input: ['./index.ts'],
      output: [
        {
          // 输出文件名格式
          entryFileNames: '[name].js',
          // 输出格式为 ES Module
          format: 'es',
          // ES Module 格式文件的输出目录
          dir: 'dist',
          // 保持目录结构
          preserveModules: true,
          // 指定输出文件的根目录，将所有模块放在 components 目录下，这样可以保持更清晰的目录结构
          preserveModulesRoot: 'src'
        }
        // {
        //   entryFileNames: '[name].js',
        //   format: 'cjs',
        //   name: 'dnhyxc-ui',
        //   // 输出文件夹
        //   dir: 'dist/lib',
        //   // 保持目录结构
        //   preserveModules: true,
        //   // 输出目录
        //   preserveModulesRoot: 'src'
        //   // UMD格式下需要指定全局变量名， 这样在浏览器中通过 <script> 标签引入时，就会从 window.Vue 获取 Vue 依赖
        //   // globals: {
        //   //   vue: 'Vue'
        //   // }
        // }
      ]
    }
  },
  plugins: [
    // 生成组件的类型声明文件
    dts({
      include: ['./**/*'],
      outDir: ['dist']
    })
  ]
});
