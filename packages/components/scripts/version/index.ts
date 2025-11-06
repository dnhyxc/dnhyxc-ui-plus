import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, readFileSync } from 'fs';

// 通过改写__dirname 为__dirnameNew，解决打包报错
const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);

export const getPath = (_path: string) => path.resolve(__dirnameNew, _path);

const updateVerison = () => {
  const dnhyxcUIPlusMdPath = getPath('../../../dnhyxc-ui-plus/package.json');
  const componentsPkgPath = getPath('../../package.json');
  // 读取并更新 package.json 的版本号
  const dnhyxcUIPlusPkg = JSON.parse(readFileSync(dnhyxcUIPlusMdPath, 'utf-8'));
  const componentsPkg = JSON.parse(readFileSync(componentsPkgPath, 'utf-8'));

  componentsPkg.version = dnhyxcUIPlusPkg.version;

  try {
    writeFileSync(componentsPkgPath, JSON.stringify(componentsPkg, null, 2));
    console.log(`✨ @dnhyxc-ui/components package.json version 已更新为 ${dnhyxcUIPlusPkg.version}`);
  } catch (err) {
    console.error(`package.json 写入错误: ${(err as Error).message}`);
  }
};

updateVerison();
