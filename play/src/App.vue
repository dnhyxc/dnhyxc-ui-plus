<template>
  <div class="coms">
    <n-button type="success" size="large" color="#f5f5f5" :on-click="onClick" />
    <n-button type="success" size="small" color="#f5f5f5" :on-click="onClick" />
    <n-icon name="sea" size="28" />
    <n-icon name="ai" size="100" />
    <n-icon name="wechat-program" />
    <n-icon name="pause-play" />
    <n-icon name="pause-play-fill" class-name="play-fill-icon" />
    <n-emoji
      v-model:visible="showEmoji"
      :on-select="onAddEmoji"
      :col="15"
      :gap="5"
      :init-show-emoji-count="30"
      :excludeEmoji="['[爆筋]']"
    />
    <el-button type="primary">element-plus</el-button>
    <el-checkbox v-model="checked" />
    <el-tag type="primary">Tag 1</el-tag>
  </div>
  <n-input ref="inputRef" v-model:value="keyword" size="large" placeholder="请输入!!!" @keypress.enter="onKeypress" />
  <ImagePreview
    v-model:previewVisible="previewVisible"
    show-prev-and-next
    dialog-width="800px"
    closeOnClickModal
    :image-list="[
      {
        id: '1',
        url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
      },
      {
        id: '2',
        url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
      },
      {
        id: '3',
        url: 'https://files.codelife.cc/wallhaven/full/2e/wallhaven-2eq1gy.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
      },
      {
        id: '4',
        url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
      },
      {
        id: '5',
        url: 'https://files.codelife.cc/wallhaven/full/83/wallhaven-83ywmo.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
      }
    ]"
    :selectd-image="{
      id: '1',
      url: 'https://files.codelife.cc/wallhaven/full/o5/wallhaven-o5jjg5.jpg?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_93/format,webp'
    }"
    :download="onDownload"
    :getImgSizeFromUrl="getImgSizeFromUrl"
  />
  <n-button type="primary" @click="previewVisible = true">查看图片</n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { notification, type EmojiName } from '@dnhyxc-ui/components';
import { notification, type EmojiName, ImagePreview } from 'dnhyxc-ui-vue-plus';

const keyword = ref('');
const inputRef = ref();
const checked = ref(true);
const showEmoji = ref(true);
const previewVisible = ref(false);

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

const onDownload = (imageInfo: any) => {
  const link = document.createElement('a');
  link.href = imageInfo.url;
  link.download = imageInfo.url.split('/').pop() || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
</style>
