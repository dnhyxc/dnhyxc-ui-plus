import type NModel from './index.vue';

export interface NModelOptions {
  visible: boolean;
  title?: string;
  width?: string;
  footer?: boolean;
  draggable?: boolean;
  onClick?: (() => void) | null;
  center?: boolean;
  modal?: boolean;
  size?: string;
  padding?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    NModel: typeof NModel;
  }
}
