import fs from 'fs';
import { resolve } from 'path';
import { pkgPath } from './paths';

// 需要保留的文件
const stayFile = ['README.md', 'CHANGELOG.md'];

const delPath = async (path: string) => {
  let files: string[] = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);

    files.forEach(async (file) => {
      let curPath = resolve(path, file);

      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        if (file != 'node_modules') await delPath(curPath);
      } else {
        // delete file
        if (!stayFile.includes(file)) {
          fs.unlinkSync(curPath);
        }
      }
    });

    if (path !== `${pkgPath}/dnhyxc-ui-plus`) fs.rmdirSync(path);
  }
};

export default delPath;
