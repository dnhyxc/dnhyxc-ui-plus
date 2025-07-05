// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { NIcon, NButton, NInput } from 'dnhyxc-ui';
import ElementPlus from 'element-plus';
import 'dnhyxc-ui-plus/dist/index.css';
import DemoPreview, { useComponents } from '@vitepress-code-preview/container';
// import { demoBlockPlugin } from 'vitepress-theme-demoblock';
// import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import '@vitepress-code-preview/container/dist/style.css';

import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    useComponents(app, DemoPreview);
    DefaultTheme.enhanceApp({ app, router, siteData });
    app.component('NIcon', NIcon);
    app.component('NButton', NButton);
    app.component('NInput', NInput);
    app.use(ElementPlus);
  }
} satisfies Theme;
