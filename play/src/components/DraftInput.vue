<!--
 * 
 * @author: dnhyxc
 * @since: 2025-11-13
 * index.vue
-->
<template>
  <div class="draft-input-wrap">
    <n-draft-input
      ref="draftInputRef"
      autofocus
      :min-rows="minRows"
      :placeholder="placeholder"
      resize="none"
      :disabled="disabled"
      :maxlength="maxlength"
      @blur="onBlur"
      @input="onInput"
      @change="onChange"
      @submit="onSubmit"
      @enter="onEnter"
      @beforeUpload="beforeUpload"
      @upload="onUpload"
    >
    </n-draft-input>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { ElMessage } from 'element-plus';
import { type DefineExposeOptions } from '@dnhyxc-ui/components';

const minRows = ref(3);
const placeholder = ref('请输入内容');
const disabled = ref(false);
const maxlength = ref(1000);
const draftInputRef = ref<DefineExposeOptions>();

onMounted(() => {
  console.log(draftInputRef.value?.insertContent, 'draftInputRef');
  console.log(draftInputRef.value?.keyword, 'draftInputRef');
});

const onFocus = (e: any) => {
  console.log('onFocus', e);
};
const onBlur = (e: any) => {
  console.log('onBlur', e);
};
const onInput = (e: any) => {
  console.log('onInput', e);
};
const onChange = (e: any) => {
  console.log('onChange', e);
};
const onSubmit = (e: any) => {
  console.log('onSubmit', e);
};
const onEnter = (e: any) => {
  console.log('onEnter', e);
};

const beforeUpload = (file: File) => {
  console.log('beforeUpload--', file);
  // ElMessage({
  //   message:'格式不符合',
  //   type: 'error'
  // });
  return true;
};

const onUpload = async (file: File) => {
  console.log('onUpload-----', file);
  const url = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://picsum.photos/200/300');
    }, 1000);
  });
  return url;
};
</script>

<style scoped lang="scss">
.draft-input-wrap {
  height: 150px;

  .n-draft-input {
    --draft-input-border-color: rgb(229, 255, 209);
    --draft-input-border-radius: 5px;
    --draft-input-color: rgb(229, 255, 209);
    --draft-input-smile-icon-hover-color: rgb(199, 255, 156);
  }
}
</style>
