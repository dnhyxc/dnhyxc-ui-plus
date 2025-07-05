<!--
 * Icon - 图标组件
 * @author: dnhyxc
 * @since: 2025-07-02
 * index.vue
-->
<template>
  <div :class="bem.b()">
    <el-input size="large" :disabled="disabled" :style="styles" v-bind="$attrs">
      <slot></slot>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import type { CSSProperties } from 'vue';
import { createNamespace } from '@dnhyxc-ui/utils';
import { inputProps } from './input';
import './style/index.scss';

defineOptions({
  name: 'NInput',
  inheritAttrs: false // 禁用继承父组件的属性
});

const bem = createNamespace('input');

const props = defineProps(inputProps);

const styles = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  };
});
</script>
