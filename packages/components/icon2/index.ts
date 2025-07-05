import { withInstall, type SFCWithInstall } from '@dnhyxc-ui/utils';
import Icon from './src/icon2.vue';

// const NIcon = withInstall(Icon);
export const NIcon2: SFCWithInstall<typeof Icon> = withInstall(Icon);

export default NIcon2;

// declare module 'vue' {
//   export interface GlobalComponents {
//     NIcon: typeof Icon;
//   }
// }
export * from './src/icon2';
