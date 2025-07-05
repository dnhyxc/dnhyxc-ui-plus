import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from '../utils/paths';
import glupSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

console.log(componentPath, 'componentPathcomponentPathcomponentPathcomponentPath');

//打包样式
export const buildStyle = () => {
  return src(`${componentPath}/components/**/**.scss`)
    .pipe(glupSass(dartSass)())
    .pipe(
      autoprefixer(
        { cascade: false } //文件不缓存
      )
    )
    .pipe(cleanCSS({ compatibility: 'ie8' })) // 压缩css文件
    .pipe(dest(`${pkgPath}/dist/es`))
    .pipe(dest(`${pkgPath}/dist/lib`));
};

export default series(parallel(async () => buildStyle()));
