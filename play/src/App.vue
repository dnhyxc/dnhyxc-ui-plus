<template>
  <DraftInput />
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { notification, type EmojiName } from '@dnhyxc-ui/components';
import { notification, type EmojiName } from 'dnhyxc-ui-vue-plus';
import Waterfall from './Waterfall.vue';
import DraftInput from './components/DraftInput.vue';

const keyword = ref('');
const inputRef = ref();
const checked = ref(true);
const showEmoji = ref(true);
const previewVisible = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);

const imgList = ref<any>([]);
const selectedImage = ref<any>({});

const onPreview = (image: any, imgs: any[]) => {
  imgList.value = imgs;
  previewVisible.value = true;
  selectedImage.value = image;
};

const onSelect = (key: EmojiName) => {
  console.log(key, 'onSelect');
};

onSelect('[爆筋]');

const onKeypress = () => {
  console.log('keypress', keyword.value);
  console.log(inputRef.value.inputRef, 'inputRef');
};

const onClick = (e: MouseEvent) => {
  console.log(e, 'click');
  notification({
    title: '提示',
    message: '这是一条提示消息',
    type: 'success'
  });
};

const onAddEmoji = (key: string) => {
  console.log(key, 'onAddEmoji');
};

const getImgSizeFromUrl = async (
  url: string
): Promise<{
  type: string;
  size: number;
}> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type.split('/').pop() as string;
    const sizeInBytes = blob.size;
    const sizeInKB = sizeInBytes / 1024;
    return {
      type,
      size: sizeInKB
    };
  } catch (error) {
    return {
      type: '',
      size: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.coms {
  display: flex;
  align-items: center;

  .play-fill-icon {
    cursor: pointer;
  }
}

.image-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .n-image {
    // 默认样式，可以通过修改默认样式来修改组件的样式
    // --image-object-position: top left;
    // --image-hover-object-position: bottom right;
    // --image-empty-bg: #f5f7fa;
    // --image-object-fit: cover;
    // --image-transition: all 0.3s ease-in-out;
    // --image-loading-bg: #f5f7fa;
    // --image-loading-text-color: #ccc;
    // --image-empty-text-color: #ccc;
    // --image-font-size: 14px; // 控制 loading、empty、加载失败的文字大小

    --image-loading-text-color: #333;
    --image-empty-text-color: #333;
    --image-empty-bg: rgb(226, 222, 222);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
}

.footer {
  display: flex;
  justify-content: flex-end;

  .close-btn {
    margin-left: 10px;
  }
}

.button-group {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .n-button {
    margin-right: 10px;
  }
}
</style>
