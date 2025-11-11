import type NLoading from './index.vue';

export interface LoadingOptions {
  dots?: number;
  dotSize?: string;
  dotRight?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    NLoading: typeof NLoading;
  }
}
