# Notification 通知

## 使用通知

:::demo

```vue
<template>
  <Button type="success" size="large" style="margin-right: 12px" :on-click="onClick">success button</Button>
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

### Notification Props

<script>
const data = [
  {
    name: 'title',
    type: "string",
    default: '',
    description: '标题',
  },
  {
    name: 'message',
    type: "string",
    default: '',
    description: '通知栏正文内容',
  },
  {
    name: 'type',
    type: "enum",
    default: '',
    description: '通知的类型',
    typeEnum: ['primary', 'success', 'warning', 'info', 'error', '']
  },
  {
    name: 'duration',
    type: "number",
    default: '4500',
    description: '显示时间, 单位为毫秒。 值为 0 则不会自动关闭'
  },
  {
    name: 'offset',
    type: "number",
    default: '0',
    description: '相对屏幕顶部的偏移量 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量'
  },
  {
    name: 'zIndex',
    type: "number",
    default: '0',
    description: '初始 zIndex'
  },
  {
    name: 'onClose',
    type: "() => void",
    default: '',
    description: '关闭时的回调函数'
  },
];
</script>

<props-table :data="data" />
