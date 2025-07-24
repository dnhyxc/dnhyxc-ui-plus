<!--
 * Icon - 图标组件
 * @author: dnhyxc
 * @since: 2025-07-02
 * index.vue
-->
<template>
  <div :class="className" v-bind="$attrs">
    <el-input
      ref="inputRef"
      v-model="keyword"
      :size="size"
      :style="styles"
      :disabled="disabled"
      :placeholder="placeholder"
      class="input"
    >
      <slot></slot>
    </el-input>
    <el-button type="primary" size="large">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CSSProperties } from 'vue';
import { ElInput, ElButton } from 'element-plus';
import 'element-plus/es/components/input/style/css';
import { createNamespace } from '../../utils/bem';
import { inputProps } from './types';
import './style/index.scss';

defineOptions({
  name: 'NInput',
  inheritAttrs: false // 禁用继承父组件的属性
});

const bem = createNamespace('input');

const emit = defineEmits(['update:value']);

const props = defineProps(inputProps);

const className = [bem.b(), props.className].filter(Boolean).join(' ');

const inputRef = ref();

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

defineExpose({
  inputRef
});
</script>
