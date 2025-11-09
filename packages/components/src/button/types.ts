import { type ExtractPropTypes, type PropType } from 'vue';
import type Button from './index.vue';

export const buttonProps = {
  size: String as PropType<'large' | 'default' | 'small'>,
  color: String,
  hoverColor: String,
  disabled: Boolean,
  loading: Boolean,
  link: Boolean,
  type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'>,
  width: Number,
  height: Number,
  className: String,
  onClick: Function as PropType<(e: MouseEvent) => void>
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type ButtonInstance = InstanceType<typeof Button> & unknown;

// 定义这个是为了让组件在业务中使用时，可以有组件所需的类型提示
declare module 'vue' {
  export interface GlobalComponents {
    NButton: typeof Button;
  }
}
