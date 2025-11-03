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
    show-prev-and-next
    dialog-width="800px"
    closeOnClickModal
    :image-list="imageList"
    :selectd-image="{
      id: '1',
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    :download="onDownload"
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

### Emoji Props

<script>
const data = [
  {
    name: 'visible',
    type: 'string',
    default: '',
    description: '是否展示图标',
  },
  {
    name: 'className',
    type: 'string',
    default: '',
    description: '组件 bodyClass 类名',
  },
  {
    name: 'initShowEmojiCount',
    type: 'number',
    default: '30',
    description: '初始化展示表情数量',
  },
  {
    name: 'includeEmoji',
    type: 'array',
    default: '',
    description: '需要展示的表情',
  },
  {
    name: 'excludeEmoji',
    type: 'array',
    default: '',
    description: '不需要展示的表情',
  },
  {
    name: 'col',
    type: 'number',
    default: '',
    description: '每行展示的表情数量',
  },
  {
    name: 'gap',
    type: 'number',
    default: '',
    description: '表情之间的间距',
  }
];
</script>

<props-table :data="data" />
