# Input 文本输入框

## 使用指南

全局注册

:::demo

```vue
<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('');
const value = ref('');
</script>

<template>
  <n-input size="large" placeholder="dnhyxc-ui-plus" v-model:value="value" />
</template>
```

:::

## API

### Input Props

<script>
const data = [
  {
    name: 'size',
    type: "enum",
    default: 'default',
    description: '输入框尺寸',
    typeEnum: ['large', 'default', 'small']
  },
  {
    name: 'type',
    type: "enum",
    default: 'default',
    description: '输入框的值',
  }
];
</script>

<props-table :data="data" />
