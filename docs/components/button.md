# Button 按钮

## 使用按钮

全局注册

:::demo

```vue
<template>
  <n-button type="success" size="large" style="margin-right: 12px" :on-click="onClick">success button</n-button>
  <n-button type="primary" style="margin-right: 12px">primary button</n-button>
  <n-button type="danger" size="small">danger button</n-button>
</template>

<script setup lang="ts">
import { notification } from 'dnhyxc-ui-plus';
const onClick = (e: MouseEvent) => {
  notification({
    title: '成功提示',
    message: '这是一条成功提示消息',
    type: 'success'
  });
};
</script>
```

:::

局部注册

:::demo

```vue
<template>
  <Button type="success" size="large" style="margin-right: 12px" :on-click="onClick">success button</Button>
  <Button type="primary" style="margin-right: 12px">primary button</Button>
  <Button type="danger" size="small">danger button</Button>
</template>

<script setup lang="ts">
import { Button, notification } from 'dnhyxc-ui-plus';
const onClick = (e: MouseEvent) => {
  notification({
    title: '成功提示',
    message: '这是一条成功提示消息',
    type: 'success'
  });
};
</script>
```

:::

## API

### Button Props

<script>
const data = [
  {
    name: 'size',
    type: "enum",
    default: 'default',
    description: '按钮尺寸',
    version: '-',
    typeEnum: ['large', 'default', 'small']
  },
  {
    name: 'type',
    type: "enum",
    default: 'default',
    description: '按钮类型',
    version: '-',
    typeEnum: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text', '']
  }
];
</script>

<n-props-table :data="data" />
