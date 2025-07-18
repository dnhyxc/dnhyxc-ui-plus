# Button 按钮

## 使用按钮

全局注册

:::demo

```vue
<template>
  <n-button type="danger" style="margin-right: 12px">button</n-button>
  <el-button type="primary">element-plus button</el-button>
  <nel-button>dnhyxc-ui-plus button</nel-button>
</template>
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
