import { series, parallel, src, dest } from 'gulp';
import { componentPath } from '../utils/paths';
import glupSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

//打包样式
export const buildStyle = () => {
  return src(`${componentPath}/**/**.scss`)
    .pipe(glupSass(dartSass)())
    .pipe(
      autoprefixer(
        { cascade: false } //文件不缓存
      )
    )
    .pipe(cleanCSS({ compatibility: 'ie8' })) // 压缩css文件
    .pipe(dest(`${componentPath}/es`))
    .pipe(dest(`${componentPath}/lib`));
};

export default series(parallel(async () => buildStyle()));
