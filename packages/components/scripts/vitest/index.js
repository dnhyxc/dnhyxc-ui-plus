import { execSync } from 'node:child_process';

const componentName = process.argv[2];

if (!componentName) {
  // eslint-disable-next-line no-console
  console.error('请提供一个组件名称，用法: pnpm test:component <component-name>');
  process.exit(1);
}

const command = `vitest run src/${componentName}/__tests__/index.test.ts`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(`测试失败: ${err.message}`);
  process.exit(1);
}
