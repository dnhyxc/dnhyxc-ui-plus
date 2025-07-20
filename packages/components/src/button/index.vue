<template>
  <div :class="bem.b()" v-bind="$attrs">
    <el-button :type="type" :size="size" :disabled="disabled" :link="link" :loading="loading" :style="styles">
      <slot>dnhyxc-ui button</slot>
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
import { buttonProps } from './types';
import { createNamespace } from '../../utils/bem';
import './style/index.scss';

const bem = createNamespace('button');

// defineOptions 用于给组件添加 name 属性
defineOptions({
  name: 'n-button'
});

const props = defineProps(buttonProps);

const styles = computed<CSSProperties>(() => {
  const { size, color, width, height } = props;
  if (!size && !color && !width && !height) return {};
  return {
    ...(size ? { 'font-size': size + 'px' } : {}),
    ...(width ? { width: width + 'px' } : {}),
    ...(height ? { height: height + 'px' } : {}),
    ...(color ? { color: color } : {})
  };
});
</script>
