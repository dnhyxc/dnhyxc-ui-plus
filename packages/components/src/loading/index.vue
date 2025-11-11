<template>
  <section :class="bem.b()">
    <div
      v-for="i in dots"
      :key="i"
      class="dot"
      :style="`width: ${dotSize}; height: ${dotSize}; margin-right: ${dotRight}`"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { createNamespace } from '../../utils';
import { LoadingOptions } from './types';
import './style/index.scss';

const bem = createNamespace('loading');

defineOptions({
  name: 'n-loading'
});

withDefaults(defineProps<LoadingOptions>(), {
  dots: 5,
  dotSize: '10px',
  dotRight: '15px'
});
</script>
