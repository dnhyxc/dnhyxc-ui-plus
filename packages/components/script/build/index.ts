import delPath from './delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from './paths';
import glupSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import run from '../../utils/run';

//删除 dnhyxc-ui-plus
export const removeDist = () => {
  return delPath(`${pkgPath}/dnhyxc-ui-plus`);
};

//打包组件
export const buildComponent = async () => {
  run('pnpm run build1', componentPath);
};

export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.scss`, { ignore: [`${componentPath}/**/node_modules/**`] })
    .pipe(glupSass(dartSass)())
    .pipe(
      autoprefixer(
        { cascade: false } //文件不缓存
      )
    )
    .pipe(cleanCSS({ compatibility: 'ie8' })) // 压缩css文件
    .pipe(dest(`${pkgPath}/dnhyxc-ui-plus/es/src`))
    .pipe(dest(`${pkgPath}/dnhyxc-ui-plus/lib/src`));
};

export default series(
  // async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
