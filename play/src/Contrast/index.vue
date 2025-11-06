<!--
 * 对比组件
 * @author: dnhyxc
 * @since: 2024-01-26
 * index.vue
-->
<template>
  <div class="contrast-wrap">
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
        <img :src="beforeImg" alt="" />
      </div>
      <img :src="afterImg" alt="" />
      <span ref="handlerRef" class="handler" @mousedown="onMousedown" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

interface IProps {
  imgHeight?: string;
  beforeImg: string;
  afterImg: string;
  showDrag?: boolean;
  beforeSize?: number;
  afterSize?: number;
}

defineProps<IProps>();

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

<style scoped lang="scss">
.contrast-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    display: flex;
    justify-content: center;
    width: 100%;
    color: #ccc;
    margin-bottom: 10px;

    .title-text {
      padding-left: 30px;
      border-left: 2px solid #ccc;
    }

    & > :first-child {
      padding-right: 30px;
    }

    .size {
      color: orange;
    }

    .after-size {
      color: skyblue;
    }
  }

  .slider-wrap {
    position: relative;
    overflow: hidden;

    img {
      display: block;
      height: 520px;
      width: auto;
      user-select: none;
    }

    .before-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      overflow: hidden;
    }

    .handler {
      position: absolute;
      width: 2px;
      height: 100%;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      box-shadow: 0 0 2px red;
      background-color: #fff;
      cursor: ew-resize;

      &::after {
        content: '\2b0c';
        width: 16px;
        height: 60px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #000;
        font-size: 16px;
        text-align: center;
        line-height: 60px;
        border-radius: 20px;
        box-shadow: 0 0 8px red;
        transition: all 0.3s ease;
      }

      &:hover::after {
        content: '\2b0c';
        width: 16px;
        height: 80px;
        font-size: 16px;
        line-height: 80px;
      }
    }
  }
}
</style>
