<script setup lang="ts">
import { NButton } from 'dnhyxc-ui-plus';
import { Earth } from '@vicons/ionicons5';
import MyInput from './components/MyInput.vue';
// import 'dnhyxc-ui-plus/es/button/src/index.css';
// import 'dnhyxc-ui-plus/es/input/src/index.css';
</script>

<template>
  <div>
    <h1>test play</h1>
    <NButton type="primary" size="large" :disabled="false" class="my-inp">这是自定义按钮</NButton>
    <MyInput />
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
  </div>
</template>

<style scoped lang="scss">
.my-inp {
  margin-top: 20px;
}
</style>
