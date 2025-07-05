// import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import { defineConfig } from 'vitepress';
// import { fileURLToPath, URL } from 'node:url';
import { demoPreviewPlugin } from '@vitepress-code-preview/plugin';

export default defineConfig({
  title: 'dnhyxc-ui',
  description: 'Vue3 UI Component',
  themeConfig: {
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
          items: [{ text: 'Icon 图标', link: '/components/icon' }]
        }
      ]
    },
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/icon' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dnhyxc/dnhyxc-ui-vue'
      }
    ]
  },
  markdown: {
    config(md) {
      // const docRoot = fileURLToPath(new URL('../', import.meta.url));
      md.use(demoPreviewPlugin);
    }
  }
});
