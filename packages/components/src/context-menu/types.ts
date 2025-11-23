import type NContextMenu from './index.vue';

export interface ContextMenuOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menu: { label: string; value: any }[];
  noMenu?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    NContextMenu: typeof NContextMenu;
  }
}
