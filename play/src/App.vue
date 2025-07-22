<template>
  <n-button type="success" size="large" color="#f5f5f5" />
  <nel-button />
  <el-button type="primary">element-plus</el-button>
  <n-input ref="inputRef" v-model:value="keyword" placeholder="请输入" @keypress.enter="onKeypress" />
  <n-input ref="inputRef" v-model:value="keyword" placeholder="请输入" @keypress.enter="onKeypress" />
  <n-monaco code="" theme="vs-dark" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const keyword = ref('');

const onKeypress = () => {
  console.log('keypress', keyword.value);
};
</script>
