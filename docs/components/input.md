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
  <el-input placeholder="element plus" v-model="inputValue" />
  <br />
  <n-input size="large" placeholder="dnhyxc-ui-plus" v-model:value="value" />
</template>
```

:::

## API

### Icon Props

<script>
const iconProps = [
  {
    name: 'size',
    type: 'number | string',
    default: '16',
    description: '图标大小',
    version: '-'
  },
  {
    name: 'color',
    type: 'string',
    default: '#000',
    description: '图标颜色',
    version: '-'
  }
];
</script>

<table>
  <thead>
    <tr>
      <th style="width: 1000px">名称</th>
      <th style="width: 1000px">类型</th>
      <th style="width: 1000px">默认值</th>
      <th style="width: 1000px">说明</th>
      <th style="width: 1000px">版本</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="prop in iconProps" :key="prop.name">
      <td>{{ prop.name }}</td>
      <td>
        <code>{{ prop.type }}</code>
      </td>
      <td>
        <code>{{ prop.default }}</code>
      </td>
      <td>{{ prop.description }}</td>
      <td>{{ prop.version }}</td>
    </tr>
  </tbody>
</table>
