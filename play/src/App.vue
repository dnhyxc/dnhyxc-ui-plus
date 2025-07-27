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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { notification, type EmojiName } from '@dnhyxc-ui/components';
// import { notification } from 'dnhyxc-ui-vue-plus';

const keyword = ref('');
const inputRef = ref();
const checked = ref(true);
const showEmoji = ref(true);

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
