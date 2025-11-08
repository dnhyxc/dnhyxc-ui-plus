<!--
 * 弹窗
 * @author: dnhyxc
 * @since: 2023-11-14
 * index.vue
-->
<template>
  <div :class="bem.b()">
    <el-dialog
      v-model="visible"
      destroy-on-close
      :center="center"
      :modal="modal"
      align-center
      :title="title"
      :width="width"
      :draggable="draggable"
      :style="padding ? `padding: ${padding}` : ''"
    >
      <slot name="content"></slot>
      <template v-if="footer" #footer>
        <slot name="footer">
          <span class="dialog-footer">
            <el-button class="btn" :size="size" @click="visible = false">取消</el-button>
            <el-button class="btn" :size="size" type="primary" @click="onClick">确定</el-button>
          </span>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createNamespace } from '../../utils';
import { NModelOptions } from './types';
import './style/index.scss';

const bem = createNamespace('model');

defineOptions({
  name: 'n-model'
});

const props = withDefaults(defineProps<NModelOptions>(), {
  title: '',
  width: 'auto',
  footer: true,
  draggable: true,
  onClick: null,
  center: true,
  modal: true,
  size: 'default',
  padding: '10px 20px 20px'
});

const emit = defineEmits(['update:visible']);

const visible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit('update:visible', value);
  }
});

const onClick = () => {
  props.onClick && props.onClick();
  visible.value = false;
};
</script>
