import type NDraftInput from './index.vue';

export interface AtUserOptions {
  id: string;
  username: string;
  avatar: string;
  [key: string]: unknown;
}

export interface DraftInputOptions {
  height?: string;
  className?: string;
  autofocus?: boolean;
  placeholder?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  disabled?: boolean;
  maxlength?: number;
  multiple?: boolean; // 是否支持多文件上传
  accept?: string; // 文件类型筛选，如 '.jpg,.png' 或 'image/*'
  fileTypes?: string[];
  uploadInfoMsg?: string;
  maxFileSize?: number; // 最大文件大小，单位为字节
  needAt?: boolean; // 是否需要@用户
  atUserList?: AtUserOptions[]; // @用户列表
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onEnter?: (e: KeyboardEvent) => void;
  onBeforeUpload?: (file: File) => boolean;
  onUpload?: (file: File) => Promise<string>;
  onAtUser?: (user: AtUserOptions) => void;
}

export interface InsertContentParams {
  keyword: string; // textarea输入内容
  node?: HTMLTextAreaElement; // textarea输入框元素
  username?: string; // 用户名称
  url?: string; // 图片地址
  emoji?: string; // 表情内容
  atUser?: string;
}

export interface DefineExposeOptions {
  keyword: string;
  insertContent: (params: InsertContentParams) => string;
  inputRef: HTMLTextAreaElement | null;
  setInputValue: (value: string) => void;
}

declare module 'vue' {
  export interface GlobalComponents {
    NDraftInput: typeof NDraftInput;
  }
}
