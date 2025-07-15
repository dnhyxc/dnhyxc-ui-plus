import path from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import semver from 'semver';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'), // 你的入口文件路径
      fileName: (format: string) => `dnhyxc-ui-plus.${format}.js` // 输出文件的命名规则
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', /\.scss/, 'element-plus', 'element-plus/dist/index.css'],
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
      include: ['./**/*'],
      outDir: ['../dnhyxc-ui-plus/es', '../dnhyxc-ui-plus/lib'],
      exclude: ['vite.config.ts', 'script']
      // entryRoot: './src',
      // outDir: ['../dnhyxc-ui-plus/es/src', '../dnhyxc-ui-plus/lib/src']
      // 指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      // tsConfigPath: '../../tsconfig.json'
    }),
    {
      name: 'style',
      generateBundle(config, bundle) {
        //这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle);

        for (const key of keys) {
          const bundler = bundle[key] as { code: string };
          //rollup内置方法,将所有输出文件code中的.scss换成.css
          this.emitFile({
            type: 'asset',
            fileName: key, //文件名名不变
            source: bundler.code.replace(/\.scss/g, '.css')
          });
        }
      }
    },
    {
      name: 'update-package-json',
      closeBundle() {
        // 确保读取路径正确
        const packageJsonPath = path.resolve(__dirname, 'package.json');

        // 检查源 package.json 是否存在
        if (!existsSync(packageJsonPath)) {
          console.error(`Error: package.json file not found at ${packageJsonPath}`);
          return;
        }

        // 读取并更新 package.json 的版本号
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        packageJson.version = semver.inc(packageJson.version, 'patch');
        // 更新输出文件的内容
        const updatedPackageJson = {
          name: 'dnhyxc-ui-plus',
          version: packageJson.version,
          main: 'lib/index.js',
          module: 'es/index.mjs',
          files: ['es', 'lib'],
          keywords: ['dnhyxc-ui-plus', 'vue3组件库'],
          sideEffects: ['**/*.css'],
          author: packageJson.author,
          license: packageJson.license,
          description: packageJson.description || '',
          typings: 'lib/index.d.ts'
        };
        // 输出目录路径，设置为 dnhyxc-ui-plus
        const outputDir = path.resolve(__dirname, '../dnhyxc-ui-plus');
        const outputPackageJsonPath = path.join(outputDir, 'package.json');

        try {
          // 检查并创建 dnhyxc-ui-plus 目录
          if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
          }

          // 写入更新后的 package.json 到 dnhyxc-ui-plus 目录
          writeFileSync(outputPackageJsonPath, JSON.stringify(updatedPackageJson, null, 2));

          // 更新源 package.json 文件的版本号
          writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

          console.log(`New version ${packageJson.version} updated and package.json written to dnhyxc-ui-plus folder.`);
        } catch (err) {
          console.error(`Error writing package.json: ${(err as Error).message}`);
        }
      }
    }
  ]
});
