import type NImage from './index.vue';

export interface ImageOptions {
  url: string;
  width: string | number;
  height?: string | number;
  placeholderImg?: string;
  loadingText?: string;
  errorText?: string;
  placeholderClassName?: string;
  radius?: number | string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  onLoad?: () => void;
}

declare module 'vue' {
  export interface GlobalComponents {
    NImage: typeof NImage;
  }
}
