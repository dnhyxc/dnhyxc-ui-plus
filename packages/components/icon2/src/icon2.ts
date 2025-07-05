import { type ExtractPropTypes, type PropType } from 'vue';
import type Icon from './icon2.vue';
export const iconProps2 = {
  size: Number as PropType<number | string>,
  color: String
} as const;

export type IconProps2 = ExtractPropTypes<typeof iconProps2>;

export type IconInstance2 = InstanceType<typeof Icon> & unknown;

declare module 'vue' {
  export interface GlobalComponents {
    NIcon2: typeof Icon;
  }
}
