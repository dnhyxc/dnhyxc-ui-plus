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

```bash
packages:
  - 'packages/**'
```

## 项目环境配置

在项目根目录下安装项目运行所需要的依赖。

```bash
pnpm i vue element-plus -w

pnpm i typescript sass -Dw
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
    └── index.ts
```

在根目录下创建 `packages` 文件夹，同时在 `packages` 文件夹下创建 `components` 文件夹，进入 `packages/components` 文件夹，使用 `pnpm init` 生成 `package.json` 文件，并将内容修改为如下：

```json
{
  "name": "@dnhyxc-ui/components",
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

- packages/components/src/button/types.ts 用于存放组件所需要的一些属性的类型定义，具体内容如下：

```ts
import { type ExtractPropTypes, type PropType } from 'vue';
import type Button from './index.vue';
export const buttonProps = {
  size: String as PropType<'large' | 'default' | 'small'>,
  color: String,
  disabled: Boolean,
  loading: Boolean,
  link: Boolean,
  type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'never'>,
  width: String,
  height: String
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

- packages/components/src/button/index.vue 是组件具体实现代码，具体内容如下：

```vue
<template>
  <div :class="bem.b()" v-bind="$attrs">
    <el-button :type="type" :size="size" :disabled="disabled" :link="link" :loading="loading" :style="styles">
      <slot>dnhyxc-ui button</slot>
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

const styles = computed<CSSProperties>(() => {
  const { size, color, width, height } = props;
  if (!size && !color && !width && !height) return {};
  return {
    ...(size ? { 'font-size': size + 'px' } : {}),
    ...(width ? { width: width + 'px' } : {}),
    ...(height ? { height: height + 'px' } : {}),
    ...(color ? { color: color } : {})
  };
});
</script>
```

- packages/components/src/button/style/index.scss 是组件的样式代码，具体内容如下：

```scss
.n-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

- packages/components/src/button/index.ts 是组件的入口文件，具体内容如下：

```ts
import { withInstall } from '../../utils';
import _Button from './index.vue';

// 使用 withInstall 给组件添加 install 方法，方便使用 app.use() 全局引用
const Button = withInstall(_Button);

export { Button };

export default Button;
```

在 `packages/components/src` 文件夹下创建 `index.ts` 入口文件，用于导出组件。

- packages/components/src/index.ts：

```ts
export * from './button';
```

在 `packages/components` 文件夹下创建 `index.ts` 作为所有组件的入口文件。

- packages/components/index.ts：

```ts
import { App } from 'vue';
import * as components from './src/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 也导出所有单个组件，支持按需引入
export * from './src/index';

export default {
  install: (app: App) => {
    app.use(ElementPlus);
    for (let c in components) {
      app.use(components[c as keyof typeof components]);
    }
  }
};
```

## 搭建组件预览（测试）环境

在根目录下运行 `create-vite play --template vue-ts` 命令，创建 `play` 组件测试项目。

在项目根目录下的 `pnpm-workspace.yaml` 文件中将 `play` 项目添加到 `packages` 中。

```yaml
packages:
  - 'packages/**'
  - 'play'
```

进入到 `play` 目录中，运行 `pnpm i` 安装依赖。

同时使用 `pnpm i @dnhyxc-ui/components --workspace` 命令，将 `@dnhyxc-ui/components` 组件库安装到 `play` 项目中。

## 使用 @dnhyxc-ui/components 组件库

### 局部导入

在 `App.vue` 文件中使用局部导入使用 `Button` 组件。

```vue
<template>
  <Button type="primary" size="large" />
</template>

<script setup lang="ts">
import { Button } from '@dnhyxc-ui/components';
</script>
```

### 全局导入

在 `main.ts` 文件中使用全局导入使用 `@dnhyxc-ui/components` 组件。

```ts
import { createApp } from 'vue';
import { Button } from '@dnhyxc-ui/components';
import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(Button);
app.mount('#app');
```

通过上述方式，在 `App.vue` 文件中就不需要再导入 `Button` 组件了，可以直接通过 `n-button`（通过 defineOptions 定义的组件名称）使用组件。

```vue
<template>
  <n-button type="primary" size="large" />
</template>
```

## 组件打包

在项目根目录下安装打包所需要的依赖。

```bash
pnpm i vite @vitejs/plugin-vue vite-plugin-dts @types/node -Dw
```

> - @vitejs/plugin-vue @vitejs/plugin-vue 的主要作用是为 Vite 提供对 Vue 3 语法和单文件组件的支持，并提供一些额外的功能，如 JSX/TSX 支持、Vue 组件库的自动按需导入、环境变量的通用设置等。
> - vite-plugin-dts 用于生成组件库的类型声明文件。
> - @types/node 用于支持 node 环境下的类型声明，即如果使用到了 path，fs 等就需要安装。

在 `packages/components` 文件夹下创建 `plugins` 文件夹，在其中分别创建 `relpace-style-ext-plugin.ts`、`create-package-plugin.ts` 及 `index.ts` 文件。

- relpace-style-ext-plugin.ts 文件用于编写将组件（button/index.vue）中引入的 `scss` 文件后缀替换为 `css` 文件后缀的 `vite plugin`。

!!! hint 替换 scss 为 css 的原因
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

- create-package-plugin.ts 文件用于编写向打包输出的文件夹中添加 package.json 信息的 `vite plugin`，方便后续发布组件库。

```ts
import path from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';

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
  repository?: {
    type: string;
    url: string;
  };
  bugs?: {
    url: string;
  };
  homepage?: string;
}

export function createPackagePlugin(info: PackageJson) {
  const { name, main, module, files, keywords, sideEffects, typings, packageJsonPath, outputDir, ...args } = info;
  return {
    name: 'create-package-json',
    closeBundle() {
      // 检查源 package.json 是否存在
      if (!existsSync(packageJsonPath)) {
        console.error(`Error: package.json file not found at ${packageJsonPath}`);
        return;
      }
      // 读取并更新 package.json 的版本号
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
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
        author: {
          name: packageJson.author,
          github: `https://github.com/${packageJson.author}`
        },
        ...args,
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
export * from './create-package-plugin';
```

在 `packages/components` 文件夹下创建 `vite.config.ts` 文件，具体内容如下：

```ts
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { replaceStyleExtPlugin, createPackagePlugin } from './plugins';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'), // 你的入口文件路径
      fileName: (format: string) => `dnhyxc-ui-plus.${format}.js` // 输出文件的命名规则
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖，同时将 scss 样式资源也排除，因为后续 scss 资源将使用 gulp 进行打包
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
      include: ['./src', './utils', './index.ts'],
      outDir: ['../dnhyxc-ui-plus/es', '../dnhyxc-ui-plus/lib'],
      exclude: ['./src/**/__tests__']
    }),
    replaceStyleExtPlugin(),
    createPackagePlugin({
      name: 'dnhyxc-ui-vue-plus',
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
```

上述 `vite.config.ts` 配置中，不处理 `scss` 样式资源，由下文中提到的 `gulp` 进行辅助打包。

## 组件样式打包

组件样式打包使用 `gulp` 来辅助实现，在项目根目录下安装 `gulp` 及相关依赖。

```bash
pnpm i gulp sucrase sass gulp-sass gulp-clean-css gulp-autoprefixer @types/gulp @types/gulp-autoprefixer @types/gulp-clean-css @types/gulp-sass -Dw
```

在 `packages/components` 文件夹下创建 `scripts` 文件夹，同时在 `packages/components/scripts` 创建 `packages/components/scripts/build` 文件夹，在 `packages/components/scripts/build` 文件夹下分别创建 `delpath.ts`、`paths.ts`、`index.ts`、`run.ts` 文件。

- delpath.ts 文件用于删除指定目录下的文件。

```ts
import fs from 'fs';
import { resolve } from 'path';
import { pkgPath } from './paths';

// 需要保留的文件，CHANGELOG.md 在后续通过 changesets 发布包到 npm 上时需要用到，因此需要保留
const stayFile = ['README.md', 'CHANGELOG.md'];

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
  return src(`${componentPath}/src/**/style/**.scss`, {
    ignore: [`${componentPath}/**/node_modules/**`]
  })
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
    "build": "vite build"
  }
  // ...
}
```

- 根目录下的 package.json 文件内容如下：

```json
{
  // ...
  "scripts": {
    "build": "gulp -f packages/components/scripts/build/index.ts"
  }
  // ...
}
```

至此，组件打包配置就完成了，接下来就可以在项目根目录下运行 `pnpm run build` 命令来打包组件了。如果中间没有报错，那么就可以在 `packages` 目录下出现打包后的 `dnhyxc-ui-plus` 文件夹了，具体生成的文件目录如下：

```
dnhyxc-ui-test
├─ es
│  ├─ index.d.ts
│  ├─ index.mjs
│  ├─ src
│  │  ├─ button
│  │  │  ├─ index.d.ts
│  │  │  ├─ index.mjs
│  │  │  ├─ index.vue.d.ts
│  │  │  ├─ index.vue.mjs
│  │  │  ├─ index.vue2.mjs
│  │  │  ├─ style
│  │  │  │  └─ index.css
│  │  │  ├─ types.d.ts
│  │  │  └─ types.mjs
│  │  ├─ index.d.ts
│  │  └─ index.mjs
│  └─ utils
│     ├─ bem.d.ts
│     ├─ bem.mjs
│     ├─ index.d.ts
│     └─ index.mjs
├─ lib
│  ├─ index.d.ts
│  ├─ index.js
│  ├─ src
│  │  ├─ button
│  │  │  ├─ index.d.ts
│  │  │  ├─ index.js
│  │  │  ├─ index.vue.d.ts
│  │  │  ├─ index.vue.js
│  │  │  ├─ index.vue2.js
│  │  │  ├─ style
│  │  │  │  └─ index.css
│  │  │  ├─ types.d.ts
│  │  │  └─ types.js
│  │  ├─ index.d.ts
│  │  └─ index.js
│  └─ utils
│     ├─ bem.d.ts
│     ├─ bem.js
│     ├─ index.d.ts
│     └─ index.js
└─ package.json
```

到这一步组件的主要功能就完成了，此时就可以通过 `npm publish` 命令将上述打包输出的 `packages/dnhyxc-ui-plus` 包发布到 `npm` 上了。

> 注意：npm 发包时需要使用 npm 官方的源，同时需要先通过 `npm login` 命令登录 npm 账号，然后再执行 `npm publish` 命令，下面将会使用 Changesets 来进行 npm 包的发布。

## 配置 Changesets

[Changesets](https://github.com/atlassian/changesets) 是一个用于 Monorepo 项目下版本以及 Changelog 文件管理的工具。目前一些比较火的 Monorepo 仓库都在使用该工具进行项目的发包。

在项目根目录下安装 `@changesets/cli`：

```bash
pnpm install @changesets/cli -Dw
```

安装完毕之后在根目录下运行 `npx changeset init` 命令，在根目录下生成 `.changeset` 文件夹及 `config.json` 文件。

```bash
npx changeset init
```

生成的 `config.json` 文件内容如下：

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "master",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

因为我们只需要将 `packages/dnhyxc-ui-plus` 包发布到 npm 上，其他包不发布到 npm 上，因此需要更改 `config.json` 文件中的 `ignore` 属性，忽略掉 `packages/components` 包（packages/components/package.json 中的 name 属性名即为 packages/components 的包名）、`dosc（后续组件文档包）` 包（dosc/package.json 中的 name 属性名即为 dosc 的包名）及 `play（组件预览/调试包）` 包。

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.1.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "master",
  "updateInternalDependencies": "patch",
  // 忽略掉 dnhyxc-ui-docs、@dnhyxc-ui/components、play 包
  "ignore": ["dnhyxc-ui-docs", "@dnhyxc-ui/components", "play"]
}
```

> **注意**：如果上述 `config.json` 文件中 `access` 属性的值不是 `public` 的话，需要手动将其改为 `public`，否则发布包时会报错（EUNSCOPED Can't restrict access to unscoped packages）。

被 `ignore` 忽略的包不会更新版本号，同时不被包含在变更集中。但这并不能阻止被 `ignore` 的包发布到 npm 上，因为只要手动更改了 `package.json` 中的版本号，包仍然会被发布到 `npm` 上。

如果要阻止包在更改了版本号的基础上还不被发布到 `npm` 上，需要在对应包中的 `package.json` 中增加 `"private": true` 属性。

- docs/package.json 增加 private 属性：

```json
{
  "name": "dnhyxc-ui-docs",
  "private": true
  // ...
}
```

- packages/components/package.json 增加 private 属性：

```json
{
  "name": "@dnhyxc-ui/components",
  "private": true
  //...
}
```

- paly/package.json 增加 private 属性：

```json
{
  "name": "play",
  "private": true
  // ...
}
```

上述配置完成后，就可以在项目根目录下的 `package.json` 中增加如下用于发布包的脚本了。

```json
{
  // ...
  "scripts": {
    // ...
    "publish": "pnpm --filter=./packages/components run build && pnpm changeset && pnpm changeset version && pnpm changeset publish"
    // ...
  }
  // ...
}
```

- pnpm changeset：跟踪代码变更并生成变更描述文件。该命令可以让用户交互式选择要版本化的包（patch/minor/major），同时让用户编辑变更描述（用于 CHANGELOG 中）。

![image.png](https://dnhyxc.cn/image/__ARTICLE_IMG__d125503d08370fc03c1d7ecc266eb1732n66efe5c8d80d0da837a3e600h1752838725418.webp)

![image.png](https://dnhyxc.cn/image/__ARTICLE_IMG__d60f95bfe87bd86832e1a8579950eca79n66efe5c8d80d0da837a3e600h1752839800348.webp)

- pnpm changeset version：更新版本号。

- pnpm changeset publish：将包发布到 npm 上。

运行 `npm run publish` 命令后，会优先打包 `packages/components` 包，生成 `packages/dnhyxc-ui-plus` 输出文件，然后生成变更描述文件，最后将包发布到 npm 上。

## 配置自动更新 @dnhyxc-ui/components version

当项目通过 `pnpm changeset version` 变更 version 之后，将跟新的 version 同步更新到 `@dnhyxc-ui/components`。因为 `dnhyxc-ui-plus` 的 version 是每次打包 `@dnhyxc-ui/components` 之后，同步到 `dnhyxc-ui-plus` 的 `package.json` 中的。因此将 `dnhyxc-ui-plus` 更新后的 version 同步到 `@dnhyxc-ui/components` 之后，就不需要每次发布 `dnhyxc-ui-plus` 包时要手动更新 `@dnhyxc-ui/components` 的 version 了。

在项目更目录下的 `packages/components/scripts` 下新增 `version` 文件夹，并在 `version` 中新增 `index.js` 文件，`index.js` 内容如下：

```js
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, readFileSync } from 'fs';

// 通过改写__dirname 为__dirnameNew，解决打包报错
const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);

export const getPath = (_path) => path.resolve(__dirnameNew, _path);

const updateVerison = () => {
  const dnhyxcUIPlusMdPath = getPath('../../../dnhyxc-ui-plus/package.json');
  const componentsPkgPath = getPath('../../package.json');
  // 读取并更新 package.json 的版本号
  const dnhyxcUIPlusPkg = JSON.parse(readFileSync(dnhyxcUIPlusMdPath, 'utf-8'));
  const componentsPkg = JSON.parse(readFileSync(componentsPkgPath, 'utf-8'));

  componentsPkg.version = dnhyxcUIPlusPkg.version;

  try {
    writeFileSync(componentsPkgPath, JSON.stringify(componentsPkg, null, 2));
    console.log(`✨ @dnhyxc-ui/components package.json version 已更新为 ${dnhyxcUIPlusPkg.version}`);
  } catch (err) {
    console.error(`package.json 写入错误: ${err.message}`);
  }
};

updateVerison();
```

脚本配置完毕之后，在根目录下的 `package.json` 中更新 `publish` 脚本，增加 `node ./packages/components/scripts/version/index.js` 命令：

```json
{
  // ...
  "scripts": {
    // ...
    "publish": "pnpm --filter=./packages/components run build && pnpm changeset && pnpm changeset version && pnpm changeset publish && node ./packages/components/scripts/version/index.js"
  }
  // ...
}
```

这样每次发布之后 `dnhyxc-ui-plus` 包之后，就会将 `dnhyxc-ui-plus/package.js` 中的最新 `version` 同步到 `packages/components/package.json` 中了。

## 引用 npm 上的 dnhyxc-ui-plus 组件库

### 下载 dnhyxc-ui-plus 组件库

可以在 play 测试项目中安装 dnhyxc-ui-plus，即进入到 play 测试项目的根目录下，执行如下命令进行安装：

```bash
pnpm i dnhyxc-ui-plus
```

### 局部引入组件

在 `play/App.vue` 文件中引入组件。

```vue
<template>
  <Button size="large" type="danger" />
</template>

<script setup lang="ts">
import { Button } from 'dnhyxc-ui-plus';
</script>
```

### 全局引入组件

在 `play/main.ts` 文件中引入组件库。

```ts
import { createApp } from 'vue';
import dnhyxcUI from 'dnhyxc-ui-plus';
// 或者只全局导入单个组件，两种方式都可以
// import { Button } from 'dnhyxc-ui-plus';
import App from './App.vue';
import './style.css';

const app = createApp(App);
// 全局注册组件库中的所有组件
app.use(dnhyxcUI);
// 全局注册单个组件
// app.use(Button);
app.mount('#app');
```

> 说明：上述全局注册组件，如果所有组件都需要全局注册，那么可以通过 `app.use(dnhyxcUI)` 来全局注册组件库中的所有组件，如果只需要全局注册单个组件，那么可以通过 `app.use(Button)` 来全局注册单个组件。

在 `play/App.vue` 文件中使用组件，此时就不需要导入 `Button` 组件了，可以直接使用：

```vue
<template>
  <n-button size="large" type="danger" />
</template>
```

## 配置 vitest

### 依赖安装

在项目根目录下安装 `vitest` 及相关依赖。

```bash
pnpm i vitest @vue/test-utils @vitest/coverage-v8 happy-dom -Dw
```

- happy-dom 用于模拟浏览器环境。

- @vue/test-utils 用于测试 Vue 组件。

- @vitest/coverage-v8 用于展示测试覆盖率，通常运行完之后，会在 `packages/components` 下生成一个 `coverage` 文件夹，可在浏览器中运行其中的 `index.html` 文件查看测试覆盖率。

### 创建 test 文件夹及配置文件

在 `packages/components` 文件夹下创建 `test` 文件夹，同时在 `packages/components/test` 文件夹下创建 `setup.ts` 文件，该文件会在 `vitest.config.ts` 中的 `setupFiles` 配置中被引入。具体内容如下：

```ts
import { config } from '@vue/test-utils'; // 从 Vue Test Utils 导入全局配置
import ElementPlus from 'element-plus'; // 导入 Element Plus 插件
import 'element-plus/dist/index.css'; // 引入 Element Plus 样式

// 全局注册 Element Plus 插件
config.global.plugins = [ElementPlus];
```

### 配置 vitest.config.ts 文件

在 `packages/components` 文件夹下创建 `vitest.config.ts` 文件，具体内容如下：

```ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/index.ts', 'src/**/*.test.*']
    },
    setupFiles: ['test/setup.ts']
  }
});
```

### 为组件添加测试用例

在 `packages/components/src/button` 文件夹下创建 `__test__` 文件夹，同时在 `__test__` 文件夹下创建 `button.test.ts` 文件，具体的测试用例可以根据自身的情况而定，这里只是简单举个例子：

```ts
import { mount } from '@vue/test-utils';
import Button from '../index.vue';
import { describe, it, expect } from 'vitest'; // Vitest 的测试函数
import * as Components from '../index'; // 导入 index.ts 中导出的所有组件

describe('Button Component', () => {
  // 测试组件是否正确渲染默认插槽内容
  it('renders correctly with default slot content', () => {
    // 挂载组件
    const wrapper = mount(Button);
    // 断言按钮文本是否为默认内容
    expect(wrapper.text()).toBe('测试按钮');
  });
});

// index.ts
describe('Components Entry Point', () => {
  // 测试 Button 组件是否被正确导出
  it('should export Button component', () => {
    // 断言 Components 对象中是否存在 Button
    expect(Components.Button).toBeDefined();
    // 断言 Button 是否具有 install 方法（由 withInstall 添加）
    expect(typeof Components.Button.install).toBe('function');
  });
});
```

### 配置 package.json 文件

在 `packages/components` 文件夹下的 `package.json` 文件中添加 `test` 及 `coverage` 命令，具体内容如下：

```json
{
  //...
  "scripts": {
    "build": "vite build",
    "test": "vitest run",
    "coverage": "vitest run --coverage"
  }
  //...
}
```

在根目录下的 `package.json` 文件中添加 `vitest` 及 `vitest:coverage` 命令，方便在全局运行测试用例，具体内容如下：

```json
// ...
{
  "scripts": {
    "vitest": "pnpm -C packages/components test",
    "vitest:coverage": "pnpm -C packages/components coverage"
  }
}
// ...
```

完成上述配置之后，就可以在项目根目录下运行 `pnpm run vitest` 或者 `pnpm run vitest:coverage` 命令来运行测试用例了。

## 配置 eslint

最新版本的 eslint 配置将不再是使用 `.eslintrc.js` 及 `.eslintignore` 进行配置了，而是统一改用 `eslint.config.mjs` 进行配置了。

### 自动生成配置文件

使用 [eslint](https://eslint.org/docs/latest/use/getting-started) 官方提供的 `eslint` 命令来自动生成配置文件。

```bash
pnpm create @eslint/config@latest
```

按照指引依次选择如下选项：

1. What do you want to lint?

   > JavaScript

2. How would you like to use ESLint?

   > To check syntax and find problems

3. What type of modules does your project use?

   > JavaScript modules (import/export)

4. Which framework does your project use?

   > Vue.js

5. Does your project use TypeScript?

   > Yes

6. Where does your code run?

   > Browser

7. Would you like to install them now?

   > No 这里选择 No，后续通过手动安装，自动安装会失败，因为它不会增加 -w 选项。

运行完后，会在根目录下生成 `eslint.config.mjs` 文件，具体内容如下：

```js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  }
]);
```

如果需要增加忽略检测的文件，可以在上述配置的基础上增加 `ignores` 属性。

```js
export default defineConfig([
  // ...
  {
    ignores: ['packages/dnhyxc-ui-plus/**', 'packages/*/dist/**', 'node_modules/**']
  }
]);
```

手动安装相关依赖：

```bash
pnpm i eslint @eslint/js globals typescript-eslint eslint-plugin-vue -Dw
```

### 手动创建配置文件

在根目录下安装 `eslint` 及相关依赖。

```bash
pnpm i eslint globals eslint-plugin-prettier eslint-config-prettier eslint-plugin-vue typescript-eslint vue-eslint-parser @eslint/js @babel/eslint-parser @typescript-eslint/parser @typescript-eslint/eslint-plugin -Dw
```

> **注意**：eslint-plugin-vue 版本得是 9.25.0，否则 eslint 检测会报错。

上述相关包版本如下：

```json
{
  "devDependencies": {
    "@babel/eslint-parser": "^7.27.5",
    "@eslint/js": "^9.30.1",
    "@typescript-eslint/eslint-plugin": "^8.35.1",
    "@typescript-eslint/parser": "^8.35.1",
    "eslint": "^9.30.1",
    "eslint-plugin-prettier": "^5.5.1",
    "eslint-plugin-vue": "^9.25.0",
    "globals": "^16.3.0",
    "typescript-eslint": "^8.35.1",
    "vue-eslint-parser": "^10.2.0"
  }
}
```

在项目根目录下创建 `eslint.config.mjs` 文件，具体内容如下：

```js
import eslint from '@eslint/js';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

const baseConfig = [
  // 全局配置
  {
    name: 'global config',
    languageOptions: {
      globals: {
        ...globals.es2022,
        ...globals.browser,
        ...globals.node
      },
      sourceType: 'module' // 确保设置为 module
    },
    rules: {
      'no-dupe-class-members': 0,
      'no-redeclare': 0,
      'no-undef': 0,
      'no-unused-vars': 0
    }
  },

  // Vue 文件配置
  {
    name: 'vue-eslint',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsEslintParser, // Vue 文件中使用 TS 解析器
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: { jsx: false }
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      // eslint-plugin-vue 需要是 9.25.0 版本，否则这里会报错
      ...vuePlugin.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off'
    }
  },
  // JS/TS 文件配置
  {
    name: 'typescript-eslint/base',
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsEslintParser,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: false }
      }
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      '@typescript-eslint/no-confusing-non-null-assertion': 2
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin
    }
  },
  // 忽略文件
  {
    ignores: ['packages/dnhyxc-ui-plus/**', 'packages/*/dist/**', 'node_modules/**']
  }
];

export default [eslint.configs.recommended, eslintPluginPrettierRecommended, ...baseConfig];
```

### 测试 eslint 是否配置成功

在项目根目录下的 `package.json` 文件中添加 `test` 命令。

```json
{
  "scripts": {
    // ...
    "test": "npx eslint ./packages  --ext ts,vue,js --fix"
  }
}
```

之后运行 `pnpm run test` 命令，看是否会报错。也可以手动写一些错误，然后运行 `pnpm run test` 命令，看是否能自动检测出来。

> 说明：配置完成 eslint 后，如果在编辑器中 eslint 不能提示代码错误，但是通过运行 `pnpm run test` 命令能够检测出来，可以尝试关闭编辑器，重新打开编辑器。这样应该在编辑代码时就能正常提示错误了。

## 配置 Prettier

在项目根目录下安装 `Prettier` 及相关依赖。

```bash
pnpm i prettier -Dw
```

在项目根目录下创建 `.prettierrc.json` 文件，内容根据自己的风格进行定义，这里提供一个参考：

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "trailingComma": "none",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "rangeStart": 0,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false
}
```

## 配置 husky

在项目根目录下安装 `husky`，尽量安装与我相同的版本，避免比必要的错误。

```bash
pnpm i husky@8.0.3 -Dw
```

> 配置 `husky` 时，首先需要先使用 `git init` 命令创建 `.git` 文件否则执行下述命令将会报错。

项目根目录下运行 `npm run prepare`，自动在根目录下生成 `.husky` 文件夹，紧接着运行 `npx husky add .husky/pre-commit "npm test"` 在 `.husky` 文件夹中生成 `pre-commit` 文件，生成的 `pre-commit` 文件内容如下：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

设置完 pre-commit 之后，为了确保该文件具有可执行权限，可以使用以下命令来授予执行权限：

```bash
chmod +x .husky/pre-commit
```

## 配置 commitlint 约定式提交

在项目根目录下安装 `commitlint` 及相关依赖。

```bash
pnpm i commitizen cz-customizable @commitlint/cli @commitlint/config-conventional -Dw
```

在根目录下新建 `commitlint.config.js` 文件及 `.cz-config.js` 文件：

- commitlint.config.js 文件内容如下，具体可以自主进行更改，详情请参考 [commitlint](https://commitlint.js.org/)。

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能（feature）
        'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
        'fix', // 修补bug
        'ui', // 更新 ui
        'docs', // 文档（documentation）
        'style', // 格式（不影响代码运行的变动）
        'perf', // 性能优化
        'release', // 发布
        'deploy', // 部署
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
        'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
        'other', // 其它更改
        'build' // 打包
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};
```

- .cz-config.js 文件内容如下，具体可以自主进行更改。这里需要注意的是，根目录下的 package.json 中不能有 "type": "module" 的配置，否则会报错，这是因为加了 "type": "module" 会导致模式不兼容，因此会导致报错。

```js
module.exports = {
  types: [
    { value: 'feat', name: 'feat: 增加新功能' },
    { value: 'bug', name: 'bug: 测试反馈bug列表中的bug号' },
    { value: 'fix', name: 'fix: 修复bug' },
    { value: 'ui', name: 'ui: 更新UI' },
    { value: 'docs', name: 'docs: 文档变更' },
    { value: 'style', name: 'style: 代码格式(不影响代码运行的变动)' },
    { value: 'perf', name: 'perf: 性能优化' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'release', name: 'release: 发布' },
    { value: 'deploy', name: 'deploy: 部署' },
    { value: 'test', name: 'test: 增加测试' },
    {
      value: 'chore',
      name: 'chore: 构建过程或辅助工具的变动(更改配置文件)'
    },
    { value: 'revert', name: 'revert: 回退' },
    { value: 'other', name: 'other: 其它修改' },
    { value: 'build', name: 'build: 打包' }
  ],
  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入您修改的范围(可选):',
    subject: '请简要描述提交 message (必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):',
    footer: '请输入要关闭的issue(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  allowCustomScopes: true,
  skipQuestions: ['body', 'footer'],
  subjectLimit: 72
};
```

最后在项目根目录下的 `package.json` 中增加如下配置：

```json
{
  // ...
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-customizable"
    }
  }
  // ...。
}
```

重新设置 pre-commit 钩子，将项目中原有的 `.husky` 文件删除，重新运行如下命令生成。

```bash
npm run prepare

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

生成 `.husky/commit-msg` 之后，在 `.husky/commit-msg` 文件中增加 `npm test` 命令，用于在 commitlint 检测前进行 eslint 的检测，内容如下：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 手动新增的命令
npm test

npx --no-install commitlint --edit $1
```

上述配置完成后，就可以通过 `git commit` 命令检测 `commitlint` 是否配置成功了，如果配置成功，不符合 commitlint 配置的规则，则 `commit` 时就会报错，无法正常提交代码，符合规则才能正常提交代码。

## 生成组件文档

在项目根目录下，创建 `docs` 文件夹，用于存放组件文档。组件文档将采用 [VitePress](https://vitepress.dev/zh/guide/getting-started) 进行生成。

进入到 docs 目录下，运行 `pnpm init` 命令，初始化 `package.json` 文件。

```bash
pnpm init
```

### VitePress 安装

在项目根目录下安装 `vitepress`。

```bash
pnpm i vitepress -Dw
```

### 初始化 VitePress 配置

VitePress 附带一个命令行设置向导，可以帮助你构建一个基本项目。安装后，通过运行以下命令启动向导：

```bash
pnpm vitepress init
```

运行 `pnpm vitepress init` 之后就会出现如下这个向导，每个选项的具体选择如下：

![image.png](https://dnhyxc.cn/image/__ARTICLE_IMG__dfa2ac9e0114735764fec3f53e760568cn66efe5c8d80d0da837a3e600h1752895047103.webp)

### 生成组件向导及组件页面

修改 `docs/index.md` 文件，根据自己实际情况进行配置，这里提供一个参考，内容如下：

```md
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'dnhyxc-ui-plus'
  text: 'dnhyxc-ui-plus 组件库'
  tagline: 基于 Vue3 + TypeScript + Element Plus 的组件库
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/installation
    - theme: alt
      text: 组件
      link: /components/button

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
```

### 修改 .vitepress 配置

修改 `.vitepress/config.mts` 内容，这里根据自己实际情况修改为符合自己的配置，这里提供一个参考：

```ts
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'dnhyxc-ui-plus',
  description: 'Vue3 UI Component',
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: {
      label: '页面导航'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present dnhyxc'
    },
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速上手', link: '/guide/quick-start' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Input 文本输入', link: '/components/input' }
          ]
        }
      ]
    },
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/button' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dnhyxc/dnhyxc-ui-plus'
      }
    ]
  }
});
```

### 接入 @dnhyxc-ui/components 组件库

在 `docs` 目录下运行如下命令进行安装：

```bash
pnpm i @dnhyxc-ui/components --workspace
```

修改 `docs/.vitepress/theme/index.ts`，将 `@dnhyxc-ui/components` 组件库在全局挂载，方便在 `components` 中的组件中使用：

```ts
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DnhyxcUI from '@dnhyxc-ui/components';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    DefaultTheme.enhanceApp({ app, router, siteData });
    // 注册组件库
    app.use(DnhyxcUI);
  }
} satisfies Theme;
```

按照向导的提示，完成配置之后，在 `docs` 目录下新增 `guide` 和 `components` 文件夹。

在 `docs/guide` 文件夹下新增 `quick-start.md` 和 `installation.md` 文件，文件内容可以自定义，这里只提供一个简单的示例：

- quick-start.md：

```md
# 快速开始

本节将介绍如何在项目中使用 dnhyxc-ui-plus。
```

- installation.md：

````md
# 下载安装

我们建议您使用包管理器（如 NPM、Yarn 或 pnpm）安装 Element Plus，以便更好地与您的项目集成。

使用 pnpm 安装：

```bash
pnpm add dnhyxc-ui-plus
```

使用 npm 安装：

```bash
npm install dnhyxc-ui-plus
```

使用 yarn 安装：

```bash
yarn add dnhyxc-ui-plus
```
````

在 `docs/components` 文件夹下新增 `button.md` 文件，文件内容可以自定义，这里只提供一个简单的示例：

````md
# Button 按钮

## 使用按钮

全局注册

<n-button type="success" size="large" style="margin-right: 12px">success button</n-button>
<n-button type="primary" style="margin-right: 12px">primary button</n-button>
<n-button type="danger" size="small">danger button</n-button>

```vue
<template>
  <n-button type="success" size="large" style="margin-right: 12px">button</n-button>

  <n-button type="primary" style="margin-right: 12px">button</n-button>
</template>
```

## API

### Button Props

| 参数 | 说明     | 类型   | 可选值                                                       | 默认值  |
| ---- | -------- | ------ | ------------------------------------------------------------ | ------- |
| type | 按钮类型 | string | default / success / primary / danger / warning / info / text | default |
| size | 按钮大小 | string | large / small / default                                      | default |
````

上述 `button.md` 组件根据上述 md 内容，code 最终展示效果如下：

![image.png](https://dnhyxc.cn/image/__ARTICLE_IMG__d563f6e06fa8052103ca291d71fec854fn66efe5c8d80d0da837a3e600h1753062480851.webp)

### 配置 vitepress-code-preview

`vitepress-code-preview` 一款给 vitepress 文档中嵌入的 Vue 示例代码增加演示功能的插件。本插件基于 `vitepress`、 `markdown-it` 和 `unified` 实现，它可以帮助你在编写文档的时候，对嵌入的 Vue 示例代码增加演示功能，支持的 Vue 组件形式有 SFC, JSX, TSX。

在 `docs` 目录下安装如下插件：

```bash
pnpm add @vitepress-code-preview/container @vitepress-code-preview/plugin -D
```

在 `docs/vite.config.ts` 中导入插件：

```ts
import { defineConfig } from 'vite';
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin';

export default defineConfig({
  base: '/', // 线上打包路径改为绝对路径，防止打包后，资源文件路径出现上述错误
  // 为了解决打包 element-plus css 无法处理而报错问题的问题，需要添加以下 ssr 配置
  ssr: {
    noExternal: ['element-plus', '@dnhyxc-ui/components']
  },
  plugins: [viteDemoPreviewPlugin()]
});
```

修改 `docs/.vitepress/config.ts` 配置文件，在其中增加 `markdown` 配置，并且在其中使用 `demoPreviewPlugin`：

```ts
import { defineConfig } from 'vitepress';
import { demoPreviewPlugin } from '@vitepress-code-preview/plugin';

export default defineConfig({
  title: 'dnhyxc-ui-plus',
  description: 'Vue3 UI Component',
  themeConfig: {
    // ...
  },
  // 增加 markdown 配置，使用 demoPreviewPlugin 插件
  markdown: {
    config(md) {
      md.use(demoPreviewPlugin);
    }
  }
});
```

最后修改 `docs/.vitepress/theme/index.ts`，在其中导入 `@vitepress-code-preview/container` 注册组件容器：

```ts
// ...
// 导入组件容器
import DemoPreview, { useComponents } from '@vitepress-code-preview/container';
// 导入样式
import '@vitepress-code-preview/container/dist/style.css';
// ...

export default {
  // ...
  enhanceApp({ app, router, siteData }) {
    // 注册组件容器
    useComponents(app, DemoPreview);
    // ...
  }
} satisfies Theme;
```

### 在 MD 文件中使用 vitepress-code-preview

在 demo 容器中直接编写 vue 代码

````md
# Button 按钮

## 使用按钮

全局注册

:::demo

```vue
<template>
  <n-button type="success" size="large" style="margin-right: 12px">success button</n-button>
  <n-button type="primary" style="margin-right: 12px">primary button</n-button>
  <n-button type="danger" size="small">danger button</n-button>
</template>
```

:::

## API

### Button Props

<script>
const buttonProps = [
  {
    name: 'size',
    type: "enum",
    default: 'default',
    description: '按钮尺寸',
    version: '-',
    details: "'large' | 'default' | 'small'"
  },
  {
    name: 'type',
    type: "enum",
    default: 'default',
    description: '按钮类型',
    version: '-',
    details: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | '' | 'text'"
  }
];
</script>

<table>
  <thead>
    <tr>
      <th style="width: 1000px">名称</th>
      <th style="width: 1000px">类型</th>
      <th style="width: 1000px">默认值</th>
      <th style="width: 1000px">说明</th>
      <th style="width: 1000px">版本</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="prop in buttonProps" :key="prop.name">
      <td>{{ prop.name }}</td>
      <td>
        <code>
          {{ prop.type }}
        </code>
        <el-tooltip
          class="item"
          :content="prop.details"
          placement="top"
        >
          <el-icon style="cursor: pointer">❕</el-icon>
        </el-tooltip>
      </td>
      <td>
        <code>{{ prop.default }}</code>
      </td>
      <td>{{ prop.description }}</td>
      <td>{{ prop.version }}</td>
    </tr>
  </tbody>
</table>
````

> 说明：Button Props 可以通过 markdown 的表格实现，如果觉得 markdown 实现的 table 不美观，也可以自己通过上述 vue 直接自定义实现表格，展示组件的属性。但是需要注意的是，dom 元素不需要通过 `<template></template>` 标签进行包裹。

最终配置完成之后，组件根据上述 md 内容，code 最终展示效果如下：

![image.png](https://dnhyxc.cn/image/__ARTICLE_IMG__d47b5f1ef4a74efa035fa65552b883f78n66efe5c8d80d0da837a3e600h1753061127076.webp)

### vitepress 可能的打包问题处理

在 `@dnhyxc-ui/components` 组件库中或者在 `docs` 下直接使用了 `element-plus` 时，如果 vitepress 打包出现无法识别 `css` 资源的报错时，可以在 `docs` 目录下创建 `vite.config.ts` 文件，在其中增加 `ssr` 配置，在 ssr 中设置 `noExternal` 属性，并在 `noExternal` 中添加用到了 `element-plus` 的组件库包名，就能解决打包 `css` 错误的问题。具体如下：

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  // 为了解决打包 element-plus css 无法处理而报错问题的问题，需要添加以下 ssr 配置
  ssr: {
    noExternal: ['element-plus', '@dnhyxc-ui/components']
  }
});
```

## 项目 github 仓库

[dnhyxc-ui-plus](https://github.com/dnhyxc/dnhyxc-ui-plus/tree/template)
