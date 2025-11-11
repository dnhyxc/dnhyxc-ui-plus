import type NWaterfall from './index.vue';

export interface ImageParams {
  url: string;
  [key: string]: string | number | boolean;
}

export interface WaterfallOptions {
  imageWidth: number; // 图片宽度
  imageList: ImageParams[]; // 图片列表
  total: number; // 图片总数
  pageNo: number; // 页码
  loading: boolean; // 是否加载中
  getImages: (top: number, left: number) => Promise<ImageParams>; // 加载图片
  parentWidth: string | number; // 父元素宽度
  parentHeight: string | number; // 父元素高度
  className?: string; // 最外层父元素类名
  placeholderImg?: string;
  needPreview?: boolean; // 是否需要预览
  imageRadius?: number | string;
  selectedImage?: ImageParams; // 选中的图片
  selectedImageIds?: string[]; // 选中的图片 id
  previewWidth?: string; // 预览图片宽度
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
