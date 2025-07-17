<template>
  <button :class="bem.b()" v-bind="$attrs" :style="styles"><slot>测试按钮</slot></button>
</template>
<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
import { buttonProps } from './types';
import { createNamespace } from '../../utils/bem';
import './style/index.scss';

const bem = createNamespace('button');

defineOptions({
  name: 'n-button'
});

const props = defineProps(buttonProps);

const styles = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {};
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  };
});
</script>
