<!--
 * 图片集
 * @author: dnhyxc
 * @since: 2023-07-18
 * index.vue
-->
<template>
  <div :class="bem.b()">
    <div id="waterfall-container" ref="waterfallContainer">
      <div
        v-for="image in imageList"
        :key="image.url"
        class="image-item"
        :style="{
          top: `${image.top}px`,
          left: `${image.left}px`,
          width: `${imageWidth}px`,
          borderRadius: `${typeof imageRadius === 'string' ? imageRadius : `${imageRadius}px`}`
        }"
      >
        <Image
          :url="image.url"
          :width="`${imageWidth}px`"
          :placeholderImg="placeholderImg || LOADING_IMG"
          :radius="imageRadius"
          height="auto"
          @click="needPreview ? onPreview(image) : null"
          @load="onImageLoad"
        >
          <template #loading>
            <slot name="img-loading">
              <Loading dot-size="5px" />
            </slot>
          </template>
        </Image>
        <slot name="selected-mask" v-bind="{ image }">
          <div v-if="needSelectedMask && selectedImageIds?.includes(image.id as string)" class="selected">
            <Icon name="selected" size="50px" />
          </div>
        </slot>
        <slot name="actions" v-bind="{ image }">
          <div
            :class="`image-info ${selectedImageIds?.includes(image.id) ? 'image-info-selected' : ''} `"
            :style="`border-bottom-left-radius: ${typeof imageRadius === 'string' ? imageRadius : `${imageRadius}px`}; border-bottom-right-radius: ${typeof imageRadius === 'string' ? imageRadius : `${imageRadius}px`}`"
          >
            <div class="title" :title="image?.filename">
              <el-checkbox
                v-if="showSelect"
                :key="image?.id"
                :model-value="selectedImageIds?.includes(image?.id as string)"
                size="large"
                class="checkbox"
                @change="() => onSelectImages(image)"
              />
              <div class="img-info">
                <span
                  v-if="image.filename"
                  :class="`img-name ${selectedImageIds?.includes(image?.id as string) && 'is-checked'}`"
                  @click.stop="showSelect ? onSelectImages(image) : null"
                >
                  {{ image.filename }}
                </span>
                <div class="action">
                  <Icon
                    v-if="showDownload"
                    name="download"
                    size="20"
                    color="#2bb91b"
                    cursor="pointer"
                    :on-click="() => onImageDownload(image)"
                  />
                  <Icon
                    v-if="showRename"
                    color="#57a0ff"
                    name="edit"
                    size="20"
                    cursor="pointer"
                    style="margin-left: 10px"
                    :on-click="() => onImageRename(image)"
                  />
                  <Icon
                    v-if="showDelete"
                    name="remove"
                    size="22"
                    cursor="pointer"
                    color="#ff5132"
                    style="margin: 2px 0 0 10px"
                    :on-click="() => onImageDelete(image)"
                  />
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <ImagePreview
      v-model:visible="previewVisible"
      closeOnClickModal
      show-download
      :width="previewWidth"
      :image-list="imageList"
      :selected-image="selectedImage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { ElCheckbox } from 'element-plus';
import { createNamespace, debounce, handlerDownload } from '../../utils';
import { ImageParams, WaterfallOptions } from './types';
import { Image, ImagePreview, Icon, Loading } from '../index';
import LOADING_IMG from './loading.jpeg';
import 'element-plus/es/components/checkbox/style/css';
import 'element-plus/es/components/scrollbar/style/css';
import './style/index.scss';

const bem = createNamespace('waterfall');

defineOptions({
  name: 'n-waterfall'
});

const props = withDefaults(defineProps<WaterfallOptions>(), {
  imageRadius: 5,
  previewWidth: '75vh',
  needSelectedMask: true
});

const previewVisible = ref<boolean>(false);
const posLeft = ref<number>(0);
const posTop = ref<number>(0);
const waterfallContainer = ref<HTMLElement | null>(null);
const imgWidth = ref<number>(props.imageWidth); // 每张图片的固定宽度
const selectedImage = ref<ImageParams>({} as ImageParams);

onMounted(() => {
  window.addEventListener('resize', debounce(onResize, 300));
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

// 窗口大小改变时重新计算布局
const onResize = () => {
  setPositions();
};

// 计算一共有多少列，以及每一列之间的间隙
const cal = () => {
  // 容器的宽度
  const containerWidth = waterfallContainer?.value?.clientWidth || 0;
  // 计算列的数量
  const columns = Math.floor(containerWidth / imgWidth.value);
  // 计算间隙数量
  const spaceNumber = columns + 1;
  // 计算剩余的空间
  const leftSpace = containerWidth - columns * imgWidth.value;
  // 每个间隙的空间
  const space = leftSpace / spaceNumber;
  return {
    space,
    columns
  };
};

// 设置图片位置
const setPositions = () => {
  // 如果容器不存在或没有图片，直接返回
  if (!waterfallContainer.value || props.imageList.length === 0) return;

  // 得到列数和间隙空间
  const info = cal();
  // 该数组的长度为列数，每一项表示该列的下一个图片的纵坐标
  const nextTops = new Array(info.columns);
  // 将数组的每一项填充为0
  nextTops.fill(0);
  // 遍历所有图片
  for (let i = 0; i < props.imageList.length; i++) {
    const img = props.imageList[i];
    // 找到 nextTops 中的最小值作为当前图片的纵坐标
    const minTop = Math.min(...nextTops);
    img.top = minTop;
    posTop.value = minTop;
    // 重新设置数组这一项的下一个 top 值，得到使用的是第几列的 top 值
    const index = nextTops.indexOf(minTop);
    // 获取图片元素的实际高度
    const imgElement = waterfallContainer.value.children[i];
    const imgHeight = imgElement ? imgElement.clientHeight : 300; // 默认高度
    nextTops[index] += imgHeight + info.space;
    // 横坐标
    const left = (index + 1) * info.space + index * imgWidth.value;
    img.left = left;
    posLeft.value = left || 0;
  }
  // 求出最大值
  const max = Math.max(...nextTops);
  // 根据最大值设置容器的高度
  waterfallContainer.value.style.height = max + 'px';
};

// 图片加载完成处理
const onImageLoad = () => {
  setPositions();
};

// 选择图片
const onSelectImages = (item: ImageParams) => {
  props?.onSelected?.(item);
};

// 下载
const onImageDownload = (item: ImageParams) => {
  if (props?.onDownload) {
    props?.onDownload?.(item);
  } else {
    handlerDownload(item.url as string);
  }
};

// 重命名
const onImageRename = (item: ImageParams) => {
  props?.onRename?.(item);
};

// 删除图片
const onImageDelete = async (item: ImageParams) => {
  await props?.onDelete?.(item);
  setPositions();
};

// 预览图片
const onPreview = (image: ImageParams) => {
  previewVisible.value = true;
  selectedImage.value = image;
};
</script>
