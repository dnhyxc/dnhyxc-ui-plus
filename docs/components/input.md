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
  <!-- <el-input placeholder="element plus" v-model="inputValue" /> -->
  <br />
  <n-input size="large" placeholder="dnhyxc-ui-plus" v-model:value="value" />
</template>
```

:::

## API

### Input Props

<script>
const inputProps = [
  {
    name: 'size',
    type: 'enum',
    default: 'default',
    description: '输入框尺寸',
    version: '-',
    details: "'large' | 'default' | 'small'"
  },
  {
    name: 'value',
    type: 'string',
    default: '',
    description: '输入框的值',
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
    <tr v-for="prop in inputProps" :key="prop.name">
      <td>{{ prop.name }}</td>
      <td>
        <code>{{ prop.type }}</code>
        <el-tooltip
          v-if="prop.details"
          class="item"
          :content="prop.details"
          placement="top"
        >
          <el-icon style="cursor: pointer">❕</el-icon>
        </el-tooltip>
      </td>
      <td>
        <code v-if="prop.default">{{ prop.default }}</code>
        <span v-else>-</span>
      </td>
      <td>{{ prop.description }}</td>
      <td>{{ prop.version }}</td>
    </tr>
  </tbody>
</table>
