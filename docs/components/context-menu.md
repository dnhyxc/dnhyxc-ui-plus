# ContextMenu 右键菜单

## 使用指南

全局注册

:::demo

```vue
<template>
  <div class="context-menu-demo">
    <n-context-menu :menu="CARD_CONTEXT_MENU" @select="onSelectMenu">
      <div class="card">
        <div>这是一篇文章</div>
        <div>使用右键进行操作</div>
      </div>
    </n-context-menu>
  </div>
</template>

<script setup lang="ts">
interface Menu {
  label: string;
  value: number;
}

const CARD_CONTEXT_MENU = [
  { label: '编辑', value: 1 },
  { label: '详情', value: 2 }
];

// 选中菜单
const onSelectMenu = (menu: { label: string; value: number }) => {
  console.log(menu);
};
</script>

<style lang="scss" scoped>
.context-menu-demo {
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
    border: 1px solid #ffffff52;
    border-radius: 5px;
  }
}
</style>
```

:::

局部注册

:::demo

```vue
<template>
  <div class="context-menu-demo">
    <ContextMenu :menu="CARD_CONTEXT_MENU" @select="onSelectMenu">
      <div class="card">
        <div>这是一篇文章</div>
        <div>使用右键进行操作</div>
      </div>
    </ContextMenu>
  </div>
</template>

<script setup lang="ts">
import { ContextMenu } from 'dnhyxc-ui-plus';

interface Menu {
  label: string;
  value: number;
}

const CARD_CONTEXT_MENU = [
  { label: '编辑', value: 1 },
  { label: '详情', value: 2 }
];

// 选中菜单
const onSelectMenu = (menu: Menu) => {
  console.log(menu);
};
</script>

<style lang="scss" scoped>
.context-menu-demo {
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
    border: 1px solid #ffffff52;
    border-radius: 5px;
  }
}
</style>
```

:::

## API

### ContextMenu Props

<script>
const data = [
  {
    name: 'menu',
    type: '{ label: string; value: any }[]',
    default: '',
    description: '菜单列表',
  },
  {
    name: 'noMenu',
    type: 'boolean',
    default: '',
    description: '是否显示菜单项',
  }
];

const slots = [
  {
    name: 'default',
    description: '菜单包裹的元素',
  }
]

const cssVars = [
  {
    name: '--context-menu-bg-color',
    description: '菜单背景颜色',
  },
  {
    name: '--context-menu-color',
    description: '菜单字体颜色',
  },
  {
    name:'--context-menu-shadow',
    description: '菜单阴影',
  },
  {
    name:'--context-menu-hover-color',
    description: '菜单鼠标悬停字体颜色',
  },
  {
    name:'--context-menu-hover-bg',
    description: '菜单鼠标悬停背景颜色',
  }
]
</script>

<props-table :data="data" />

### ContextMenu Slots

<props-table :data="slots" name-text="插槽名称" :show-type="false" :show-default="false" nameTextWidth="500px" />

### ContextMenu CSS Variables

<props-table :data="cssVars" name-text="CSS 变量" :show-type="false" :show-default="false" nameTextWidth="500px" />

CSS 变量使用说明：

可直接在组件中使用组件的类名 `.n-draft-input` 进行覆盖，例如：

```css[css]
.n-context-menu {
  --context-menu-bg-color: #f5f5f5;
  --context-menu-color: #000;
  --context-menu-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  --context-menu-hover-color: skyblue;
  --context-menu-hover-bg: #cfcfcf;
}
```
