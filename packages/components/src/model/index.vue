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
      :title="title"
      :width="width"
      :draggable="draggable"
      :top="top"
      :modal="modal"
      :center="center"
      :align-center="alignCenter"
      :fullscreen="fullscreen"
      :header-class="headerClass"
      :modal-class="modalClass"
      :body-class="bodyClass"
      :footer-class="footerClass"
      :append-to-body="appendToBody"
      :append-to="appendTo"
      :lock-scroll="lockScroll"
      :show-close="showClose"
      :before-close="beforeClose"
      :destroy-on-close="destroyOnClose"
      :style="style ? style : ''"
      @open="open"
      @close="close"
      @opened="opened"
      @closed="closed"
      @before-close="props.beforeClose"
      @open-auto-focus="openAutoFocus"
      @close-auto-focus="closeAutoFocus"
    >
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
              @click="onCancel"
            >
              {{ cancelText }}
            </n-button>
            <n-button
              class="btn"
              :size="size"
              type="primary"
              :width="footerBtnWidth"
              :height="footerBtnHeight"
              @click="onOk"
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
import { ElDialog } from 'element-plus';
import { createNamespace } from '../../utils';
import { ModelOptions } from './types';
import 'element-plus/es/components/dialog/style/css';
import './style/index.scss';

const bem = createNamespace('model');

defineOptions({
  name: 'n-model'
  // inheritAttrs: false // 禁止自动继承属性
});

const props = withDefaults(defineProps<ModelOptions>(), {
  title: '',
  width: (props) => (props.alignCenter ? 'auto' : '640px'),
  showFooter: true,
  draggable: false,
  onClick: null,
  center: false,
  modal: true,
  size: 'default',
  alignCenter: false,
  showClose: true,
  footerBtnWidth: 120,
  footerBtnHeight: 32,
  cancelText: '取消',
  okText: '确定',
  destroyOnClose: true
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

const onOk = () => {
  props.onOk && props.onOk();
  visible.value = false;
};

const onCancel = () => {
  props.onCancel && props.onCancel();
  visible.value = false;
};
</script>
