<script setup lang="ts">
import { ref, watch } from 'vue';
import { NInput } from 'dnhyxc-ui-plus-beta';
// import 'dnhyxc-ui-plus/es/button/src/index.css';
// import 'dnhyxc-ui-plus/es/input/src/index.css';

const keyword = ref('');

watch(keyword, (newValue, oldValue) => {
  console.log('newValue', newValue);
  console.log('oldValue', oldValue);
});
</script>

<template>
  <div>
    <NInput v-model:value="keyword" size="large" class="my-inp" placeholder="请输入" />
  </div>
</template>

<style scoped lang="scss">
.my-inp {
  margin-top: 50px;
}
</style>
