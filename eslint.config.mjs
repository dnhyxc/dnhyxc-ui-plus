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
      ...vuePlugin.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off'
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
    name: 'typescript-eslint/base',
    // files: ['**/*.ts'],
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
    ignores: ['packages/*/dist/**', 'node_modules/**']
  }
];

export default [eslint.configs.recommended, eslintPluginPrettierRecommended, ...baseConfig];
