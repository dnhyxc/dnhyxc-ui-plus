# Waterfall 瀑布流 <Badge type="warning" text="beta" />

## 使用指南

全局注册

:::demo

```vue
<template>
  <div class="waterfall-wrap">
    <el-scrollbar ref="scrollRef">
      <div
        v-infinite-scroll="getImages"
        :infinite-scroll-delay="300"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-distance="2"
      >
        <n-waterfall
          need-preview
          show-select
          show-download
          show-rename
          show-delete
          :on-delete="onDelete"
          :on-rename="onRename"
          :image-list="imageList"
          :image-width="330"
          :on-selected="onSelected"
          :selected-image-ids="selectedImageIds"
        />
      </div>
      <div class="footer">
        <div v-if="loading && pageNo > 1" class="loading-container">loading...</div>
        <div v-if="noMore" class="no-more-container">
          <div class="no-more">没有更多了</div>
        </div>
        <div v-if="showEmpty" class="empty-container">
          <div class="empty-text">空空如也</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <n-model v-model:visible="visible" title="修改文件名" alignCenter width="400">
    <template #content>
      <div class="rename-content">{{ oldName }}</div>
    </template>
  </n-model>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { type ImageParams } from 'dnhyxc-ui-plus';

export interface WrapRef extends HTMLElement {
  wrapRef: HTMLElement;
}

const scrollRef = ref<HTMLElement | null>(null);
const scrollTop = ref<number>(0);
const imageList = ref([]);
const pageNo = ref(0);
const pageSize = ref(20);
const total = ref(0);
const loading = ref(false);
const selectedImages = ref([]);
const selectedImageIds = ref([]);
const visible = ref(false);
const oldName = ref('');

const noMore = computed(() => {
  return imageList.value.length >= total.value && imageList.value.length && pageNo.value > 1;
});
const disabled = computed(() => loading.value || noMore.value);
const showEmpty = computed(() => !loading.value && !imageList.value.length);

onMounted(() => {
  // 监听滚动条滚动事件
  (scrollRef.value as WrapRef)?.wrapRef?.addEventListener('scroll', onScroll);
  getImages();
});

onUnmounted(() => {
  // 卸载滚动条滚动事件
  (scrollRef.value as WrapRef)?.removeEventListener('scroll', onScroll);
});

const onScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLElement).scrollTop;
  scroll?.(e as MouseEvent);
};

const getImages = async () => {
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

const onDelete = (image: ImageParams) => {
  console.log(image);
  imageList.value = imageList.value.filter((i: ImageParams) => i.id !== image.id);
};

const onRename = (image: ImageParams) => {
  visible.value = true;
  oldName.value = image.filename;
};
</script>

<style lang="scss" scoped>
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
```

:::

局部注册

:::demo

```vue
<template>
  <div class="waterfall-wrap">
    <el-scrollbar ref="scrollRef">
      <div
        v-infinite-scroll="getImages"
        :infinite-scroll-delay="300"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-distance="2"
      >
        <Waterfall
          need-preview
          image-radius="5px 5px 0 0"
          :image-list="imageList"
          :image-width="330"
          :selected-image-ids="selectedImageIds"
        >
          <template #selected-mask="{ image }">
            <div v-if="selectedImageIds?.includes(image.id as string)" class="selected-mask">
              <Icon name="sea" size="50" />
            </div>
          </template>
          <template #img-loading>
            <div>loading...</div>
          </template>
          <template #actions="{ image }">
            <div class="actions">
              <div
                :class="`filename ${selectedImageIds?.includes(image.id as string) ? 'selected-filename' : ''}`"
                @click="() => onSelected(image)"
              >
                {{ image?.filename }}
              </div>
              <div class="actions-btns">
                <Icon name="download" size="20" cursor="pointer" @click="() => onDownload(image)" />
                <Icon name="edit" size="20" cursor="pointer" style="margin: 0 10px" @click="() => onRename(image)" />
                <Icon name="remove" size="20" cursor="pointer" @click="() => onDelete(image)" />
              </div>
            </div>
          </template>
        </Waterfall>
      </div>
      <div class="footer">
        <div v-if="loading && pageNo > 1" class="loading-container">loading...</div>
        <div v-if="noMore" class="no-more-container">
          <div class="no-more">没有更多了</div>
        </div>
        <div v-if="showEmpty" class="empty-container">
          <div class="empty-text">空空如也</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <n-model v-model:visible="visible" title="修改文件名" alignCenter width="400">
    <template #content>
      <div class="rename-content">{{ oldName }}</div>
    </template>
  </n-model>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { type ImageParams, Waterfall, Icon } from 'dnhyxc-ui-plus';

export interface WrapRef extends HTMLElement {
  wrapRef: HTMLElement;
}

const scrollRef = ref<HTMLElement | null>(null);
const scrollTop = ref<number>(0);
const imageList = ref([]);
const pageNo = ref(0);
const pageSize = ref(20);
const total = ref(0);
const loading = ref(false);
const selectedImages = ref([]);
const selectedImageIds = ref([]);
const visible = ref(false);
const oldName = ref('');

const noMore = computed(() => {
  return imageList.value.length >= total.value && imageList.value.length && pageNo.value > 1;
});
const disabled = computed(() => loading.value || noMore.value);
const showEmpty = computed(() => !loading.value && !imageList.value.length);

onMounted(() => {
  // 监听滚动条滚动事件
  (scrollRef.value as WrapRef)?.wrapRef?.addEventListener('scroll', onScroll);
  getImages();
});

onUnmounted(() => {
  // 卸载滚动条滚动事件
  (scrollRef.value as WrapRef)?.removeEventListener('scroll', onScroll);
});

const onScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLElement).scrollTop;
  scroll?.(e as MouseEvent);
};

const getImages = async () => {
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

const onDelete = (image: ImageParams) => {
  console.log(image);
  imageList.value = imageList.value.filter((i: ImageParams) => i.id !== image.id);
};

const onRename = (image: ImageParams) => {
  visible.value = true;
  oldName.value = image.filename;
};

const onDownload = (image: ImageParams) => {
  const link = document.createElement('a');
  link.href = image.url;
  link.download = image.url.split('/').pop() || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="scss" scoped>
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

  .selected-mask {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
  }

  .actions {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    height: 50px;
    color: #666;
    padding: 0 5px;
    border-radius: 0 0 5px 5px;

    .filename {
      cursor: pointer;
    }

    .selected-filename {
      color: orange;
    }
  }
}

.rename-content {
  height: 100px;
}
</style>
```

:::

## API

### Waterfall Props

<script>
const data = [
  {
    name: 'imageWidth',
    type: 'string',
    default: '',
    description: '图片宽度',
  },
  {
    name: 'imageList',
    type: '{id: string; url: number; filename?: string; [key: string]: any;}',
    default: '',
    description: '图片列表',
  },
  {
    name: 'placeholderImg',
    type: 'string',
    default: '',
    description: '图片加载过渡占位图',
  },
  {
    name: 'imageRadius',
    type: 'number | string',
    default: '5',
    description: '图片圆角',
  },
  {
    name: 'previewWidth',
    type: 'string',
    default: '75vh',
    description: '预览窗口宽度',
  },
  {
    name: 'needPreview',
    type: 'boolean',
    default: 'false',
    description: '图片是否需要预览',
  }, 
  {
    name: 'needSelectedMask',
    type: 'boolean',
    default: 'true',
    description: '是否需要选中遮罩',
  }, 
  {
    name: 'showSelect',
    type: 'boolean',
    default: 'false',
    description: '是否显示选中按钮',
  },
  {
    name: 'showDownload',
    type: 'boolean',
    default: 'false',
    description: '是否需要下载操作',
  },
  {
    name: 'showDelete',
    type: 'boolean',
    default: 'false',
    description: '是否需要删除操作',
  },
  {
    name: 'showRename',
    type: 'boolean',
    default: 'false',
    description: '是否需要重命名操作',
  },
  {
    name: 'onSelected',
    type: '(image: ImageParams) => void',
    default: '',
    description: '选中图片的回调',
  },
  {
    name: 'onDownload',
    type: '(image: ImageParams) => void',
    default: '',
    description: '下载图片的回调',
  },
  {
    name: 'onDelete',
    type: '(image: ImageParams) => void',
    default: '',
    description: '删除图片的回调',
  },
  {
    name: 'onRename',
    type: '(image: ImageParams) => void',
    default: '',
    description: '重命名回调',
  },
];

const slots = [
  {
    name: 'img-loading',
    description: '图片加载中插槽',
  },
  {
    name: 'selected-mask',
    description: '选中图片遮罩层',
  },
  {
    name: 'actions',
    description: '操作插槽',
  },
]
</script>

<props-table :data="data" />

### Waterfall Slots

<props-table :data="slots" name-text="插槽名称" :show-type="false" :show-default="false"/>
