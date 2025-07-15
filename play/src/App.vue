<template>
  <n-button />
  <NElButton />
  <el-button type="primary">element-plus</el-button>
  <Input placeholder="请输入" size="small" v-model:value="keyword" ref="inputRef" @keypress.enter="onKeypress" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NElButton, Input } from 'dnhyxc-ui-plus-beta1';

const keyword = ref('');

const onKeypress = () => {
  console.log('keypress', keyword.value);
};
</script>
