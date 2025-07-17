import { type ExtractPropTypes, type PropType } from 'vue';
import type Button from './index.vue';
export const buttonProps = {
  size: String as PropType<'large' | 'default' | 'small'>,
  color: String,
  disabled: Boolean,
  loading: Boolean,
  link: Boolean,
  type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'never'>
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type ButtonInstance = InstanceType<typeof Button> & unknown;

declare module 'vue' {
  export interface GlobalComponents {
    NButton: typeof Button;
  }
}
