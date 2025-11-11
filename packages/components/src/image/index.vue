<!--
 * 图片组件
 * @author: dnhyxc
 * @since: 2023-03-03
 * index.vue
-->
<template>
  <div
    :class="bem.b()"
    :style="`width: ${typeof width === 'string' ? width : `${width}px`}; height: ${typeof height === 'string' ? height : `${height}px`}; border-radius: ${typeof radius === 'string' ? radius : `${radius}px`}`"
    @click="onClickImg"
  >
    <img
      v-if="loadUrl"
      ref="imgRef"
      :src="loadUrl"
      :alt="alt"
      :style="`border-radius: ${typeof radius === 'string' ? radius : `${radius}px`}`"
      :class="`image ${className} ${loaded ? 'loaded' : 'filter-blur'}`"
      @error="onError"
      @load="onLoad"
    />
    <div
      v-if="loading"
      class="loading-img"
      :class="{ hidden: !loading }"
      :style="`border-radius: ${typeof radius === 'string' ? radius : `${radius}px`}`"
    >
      <div class="loading">
        <slot name="loading">
          {{ loadingText }}
        </slot>
      </div>
    </div>
    <div
      v-if="!loadUrl && !loading"
      class="error"
      :style="`border-radius: ${typeof radius === 'string' ? radius : `${radius}px`}; min-height: ${height === 'auto' ? '186px' : height}`"
    >
      <div class="error-text">{{ errorText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { ImageOptions } from './types';
import { Loading } from '../index';
import { createNamespace } from '../../utils';
import './style/index.scss';

const bem = createNamespace('image');

defineOptions({
  name: 'n-image'
});

const loadUrl = ref<string | undefined>('');
const loaded = ref<boolean>(false);
const loading = ref(true);
const imgRef = ref<HTMLImageElement | null>(null);
let timer: ReturnType<typeof setTimeout> | null = null;

const props = withDefaults(defineProps<Partial<ImageOptions>>(), {
  urls: () => [],
  height: 'auto',
  width: '100%',
  onClick: () => {},
  placeholderImg: '',
  needColor: false,
  position: 'top left',
  radius: 5,
  className: '',
  alt: '',
  loadingText: 'loading...',
  errorText: '加载失败'
});

// 监听URL变化
watch(
  () => props.url,
  () => {
    loaded.value = false;
    loading.value = true;
    loadImage();
  }
);

onMounted(() => {
  loadImage();
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});

// 初始化图片
const loadImage = () => {
  if (!props.url) {
    loaded.value = false;
    loading.value = false;
    return;
  }

  loading.value = true;

  const img = new Image();

  img.onload = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      loaded.value = true;
      loading.value = false;
      loadUrl.value = props.url as string;
    });
  };

  img.onerror = () => {
    loaded.value = true;
    loading.value = false;
    loadUrl.value = '';
    loadUrl.value = props.placeholderImg || '';
  };

  img.src = props.url as string;

  // 设置过渡图片
  if (props.placeholderImg) {
    loadUrl.value = props.placeholderImg;
  }
};

// 图片加载失败事件
const onError = () => {
  loaded.value = true;
  loading.value = false;
  loadUrl.value = '';
};

// 点击图片
const onClickImg = () => {
  props?.onClick && props?.onClick();
};
</script>
