<template>
  <div class="container">
    <div class="title">瀑布流展示图片</div>
    <div class="waterfall-wrap">
      <el-scrollbar ref="scrollRef" wrap-class="scrollbar-wrapper">
        <div
          v-infinite-scroll="initImages"
          :infinite-scroll-delay="300"
          :infinite-scroll-disabled="disabled"
          :infinite-scroll-distance="2"
        >
          <n-waterfall
            need-preview
            :image-list="imageList"
            :image-width="330"
            :selected-image-ids="selectedImageIds"
            show-download
            show-delete
            show-rename
            :on-selected="onSelected"
            :on-download="onDownload"
            :on-delete="onDelete"
            :on-rename="onRename"
          >
          </n-waterfall>
        </div>
        <div class="footer">
          <div v-if="loading && pageNo > 1" class="loading-container">
            <slot name="loading">loading...</slot>
          </div>
          <div v-if="noMore" class="no-more-container">
            <slot name="no-more">
              <div class="no-more">没有更多了</div>
            </slot>
          </div>
          <div v-if="showEmpty" class="empty-container">
            <slot name="empty">
              <div class="empty-text">空空如也</div>
            </slot>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
  <n-model v-model:visible="visible" title="修改文件名" alignCenter width="400">
    <template #content>
      <div class="rename-content">{{ oldName }}</div>
    </template>
  </n-model>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useScroller } from './hooks';
import { type ImageParams } from 'dnhyxc-ui-vue-plus';

const { scrollRef } = useScroller();

const imageList = ref<ImageParams[]>([]);
const pageNo = ref(0);
const pageSize = ref(20);
const total = ref(0);
const loading = ref(false);
const selectedImageIds = ref<string[]>([]);
const visible = ref(false);
const oldName = ref('');

const noMore = computed(() => {
  return imageList.value.length >= total.value && imageList.value.length && pageNo.value > 1;
});
const disabled = computed(() => loading.value || noMore.value);
const showEmpty = computed(() => !loading.value && !imageList.value.length);

onMounted(() => {
  initImages();
});

const initImages = async () => {
  console.log('initImages');
  if (total.value > 100 || loading.value) return;
  loading.value = true;
  pageNo.value = pageNo.value + 1;
  const images: ImageParams[] = await new Promise((resolve) => {
    setTimeout(() => {
      const initialImages = [];
      for (let i = 1; i <= pageSize.value; i++) {
        initialImages.push({
          id: Math.random(),
          url: `https://picsum.photos/1080/${900 + Math.floor(Math.random() * 300)}?random=${i}`,
          filename: `图片 ${i}`,
          description: `这是第 ${i} 张图片的描述`
        });
      }
      resolve(initialImages as ImageParams[]);
      loading.value = false;
      total.value = 100;
    }, 1000);
  });
  imageList.value = [...imageList.value, ...images];
};

const onSelected = (image: ImageParams) => {
  const findOne = selectedImageIds.value?.some((i) => i === image.id);
  if (findOne) {
    selectedImageIds.value = selectedImageIds.value.filter((i) => i !== image.id);
  } else {
    selectedImageIds.value = [image.id as string, ...selectedImageIds.value];
  }
};

const onDownload = (image: ImageParams) => {
  console.log(image);
};

const onDelete = (image: ImageParams) => {
  imageList.value = imageList.value.filter((i: ImageParams) => i.id !== image.id);
};

const onRename = (image: ImageParams) => {
  visible.value = true;
  oldName.value = image.filename as string;
};
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    padding: 0 10px;
  }

  .waterfall-wrap {
    height: 500px;
    overflow: hidden;

    :deep {
      #waterfall-container {
        height: 500px;
      }
    }

    .footer {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
    }
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  height: 50px;
  color: #666;
  padding: 0 5px;
}

.rename-content {
  height: 100px;
}
</style>
