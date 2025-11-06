<!--
 * 弹窗
 * @author: dnhyxc
 * @since: 2023-11-14
 * index.vue
-->
<template>
  <div class="model-wrap">
    <el-dialog
      v-model="visible"
      destroy-on-close
      :center="center"
      :modal="modal"
      align-center
      :title="title"
      :width="width"
      :draggable="draggable"
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

interface IProps {
  visible: boolean;
  title?: string;
  width?: string;
  footer?: boolean;
  draggable?: boolean;
  onClick?: Function | null;
  center?: boolean;
  modal?: boolean;
  size?: string;
  padding?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  width: '400px',
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

<style scoped lang="less">
.model-wrap {
  :deep {
    .el-dialog__body {
      padding: v-bind('`${props.padding}`') !important;
    }
  }

  .dialog-footer {
    .btn {
      width: 120px;
      height: 33px;
    }
  }
}
</style>
