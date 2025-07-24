# Icon 图标

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

## API

### Icon Props

<script>
const inputProps = [
  {
    name: 'name',
    type: 'enum',
    default: '',
    description: '图标名称',
    version: '-',
    details: "'sea' | 'ai' | 'thumbnail' | 'in-clip' | 'out-clip' | 'wechat-program' | 'to-top' | 'prev' | 'next' | 'unfull' | 'full' | 'pause' | 'pause-play' | 'pause-play-fill' | 'picture-to-picture' | 'solid'"
  },
  {
    name: 'size',
    type: 'string',
    default: '',
    description: '图标大小',
    version: '-',
  },
  {
    name: 'color',
    type: 'string',
    default: '',
    description: '图标颜色',
    version: '-'
  },
  {
    name: 'width',
    type: 'string',
    default: '',
    description: '图标宽度',
    version: '-'
  },
  {
    name: 'height',
    type: 'string',
    default: '',
    description: '图标高度',
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
