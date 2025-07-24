<template>
  <div class="coms">
    <n-button type="success" size="large" color="#f5f5f5" :on-click="onClick" />
    <n-button type="success" size="small" color="#f5f5f5" :on-click="onClick" />
    <n-icon name="sea" size="28" />
    <n-icon name="ai" />
    <el-button type="primary">element-plus</el-button>
    <el-checkbox v-model="checked" />
    <el-tag type="primary">Tag 1</el-tag>
  </div>
  <n-input ref="inputRef" v-model:value="keyword" size="large" placeholder="请输入!!!" @keypress.enter="onKeypress" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { notification } from '@dnhyxc-ui/components';

const keyword = ref('');
const inputRef = ref();
const checked = ref(true);

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
</script>

<style lang="scss" scoped>
.coms {
  display: flex;
  align-items: center;
}
</style>
