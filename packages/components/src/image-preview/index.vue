<!--
 * 图片预览组件
 * @author: dnhyxc
 * @since: 2023-07-21
 * index.vue
-->
<template>
  <div :class="bem.b()">
    <el-dialog
      v-model="visible"
      :close-on-click-modal="closeOnClickModal || false"
      align-center
      :width="dialogWidth || '88vw'"
      :style="dialogStyle"
      @close="onClose"
    >
      <template #header>
        <div class="actions">
          <span class="title">
            {{ title || '图片预览' }}
          </span>
          <slot name="actions">
            <div class="icon-list">
              <el-tooltip
                effect="light"
                :content="isMaxed ? '不能再大了' : '放大'"
                placement="top"
                popper-class="custom-dropdown-styles"
              >
                <Icon
                  name="zoom-in"
                  size="20"
                  color="var(--icon-color)"
                  class-name="icon"
                  @click="() => onScaleMax()"
                />
              </el-tooltip>
              <el-tooltip
                effect="light"
                :content="isMined ? '不能再小了' : '缩小'"
                placement="top"
                popper-class="custom-dropdown-styles"
              >
                <Icon
                  name="zoom-out"
                  size="20"
                  color="var(--icon-color)"
                  class-name="icon"
                  @click="() => onScaleMin()"
                />
              </el-tooltip>
              <el-tooltip effect="light" content="旋转" placement="top" popper-class="custom-dropdown-styles">
                <Icon name="rotate" size="20" color="var(--icon-color)" class-name="icon" @click="onRotate" />
              </el-tooltip>
              <el-tooltip effect="light" content="下载" placement="top" popper-class="custom-dropdown-styles">
                <Icon name="download" size="20" color="var(--icon-color)" class-name="icon" @click="onDownload" />
              </el-tooltip>
              <el-tooltip effect="light" content="重置" placement="top" popper-class="custom-dropdown-styles">
                <Icon name="reset" size="20" color="var(--icon-color)" class-name="icon" @click="onRefresh" />
              </el-tooltip>
              <el-tooltip
                v-if="showPrevAndNext && prevImages.length > 1"
                effect="light"
                content="上一张"
                placement="top"
                popper-class="custom-dropdown-styles"
              >
                <Icon name="left-arrow" size="20" color="var(--icon-color)" class-name="icon" @click="onPrev" />
              </el-tooltip>
              <el-tooltip
                v-if="showPrevAndNext && prevImages.length > 1"
                effect="light"
                content="下一张"
                placement="top"
                popper-class="custom-dropdown-styles"
              >
                <Icon name="right-arrow" size="20" color="var(--icon-color)" class-name="icon" @click="onNext" />
              </el-tooltip>
              <span class="info-list">
                <span v-if="fileSize" class="size info">{{ fileSize?.toFixed(2) }} KB</span>
                <span v-if="size" class="size info">{{ size }}</span>
                <slot
                  v-if="prevImages && prevImages.length"
                  name="info"
                  :data="prevImages?.find((i: any) => i.url === currentImage.url)"
                  class="info"
                ></slot>
              </span>
            </div>
          </slot>
        </div>
      </template>
      <div class="image-preview-wrap">
        <img
          ref="imgRef"
          v-move.imageInfo="imageTransformInfo || imageInfo"
          :src="currentImage.url"
          alt=""
          class="preview-img"
          :style="{
            transform: `rotate(${imageTransformInfo?.rotate || imageInfo.rotate}deg) scale(${imageTransformInfo?.scale || imageInfo.scale})`
          }"
          @wheel.stop="onWheel"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, nextTick, DirectiveBinding } from 'vue';
import { createNamespace } from '../../utils';
import { Icon } from '../icon';
import { ImagePreviewOptions } from './types';
import './style/index.scss';

const bem = createNamespace('image-preview');

defineOptions({
  name: 'n-image-preview'
});

// 局部注册自定义指令：v-move
const vMove = {
  // 绑定元素的父组件挂载时调用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    nextTick(() => {
      const dragBox = el; // 获取当前元素
      const boundary = binding.value?.boundary ?? false; // 是否控制边界
      const x = el.getAttribute('move-x') !== 'false';
      const y = el.getAttribute('move-y') !== 'false';

      console.log(dragBox, x, y);

      dragBox.style.position = 'absolute';
      const pdom = dragBox.parentNode as HTMLElement;
      boundary && (pdom.style.position = 'relative');
      // 父元素宽高
      const pw = pdom.offsetWidth;
      const ph = pdom.offsetHeight;
      // 本身宽高
      const sw = dragBox.offsetWidth;
      const sh = dragBox.offsetHeight;

      // 计算得到最大移动距离
      let maxw = pw - 60;
      let maxh = ph - 60;
      let minw = -sw + 60;
      let minh = -sh + 60;

      dragBox.onmousedown = (e) => {
        // 阻止默认事件，避免元素选中
        e.preventDefault();
        // 算出鼠标当前相对元素的位置
        const disX = e.x - dragBox.offsetLeft;
        const disY = e.y - dragBox.offsetTop;
        document.onmousemove = (e2) => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e2.clientX - disX;
          let top = e2.clientY - disY;
          const { imgWidth, imgHeight } = binding.value;
          const maxWidth = Math.abs(pw - imgWidth) / 2;
          const maxHeight = Math.abs(ph - imgHeight) / 2;
          maxw = maxWidth + pw - 60;
          maxh = maxHeight + ph - 60;
          minw = -(maxWidth + pw - 60);
          minh = -(maxHeight + ph - 60);
          // 图片大小小于1倍时，禁止拖动
          if (binding?.value?.scale === 1 && binding?.value?.rotate === 0) {
            left = 0;
            top = 0;
            return;
          }
          // 当传入true代表控制边界
          if (boundary) {
            left = left > maxw ? maxw : left < minw ? minw : left;
            top = top > maxh ? maxh : top < minh ? minh : top;
          }
          // 移动当前元素
          x && (dragBox.style.left = left + 'px');
          y && (dragBox.style.top = top + 'px');
        };
        document.onmouseup = () => {
          // 鼠标弹起来的时候不再移动
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    });
  }
};

const props = defineProps<ImagePreviewOptions<{ url: string; size?: number; id?: string }>>();

const currentImage = ref<ImagePreviewOptions<{ url: string; size?: number; id?: string }>['selectImage']>(
  props.selectImage
);

const imgRef = ref<HTMLImageElement | null>(null);
const imageInfo = reactive<{ scale: number; rotate: number; boundary: boolean; imgWidth: number; imgHeight: number }>({
  scale: 1,
  rotate: 0,
  boundary: true, // 控制是否需要控制边界
  imgWidth: 0,
  imgHeight: 0
});
const isMaxed = ref<boolean>(false);
const isMined = ref<boolean>(false);
const fileSize = ref<number | null>(0);

const emit = defineEmits(['update:previewVisible']);

const onComputedImgSize = async (url: string, size?: number) => {
  if (props?.size) {
    fileSize.value = 0;
  } else {
    if (size) {
      fileSize.value = size / 1024;
    } else {
      const replacedUrl = props?.changeImgUrlDomain ? props?.changeImgUrlDomain?.(url) : url;
      const { size } = (await props?.getImgSizeFromUrl?.(replacedUrl)) || {};
      fileSize.value = size as number;
    }
  }
};

const visible = computed({
  get() {
    return props.previewVisible;
  },
  async set(visible: boolean) {
    emit('update:previewVisible', visible);
    onRefresh();
  }
});

const prevImages = computed<{ url: string; id: string }[]>(() => {
  return props.prevImgs || [];
});

watch(
  () => [props.previewVisible, props.selectImage],
  async (newVal) => {
    if (newVal[0]) {
      currentImage.value = newVal[1] as ImagePreviewOptions<{ url: string; size: number }>['selectImage'];
      onComputedImgSize(
        (newVal[1] as ImagePreviewOptions<{ url: string }>['selectImage'])?.url,
        (newVal[1] as ImagePreviewOptions<{ url: string; size: number }>['selectImage'])?.size
      );
    }
    if (!newVal[0]) {
      fileSize.value = 0;
    }
  }
);

watch(
  () => [props?.imageTransformInfo?.scale, props?.imageTransformInfo?.rotate],
  (newVal) => {
    if (newVal[0] !== 1) {
      nextTick(() => {
        imgRef.value!.style.cursor = 'move';
      });
    }
    if (newVal[1] !== 0) {
      nextTick(() => {
        imgRef.value!.style.cursor = 'move';
      });
    } else {
      imgRef.value!.style.cursor = 'default';
    }
  }
);

watch(
  () => [imageInfo.scale, imageInfo.rotate],
  (newVal) => {
    if (newVal[0] !== 1) {
      nextTick(() => {
        imgRef.value!.style.cursor = 'move';
      });
    }
    if (newVal[1] !== 0) {
      nextTick(() => {
        imgRef.value!.style.cursor = 'move';
      });
    } else {
      imgRef.value!.style.cursor = 'default';
    }
  }
);

// 关闭弹窗时，开启父弹窗
const onClose = () => {
  props?.showWaterModal?.();
};

const onWheel = (e: WheelEvent) => {
  // 判断滚轮方向,向上滚动为放大,向下滚动为缩小
  if (e.deltaY < 0) {
    onScaleMax(0.05);
  } else {
    onScaleMin(0.05);
  }
};

// 放大
const onScaleMax = (scale?: number) => {
  if (imageInfo.scale >= 5) {
    isMaxed.value = true;
    return;
  }
  isMined.value = false;
  imageInfo.scale += scale || 0.2;
  imageInfo.imgWidth = Math.round(imgRef.value!.width * imageInfo.scale);
  imageInfo.imgHeight = Math.round(imgRef.value!.height * imageInfo.scale);
};

// 缩小
const onScaleMin = (scale?: number) => {
  if (imageInfo.scale <= 1.2) {
    imgRef.value!.style.top = '0';
    imgRef.value!.style.left = '0';
  }
  if (imageInfo.scale <= 0.4) {
    isMined.value = true;
    return;
  }
  isMaxed.value = false;
  imageInfo.scale -= scale || 0.2;
  imageInfo.imgWidth = Math.round(imgRef.value!.width * imageInfo.scale);
  imageInfo.imgHeight = Math.round(imgRef.value!.height * imageInfo.scale);
};

// 旋转
const onRotate = () => {
  if (imageInfo.rotate >= 315) {
    imageInfo.rotate = 0;
    imgRef.value!.style.top = '0';
    imgRef.value!.style.left = '0';
  } else {
    imageInfo.rotate += 45;
  }
};

// 下载
const onDownload = () => {
  if (props?.download) {
    props.download();
  } else {
    props?.onDownloadFile?.(currentImage.value);
  }
};

// 重置
const onRefresh = () => {
  imageInfo.scale = 1;
  imageInfo.rotate = 0;
  imgRef.value!.style.top = '0';
  imgRef.value!.style.left = '0';
};

// 前一张
const onPrev = () => {
  onRefresh();
  let prevIndex;
  const findIndex = prevImages.value.findIndex((i) => i?.id === currentImage?.value?.id);
  if (findIndex === 0) {
    prevIndex = prevImages.value.length - 1;
  } else {
    prevIndex = findIndex - 1;
  }
  currentImage.value = prevImages.value[prevIndex] as ImagePreviewOptions<{ url: string; id: string }>['selectImage'];
  onComputedImgSize(currentImage.value.url, currentImage.value?.size);
};

// 后一张
const onNext = () => {
  onRefresh();
  let nextIndex;
  const findIndex = prevImages.value?.findIndex((i) => i.id === currentImage?.value?.id);
  if (findIndex === prevImages.value?.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = findIndex + 1;
  }
  currentImage.value = prevImages.value[nextIndex] as ImagePreviewOptions<{ url: string; id: string }>['selectImage'];
  onComputedImgSize(currentImage.value.url, currentImage.value?.size);
};
</script>
