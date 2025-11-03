# ImagePreview 图片预览

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-image-preview
    v-model:previewVisible="previewVisible"
    closeOnClickModal
    :select-image="{
      url: 'https://dnhyxc.cn/atlas/__ATLAS__d715523d4d624198c6e58fadc7fe7d0adn66efe5c8d80d0da837a3e600h1753835814052.webp'
    }"
    dialogStyle="background: rgba(0, 0, 0, 0.5);"
  >
  </n-image-preview>
  <n-button type="primary" @click="previewVisible = true">查看图片</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const previewVisible = ref(false);
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
    :select-image="{
      url: 'https://dnhyxc.cn/atlas/__ATLAS__d715523d4d624198c6e58fadc7fe7d0adn66efe5c8d80d0da837a3e600h1753835814052.webp'
    }"
  />
  <n-button type="primary" @click="previewVisible = true">查看图片</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ImagePreview } from 'dnhyxc-ui-plus';

const previewVisible = ref(false);
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
