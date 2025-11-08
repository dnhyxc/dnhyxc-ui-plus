# Model 弹窗

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-model v-model:visible="visible">
    <template #content>
      <div class="content">弹窗内容</div>
    </template>
  </n-model>
  <n-button type="primary" @click="visible = true">打开</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
  padding: 0 !important;
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
    typeEnum: ['sea', 'ai', 'thumbnail', 'in-clip', 'out-clip', 'wechat-program', 'to-top', 'prev', 'next', 'unfull', 'full', 'pause', 'pause-play', 'pause-play-fill', 'picture-to-picture', 'solid', 'info']
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
