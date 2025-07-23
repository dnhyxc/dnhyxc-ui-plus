import { App } from 'vue';
import * as components from './src/index';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// 也导出所有单个组件，支持按需引入
export * from './src/index';

export * from './src/notification';

export default {
  install: (app: App) => {
    // app.use(ElementPlus);
    for (let c in components) {
      app.use(components[c as keyof typeof components]);
    }
  }
};
