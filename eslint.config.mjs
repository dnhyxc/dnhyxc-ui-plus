import { createEslintConfig, ignoresConfig } from '@dnhyxc/eslint';

// 创建一个新的 ignores 配置对象，可以基于旧的进行修改，或者完全替换
const ignores = {
  ignores: [...ignoresConfig.ignores, 'packages/dnhyxc-ui-plus/**']
};

export default createEslintConfig({
  ignores
});
