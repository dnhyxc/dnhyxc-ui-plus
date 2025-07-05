import { type ExtractPropTypes, type PropType } from 'vue';
import type Icon from './icon.vue';
export const iconProps = {
  size: Number as PropType<number | string>,
  color: String
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;

export type IconInstance = InstanceType<typeof Icon> & unknown;

declare module 'vue' {
  export interface GlobalComponents {
    NIcon: typeof Icon;
  }
}
