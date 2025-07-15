<template>
  <button><slot>测试按钮</slot></button>
</template>
<script lang="ts" setup>
import './style/index.scss';

defineOptions({
  name: 'n-button'
});
</script>
