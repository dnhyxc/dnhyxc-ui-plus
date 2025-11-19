<template>
  <div :class="bem.b()">
    <div class="actions">
      <slot name="actions">
        <el-popover
          id="__SMILE_POPOVER__"
          :visible="visible"
          trigger="click"
          placement="top-start"
          width="auto"
          effect="dark"
          popper-class="emoji-popover"
        >
          <Emoji
            id="__EMOJI_LIST__"
            :on-select="onSelectEmoji"
            :col="15"
            :gap="5"
            show-all
            :excludeEmoji="['[爆筋]']"
          />
          <template #reference>
            <div id="__SMILE_ICON__" @click="showSmile">
              <Icon name="smile" size="20px" color="#f5f5f5" cursor="pointer" />
            </div>
          </template>
        </el-popover>
        <el-upload
          class="uploader"
          :multiple="multiple"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="onUpload"
          :accept="accept"
        >
          <slot name="upload">
            <Icon name="folder" size="20px" color="#f5f5f5" cursor="pointer" />
          </slot>
        </el-upload>
      </slot>
    </div>
    <div class="el-textarea-wrap">
      <el-input
        id="TEXTAREA_WRAP"
        ref="inputRef"
        v-model="keyword"
        :autosize="{ minRows }"
        :maxlength="maxlength"
        :resize="resize"
        type="textarea"
        :placeholder="placeholder"
        class="text-area"
        :autofocus="autofocus"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @keypress.exact.enter.native.prevent="onSubmit"
        @keypress.ctrl.enter.native.prevent="onEnter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { ElInput, ElPopover, ElUpload, ElMessage, type UploadProps } from 'element-plus';
import { Icon, Emoji } from '../index';
import { createNamespace } from '../../utils';
import { DraftInputOptions, InsertContentParams } from './types';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/upload/style/css';
import 'element-plus/es/components/popover/style/css';
import 'element-plus/es/components/message/style/css';
import './style/index.scss';

// 上传文件提示
const FILE_UPLOAD_MSG = '请上传 png、jpg、jpeg、gif、webp、svg 格式的图片';

const bem = createNamespace('draft-input');

defineOptions({
  name: 'n-draft-input'
});

const props = withDefaults(defineProps<DraftInputOptions>(), {
  maxlength: 1000,
  resize: 'none',
  autofocus: false,
  borderColor: 'red',
  uploadInfoMsg: FILE_UPLOAD_MSG,
  maxFileSize: 20,
  fileTypes: () => ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
  multiple: true
});

const keyword = ref('');
const visible = ref(false);
const inputRef = ref<HTMLTextAreaElement | null>(null);

let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  window.addEventListener('click', onClickElement);
});

onUnmounted(() => {
  window.removeEventListener('click', onClickElement);
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});

const onClickElement = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const parentElement = target.parentElement?.parentElement;
  if (!parentElement?.closest('#__SMILE_ICON__')) {
    visible.value = false;
  }
};

const showSmile = () => {
  visible.value = true;
};

// 插入内容
const insertContent = ({ keyword, node, username, url, emoji }: InsertContentParams) => {
  const content = emoji || (username ? `<${username},${url}>` : `<${username || 'IMG'},${url}>`);
  if (keyword.substring(0, node?.selectionStart)) {
    const before = keyword.substring(0, node?.selectionStart);
    const after = keyword.substring(node?.selectionEnd as number, node?.textLength);
    return (before ? `${before} ` : '') + content + (after ? ` ${after}` : after);
  } else {
    // selectionStart 为0时，默认向最后面插入
    const before = keyword.substring(node?.selectionEnd as number, node?.textLength);
    const after = keyword.substring(0, node?.selectionStart);
    return (before ? `${before} ` : '') + content + (after ? ` ${after}` : after);
  }
};

// 手动聚焦
const setFocus = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(() => {
    inputRef.value?.focus();
  });
};

// 插入表情
const onSelectEmoji = (emoji: string) => {
  keyword.value = insertContent({ keyword: keyword.value, node: (inputRef?.value as any)?.textarea, emoji });
  setFocus();
};

// 上传校验
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (props?.onBeforeUpload) {
    return props.onBeforeUpload(rawFile);
  } else {
    if (!props.fileTypes.includes(rawFile.type)) {
      ElMessage({
        message: props.uploadInfoMsg,
        type: 'error'
      });
      return false;
    } else if (rawFile.size / 1024 / 1024 > props.maxFileSize) {
      ElMessage({
        message: `图片不能超过${props.maxFileSize}M`,
        type: 'error'
      });
      return false;
    }
    return true;
  }
};

// 自定义上传
const onUpload = async (event: { file: File }) => {
  const file = event.file;
  const url = (await props?.onUpload?.(file)) || '';
  // 插入图片地址
  keyword.value = insertContent({ keyword: keyword.value, node: (inputRef?.value as any)?.textarea, url });
  setFocus();
};

const onFocus = (event: FocusEvent) => {
  props?.onFocus?.(event);
};

const onBlur = (event: FocusEvent) => {
  props?.onBlur?.(event);
};

const onChange = (val: string) => {
  keyword.value = val;
  props?.onChange?.(val);
};

const onSubmit = (e: KeyboardEvent) => {
  const target = e.target as HTMLTextAreaElement;
  if (!target.value.trim()) return;
  props?.onSubmit?.(target.value);
  keyword.value = '';
};

const getSelectionInfo = (e: KeyboardEvent, content: string) => {
  const lastIdx = content.length;
  const target = e.target as HTMLInputElement;
  const startIdx = target.selectionStart || lastIdx;
  const endIdx = target.selectionEnd || lastIdx;
  return content.slice(0, startIdx) + '\n' + content.slice(endIdx);
};

const onEnter = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'Enter') {
    keyword.value = getSelectionInfo(e, keyword.value);
  }
};

const setInputValue = (val: string) => {
  keyword.value = val;
};

defineExpose<{
  keyword: string;
  // eslint-disable-next-line no-unused-vars
  insertContent: (params: InsertContentParams) => string;
  inputRef: Ref<HTMLTextAreaElement | null>;
  // eslint-disable-next-line no-unused-vars
  setInputValue: (val: string) => void;
}>({
  keyword: keyword.value,
  insertContent,
  inputRef,
  setInputValue
});
</script>
