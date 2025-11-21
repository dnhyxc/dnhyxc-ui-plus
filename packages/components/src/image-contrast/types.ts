import type NImageContrast from './index.vue';

export interface ImageContrastOptions {
  beforeImg: string;
  afterImg: string;
  beforeSize?: string;
  afterSize?: string;
  imgHeight?: string;
  showDrag?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    NImageContrast: typeof NImageContrast;
  }
}
