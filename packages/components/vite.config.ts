import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { replaceStyleExtPlugin, createPackagePlugin } from './plugins';
import { external } from './scripts/build/external';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'), // 你的入口文件路径
      fileName: (format: string) => `dnhyxc-ui-plus.${format}.js` // 输出文件的命名规则
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external,
      output: [
        {
          //打包成 ES 模块格式，适用于现代 JavaScript 环境
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../dnhyxc-ui-plus/es'
        },
        {
          //打包成 CommonJS 模块格式，适用于 Node.js 环境
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../dnhyxc-ui-plus/lib'
        }
      ]
    }
  },
  plugins: [
    vue(),
    dts({
      // include: ['./**/*'],
      // outDir: ['../dnhyxc-ui-plus/es', '../dnhyxc-ui-plus/lib'],
      // exclude: ['vite.config.ts', 'script', 'plugins', 'coverage']
      // tsconfigPath: '../../tsconfig.json',
      include: ['./src', './utils', './index.ts'],
      outDir: ['../dnhyxc-ui-plus/es', '../dnhyxc-ui-plus/lib'],
      exclude: ['./src/**/__tests__']
    }),
    replaceStyleExtPlugin(),
    createPackagePlugin({
      name: 'dnhyxc-ui-plus',
      main: 'lib/index.js',
      module: 'es/index.mjs',
      files: ['es', 'lib'],
      keywords: ['dnhyxc-ui-plus', 'library', 'vue3', 'element-plus'],
      sideEffects: ['**/*.css'],
      typings: 'es/index.d.ts',
      packageJsonPath: path.resolve(__dirname, 'package.json'),
      outputDir: path.resolve(__dirname, '../dnhyxc-ui-plus'),
      repository: {
        type: 'git',
        url: 'git+https://github.com/dnhyxc/dnhyxc-ui-plus.git'
      },
      bugs: {
        url: 'https://github.com/dnhyxc/dnhyxc-ui-plus/issues'
      },
      homepage: 'https://github.com/dnhyxc/dnhyxc-ui-plus/blob/master/README.md'
    })
  ]
});
