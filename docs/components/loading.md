# Model 弹窗

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-loading dot-size="10px"></n-loading>
  <n-loading dot-size="5px" :dots="10"></n-loading>
  <n-loading
    dotBgColor0="yellow"
    dotBgColor50="skyblue"
    dotBgColor100="yellow"
    dotShadowColor0="green"
    dotShadowColor50="skyblue"
    dotShadowColor100="yellow"
  ></n-loading>
</template>
```

:::

局部注册

:::demo

```vue
<template>
  <Loading dot-size="10px"></Loading>
  <Loading dot-size="5px" :dots="10"></Loading>
  <Loading
    dotBgColor0="yellow"
    dotBgColor50="skyblue"
    dotBgColor100="yellow"
    dotShadowColor0="green"
    dotShadowColor50="skyblue"
    dotShadowColor100="yellow"
  ></Loading>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Loading } from 'dnhyxc-ui-plus';

const visible1 = ref(false);
const visible2 = ref(false);
</script>
```

:::

## API

### Model Props

<script>
const data = [
  {
    name: 'dots',
    type: 'number',
    default: '5',
    description: '点的个数',
  },
  {
    name: 'dotSize',
    type: 'string',
    default: '10px',
    description: '点的大小',
  },
  {
    name: 'dotRight',
    type: 'string',
    default: '15px',
    description: '点的右边距',
  },
    {
    name: 'dotBgColor0',
    type: 'string',
    default: '',
    description: '点过渡动画 0% 的背景颜色',
  },
  {
    name: 'dotBgColor50',
    type: 'string',
    default: '',
    description: '点过渡动画 50% 的背景颜色',
  },
  {
    name: 'dotBgColor100',
    type: 'string',
    default: '',
    description: '点过渡动画 100% 的背景颜色',
  },
  {
    name: 'dotShadowColor0',
    type: 'string',
    default: '',
    description: '点过渡动画 0% 的阴影颜色',
  },
  {
    name: 'dotShadowColor50',
    type: 'string',
    default: '',
    description: '点过渡动画 50% 的阴影颜色',
  },
  {
    name: 'dotShadowColor100',
    type: 'string',
    default: '',
    description: '点过渡动画 100% 的阴影颜色',
  }
];
</script>

<props-table :data="data" />
