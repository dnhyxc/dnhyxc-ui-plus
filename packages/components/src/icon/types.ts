import type NIcon from './index.vue';

export interface IconProps {
  name: string;
  id?: string;
  width?: string;
  height?: string;
  size?: string;
  color?: string;
  scale?: number;
  transitionTime?: string;
  hoverColor?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
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
    | 'zoom-out'
    | 'smile';
}

// 定义这个是为了让组件在业务中使用时，可以有组件所需的类型提示
declare module 'vue' {
  export interface GlobalComponents {
    NIcon: typeof NIcon;
  }
}
