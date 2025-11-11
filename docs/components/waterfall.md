# Icon 图标 <Badge type="warning" text="beta" />

## 使用指南

全局注册

:::demo

```vue
<template>
  <n-waterfall
    name="sea"
    size="28"
    need-preview
    :image-list="imageList"
    :get-images="initImages"
    :loading="loading"
    :page-no="pageNo"
    :total="total"
    :image-width="330"
    :parent-height="500"
    :on-selected="onSelected"
    :selected-image-ids="selectedImageIds"
    show-download
    show-delete
    show-rename
    :on-download="onDownload"
    :on-delete="onDelete"
    :on-rename="onRename"
  >
  </n-waterfall>
  <n-model v-model:visible="visible" title="修改文件名" alignCenter width="400">
    <template #content>
      <div class="rename-content">{{ oldName }}</div>
    </template>
  </n-model>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const imageList = ref([]);
const pageNo = ref(0);
const pageSize = ref(20);
const total = ref(0);
const loading = ref(false);
const selectedImages = ref([]);
const selectedImageIds = ref([]);
const visible = ref(false);
const oldName = ref('');

const initImages = async (top: number, left: number) => {
  console.log('initImages');
  if (total.value > 100 || loading.value) return;
  loading.value = true;
  pageNo.value = pageNo.value + 1;
  const images = await new Promise((resolve) => {
    setTimeout(() => {
      const initialImages = [];
      for (let i = 1; i <= pageSize.value; i++) {
        initialImages.push({
          id: Math.random(),
          url: `https://picsum.photos/1080/${900 + Math.floor(Math.random() * 300)}?random=${i}`,
          filename: `图片 ${i}`,
          description: `这是第 ${i} 张图片的描述`,
          top,
          left,
          zIndex: -1
        });
      }
      resolve(initialImages);
      loading.value = false;
      total.value = 100;
    }, 1000);
  });
  imageList.value = [...imageList.value, ...images];
};

const onSelected = (image) => {
  const findOne = selectedImageIds.value?.some((i) => i === image.id);
  if (findOne) {
    selectedImageIds.value = selectedImageIds.value.filter((i) => i !== image.id);
  } else {
    selectedImageIds.value = [image.id, ...selectedImageIds.value];
  }
};

const onDelete = (image) => {
  console.log(image);
  imageList.value = imageList.value.filter((i) => i.id !== image.id);
};

const onRename = (image) => {
  visible.value = true;
  oldName.value = image.filename;
};
</script>

<style lang="scss" scoped>
.play-fill-icon {
  cursor: pointer;
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
  <Icon name="sea" size="28" />
  <Icon name="ai" />
</template>

<script setup lang="ts">
import { Icon } from 'dnhyxc-ui-plus';
</script>
```

:::

## API

### Icon Props

<script>
const data = [
  {
    name: 'name',
    type: 'enum',
    default: '',
    description: '图标名称',
    typeEnum: ['sea', 'ai', 'thumbnail', 'in-clip', 'out-clip', 'wechat-program', 'to-top', 'prev', 'next', 'unfull', 'full', 'pause', 'pause-play', 'pause-play-fill', 'picture-to-picture', 'solid', 'info']
  },
  {
    name: 'size',
    type: 'string',
    default: '24',
    description: '图标大小',
  },
  {
    name: 'color',
    type: 'string',
    default: '',
    description: '图标颜色',
  },
  {
    name: 'hoverColor',
    type: 'string',
    default: '',
    description: '图标 hover 颜色',
  },
  {
    name: 'width',
    type: 'string',
    default: '',
    description: '图标宽度',
  },
  {
    name: 'height',
    type: 'string',
    default: '',
    description: '图标高度',
  }
];
</script>

<!-- <props-table :data="data" /> -->
