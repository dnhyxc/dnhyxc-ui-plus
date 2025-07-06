import { withInstall, type SFCWithInstall } from '@dnhyxc/utils_beta';
import Button from './src/button.vue';

export const NButton: SFCWithInstall<typeof Button> = withInstall(Button);

export default NButton;

// declare module 'vue' {
//   export interface GlobalComponents {
//     NIcon: typeof Icon;
//   }
// }
export * from './src/button';
