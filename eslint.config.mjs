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
      // 禁止类成员重复声明
      'no-dupe-class-members': 0,
      // 禁止重复声明变量
      'no-redeclare': 0,
      // 禁止使用未声明的变量
      'no-undef': 0,
      // 禁止出现未使用过的变量
      'no-unused-vars': 'warn',
      // 禁用 console
      'no-console': 'warn', // 'off', 'warn', 'error'
    }
  },

  // Vue 文件配置
  {
    // Vue 文件的 ESLint 配置
    name: 'vue-eslint',
    // 匹配所有 .vue 文件
    files: ['**/*.vue'],
    languageOptions: {
      // 使用 vue-eslint-parser 解析 Vue 文件
      parser: vueParser,
      parserOptions: {
        parser: tsEslintParser, // Vue 文件中使用 TS 解析器
        // 使用最新的 ECMAScript 特性
        ecmaVersion: 'latest',
        // 使用 ES 模块
        sourceType: 'module',
        // 添加 .vue 文件扩展名支持
        extraFileExtensions: ['.vue'],
        // 禁用 JSX 特性
        ecmaFeatures: { jsx: false }
      }
    },
    // 启用 vue eslint 插件
    plugins: {
      vue: vuePlugin
    },
    // ESLint 规则配置
    rules: {
      // 继承 vue3 推荐配置
      ...vuePlugin.configs['vue3-recommended'].rules,
      // 关闭组件名必须多个单词的限制
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off' // 关闭 v-html 指令的 ESLint 检查
    }
  },

  // JS/TS 文件配置
  // {
  //   files: ['**/*.{js,ts}'],
  //   languageOptions: {
  //     parser: tsEslintParser, // 统一使用 TS 解析器
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //       sourceType: 'module',
  //       ecmaFeatures: { jsx: false }
  //     }
  //   }
  // },

  // JS/TS 文件配置
  {
    // TypeScript ESLint 基础配置
    name: 'typescript-eslint/base',
    // files: ['**/*.ts'],
    // 匹配所有的 .js 和 .ts 文件
    files: ['**/*.{js,ts}'],
    languageOptions: {
      // 使用 TypeScript ESLint 解析器
      parser: tsEslintParser,
      // 使用 ES 模块
      sourceType: 'module',
      parserOptions: {
        // 禁用 JSX 特性
        ecmaFeatures: { jsx: false }
      }
    },
    rules: {
      // 继承 TypeScript ESLint 推荐配置
      ...tsEslintPlugin.configs.recommended.rules,
      // 禁止使用混淆的非空断言
      '@typescript-eslint/no-confusing-non-null-assertion': 2,
      // 允许使用 @ts-ignore 等注释
      '@typescript-eslint/ban-ts-comment': 0
    },
    // 启用 TypeScript ESLint 插件
    plugins: {
      '@typescript-eslint': tsEslintPlugin
    }
  },
  // 忽略文件
  {
    ignores: ['packages/dnhyxc-ui-plus/**', 'packages/*/dist/**', 'node_modules/**']
  }
];

// eslint.configs.recommended 提供 eslint 推荐配置， eslintPluginPrettierRecommended 提供 prettier 推荐配置
export default [eslintPluginPrettierRecommended, eslint.configs.recommended, ...baseConfig];
