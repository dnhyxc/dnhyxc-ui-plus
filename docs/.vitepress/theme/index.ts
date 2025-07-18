// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DnhyxcUI from '@dnhyxc-ui/components';
import DemoPreview, { useComponents } from '@vitepress-code-preview/container';
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
    app.use(DnhyxcUI);
  }
} satisfies Theme;
