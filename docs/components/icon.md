# Icon 图标

dnhyxc-ui 推荐使用 [xicons](https://www.xicons.org/#/) 作为图标库。

```
$ pnpm install @vicons/ionicons5
```

## 使用图标

全局注册

:::demo

```vue
<script setup lang="ts">
import { Earth } from '@vicons/ionicons5';
</script>

<template>
  <n-icon :size="20" color="red">
    <Earth />
  </n-icon>
  <n-icon :size="20" color="green">
    <Earth />
  </n-icon>
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
