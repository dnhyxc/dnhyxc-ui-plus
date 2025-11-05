import type NImage from './index.vue';

export interface ImageOptions {
  url: string;
  width?: string;
  height?: string;
  placeholderImg?: string;
  loadingText?: string;
  emptyText?: string;
  errorText?: string;
  placeholderClassName?: string;
  radius?: string;
  alt?: string;
  onClick?: () => void;
  onLoad?: () => void;
}

declare module 'vue' {
  export interface GlobalComponents {
    NImage: typeof NImage;
  }
}
