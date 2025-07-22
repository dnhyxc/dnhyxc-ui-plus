// 自定义主题
export const beauty = (bg = '#00000000') => {
  return {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: '6ae5c7' }, // 默认文本颜色
      { token: 'comment', foreground: '9c9c9c' }, // 注释颜色 #9c9c9c 6a9955
      { token: 'keyword', foreground: 'b955e5', fontStyle: 'bold' }, // 关键字颜色 #b955e5
      { token: 'variable', foreground: '9cdcfe' }, // 变量颜色 #6ae5c7
      { token: 'variable.language', foreground: '6ae5c7' }, // 语言变量颜色 #6ae5c7
      { token: 'variable.parameter', foreground: '6ae5c7' }, // 参数变量颜色 #6ae5c7
      { token: 'type', foreground: 'fbe77f' }, // 类型颜色 #fbe77f
      { token: 'function', foreground: 'fbe77f' }, // 函数颜色 #fbe77f
      { token: 'string', foreground: 'a6de7f' }, // 字符串颜色 #a6de7f
      { token: 'number', foreground: 'e7a03c' }, // 数字颜色 #e7a03c
      { token: 'regexp', foreground: '89b5f9' }, // 正则表达式颜色 #89b5f9
      { token: 'operator', foreground: 'dd664d' }, // 操作符颜色 #dd664d
      { token: 'property', foreground: '6ae5c7' }, // 属性颜色 #6ae5c7
      { token: 'constant', foreground: '6ae5c7' }, // 常量颜色 #6ae5c7
      { token: 'namespace', foreground: 'b955e5' }, // 命名空间颜色 #b955e5
      { token: 'comment.block.documentation', foreground: '9c9c9c' }, // 文档注释颜色
      { token: 'comment.block', foreground: '9c9c9c' }, // 块注释颜色
      { token: 'comment.line', foreground: '9c9c9c' }, // 行注释颜色
      { token: 'meta.tag', foreground: 'e53f73' }, // 元标记颜色 #e53f73
      { token: 'meta.attribute.name', foreground: '000000' }, // 元属性名称颜色 #6ae5c7
      { token: 'meta.selector', foreground: 'e53f73' }, // 元选择器颜色 #e53f73
      { token: 'tag', foreground: 'e53f73' },
      { token: 'attribute.name', foreground: 'fbe77f' }, // html 属性名颜色
      { token: 'attribute.value', foreground: 'a6de7f' } // html 属性值颜色
    ],
    colors: {
      'editor.foreground': '#d5d5d5', // 编辑器前景色
      'editor.background': bg, // 编辑器背景色
      'editor.lineHighlightBackground': '#00000000', // 当前行高亮背景色
      'editor.lineHighlightBorder': '#ffffff5c' // 隐藏当前行边框颜色
    }
  };
};
