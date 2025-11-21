import type NModel from './index.vue';

export interface ModelOptions {
  visible: boolean;
  title?: string;
  width?: string;
  draggable?: boolean;
  center?: boolean;
  alignCenter?: boolean;
  fullscreen?: boolean; // 是否全屏
  modal?: boolean; // 是否显示遮罩层
  style?: string;
  top?: string; // dialog CSS 中的 margin-top 值，默认为 15vh
  showClose?: boolean;
  modalClass?: string; // 遮罩层的自定义类名
  headerClass?: string; // dialog-header 的自定义类名
  bodyClass?: string; // dialog-body 的自定义类名
  footerClass?: string; // dialog-footer 的自定义类名
  appendToBody?: boolean; // Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true
  appendTo?: string | HTMLElement; // Dialog 挂载到哪个 DOM 元素 将覆盖 append-to-body，默认 body
  lockScroll?: boolean; // 是否在 Dialog 出现时将 body 滚动锁定 默认 true
  destroyOnClose?: boolean; // 关闭后是否销毁 Dialog 的 DOM 结构
  open?: () => void;
  opened?: () => void;
  close?: () => void;
  closed?: () => void;
  openAutoFocus?: () => void;
  closeAutoFocus?: () => void;
  beforeClose?: (done: () => void) => void; // 关闭前的回调，会暂停 Dialog 的关闭。done 用于关闭 Dialog。
  size?: 'default' | 'small' | 'large';
  footerBtnWidth?: number;
  footerBtnHeight?: number;
  cancelText?: string;
  okText?: string;
  onOk?: (() => void) | null;
  onCancel?: (() => void) | null;
  showFooter?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    NModel: typeof NModel;
  }
}
