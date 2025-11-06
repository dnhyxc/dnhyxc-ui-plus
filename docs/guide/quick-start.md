# 快速开始

本节将介绍如何在项目中使用 dnhyxc-ui-plus。

## 用法

### 完整引入

如果对打包后的体积没有要求，那么可以直接使用全局导入的方式引入组件库。

```ts [main.ts]
import { createApp } from 'vue';
// 全局引入 dnhyxc-ui-plus 组件
import dnhyxcUI from 'dnhyxc-ui-plus';
import App from './App.vue';
import './style.css';

const app = createApp(App);
// 注册组件库
app.use(dnhyxcUI);
app.mount('#app');
```

在 App.vue 中使用组件

```vue [App.vue]
<template>
  <n-button size="large" type="danger" />
</template>
```

### 局部导入

如果对打包后的体积有要求，那么可以使用局部导入的方式引入组件库。

```vue [App.vue]
<template>
  <Button size="large" type="danger" />
</template>

<script setup lang="ts">
import { Button } from 'dnhyxc-ui-plus';
</script>
```
