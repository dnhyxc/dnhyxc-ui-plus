import type NImagePreview from './index.vue';

export interface ImagePreviewOptions<T> {
  selectdImage: T;
  previewVisible: boolean;
  dialogWidth?: string;
  dialogStyle?: string;
  imageTransformInfo?: {
    scale: number;
    rotate: number;
    boundary: boolean; // 控制是否需要控制边界
    imgWidth: number;
    imgHeight: number;
  };
  showPrevAndNext?: boolean;
  showWaterModal?: () => void;
  imageSize?: string;
  title?: string;
  imageList?: {
    url: string;
    id?: string;
    [key: string]: string | number | boolean | null | undefined;
  }[]; // { id: string; url: string; [key: string]: any }[]
  closeOnClickModal?: boolean;
  download?: (params: {
    url: string;
    type?: string;
    fileName?: string;
    callback?: (res: boolean) => void;
    mark?: string;
  }) => void;
  getImgSizeFromUrl?: (url: string) => Promise<{
    type: string;
    size: number;
  }>;
  changeImgUrlDomain?: (url: string) => string;
}

declare module 'vue' {
  export interface GlobalComponents {
    NImagePreview: typeof NImagePreview;
  }
}
