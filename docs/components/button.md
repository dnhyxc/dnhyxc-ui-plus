# Button 按钮

## 使用按钮

全局注册

:::demo

```vue
<template>
  <n-button type="success" size="large" style="margin-right: 12px">success button</n-button>
  <n-button type="primary" style="margin-right: 12px">primary button</n-button>
  <n-button type="danger" size="small">danger button</n-button>
</template>
```

:::

局部注册

:::demo

```vue
<template>
  <Button type="success" size="large" style="margin-right: 12px">success button</Button>
  <Button type="primary" style="margin-right: 12px">primary button</Button>
  <Button type="danger" size="small">danger button</Button>
</template>

<script setup lang="ts">
import { Button } from 'dnhyxc-ui-plus';
</script>
```

:::

## API

### Button Props

<script>
const buttonProps = [
  {
    name: 'size',
    type: "enum",
    default: 'default',
    description: '按钮尺寸',
    version: '-',
    details: "'large' | 'default' | 'small'"
  },
  {
    name: 'type',
    type: "enum",
    default: 'default',
    description: '按钮类型',
    version: '-',
    details: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | '' | 'text'"
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
    <tr v-for="prop in buttonProps" :key="prop.name">
      <td>{{ prop.name }}</td>
      <td>
        <code>
          {{ prop.type }}
        </code>
        <el-tooltip
          class="item"
          :content="prop.details"
          placement="top"
        >
          <el-icon style="cursor: pointer">❕</el-icon>
        </el-tooltip>
      </td>
      <td>
        <code>{{ prop.default }}</code>
      </td>
      <td>{{ prop.description }}</td>
      <td>{{ prop.version }}</td>
    </tr>
  </tbody>
</table>
