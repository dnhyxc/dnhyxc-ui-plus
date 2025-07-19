import path from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
// import semver from 'semver';

interface PackageJson {
  name: string;
  main: string;
  module: string;
  files: string[];
  keywords: string[];
  sideEffects: string[];
  typings: string;
  packageJsonPath: string;
  outputDir: string;
  repository?: {
    type: string;
    url: string;
  };
  bugs?: {
    url: string;
  };
  homepage?: string;
}

export function createPackagePlugin(info: PackageJson) {
  const { name, main, module, files, keywords, sideEffects, typings, packageJsonPath, outputDir, ...args } = info;
  return {
    name: 'create-package-json',
    closeBundle() {
      // 检查源 package.json 是否存在
      if (!existsSync(packageJsonPath)) {
        console.error(`Error: package.json file not found at ${packageJsonPath}`);
        return;
      }
      // 读取并更新 package.json 的版本号
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      // 更新输出文件的内容
      const updatedPackageJson = {
        name,
        version: packageJson.version,
        main,
        module,
        files,
        keywords,
        sideEffects,
        typings,
        author: {
          name: packageJson.author,
          github: `https://github.com/${packageJson.author}`
        },
        ...args,
        license: packageJson.license,
        description: packageJson.description || ''
      };
      // 输出目录路径，设置为 dnhyxc-ui-plus
      const outputPackageJsonPath = path.join(outputDir, 'package.json');
      try {
        // 检查并创建 dnhyxc-ui-plus 目录
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }
        // 写入更新后的 package.json 到 dnhyxc-ui-plus 目录
        writeFileSync(outputPackageJsonPath, JSON.stringify(updatedPackageJson, null, 2));
        // 更新 outputDir 中的 package.json 文件的版本号
        // writeFileSync(packageJsonPath, JSON.stringify(componentsPkgJson, null, 2));
      } catch (err) {
        console.error(`package.json 写入错误: ${(err as Error).message}`);
      }
    }
  };
}
