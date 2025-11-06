import { execSync } from 'node:child_process';
import { log, redBright } from '../../utils/log.ts';

const componentName = process.argv[2];

if (!componentName) {
  console.log(log.error, redBright('请提供一个组件名称，用法: pnpm test:component <component-name>'));
  process.exit(1);
}

const command = `vitest run src/${componentName}/__tests__/index.test.ts`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (err) {
  console.log(log.error, redBright(`测试失败: ${(err as Error).message}`));
  process.exit(1);
}
