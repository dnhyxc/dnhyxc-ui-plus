import { withInstall, type SFCWithInstall } from '@dnhyxc-ui/utils';
import Input from './src/input.vue';

export const NInput: SFCWithInstall<typeof Input> = withInstall(Input);

export default NInput;

// declare module 'vue' {
//   export interface GlobalComponents {
//     NIcon: typeof Icon;
//   }
// }
export * from './src/input';
