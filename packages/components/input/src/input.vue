<!--
 * Icon - 图标组件
 * @author: dnhyxc
 * @since: 2025-07-02
 * index.vue
-->
<template>
  <div :class="bem.b()" v-bind="$attrs">
    <el-input v-model="keyword" :size="size" :style="styles" :disabled="disabled" :placeholder="placeholder">
      <slot></slot>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import type { CSSProperties } from 'vue';
import { createNamespace } from '@dnhyxc/utils_beta';
import { inputProps } from './input';
import './style/index.ts';

defineOptions({
  name: 'NInput',
  inheritAttrs: false // 禁用继承父组件的属性
});

const bem = createNamespace('input');

const emit = defineEmits(['update:value']);

const props = defineProps(inputProps);

const keyword = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit('update:value', val);
  }
});

const styles = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  };
});
</script>
