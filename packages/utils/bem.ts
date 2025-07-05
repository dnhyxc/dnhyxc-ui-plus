// bem 规范 block 代码块 element 元素 modifier 装饰
// n-button n-button--primary n-button--disabled
const _bem = (prefix: string, blockSuffix: string, element: string, modifier: string) => {
  if (blockSuffix) {
    prefix += `-${blockSuffix}`;
  }
  if (element) {
    prefix += `__${element}`;
  }
  if (modifier) {
    prefix += `--${modifier}`;
  }
  return prefix;
};

const createBEM = (prefix: string = '') => {
  const b = (blockSuffix: string = '') => _bem(prefix, blockSuffix, '', '');

  const e = (element: string = '') => (element ? _bem(prefix, '', element, '') : '');

  const m = (modifier: string = '') => (modifier ? _bem(prefix, '', '', modifier) : '');

  const be = (blockSuffix: string = '', element: string = '') =>
    blockSuffix && element ? _bem(prefix, blockSuffix, element, '') : '';

  const em = (element: string = '', modifier: string = '') =>
    element && modifier ? _bem(prefix, '', element, modifier) : '';

  const bm = (blockSuffix: string = '', modifier: string = '') =>
    blockSuffix && modifier ? _bem(prefix, blockSuffix, '', modifier) : '';

  const bem = (blockSuffix: string = '', element: string = '', modifier: string = '') =>
    blockSuffix && element && modifier ? _bem(prefix, blockSuffix, element, modifier) : '';

  const is = (name: string, status: boolean) => (status ? `is-${name}` : '');

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
};

export const createNamespace = (name: string) => {
  const prefix = `n-${name}`;
  return createBEM(prefix);
};

// const bem = createNamespace('button');
// console.log(bem.b('box'));
// console.log(bem.e('element'));
// console.log(bem.m('modifer'));
// console.log(bem.is('checked', true));
// console.log(bem.be('box', 'element'));
// console.log(bem.bem('box', 'element', 'modifer'));
