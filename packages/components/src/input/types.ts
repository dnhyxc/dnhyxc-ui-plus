import { type ExtractPropTypes, type PropType } from 'vue';
import type Input from './index.vue';
export const inputProps = {
  size: String as PropType<'large' | 'default' | 'small'>,
  color: String,
  placeholder: String,
  disabled: Boolean,
  loading: Boolean,
  link: Boolean,
  value: String,
  className: String,
  type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'never'>
} as const;

export type InputProps = ExtractPropTypes<typeof inputProps>;

export type InputInstance = InstanceType<typeof Input> & unknown;

declare module 'vue' {
  export interface GlobalComponents {
    NInput: typeof Input;
  }
}
