import type NLoading from './index.vue';

export interface LoadingOptions {
  dots?: number;
  dotSize?: string;
  dotRight?: string;
  dotBgColor0?: string;
  dotBgColor50?: string;
  dotBgColor100?: string;
  dotShadowColor0?: string;
  dotShadowColor50?: string;
  dotShadowColor100?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    NLoading: typeof NLoading;
  }
}
