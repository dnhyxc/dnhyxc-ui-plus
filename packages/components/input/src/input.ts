import { type ExtractPropTypes, type PropType } from 'vue';
import type Input from './input.vue';
export const inputProps = {
  size: String as PropType<'large' | 'middle' | 'small'>,
  color: String,
  disabled: Boolean,
  loading: Boolean,
  link: Boolean,
  type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'never'>
} as const;

export type InputProps = ExtractPropTypes<typeof inputProps>;

export type InputInstance = InstanceType<typeof Input> & unknown;

declare module 'vue' {
  export interface GlobalComponents {
    NInput: typeof Input;
  }
}
