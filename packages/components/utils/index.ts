import type { App, Plugin } from 'vue';

export * from './bem';

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as { name: string }).name;
    app.component(name, comp as SFCWithInstall<T>);
  };
  return comp as SFCWithInstall<T>;
};

export const debounce = (fn: () => void, delay = 1000, immediate = false) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      // @ts-ignore
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
    }, delay);
  };
};

export const handlerDownload = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = url.split('/').pop() || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
