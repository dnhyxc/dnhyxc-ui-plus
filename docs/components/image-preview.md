# ImagePreview 图片预览

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-image-preview
    v-model:previewVisible="previewVisible"
    closeOnClickModal
    :image-list="imageList"
    :selectd-image="{
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    dialogStyle="background: rgba(0, 0, 0, 0.5);"
  >
  </n-image-preview>
  <n-button type="primary" @click="previewVisible = true">查看图片</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const previewVisible = ref(false);

// 不传 id 时，会根据 url 进行匹配，因此需要确保每个 url 都是唯一的
const imageList = [
  {
    url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: '4',
    url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  }
];
</script>

<style lang="scss" scoped>
.n-image-preview {
  --icon-color: #ccc;
  --icon-hover-color: skyblue;
}
</style>
```

:::

局部注册

:::demo

```vue
<template>
  <ImagePreview
    v-model:previewVisible="previewVisible"
    dialog-width="800px"
    closeOnClickModal
    :image-list="imageList"
    show-download
    :selectd-image="{
      id: '1',
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    :getImgSizeFromUrl="getImgSizeFromUrl"
  />
  <n-button type="primary" @click="previewVisible = true">查看图片</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ImagePreview } from 'dnhyxc-ui-plus';

const previewVisible = ref(false);

const imageList = [
  {
    id: '1',
    url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: '2',
    url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: '3',
    url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: '4',
    url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    id: '5',
    url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  }
];

const getImgSizeFromUrl = async (
  url: string
): Promise<{
  type: string;
  size: number;
}> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type.split('/').pop() as string;
    const sizeInBytes = blob.size;
    const sizeInKB = sizeInBytes / 1024;
    return {
      type,
      size: sizeInKB
    };
  } catch (error) {
    return {
      type: '',
      size: 0
    };
  }
};

const onDownload = (imageInfo: any) => {
  const link = document.createElement('a');
  link.href = imageInfo.url;
  link.download = imageInfo.url.split('/').pop() || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="scss" scoped>
.n-image-preview {
  --icon-color: #333;
  --icon-hover-color: skyblue;
}
</style>
```

:::

## API

### ImagePreview Props

<script>
const data = [
  {
    name: 'previewVisible',
    type: 'boolean',
    default: 'false',
    description: '是否展示图片预览弹窗',
  },
  {
    name: 'selectdImage',
    type: `{id: string, url: string}`,
    default: '',
    description: '当前选中需要预览的图片',
  },
  {
    name: 'dialogWidth',
    type: 'string',
    default: '800px',
    description: '图片预览弹窗的宽度',
  },
  {
    name: 'dialogStyle',
    type: 'string',
    default: '',
    description: '图片预览弹窗的样式',
  },
  {
    name: 'imageTransformInfo',
    type: `{scale: number, rotate: number, boundary: boolean, imgWidth: number, imgHeight: number}`,
    default: '',
    description: '图片的缩放、旋转、边界控制、图片宽高等信息',
  },
  {
    name: 'showPrevAndNext',
    type: 'boolean',
    default: 'true',
    description: '是否展示上一张和下一张按钮',
  },
  {
    name: 'showWaterModal',
    type: 'function',
    default: '',
    description: '是否在关闭当前弹窗时开启其他弹窗',
  },
  {
    name: 'imageSize',
    type: 'string',
    default: '',
    description: '图片的大小',
  },
  {
    name: 'title',
    type: 'string',
    default: '图片预览',
    description: '图片预览弹窗的标题',
  },
  {
    name: 'imageList',
    type: `{url: string, size: number, id: string}`,
    default: '',
    description: '需要预览的图片列表',
  },
  {
    name: 'closeOnClickModal',
    type: 'boolean',
    default: 'true',
    description: '是否在点击遮罩层时关闭图片预览弹窗',
  },
  {
    name: 'showZoomIn',
    type: 'boolean',
    default: 'true',
    description: '是否展示放大按钮',
  },
  {
    name: 'showZoomOut',
    type: 'boolean',
    default: 'true',
    description: '是否展示缩小按钮',
  },
  {
    name: 'showRotate',
    type: 'boolean',
    default: 'true',
    description: '是否展示旋转按钮',
  },
  {
    name: 'showReset',
    type: 'boolean',
    default: 'true',
    description: '是否展示重置按钮',
  },
  {
    name: 'showDownload',
    type: 'boolean',
    default: 'true',
    description: '是否展示下载按钮',
  },
  {
    name: 'download',
    type: `(params: {
      url: string;
      type?: string;
      fileName?: string;
      callback?: (res: boolean) => void;
      mark?: string;
    }) => void`,
    default: '',
    description: '自定义下载图片的方法',
  },
  {
    name: 'getImgSizeFromUrl',
    type: `(url: string) => Promise<{
      type: string;
      size: number;
    }>`,
    default: '',
    description: '获取图片大小方法',
  },
  {
    name: 'changeImgUrlDomain',
    type: `(url: string) => string`,
    default: '',
    description: '修改图片地址域名的方法',
  },
];
</script>

<props-table :data="data" />
