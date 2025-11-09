import type NImagePreview from './index.vue';
import { ModelOptions } from '../model/types';

interface ImageTransformInfo {
  scale: number;
  rotate: number;
  boundary: boolean; // 控制是否需要控制边界
  imgWidth: number;
  imgHeight: number;
}

interface DownloadParams {
  url: string;
  type?: string;
  fileName?: string;
  callback?: (res: boolean) => void;
  mark?: string;
}

export interface ImagePreviewOptions extends ModelOptions {
  visible: boolean;
  selectdImage: {
    url: string;
    size?: number;
    id?: string;
    [key: string]: unknown;
  };
  imageTransformInfo?: ImageTransformInfo;
  showPrevAndNext?: boolean;
  showOtherModel?: () => void;
  imageSize?: string;
  title?: string;
  imageList?: {
    url: string;
    size?: number;
    id?: string;
    [key: string]: unknown;
  }[]; // { id: string; url: string; [key: string]: any }[]
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
