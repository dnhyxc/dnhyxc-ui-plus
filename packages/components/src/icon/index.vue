<template>
  <div
    ref="iconRef"
    :class="className"
    v-bind="$attrs"
    :style="`cursor: ${cursor}; scale: ${scale}; transition: ${scale ? `scale ${transitionTime || '0.3s'}` : 'none'}`"
    @mouseover="hoverColor ? onMouseEnter() : null"
    @mouseleave="hoverColor ? onMouseLeave() : null"
    @click="onClick"
    v-html="getSvg(name, { size, width, height, color })"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { getSvg } from './svg';
import { IconProps } from './types';
import { createNamespace } from '../../utils';
import './style/index.scss';

const bem = createNamespace('icon');

// defineOptions 用于给组件添加 name 属性
defineOptions({
  name: 'n-icon'
});

const props = defineProps<IconProps>();

const className = [bem.b(), props.className].filter(Boolean).join(' ');

const iconRef = ref<HTMLElement>();

const color = ref(props.color);

const scale = ref(1);

defineExpose({
  getSvg,
  iconRef
});

const onMouseEnter = () => {
  color.value = props.hoverColor || props.color;
  if (props?.scale) {
    scale.value = props.scale;
  }
};

const onMouseLeave = () => {
  color.value = props.color;
  if (props?.scale) {
    scale.value = 1;
  }
};
</script>
