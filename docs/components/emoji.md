# Emoji 表情

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-emoji :on-select="onSelect" :col="15" :gap="5" :init-show-emoji-count="30" :excludeEmoji="['[爆筋]']" />
</template>

<script setup lang="ts">
import { type EmojiName, notification } from 'dnhyxc-ui-plus';

const onSelect = (emoji: EmojiName) => {
  notification({
    title: '提示',
    message: `您选择了 - ${emoji} 表情`
  });
};
</script>
```

:::

局部注册

:::demo

```vue
<template>
  <Emoji :on-select="onSelect" :col="15" :gap="5" :init-show-emoji-count="30" :excludeEmoji="['[爆筋]']" />
</template>

<script setup lang="ts">
import { Emoji, type EmojiName, notification } from 'dnhyxc-ui-plus';

const onSelect = (emoji: EmojiName) => {
  notification({
    title: '提示',
    message: `您选择了 - ${emoji} 表情`
  });
};
</script>
```

:::

## API

### Emoji Props

<script>
const data = [
  {
    name: 'visible',
    type: 'string',
    default: '',
    description: '是否展示图标',
    typeEnum: ['sea', 'ai', 'thumbnail', 'in-clip', 'out-clip', 'wechat-program', 'to-top', 'prev', 'next', 'unfull', 'full', 'pause', 'pause-play', 'pause-play-fill', 'picture-to-picture', 'solid']
  },
  {
    name: 'className',
    type: 'string',
    default: '',
    description: '组件 bodyClass 类名',
  },
  {
    name: 'initShowEmojiCount',
    type: 'number',
    default: '30',
    description: '初始化展示表情数量',
  },
  {
    name: 'includeEmoji',
    type: 'array',
    default: '',
    description: '需要展示的表情',
  },
  {
    name: 'excludeEmoji',
    type: 'array',
    default: '',
    description: '不需要展示的表情',
  },
  {
    name: 'col',
    type: 'number',
    default: '',
    description: '每行展示的表情数量',
  },
  {
    name: 'gap',
    type: 'number',
    default: '',
    description: '表情之间的间距',
  }
];
</script>

<props-table :data="data" />
