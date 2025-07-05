import { withInstall, type SFCWithInstall } from '@dnhyxc-ui/utils';
import Icon from './src/icon.vue';

// const NIcon = withInstall(Icon);
export const NIcon: SFCWithInstall<typeof Icon> = withInstall(Icon);

export default NIcon;

// declare module 'vue' {
//   export interface GlobalComponents {
//     NIcon: typeof Icon;
//   }
// }
export * from './src/icon';
