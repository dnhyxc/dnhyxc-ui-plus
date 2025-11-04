import type NImagePreview from './index.vue';

interface ImageTransformInfo {
  scale: number;
  rotate: number;
  boundary: boolean; // 控制是否需要控制边界
  imgWidth: number;
  imgHeight: number;
}

interface ImageInfo {
  url: string;
  size?: number;
  id?: string;
  [key: string]: unknown;
}

interface DownloadParams {
  url: string;
  type?: string;
  fileName?: string;
  callback?: (res: boolean) => void;
  mark?: string;
}

export interface ImagePreviewOptions {
  selectdImage: ImageInfo;
  previewVisible: boolean;
  dialogWidth?: string;
  dialogStyle?: string;
  imageTransformInfo?: ImageTransformInfo;
  showPrevAndNext?: boolean;
  showWaterModal?: () => void;
  imageSize?: string;
  title?: string;
  imageList?: ImageInfo[]; // { id: string; url: string; [key: string]: any }[]
  closeOnClickModal?: boolean;
  showZoomIn?: boolean;
  showZoomOut?: boolean;
  showRotate?: boolean;
  showReset?: boolean;
  showDownload?: boolean;
  download?: (params: DownloadParams) => void;
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
