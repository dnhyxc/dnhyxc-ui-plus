import { withInstall, type SFCWithInstall } from '@dnhyxc/utils_beta';
import Monaco from './src/monaco.vue';

export const NMonaco: SFCWithInstall<typeof Monaco> = withInstall(Monaco);

export default NMonaco;

export * from './src/monaco';
