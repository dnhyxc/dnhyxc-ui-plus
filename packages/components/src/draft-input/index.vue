<template>
  <div :class="`${className}`" :style="`height: ${height};`">
    <slot name="actions">
      <div class="actions">
        <el-popover
          id="__SMILE_POPOVER__"
          :visible="visible"
          trigger="click"
          :effect="popEffect"
          placement="top-start"
          width="auto"
          popper-style="min-width: max-content"
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
              <slot name="smile-icon">
                <Icon name="smile" size="20px" color="#f5f5f5" cursor="pointer" />
              </slot>
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
          <slot name="upload-icon">
            <Icon name="folder" size="20px" color="#f5f5f5" cursor="pointer" />
          </slot>
        </el-upload>
      </div>
    </slot>
    <el-popover
      :visible="atVisible && needAt"
      :show-arrow="false"
      :effect="popEffect"
      trigger="click"
      placement="top-start"
      width="auto"
      popper-style="min-width: max-content; padding: 8px 0 8px 8px;"
    >
      <slot v-if="needAt" name="at-users" v-bind="{ onSelectUser }">
        <div ref="atListRef" v-if="atUserList?.length" class="input-at-list">
          <el-scrollbar max-height="300px">
            <div v-for="user in atUserList" :key="user.id" class="input-at-item" @click="onSelectUser(user)">
              <div class="input-at-item-info">
                <div class="input-at-item-avatar">
                  <Image :url="user.avatar" width="40px" height="40px" />
                </div>
                <div class="input-at-item-username">{{ user.username }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </slot>
      <template #reference>
        <div class="el-textarea-wrap">
          <el-input
            id="TEXTAREA_WRAP"
            ref="inputRef"
            v-model="keyword"
            :maxlength="maxlength"
            :resize="resize"
            :disabled="disabled"
            type="textarea"
            :placeholder="placeholder"
            class="text-area"
            :autofocus="autofocus"
            @focus="onFocus"
            @blur="onBlur"
            @change="onChange"
            @input="onInput"
            @keypress.exact.enter.native.prevent="onSubmit"
            @keypress.ctrl.enter.native.prevent="onEnter"
          />
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, type Ref, computed } from 'vue';
import { ElInput, ElPopover, ElUpload, ElMessage, ElScrollbar, type UploadProps } from 'element-plus';
import { Icon, Emoji, Image } from '../index';
import { createNamespace } from '../../utils';
import { DraftInputOptions, InsertContentParams, AtUserOptions } from './types';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/upload/style/css';
import 'element-plus/es/components/popover/style/css';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/scrollbar/style/css';
import './style/index.scss';

// 上传文件提示
const FILE_UPLOAD_MSG = '请上传 png、jpg、jpeg、gif、webp、svg 格式的图片';

const bem = createNamespace('draft-input');

defineOptions({
  name: 'n-draft-input'
});

const props = withDefaults(defineProps<DraftInputOptions>(), {
  maxlength: 1000,
  height: '120px',
  resize: 'none',
  autofocus: false,
  uploadInfoMsg: FILE_UPLOAD_MSG,
  maxFileSize: 20,
  fileTypes: () => ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
  multiple: true,
  popEffect: 'light'
});

const keyword = ref('');
const visible = ref(false);
const atVisible = ref(false);
const inputRef = ref<HTMLTextAreaElement | null>(null);
const atListRef = ref<HTMLDivElement | null>(null);

let timer: ReturnType<typeof setTimeout> | null = null;

const className = computed(() => `${bem.b()} ${props.className || ''}`);

onMounted(() => {
  window.addEventListener('click', onClickElement);
  nextTick(() => {
    setCssVar();
  });
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
  const popover = document.querySelector('.emoji-popover');
  const parentElement = target.parentElement?.parentElement;
  if (!popover?.contains(target) && !parentElement?.closest('#__SMILE_ICON__')) {
    visible.value = false;
  }
  atVisible.value = false;
};

const changeCssVariable = (variable: string, value: string) => {
  if (atListRef.value) {
    atListRef.value.style.setProperty(variable, value);
  }
};

const setCssVar = () => {
  const cssVarMap: Record<string, string> = {
    '--draft-input-at-user-hover-color': props.atItemHoverColor || '#409eff',
    '--draft-input-at-user-hover-bg': props.atItemHoverBgColor || '#ffffff1a'
  };
  Object.entries(cssVarMap).forEach(([key, val]) => {
    if (val) changeCssVariable(key, val);
  });
};

const showSmile = () => {
  visible.value = true;
};

// 插入内容
const insertContent = ({ keyword, node, username, url, emoji, atUser }: InsertContentParams) => {
  const getResult = (before: string, after: string) => {
    const hasSpaceBefore = before.endsWith(' ') || before === '';
    const hasSpaceAfter = after.startsWith(' ') || after === '';
    const leftSpace = hasSpaceBefore ? '' : ' ';
    const rightSpace = hasSpaceAfter ? '' : ' ';
    return before + leftSpace + content + rightSpace + after + (after === '' ? ' ' : '');
  };
  const content = emoji ? emoji : atUser ? `@${atUser}` : username ? `[${username},${url}]` : `[IMG,${url}]`;
  if (keyword.substring(0, node?.selectionStart)) {
    const before = keyword.substring(0, node?.selectionStart);
    const after = keyword.substring(node?.selectionEnd as number, node?.textLength);
    return getResult(before, after);
  } else {
    // selectionStart 为0时，默认向最后面插入
    const before = keyword.substring(node?.selectionEnd as number, node?.textLength);
    const after = keyword.substring(0, node?.selectionStart);
    return getResult(before, after);
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
  visible.value = false;
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

const onSelectUser = (user: AtUserOptions) => {
  const atIndex = keyword.value.lastIndexOf('@');
  keyword.value = insertContent({
    keyword: keyword.value.slice(0, atIndex),
    node: (inputRef?.value as any)?.textarea,
    atUser: user.username
  });
  props?.onAtUser?.(user);
  setFocus();
};

const onInput = (val: string) => {
  const atIndex = val.lastIndexOf('@');
  if (atIndex !== -1 && atIndex === val.length - 1) {
    atVisible.value = true;
  } else {
    atVisible.value = false;
  }
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
