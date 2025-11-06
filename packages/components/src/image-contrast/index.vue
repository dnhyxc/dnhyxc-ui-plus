<!--
 * 对比组件
 * @author: dnhyxc
 * @since: 2024-01-26
 * index.vue
-->
<template>
  <div :class="bem.b()">
    <slot name="title">
      <div class="title">
        <span v-if="beforeSize">
          处理前图片 <span class="size">{{ beforeSize }}</span>
        </span>
        <span v-if="afterSize" class="title-text">
          处理后图片 <span class="after-size">{{ afterSize }}</span>
        </span>
      </div>
    </slot>
    <div ref="sliderRef" class="slider-wrap">
      <div ref="beforeImgRef" class="before-img">
        <img :src="beforeImg" alt="" :style="`height: ${imgHeight}`" />
      </div>
      <img :src="afterImg" alt="" :style="`height: ${imgHeight}`" />
      <span v-if="showDrag" ref="handlerRef" class="handler" @mousedown="onMousedown" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { ImageContrastOptions } from './types';
import { createNamespace } from '../../utils';
import './style/index.scss';

const bem = createNamespace('image-contrast');

defineOptions({
  name: 'n-image-contrast'
});

withDefaults(defineProps<ImageContrastOptions>(), {
  showDrag: true
});

const sliderRef = ref<HTMLDivElement | null>(null);
const handlerRef = ref<HTMLDivElement | null>(null);
const beforeImgRef = ref<HTMLImageElement | null>(null);
const marginX = ref<number>(0);

const onMousedown = (e: MouseEvent) => {
  e.preventDefault();
  nextTick(() => {
    marginX.value = e.pageX - handlerRef.value!.offsetLeft;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onDocumentUp);
  });
};

const onDocumentUp = () => {
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseup', onDocumentUp);
};

const onMove = (e: MouseEvent) => {
  const moveWidth = e.pageX - marginX.value;
  if (moveWidth <= 10 || moveWidth >= sliderRef.value!.offsetWidth - 10) return;
  handlerRef.value!.style.left = moveWidth + 'px';
  beforeImgRef.value!.style.width = moveWidth + 'px';
};
</script>
