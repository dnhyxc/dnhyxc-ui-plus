import { type PluginOption } from 'vite';

// 替换 vue 文件中的 .scss 后缀为 .css
export function replaceStyleExtPlugin(): PluginOption {
  return {
    name: 'replace-style-ext-plugin',
    generateBundle(config, bundle) {
      const keys = Object.keys(bundle);
      for (const key of keys) {
        // 只处理 src 目录下的文件
        if (!key.includes('src/')) {
          continue;
        }
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
