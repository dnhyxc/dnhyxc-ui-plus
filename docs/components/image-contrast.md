# ImageContrast 图片对比

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-image-contrast
    before-img="/before.webp"
    after-img="/after.jpeg"
    img-height="450px"
    beforeSize="200KB"
    afterSize="35KB"
  />
  <div class="container">
    <div class="info">自定义 title 展示</div>
    <n-image-contrast
      before-img="/before.webp"
      after-img="/after.jpeg"
      img-height="450px"
      beforeSize="200KB"
      afterSize="35KB"
    >
      <template #title>
        <div class="title">
          <span>压缩前图片大小：200KB</span>
          <span>压缩后图片大小：20KB</span>
        </div>
      </template>
    </n-image-contrast>
  </div>
</template>

<style lang="scss" scoped>
.n-image-contrast {
  // --contrast-box-shadow: rgba(0, 0, 0, 0.3);
  // --contrast-font-color: #333;
  // --contrast-before-size-color: #ff9900;
  // --contrast-after-size-color: #09ab1f;
  // --contrast-img-height: 500px;

  --contrast-font-color: #fff;
}

.container {
  margin-top: 50px;

  .info {
    margin-bottom: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
```

:::

局部注册

:::demo

```vue
<template>
  <ImageContrast
    before-img="/before.webp"
    after-img="/after.jpeg"
    img-height="450px"
    beforeSize="200KB"
    afterSize="35KB"
  />
  <div class="container">
    <div class="info">自定义 title 展示</div>
    <ImageContrast
      before-img="/before.webp"
      after-img="/after.jpeg"
      img-height="450px"
      beforeSize="200KB"
      afterSize="35KB"
    >
      <template #title>
        <div class="title">
          <span>压缩前图片大小：200KB</span>
          <span>压缩后图片大小：20KB</span>
        </div>
      </template>
    </ImageContrast>
  </div>
</template>

<script setup lang="ts">
import { ImageContrast } from 'dnhyxc-ui-plus';
</script>

<style lang="scss" scoped>
.n-image-contrast {
  // --contrast-box-shadow: rgba(0, 0, 0, 0.3);
  // --contrast-font-color: #333;
  // --contrast-before-size-color: #ff9900;
  // --contrast-after-size-color: #09ab1f;
  // --contrast-img-height: 500px;

  --contrast-font-color: #fff;
}

.container {
  margin-top: 50px;

  .info {
    margin-bottom: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
```

:::

## API

### ImageContrast Props

<script>
const data = [
  {
    name: 'beforeImg',
    type: 'string',
    default: '',
    description: '压缩前图片 url',
  },
  {
    name: 'afterImg',
    type: 'string',
    default: '',
    description: '压缩后图片 url',
  },
  {
    name: 'height',
    type: 'string',
    default: '',
    description: '图片高度',
  },
  {
    name: 'beforeSize',
    type: 'string',
    default: '',
    description: '压缩前图片大小',
  },
  {
    name: 'afterSize',
    type: 'string',
    default: '',
    description: '压缩后图片大小',
  },
  {
    name: 'imgHeight',
    type: 'string',
    default: '500px',
    description: '图片高度',
  },
  {
    name: 'showDrag',
    type: 'string',
    default: 'true',
    description: '是否显示对比控制器',
  }
];
</script>

<props-table :data="data" />
