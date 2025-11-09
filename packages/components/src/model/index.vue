<!--
 * 弹窗
 * @author: dnhyxc
 * @since: 2023-11-14
 * index.vue
-->
<template>
  <div :class="bem.b()">
    <el-dialog v-model="visible" destroy-on-close :style="padding ? `padding: ${padding}` : ''" v-bind="props">
      <template #header="{ close, titleId, titleClass }">
        <slot name="header" v-bind="{ close, titleId, titleClass }"></slot>
      </template>
      <slot name="content"></slot>
      <template v-if="showFooter" #footer>
        <slot name="footer">
          <span class="dialog-footer">
            <n-button
              class="btn close-btn"
              :size="size"
              :width="footerBtnWidth"
              :height="footerBtnHeight"
              @click="visible = false"
            >
              {{ cancelText }}
            </n-button>
            <n-button
              class="btn"
              :size="size"
              type="primary"
              :width="footerBtnWidth"
              :height="footerBtnHeight"
              @click="onClick"
            >
              {{ okText }}
            </n-button>
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
  width: (props) => (props.alignCenter ? 'auto' : '640px'),
  showFooter: true,
  draggable: false,
  onClick: null,
  center: false,
  modal: true,
  size: 'default',
  padding: '10px 20px 20px',
  alignCenter: false,
  showClose: true,
  footerBtnWidth: 120,
  footerBtnHeight: 32,
  cancelText: '取消',
  okText: '确定'
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
