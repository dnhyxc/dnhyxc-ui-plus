import type NIcon from './index.vue';

export interface IconProps {
  name: string;
  width?: string;
  height?: string;
  size?: string;
  color?: string;
  className?: string;
  cursor?:
    | 'pointer'
    | 'default'
    | 'auto'
    | 'crosshair'
    | 'grab'
    | 'grabbing'
    | 'help'
    | 'move'
    | 'not-allowed'
    | 'text'
    | 'wait'
    | 'zoom-in'
    | 'zoom-out';
}

// 定义这个是为了让组件在业务中使用时，可以有组件所需的类型提示
declare module 'vue' {
  export interface GlobalComponents {
    NIcon: typeof NIcon;
  }
}
