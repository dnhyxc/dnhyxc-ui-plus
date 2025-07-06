import { withInstall, type SFCWithInstall } from '@dnhyxc/utils_beta';
import Input from './src/input.vue';

export const NInput: SFCWithInstall<typeof Input> = withInstall(Input);

export default NInput;

// declare module 'vue' {
//   export interface GlobalComponents {
//     NIcon: typeof Icon;
//   }
// }
export * from './src/input';
