<template>
  <section ref="loadingRef" :class="bem.b()">
    <div
      v-for="i in dots"
      :key="i"
      class="dot"
      :style="`width: ${dotSize}; height: ${dotSize}; margin-right: ${dotRight}`"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { createNamespace } from '../../utils';
import { LoadingOptions } from './types';
import './style/index.scss';

const bem = createNamespace('loading');

defineOptions({
  name: 'n-loading'
});

const props = withDefaults(defineProps<LoadingOptions>(), {
  dots: 5,
  dotSize: '10px',
  dotRight: '15px',
  dotColor: '',
  dotBgColor0: '',
  dotBgColor50: '',
  dotBgColor100: '',
  dotShadowColor0: '',
  dotShadowColor50: '',
  dotShadowColor100: ''
});

const loadingRef = ref<HTMLElement | null>(null);

// 更改 css 变量
const changeCssVariable = (variable: string, value: string) => {
  if (loadingRef.value) {
    loadingRef.value.style.setProperty(variable, value);
  }
};

onMounted(() => {
  nextTick(() => {
    // 批量设置 CSS 变量
    const cssVarMap: Record<string, string> = {
      '--loading-bg-color-0': props.dotBgColor0,
      '--loading-bg-color-50': props.dotBgColor50,
      '--loading-bg-color-100': props.dotBgColor100,
      '--loading-shadow-color-0': props.dotShadowColor0,
      '--loading-shadow-color-50': props.dotShadowColor50,
      '--loading-shadow-color-100': props.dotShadowColor100
    };
    Object.entries(cssVarMap).forEach(([key, val]) => {
      if (val) changeCssVariable(key, val);
    });
  });
});
</script>
