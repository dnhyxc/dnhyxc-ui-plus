import { App } from 'vue';
import * as components from './src/index';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

// 导出表情相关类型定义
export type { EmojiName, EmojiList } from './src/emoji/types';

export type { ImageParams } from './src/waterfall/types';

export type * from './src/draft-input/types';

// 也导出所有单个组件，支持按需引入
export * from './src/index';

export * from './src/notification';

export * from './utils';

export * from './src/emoji/constant';

export default {
  install: (app: App) => {
    // app.use(ElementPlus);
    for (let c in components) {
      app.use(components[c as keyof typeof components]);
    }
  }
};
