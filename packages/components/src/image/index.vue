<!--
 * 图片组件
 * @author: dnhyxc
 * @since: 2023-03-03
 * index.vue
-->
<template>
  <div :class="bem.b()" :style="`width: ${width}; height: ${height};`" @click="onClickImg">
    <img
      v-if="showImage"
      ref="imgRef"
      :src="displayUrl"
      :alt="alt"
      class="image-item"
      :style="`border-radius: ${radius}`"
      @error="onError"
      @load="onLoad"
    />
    <img
      v-else-if="isLoading && placeholderImg"
      :src="placeholderImg"
      :style="`border-radius: ${radius}`"
      :alt="alt"
      class="image-item"
    />
    <div v-else-if="isLoading && !placeholderImg" class="image-item image-loading" :style="`border-radius: ${radius}`">
      {{ loadingText }}
    </div>
    <div v-else-if="hasError" class="image-item image-loading" :style="`border-radius: ${radius}`">{{ errorText }}</div>
    <div v-else class="empty">
      <img
        v-if="placeholderImg"
        :src="placeholderImg"
        alt=""
        :style="`border-radius: ${radius}`"
        :class="`image-item ${className}`"
      />
      <div v-else class="empty-text" :style="`border-radius: ${radius}`">{{ emptyText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { ImageOptions } from './types';
import { createNamespace } from '../../utils';
import './style/index.scss';

const bem = createNamespace('image');

defineOptions({
  name: 'n-image'
});

// 响应式数据
const displayUrl = ref<string>('');
const isLoaded = ref<boolean>(false);
const hasError = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const imgRef = ref<HTMLImageElement | null>(null);

const props = withDefaults(defineProps<ImageOptions>(), {
  height: 'auto',
  width: '100%',
  onClick: () => {},
  onLoad: () => {},
  placeholderImg: '',
  radius: '',
  className: '',
  alt: '',
  loadingText: 'loading...',
  emptyText: '暂无图片',
  errorText: '加载失败'
});

// 计算属性
const className = computed(() => props.placeholderClassName + 'image-item');
const showImage = computed(() => isLoaded.value && displayUrl.value && !hasError.value);

// 监听 URL 变化
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl) {
      loadImage(newUrl);
    } else {
      resetState();
    }
  }
);

onMounted(() => {
  if (props.url) {
    loadImage(props.url);
  }
});

// 重置状态
const resetState = () => {
  isLoaded.value = false;
  hasError.value = false;
  isLoading.value = false;
  displayUrl.value = '';
};

// 加载图片
const loadImage = (url: string) => {
  resetState();
  isLoading.value = true;

  const img = new Image();

  img.onload = () => {
    if (!isLoading.value) return; // 组件可能已卸载

    isLoading.value = false;
    isLoaded.value = true;
    hasError.value = false;
    displayUrl.value = url;
  };

  img.onerror = () => {
    if (!isLoading.value) return;
    isLoading.value = false;
    hasError.value = true;
    displayUrl.value = props.placeholderImg || '';

    // 如果有占位图，尝试显示占位图
    if (props.placeholderImg) {
      const placeholderImg = new Image();
      placeholderImg.onload = () => {
        displayUrl.value = props.placeholderImg!;
        isLoaded.value = true;
      };
      placeholderImg.onerror = () => {
        // 占位图也加载失败
        displayUrl.value = '';
      };
      placeholderImg.src = props.placeholderImg;
    }
  };

  img.src = url;
};

// 实际图片标签的错误处理
const onError = () => {
  hasError.value = true;
  isLoaded.value = false;

  // 如果有占位图，切换到占位图
  if (props.placeholderImg && displayUrl.value !== props.placeholderImg) {
    displayUrl.value = props.placeholderImg;
    // 给占位图一个机会加载
    setTimeout(() => {
      if (imgRef.value?.complete && imgRef.value.naturalHeight === 0) {
        // 占位图也加载失败
        displayUrl.value = '';
      }
    }, 100);
  } else {
    displayUrl.value = '';
  }
};

// 图片加载成功
const onLoad = () => {
  isLoaded.value = true;
  hasError.value = false;
  props?.onLoad?.();
};

// 点击图片
const onClickImg = () => {
  props?.onClick?.();
};
</script>
