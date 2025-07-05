<script setup lang="ts">
import { NButton, NInput } from 'dnhyxc-ui-plus';
import { Earth } from '@vicons/ionicons5';
</script>

<template>
  <div>
    <h1>test play</h1>
    <NButton type="primary" size="large">这是自定义按钮</NButton>
    <!-- <el-button>这是 element-plus button</el-button> -->
    <n-icon :size="20" color="red">
      <Earth />
    </n-icon>
    <n-icon :size="20" color="skyblue">
      <Earth />
    </n-icon>
    <n-icon2 :size="50" color="pink">
      <Earth />
    </n-icon2>
    <NInput size="large" />
  </div>
</template>

<style scoped></style>
