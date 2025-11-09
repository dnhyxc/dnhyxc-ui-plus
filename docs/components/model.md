# Model 弹窗

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-model v-model:visible="visible1" title="弹窗1" alignCenter>
    <template #content>
      <div class="content">弹窗1内容</div>
    </template>
  </n-model>
  <n-model v-model:visible="visible2" :show-close="false">
    <!-- 自定义标题透传的 close, titleId, titleClass 参数-->
    <template #header="{ close, titleId, titleClass }">
      <div class="header">
        <div class="title">弹窗2</div>
        <n-icon name="close" size="18" @click="close" color="#333" cursor="pointer" />
      </div>
    </template>
    <template #content>
      <div class="content">弹窗2内容</div>
    </template>
    <template #footer>
      <div class="footer">
        <n-button type="primary" @click="visible2 = false">确定</n-button>
        <n-button class="close-btn" @click="visible2 = false">取消</n-button>
      </div>
    </template>
  </n-model>
  <div class="button-group">
    <n-button type="primary" @click="visible1 = true">打开弹窗1</n-button>
    <n-button type="primary" @click="visible2 = true">打开弹窗2</n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible1 = ref(false);
const visible2 = ref(false);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
}

.footer {
  display: flex;
  justify-content: flex-end;

  .close-btn {
    margin-left: 10px;
  }
}

.button-group {
  display: flex;
  align-items: center;

  .n-button {
    margin-right: 10px;
  }
}
</style>
```

:::

局部注册

:::demo

```vue
<template>
  <Model v-model:visible="visible1" title="弹窗1" alignCenter>
    <template #content>
      <div class="content">弹窗1内容</div>
    </template>
  </Model>
  <Model v-model:visible="visible2" :show-close="false">
    <!-- 自定义标题透传的 close, titleId, titleClass 参数-->
    <template #header="{ close, titleId, titleClass }">
      <div class="header">
        <div class="title">弹窗2</div>
        <n-icon name="close" size="18" @click="close" color="#333" cursor="pointer" hoverColor="skyblue" />
      </div>
    </template>
    <template #content>
      <div class="content">弹窗2内容</div>
    </template>
    <template #footer>
      <div class="footer">
        <n-button type="primary" @click="visible2 = false">确定</n-button>
        <n-button class="close-btn" @click="visible2 = false">取消</n-button>
      </div>
    </template>
  </Model>
  <div class="button-group">
    <n-button type="primary" @click="visible1 = true">打开弹窗1</n-button>
    <n-button type="primary" @click="visible2 = true">打开弹窗2</n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Model } from 'dnhyxc-ui-plus';

const visible1 = ref(false);
const visible2 = ref(false);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
}

.footer {
  display: flex;
  justify-content: flex-end;

  .close-btn {
    margin-left: 10px;
  }
}

.button-group {
  display: flex;
  align-items: center;

  .n-button {
    margin-right: 10px;
  }
}
</style>
```

:::

## API

### Model Props

<script>
const data = [
  {
    name: 'visible',
    type: 'boolean',
    default: '',
    description: '是否显示弹窗',
  },
  {
    name: 'title',
    type: 'string',
    default: '',
    description: '弹窗标题',
  },
  {
    name: 'width',
    type: 'string',
    default: '',
    description: '弹窗宽度',
  },
  {
    name: 'showFooter',
    type: 'boolean',
    default: '',
    description: '是否显示底部',
  },
  {
    name: 'draggable',
    type: 'boolean',
    default: '',
    description: '是否可拖拽',
  },
  {
    name: 'onClick',
    type: '(() => void) | null',
    default: '',
    description: '弹窗确定按钮点击事件',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: '',
    description: '是否显示遮罩层',
  },
  {
    name: 'size',
    type: 'string',
    default: '',
    description: '图标高度',
  },
  {
    name: 'footerBtnWidth',
    type: 'number',
    default: '',
    description: '底部操作按钮宽度',
  },
  {
    name: 'footerBtnHeight',
    type: 'string',
    default: '',
    description: '底部操作按钮高度',
  },
  {
    name: 'cancelText',
    type: 'string',
    default: '',
    description: '取消按钮文案',
  },
  {
    name: 'okText',
    type: 'string',
    default: '',
    description: '确定按钮文案',
  },
  {
    name: 'padding',
    type: 'string',
    default: '',
    description: '弹窗内边距',
  },
  {
    name: 'center',
    type: 'boolean',
    default: '',
    description: '是否让 Dialog 的 header 和 footer 部分居中排列',
  },
  {
    name: 'alignCenter',
    type: 'boolean',
    default: '',
    description: '弹窗是否垂直居中',
  },
  {
    name: 'fullscreen',
    type: 'boolean',
    default: '',
    description: '是否全屏',
  },
  {
    name: 'top',
    type: 'string',
    default: '',
    description: '弹窗 CSS 中的 margin-top 值，默认为 15vh，当设置 alignCenter 为 true 时，top 会不起作用',
  },
  {
    name: 'showClose',
    type: 'boolean',
    default: '',
    description: '是否显示关闭按钮',
  },
  {
    name: 'modalClass',
    type: 'string',
    default: '',
    description: '遮罩层自定义类名',
  },
  {
    name: 'headerClass',
    type: 'string',
    default: '',
    description: 'dialog-header 的自定义类名',
  },
  {
    name: 'bodyClass',
    type: 'string',
    default: '',
    description: 'dialog-body 的自定义类名',
  },
  {
    name: 'footerClass',
    type: 'string',
    default: '',
    description: 'dialog-footer 的自定义类名',
  },
  {
    name: 'appendToBody',
    type: 'boolean',
    default: '',
    description: 'Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true',
  },
  {
    name: 'appendTo',
    type: 'CSSSelector | HTMLElement',
    default: '',
    description: 'Dialog 挂载到哪个 DOM 元素 将覆盖 append-to-body',
  },
  {
    name: 'lockScroll',
    type: 'boolean',
    default: '',
    description: '是否在 Dialog 出现时将 body 滚动锁定',
  },
  {
    name: 'beforeClose',
    type: '(done: () => void) => void',
    default: '',
    description: '关闭前的回调，会暂停 Dialog 的关闭。done 用于关闭 Dialog',
  }
];

const slots = [
  {
    name: 'header',
    type: '',
    default: '',
    description: '对话框标题的内容；会替换标题部分，但不会移除关闭按钮',
  },
  {
    name: 'content',
    type: '',
    default: '',
    description: '对话框的内容',
  },
  {
    name: 'footer',
    type: '',
    default: '',
    description: 'Dialog 按钮操作区的内容',
  }
];
</script>

<props-table :data="data" />

### Model Slots

<props-table :data="slots" name-text="插槽名称" :show-type="false" :show-default="false" />
