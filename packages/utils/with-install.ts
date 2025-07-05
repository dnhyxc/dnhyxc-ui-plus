import { type Plugin, type App } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

// 为组件增加install方法，使组件及可以通过 use 方式注册为全局组件，也可以通过 import 方式单独使用
export const withInstall = <T>(comp: T) => {
  const c = comp as unknown as { name: string };
  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component(c.name, c);
  };
  return comp as SFCWithInstall<T>;
};
