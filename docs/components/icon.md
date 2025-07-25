# Icon 图标 <Badge type="warning" text="beta" />

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-icon name="sea" size="28" />
  <n-icon name="ai" size="100" />
  <n-icon name="wechat-program" />
  <n-icon name="pause-play" />
  <n-icon name="pause-play-fill" class-name="play-fill-icon" />
  <n-icon name="out-clip" />
</template>

<style lang="scss" scoped>
.play-fill-icon {
  cursor: pointer;
}
</style>
```

:::

局部注册

:::demo

```vue
<template>
  <Icon name="sea" size="28" />
  <Icon name="ai" />
</template>

<script setup lang="ts">
import { Icon } from 'dnhyxc-ui-plus';
</script>
```

:::

<icon-list />

## API

### Icon Props

<script>
const data = [
  {
    name: 'name',
    type: 'enum',
    default: '',
    description: '图标名称',
    typeEnum: ['sea', 'ai', 'thumbnail', 'in-clip', 'out-clip', 'wechat-program', 'to-top', 'prev', 'next', 'unfull', 'full', 'pause', 'pause-play', 'pause-play-fill', 'picture-to-picture', 'solid']
  },
  {
    name: 'size',
    type: 'string',
    default: '24',
    description: '图标大小',
  },
  {
    name: 'color',
    type: 'string',
    default: '',
    description: '图标颜色',
  },
  {
    name: 'width',
    type: 'string',
    default: '',
    description: '图标宽度',
  },
  {
    name: 'height',
    type: 'string',
    default: '',
    description: '图标高度',
  }
];
</script>

<props-table :data="data" />
