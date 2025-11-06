import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log, greenBright, redBright, yellowBright } from '../../utils/log.ts';

// 通过改写__dirname 为__dirnameNew，解决打包报错
const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);

export const getPath = (_path: string) => path.resolve(__dirnameNew, _path);
const [, , componentName] = process.argv;

if (!componentName) {
  console.log(log.warning, yellowBright('请在终端中输入需要创建的组件名称'));
  process.exit(1);
}

const createFolder = (dir: string) => {
  if (fs.existsSync(dir)) {
    console.log(log.warning, `${redBright(`${componentName} 文件夹已存在：`)}${yellowBright(targetDir)}`);
    process.exit(1);
  }
  fs.mkdirSync(dir, { recursive: true });
};

const createFile = (filePath: string, content = '') => {
  if (fs.existsSync(filePath)) {
    console.log(log.warning, `${redBright('文件已存在：')}${yellowBright(filePath)}`);
    return;
  }
  fs.writeFileSync(filePath, content, 'utf8');

  console.log(log.success, greenBright(`已创建文件：${filePath}`));
};

// 创建组件文件夹
const targetDir = path.join(getPath('../../src'), componentName);
const styleDir = path.join(targetDir, 'style');

// 创建 style 文件夹
createFolder(styleDir);

// 批量创建文件
[
  path.join(styleDir, 'index.scss'),
  path.join(targetDir, 'index.vue'),
  path.join(targetDir, 'index.ts'),
  path.join(targetDir, 'types.ts')
].forEach((filePath) => createFile(filePath));
