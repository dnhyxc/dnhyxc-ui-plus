// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import DnhyxcUI from 'dnhyxc-ui-plus';
import DemoPreview, { useComponents } from '@vitepress-code-preview/container';
import 'element-plus/dist/index.css';
import '@vitepress-code-preview/container/dist/style.css';
import 'virtual:group-icons.css';
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
    app.use(ElementPlus);
    app.use(DnhyxcUI);
  }
} satisfies Theme;
