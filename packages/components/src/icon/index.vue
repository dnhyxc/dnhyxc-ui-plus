<template>
  <div :class="className" v-bind="$attrs" v-html="getSvg(name, { size, width, height, color })" />
</template>
<script lang="ts" setup>
import { getSvg } from './svg';
import { IconProps } from './types';
import { createNamespace } from '../../utils/bem';
import './style/index.scss';

const bem = createNamespace('icon');

// defineOptions 用于给组件添加 name 属性
defineOptions({
  name: 'n-icon'
});

const props = defineProps<IconProps>();

const className = [bem.b(), props.className].filter(Boolean).join(' ');
</script>
