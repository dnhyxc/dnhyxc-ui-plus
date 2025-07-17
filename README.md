## 初始化项目

在根目录下使用 `pnpm init` 生成 `package.json` 文件：

```json
{
  "name": "dnhyxc-ui",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.8.1"
}
```

## 配置 pnpm monorepo

在项目根目录下同时创建 `packages` 文件夹及 `pnpm-workspace.yaml` 文件，`pnpm-workspace.yaml` 内容如下：

```yaml
packages:
  - 'packages/**'
```

## typescript 环境配置

在项目根目录下使用 `pnpm i typescript -Dw` 安装 `typescript` 依赖。

```yaml
pnpm i typescript -Dw
```

在项目根目录下创建 `tsconfig.json` 文件，内容如下：

```json
{
  "types": ["node"],
  "compilerOptions": {
    "baseUrl": ".",
    "declaration": false, // 不生成声明文件
    "target": "ES2021",
    "lib": ["DOM", "ES2021"],
    "module": "ESNext",
    "jsx": "preserve", // 不转 jsx
    "allowSyntheticDefaultImports": true, // 允许使用默认导入
    "experimentalDecorators": true, // 启用装饰器
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true, // 跳过类库检查
    "isolatedModules": true, // 每个文件都是模块
    "resolveJsonModule": true, // 解析json文件
    "removeComments": true, // 移除注释
    // moduleResolution 用于指定 TypeScript 如何解析模块
    // "bundler" 表示使用与打包工具(如 Webpack、Vite 等)兼容的模块解析策略
    // 它支持 package.json 的 "exports" 字段，并遵循现代打包工具的模块解析规则
    "moduleResolution": "bundler",
    "esModuleInterop": true, // 支持 es6 commonjs 模块
    "useDefineForClassFields": true, // 使用defineClassFields
    "allowImportingTsExtensions": true, // 允许导入ts文件
    "noImplicitAny": true, // 不允许隐式any
    "noLib": false, // 不处理类库
    "forceConsistentCasingInFileNames": true // 强制区分文件名大小写
  },
  "include": ["./packages/**/*"],
  "exclude": ["node_modules", "packages/dnhyxc-ui-plus/**", "**__tests__"]
}
```

## 组件开发

根目录下 `packages/components` 具体文件目录如下：

```
packages
└── components
    └── src
        └── button
            ├── index.ts
            ├── index.vue
            ├── style
            │   └── index.scss
            └── types.ts
    └── utils
        ├── bem.ts
        └── index.ts
```

在根目录下创建 `packages` 文件夹，同时在 `packages` 文件夹下创建 `components` 文件夹，进入 `packages/components` 文件夹，使用 `pnpm init` 生成 `package.json` 文件，并将内容修改为如下：

```json
{
  "name": "dnhyxc-ui-plus",
  "version": "0.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["vue3", "ui", "library"],
  "author": "@dnhyxc",
  "license": "ISC",
  "description": "a ui library for vue3"
}
```

在 `packages/components` 文件夹下创建 `utils` 文件夹。

在 `packages/components/utils` 文件夹下分别创建 `bem.ts`、`index.ts` 文件。其中 `bem.ts` 用于存放 `bem` 命名规范，`index.ts` 用于存放用于组件全局引用的 `install` 方法。

> 如果需要直接使用 `app.use()` 来挂载整个组件库，需要为组件添加 `install` 方法。

- bem.ts 文件内容如下：

```ts
// bem 规范 block 代码块 element 元素 modifier 装饰
// n-button n-button--primary n-button--disabled
const _bem = (prefix: string, blockSuffix: string, element: string, modifier: string) => {
  if (blockSuffix) {
    prefix += `-${blockSuffix}`;
  }
  if (element) {
    prefix += `__${element}`;
  }
  if (modifier) {
    prefix += `--${modifier}`;
  }
  return prefix;
};

const createBEM = (prefix: string = '') => {
  const b = (blockSuffix: string = '') => _bem(prefix, blockSuffix, '', '');

  const e = (element: string = '') => (element ? _bem(prefix, '', element, '') : '');

  const m = (modifier: string = '') => (modifier ? _bem(prefix, '', '', modifier) : '');

  const be = (blockSuffix: string = '', element: string = '') =>
    blockSuffix && element ? _bem(prefix, blockSuffix, element, '') : '';

  const em = (element: string = '', modifier: string = '') =>
    element && modifier ? _bem(prefix, '', element, modifier) : '';

  const bm = (blockSuffix: string = '', modifier: string = '') =>
    blockSuffix && modifier ? _bem(prefix, blockSuffix, '', modifier) : '';

  const bem = (blockSuffix: string = '', element: string = '', modifier: string = '') =>
    blockSuffix && element && modifier ? _bem(prefix, blockSuffix, element, modifier) : '';

  const is = (name: string, status: boolean) => (status ? `is-${name}` : '');

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
};

export const createNamespace = (name: string) => {
  const prefix = `n-${name}`;
  return createBEM(prefix);
};
```

- index.ts 文件内容如下：

```ts
import type { App, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

// withInstall 用于给组件添加 install 方法，方便使用 app.use() 全局引用
export const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as { name: string }).name;
    app.component(name, comp as SFCWithInstall<T>);
  };
  return comp as SFCWithInstall<T>;
};
```

在 `packages/components` 文件夹下创建 `src` 文件夹。

在 `packages/components/src` 文件夹下创建 `button` 文件夹。

在 `packages/components/src/button` 文件夹下分别创建 `types.ts`、`index.vue`、`style/index.scss`、`index.ts`文件。

- types.ts 用于存放组件所需要的一些属性的类型定义，具体内容如下：

```ts
import { type ExtractPropTypes, type PropType } from 'vue';
import type Button from './index.vue';
export const buttonProps = {
  size: String as PropType<'large' | 'default' | 'small'>,
  color: String,
  disabled: Boolean,
  loading: Boolean,
  link: Boolean,
  type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'never'>
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type ButtonInstance = InstanceType<typeof Button> & unknown;

// 定义这个是为了让组件在业务中使用时，可以有组件所需的类型提示
declare module 'vue' {
  export interface GlobalComponents {
    NButton: typeof Button;
  }
}
```

- index.vue 是组件具体实现代码，具体内容如下：

```vue
<template>
  <div :class="bem.b()" v-bind="$attrs">
    <el-button :type="type" :size="size" :disabled="disabled" :link="link" :loading="loading">
      dnhyxc-ui button
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
import { buttonProps } from './types';
import { createNamespace } from '../../utils/bem';
import './style/index.scss';

const bem = createNamespace('button');

// defineOptions 用于给组件添加 name 属性
defineOptions({
  name: 'n-button'
});

const props = defineProps(buttonProps);
</script>
```

- style/index.scss 是组件的样式代码，具体内容如下：

```scss
.n-button {
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  height: 32px;
  line-height: 15px;
  background-color: #409eff;
  transition: border-color 0.25s;
  cursor: pointer;
}

.n-button:hover {
  background-color: #88b9f9;
}
```

- index.ts 是组件的入口文件，具体内容如下：

```ts
import { withInstall } from '../../utils';
import _Button from './index.vue';

// 使用 withInstall 给组件添加 install 方法，方便使用 app.use() 全局引用
const Button = withInstall(_Button);

export { Button };

export default Button;
```

## 搭建组件预览（测试）环境

在根目录下运行 `create-vite play --template vue-ts` 命令，创建 `play` 组件测试项目。

进入到 `play` 目录中，运行 `pnpm i` 安装依赖。

在项目根目录下的 `pnpm-workspace.yaml` 文件中将 `play` 项目添加到 `packages` 中。

```yaml
packages:
  - 'packages/**'
  - 'play'
```

同时使用 `pnpm i dnhyxc-ui-plus --workspace` 命令，将 `dnhyxc-ui-plus` 组件库安装到 `play` 项目中。

## 使用 dnhyxc-ui-plus 组件库

### 局部导入

在 `App.vue` 文件中使用局部导入使用 `n-button` 组件。

```vue
<template>
  <n-button type="primary" size="large" />
</template>

<script setup lang="ts">
import { NButton } from 'dnhyxc-ui-plus-beta1';
</script>
```

### 全局导入

在 `main.ts` 文件中使用全局导入使用 `dnhyxc-ui-plus` 组件。

```ts
import { createApp } from 'vue';
import dnhyxcUI from 'dnhyxc-ui-plus';
import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(dnhyxcUI);
app.mount('#app');
```

除了上述注册所有组件的方式，还可以使用 `app.use(NButton)` 来注册指定组件。

```ts
import { createApp } from 'vue';
import { NButton } from 'dnhyxc-ui-plus';
import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(NButton);
app.mount('#app');
```

通过上述方式，在 `App.vue` 文件中就不需要再导入 `NButton` 组件了，可以直接使用 `n-button` 组件。

```vue
<template>
  <n-button type="primary" size="large" />
</template>
```

## 组件打包

在 `packages/components` 目录下安装打包所需要的依赖。

```bash
pnpm i vite @vitejs/plugin-vue vite-plugin-dts @types/node semver @types/semver -D
```

> - @vitejs/plugin-vue @vitejs/plugin-vue 的主要作用是为Vite 提供对 Vue 3 语法和单文件组件的支持，并提供一些额外的功能，如 JSX/TSX 支持、Vue 组件库的自动按需导入、环境变量的通用设置等。
> - vite-plugin-dts 用于生成组件库的类型声明文件。
> - @types/node 用于支持 node 环境下的类型声明，即如果使用到了 path，fs 等就需要安装。
> - semver 用于处理版本号。

在 `packages/components` 文件夹下创建 `plugins` 文件夹，在其中分别创建 `replaceStyleExtPlugin.ts`、`updateVersionPlugin.ts` 及 `index.ts` 文件。

- replaceStyleExtPlugin.ts 文件用于编写将组件（button/index.vue）中引入的 `scss` 文件后缀替换为 `css` 文件后缀的 `vite plugin`。

!!! info 替换 scss 为 css 的原因
由于 scss 样式，在下文中会介绍通过 gulp 来将 scss 文件打包成 css 文件，因此在 vite.config.ts 中将不需要处理样式文件，所以需要将代码中引入的样式文件后缀 .scss 手动替换为 .css 文件后缀，这样才能在打包后的组件中正确导入打包后的 css 样式文件。
!!!

```ts
import { type PluginOption } from 'vite';

// 替换 vue 文件中的 .scss 后缀为 .css
export function replaceStyleExtPlugin(): PluginOption {
  return {
    name: 'replace-style-ext-plugin',
    generateBundle(config, bundle) {
      const keys = Object.keys(bundle);
      for (const key of keys) {
        const bundler = bundle[key] as { code: string };
        // rollup内置方法，将所有输出文件 code 中的 .scss 换成 .css
        this.emitFile({
          type: 'asset',
          fileName: key, //文件名名不变
          source: bundler.code.replace(/\.scss/g, '.css')
        });
      }
    }
  };
}
```

- updateVersionPlugin.ts 文件用于编写向打包输出的文件夹中添加 package.json 信息的 `vite plugin`，方便后续发布组件库。

```ts
import path from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import semver from 'semver';

interface PackageJson {
  name: string;
  main: string;
  module: string;
  files: string[];
  keywords: string[];
  sideEffects: string[];
  typings: string;
  packageJsonPath: string;
  outputDir: string;
}

export function updateVersionPlugin(info: PackageJson) {
  const { name, main, module, files, keywords, sideEffects, typings, packageJsonPath, outputDir } = info;
  return {
    name: 'update-package-json',
    closeBundle() {
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
        name,
        version: packageJson.version,
        main,
        module,
        files,
        keywords,
        sideEffects,
        typings,
        author: packageJson.author,
        license: packageJson.license,
        description: packageJson.description || ''
      };
      // 输出目录路径，设置为 dnhyxc-ui-plus
      const outputPackageJsonPath = path.join(outputDir, 'package.json');
      try {
        // 检查并创建 dnhyxc-ui-plus 目录
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }
        // 写入更新后的 package.json 到 dnhyxc-ui-plus 目录
        writeFileSync(outputPackageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
        // 更新 outputDir 中的 package.json 文件的版本号
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(`已成功更新版本号 ${packageJson.version} 到 ${name} 文件夹中`);
      } catch (err) {
        console.error(`package.json 写入错误: ${(err as Error).message}`);
      }
    }
  };
}
```

- index.ts 文件用于导出 `vite plugin`。

```ts
export * from './relpace-style-ext-plugin';
export * from './update-version-plugin';
```

在 `packages/components` 文件夹下创建 `vite.config.ts` 文件，具体内容如下：

```ts
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { replaceStyleExtPlugin, updateVersionPlugin } from './plugins';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'), // 你的入口文件路径
      fileName: (format: string) => `dnhyxc-ui-plus.${format}.js` // 输出文件的命名规则
    },
    rollupOptions: {
      // 排除不需要打包的依赖，因为在业务项目中会安装 vue、element-plus，scss 样式代码，会通过 gulp 单独打包，因此这里需要排除
      external: ['vue', /\.scss/, 'element-plus', 'element-plus/dist/index.css'],
      output: [
        {
          // 打包成 ES 模块格式，适用于现代 JavaScript 环境
          format: 'es',
          // 打包后文件名
          entryFileNames: '[name].mjs',
          // 让打包输出的目录和未打包是的组件目录对应
          preserveModules: true,
          exports: 'named',
          // 配置打包根目录
          dir: '../dnhyxc-ui-plus/es'
        },
        {
          // 打包成 CommonJS 模块格式，适用于 Node.js 环境
          format: 'cjs',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包输出的目录和未打包是的组件目录对应
          preserveModules: true,
          exports: 'named',
          // 配置打包根目录
          dir: '../dnhyxc-ui-plus/lib'
        }
      ]
    }
  },
  plugins: [
    vue(),
    // 打包生成类型声明文件
    dts({
      include: ['./**/*'],
      outDir: ['../dnhyxc-ui-plus/es', '../dnhyxc-ui-plus/lib'],
      exclude: ['vite.config.ts', 'script', 'plugins']
    }),
    // 替换组件中导入的 scss 为 css
    replaceStyleExtPlugin(),
    // 向打包输出的文件中添加 package.json 信息
    updateVersionPlugin({
      name: 'dnhyxc-ui-plus',
      main: 'lib/index.js',
      module: 'es/index.mjs',
      files: ['es', 'lib'],
      keywords: ['dnhyxc-ui-plus', 'library', 'vue3', 'element-plus'],
      sideEffects: ['**/*.css'],
      typings: 'es/index.d.ts',
      packageJsonPath: path.resolve(__dirname, 'package.json'),
      outputDir: path.resolve(__dirname, '../dnhyxc-ui-plus')
    })
  ]
});
```

## 组件样式打包

组件样式打包使用 `gulp` 来辅助实现，在项目根目录下安装 `gulp` 及相关依赖。

```bash
pnpm i gulp sass gulp-sass gulp-clean-css gulp-autoprefixer @types/gulp @types/gulp-autoprefixer @types/gulp-clean-css @types/gulp-sass -D
```

在 `packages/components` 文件夹下创建 `scripts` 文件夹，同时在 `packages/components/scripts` 文件夹下分别创建 `delpath.ts`、`paths.ts`、`index.ts`、`run.ts` 文件。

- delpath.ts 文件用于删除指定目录下的文件。

```ts
import fs from 'fs';
import { resolve } from 'path';
import { pkgPath } from './paths';
//保留的文件
const stayFile = ['README.md'];

const delPath = async (path: string) => {
  let files: string[] = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);

    files.forEach(async (file) => {
      let curPath = resolve(path, file);

      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        if (file != 'node_modules') await delPath(curPath);
      } else {
        // delete file
        if (!stayFile.includes(file)) {
          fs.unlinkSync(curPath);
        }
      }
    });

    if (path !== `${pkgPath}/dnhyxc-ui-plus`) fs.rmdirSync(path);
  }
};
export default delPath;
```

- paths.ts 文件用于定义一些路径。

```ts
import { resolve } from 'path';

// 组件库根目录
export const componentPath = resolve(__dirname, '../../');

// pkg根目录
export const pkgPath = resolve(__dirname, '../../../');
```

- run.ts 文件用于执行 `shell` 命令。

```ts
import { spawn } from 'child_process';

export default async (command: string, path: string) => {
  // cmd 表示命令，args 代表参数，如 rm -rf  rm 就是命令，-rf 就为参数
  const [cmd, ...args] = command.split(' ');
  return new Promise((resolve) => {
    const app = spawn(cmd, args, {
      cwd: path, // 执行命令的路径
      stdio: 'inherit', // 输出共享给父进程
      shell: true // mac 不需要开启，windows 下 git base 需要开启支持
    });
    // 执行完毕关闭并 resolve
    app.on('close', resolve);
  });
};
```

- index.ts 文件用于打包样式资源及执行组件打包命令等。

```ts
import delPath from './delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from './paths';
import glupSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import run from './run';

// 删除 dnhyxc-ui-plus
export const removeDist = () => {
  return delPath(`${pkgPath}/dnhyxc-ui-plus`);
};

// 打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};

export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.scss`, { ignore: [`${componentPath}/**/node_modules/**`] })
    .pipe(glupSass(dartSass)())
    .pipe(
      autoprefixer(
        { cascade: false } //文件不缓存
      )
    )
    .pipe(cleanCSS({ compatibility: 'ie8' })) // 压缩css文件
    .pipe(dest(`${pkgPath}/dnhyxc-ui-plus/es/src`))
    .pipe(dest(`${pkgPath}/dnhyxc-ui-plus/lib/src`));
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
```

打包配置完成后，需要分别在 `根目录`及 `packages/components` 文件目录下的 `package.json` 文件中添加 `build` 命令了。

- packages/components/package.json 文件内容如下：

```json
{
  // ...
  "scripts": {
    "build": "gulp -f packages/components/script/build/index.ts"
  }
  // ...
}
```

- 根目录下的 package.json 文件内容如下：

```json
{
  // ...
  "scripts": {
    "build": "gulp -f packages/components/script/build/index.ts"
  }
  // ...
}
```

至此，组件打包配置就完成了，接下来就可以在项目根目录下运行 `pnpm run build` 命令来打包组件了。如果中间没有报错，那么就可以在 `packages` 目录下出现打包后的 `dnhyxc-ui-plus` 文件夹了。
