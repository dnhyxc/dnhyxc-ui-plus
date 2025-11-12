import type NWaterfall from './index.vue';

export interface ImageParams {
  id: string | number;
  url: string;
  filename?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface WaterfallOptions {
  imageWidth: number; // 图片宽度
  imageList: ImageParams[]; // 图片列表
  placeholderImg?: string;
  needPreview?: boolean; // 是否需要预览
  imageRadius?: number | string;
  selectedImageIds?: (number | string)[]; // 选中的图片 id
  previewWidth?: string; // 预览图片宽度
  showSelect?: boolean; // 是否显示选中按钮
  showDownload?: boolean; // 是否显示下载按钮
  showDelete?: boolean; // 是否显示删除按钮
  showRename?: boolean; // 是否显示重命名按钮
  onSelected?: (image: ImageParams) => void; // 选中图片的回调
  onDownload?: (image: ImageParams) => void; // 下载图片的回调
  onDelete?: (image: ImageParams) => void; // 下载图片的回调
  onRename?: (image: ImageParams) => void; // 下载图片的回调
}

declare module 'vue' {
  export interface GlobalComponents {
    NWaterfall: typeof NWaterfall;
  }
}
