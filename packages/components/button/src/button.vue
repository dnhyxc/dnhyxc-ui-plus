<!--
 * Icon - 图标组件
 * @author: dnhyxc
 * @since: 2025-07-02
 * index.vue
-->
<template>
  <div :class="bem.b()" v-bind="$attrs">
    <el-button type="primary" :link="link" :size="size" :disabled="disabled" :loading="loading" :style="styles">
      <slot></slot>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import type { CSSProperties } from 'vue';
import { createNamespace } from '@dnhyxc/utils_beta';
import { buttonProps } from './button';
import './index.scss';

defineOptions({
  name: 'NIcon',
  inheritAttrs: false // 禁用继承父组件的属性
});

const bem = createNamespace('button');

const props = defineProps(buttonProps);

const styles = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  };
});
</script>
