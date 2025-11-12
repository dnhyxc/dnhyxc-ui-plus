# Image 图片懒加载 <Badge type="warning" text="beta" />

## 使用指南

全局注册

:::demo

```vue
<template>
  <div class="image-list">
    <n-image
      url="https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="100px"
      radius="8px"
      placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      :on-click="
        () =>
          onPreview({
            url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
          })
      "
    />
    <n-image
      url="https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="auto"
      radius="8px"
      placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      :on-click="
        () =>
          onPreview({
            url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
          })
      "
    />
    <n-image
      url="https://files.codelife2.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="100px"
      radius="8px"
      errorText="加载失败了"
      placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      :on-click="
        () =>
          onPreview({
            url: 'https://files.codelife2.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
          })
      "
    />
    <n-image
      url="https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      radius="8px"
      width="100px"
      height="100px"
      loadingText="正在加载中"
    />
    <n-image
      url="https://files.codelife1.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      radius="8px"
      width="100px"
      height="100px"
      loadingText="正在加载中"
    />
    <n-image width="100px" height="100px" radius="8px" emptyText="没有图片" />
    <n-image
      placeholderImg="https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="100px"
      radius="8px"
      emptyText="没有图片"
    />
    <n-image-preview
      v-model:previewVisible="previewVisible"
      closeOnClickModal
      :image-list="imageList"
      :selectd-image="selectedImage"
      show-download
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const previewVisible = ref(false);

const selectedImage = ref({});

const onPreview = (image) => {
  previewVisible.value = true;
  selectedImage.value = image;
};
</script>

<style lang="scss" scoped>
.image-list {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .n-image {
    // 默认样式，可以通过修改默认样式来修改组件的样式
    // --image-object-position: top left;
    // --image-hover-object-position: bottom right;
    // --image-empty-bg: #f5f7fa;
    // --image-object-fit: cover;
    // --image-transition: all 0.3s ease-in-out;
    // --image-loading-bg: #f5f7fa;
    // --image-loading-text-color: #ccc;
    // --image-empty-text-color: #ccc;
    // --image-font-size: 14px; // 控制 loading、empty、加载失败的文字大小

    --image-loading-text-color: #333;
    --image-empty-text-color: #333;
    --image-empty-bg: rgb(226, 222, 222);
  }
}
</style>
```

:::

局部注册

:::demo

```vue
<template>
  <div class="image-list">
    <Image
      url="https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="100px"
      radius="8px"
      placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      :on-click="
        () =>
          onPreview({
            url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
          })
      "
    />
    <Image
      url="https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="auto"
      radius="8px"
      placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      :on-click="
        () =>
          onPreview({
            url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
          })
      "
    />
    <Image
      url="https://files.codelife2.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="100px"
      radius="8px"
      errorText="加载失败了"
      placeholderImg="https://files.codelife.cc/wallhaven/full/5g/wallhaven-5g57w1.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      :on-click="
        () =>
          onPreview({
            url: 'https://files.codelife2.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
          })
      "
    />
    <Image
      url="https://files.codelife1.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      radius="8px"
      width="100px"
      height="100px"
      loadingText="正在加载中"
    />
    <Image width="100px" height="100px" radius="8px" emptyText="没有图片" />
    <Image
      placeholderImg="https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp"
      width="100px"
      height="100px"
      radius="8px"
      emptyText="没有图片"
    />
    <ImagePreview
      v-model:previewVisible="previewVisible"
      closeOnClickModal
      :image-list="imageList"
      :selectd-image="selectedImage"
      show-download
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Image, ImagePreview } from 'dnhyxc-ui-plus';

const previewVisible = ref(false);

const selectedImage = ref({});

const onPreview = (image) => {
  previewVisible.value = true;
  selectedImage.value = image;
};
</script>

<style lang="scss" scoped>
.image-list {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .n-image {
    // 默认样式，可以通过修改默认样式来修改组件的样式
    // --image-object-position: top left;
    // --image-hover-object-position: bottom right;
    // --image-empty-bg: #f5f7fa;
    // --image-object-fit: cover;
    // --image-transition: all 0.3s ease-in-out;
    // --image-loading-bg: #f5f7fa;
    // --image-loading-text-color: #ccc;
    // --image-empty-text-color: #ccc;
    // --image-font-size: 14px; // 控制 loading、empty、加载失败的文字大小

    --image-loading-text-color: #333;
    --image-empty-text-color: #333;
    --image-empty-bg: rgb(226, 222, 222);
  }
}
</style>
```

:::

## API

### Image Props

<script>
const data = [
  {
    name: 'url',
    type: 'string',
    default: '',
    description: '图片地址',
  },
  {
    name: 'width',
    type: 'string',
    default: '',
    description: '图片宽度',
  },
  {
    name: 'height',
    type: 'string',
    default: '',
    description: '图片高度',
  },
  {
    name: 'radius',
    type: 'string',
    default: '',
    description: '图片圆角',
  },
  {
    name: 'placeholderImg',
    type: 'string',
    default: '',
    description: '占位图',
  },
  {
    name: 'loadingText',
    type: 'string',
    default: 'loading...',
    description: '加载中文字',
  },
  {
    name: 'emptyText',
    type: 'string',
    default: '暂无图片',
    description: '没有传 url 时，显示的文字',
  },
  {
    name: 'errorText',
    type: 'string',
    default: '加载失败',
    description: '加载失败文字',
  },
  {
    name: 'placeholderClassName',
    type: 'string',
    default: '',
    description: '展位图类名',
  },
  {
    name: 'alt',
    type: 'string',
    default: '',
    description: '图片描述',
  },
  {
    name: 'onClick',
    type: '() => void',
    default: '',
    description: '图片点击事件',
  },
  {
    name: 'onLoad',
    type: '() => void',
    default: '',
    description: '图片加载完成事件',
  }
];
</script>

<props-table :data="data" />
