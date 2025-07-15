// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { Button, Input } from 'dnhyxc-ui-plus-beta1';
import ElementPlus from 'element-plus';
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
    app.component('NButton', Button);
    app.component('NInput', Input);
    app.use(ElementPlus);
  }
} satisfies Theme;
