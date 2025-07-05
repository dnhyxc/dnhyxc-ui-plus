<!--
 * Icon - 图标组件
 * @author: dnhyxc
 * @since: 2025-07-02
 * index.vue
-->
<template>
  <i :class="bem.b()" :style="styles" v-bind="$attrs">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { createNamespace } from '@dnhyxc-ui/utils';
import { iconProps2 } from './icon2';

defineOptions({
  name: 'NIcon2',
  inheritAttrs: false // 禁用继承父组件的属性
});

const bem = createNamespace('icon');

const props = defineProps(iconProps2);

const styles = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  };
});
</script>
