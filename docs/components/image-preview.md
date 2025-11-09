# ImagePreview 图片预览

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-image-preview
    v-model:visible="previewVisible1"
    closeOnClickModal
    :image-list="imageList"
    :selectd-image="{
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    width="75vw"
    style="background: rgba(0, 0, 0, 0.5);"
  >
  </n-image-preview>
  <n-model v-model:visible="visible" title="其他弹窗">
    <template #content>
      <div>其他的弹窗</div>
    </template>
  </n-model>
  <n-image-preview
    v-model:visible="previewVisible2"
    closeOnClickModal
    :image-list="imageList"
    :selectd-image="{
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    width="75vw"
    style="background: rgba(0, 0, 0, 0.5);"
    :showOtherModel="showOtherModel"
  >
    <template #footer>
      <div>footer</div>
    </template>
  </n-image-preview>
  <n-button type="primary" @click="previewVisible1 = true">查看图片1</n-button>
  <n-button type="primary" style="margin-left: 10px" @click="previewVisible2 = true">查看图片2</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const previewVisible1 = ref(false);
const previewVisible2 = ref(false);

// 不传 id 时，会根据 url 进行匹配，因此需要确保每个 url 都是唯一的
const imageList = [
  {
    url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  },
  {
    url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
  }
];

const showOtherModel = () => {
  visible.value = true;
};
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
    v-model:visible="previewVisible1"
    width="75vw"
    closeOnClickModal
    :image-list="imageList"
    show-download
    :selectd-image="{
      id: '1',
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    :getImgSizeFromUrl="getImgSizeFromUrl"
  />
  <ImagePreview
    v-model:visible="previewVisible2"
    closeOnClickModal
    :image-list="imageList"
    :selectd-image="{
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    width="75vw"
    style="background: rgba(0, 0, 0, 0.5);"
    :showOtherModel="showOtherModel"
  >
    <template #footer>
      <div>footer</div>
    </template>
  </ImagePreview>
  <Button type="primary" @click="previewVisible1 = true">查看图片1</Button>
  <Button type="primary" style="margin-left: 10px" @click="previewVisible2 = true">查看图片2</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ImagePreview, Button } from 'dnhyxc-ui-plus';

const previewVisible1 = ref(false);
const previewVisible2 = ref(false);

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
    name: 'visible',
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
    name: 'imageList',
    type: `{url: string, size: number, id: string}`,
    default: '',
    description: '需要预览的图片列表',
  },
  {
    name: 'width',
    type: 'string',
    default: '800px',
    description: '图片预览弹窗的宽度',
  },
  {
    name: 'style',
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
    name: 'showOtherModel',
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
  }
];

const slots = [
  {
    name: 'header',
    type: '',
    default: '',
    description: '对话框标题的内容；会替换标题部分，但不会移除关闭按钮',
  },
  {
    name: 'content',
    type: '',
    default: '',
    description: '对话框的内容',
  },
  {
    name: 'footer',
    type: '',
    default: '',
    description: 'Dialog 按钮操作区的内容',
  }
];
</script>

<props-table :data="data" />

剩余其他属性请参考 [Model](/components/model) 组件。

### ImageProps Slots

<props-table :data="slots" name-text="插槽名称" :show-type="false" :show-default="false" />
