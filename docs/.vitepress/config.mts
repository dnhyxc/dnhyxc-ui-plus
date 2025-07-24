import { defineConfig } from 'vitepress';
import { demoPreviewPlugin } from '@vitepress-code-preview/plugin';
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons';

export default defineConfig({
  lang: 'zh-CN',
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
      copyright: 'Copyright © 2025-present dnhyxc'
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
    logo: '/logo.svg',
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
            { text: 'Input 文本输入', link: '/components/input' },
            { text: 'Icon 图标', link: '/components/icon' }
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
        link: 'https://github.com/dnhyxc/dnhyxc-ui-plus/tree/template'
      }
    ]
  },
  markdown: {
    config(md) {
      // const docRoot = fileURLToPath(new URL('../', import.meta.url));
      md.use(demoPreviewPlugin);
      md.use(groupIconMdPlugin);
    }
  }
});
