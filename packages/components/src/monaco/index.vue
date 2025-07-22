<!--
 * Icon - 图标组件
 * @author: dnhyxc
 * @since: 2025-07-02
 * index.vue
-->
<template>
  <div :class="bem.b()" v-bind="$attrs">
    <div :class="`${theme !== 'vs' && 'dark-toolbar'} toolbar`">
      <div class="left">
        <div v-if="!readonly" class="code-action">
          <!-- <el-dropdown
            v-if="languages.length > 1"
            class="menu-list"
            max-height="200px"
            popper-class="custom-dropdown-styles"
            placement="bottom-start"
          >
            <span class="action iconfont icon-yuyan" title="切换语言" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in languages"
                  :key="item"
                  class="dropdown-text"
                  @click="onChangeLanguage(item)"
                >
                  {{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
          <!-- <el-dropdown class="menu-list" popper-class="custom-dropdown-styles">
            <span class="action iconfont icon-sketchpad-theme" title="切换主题" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in EDIT_THEMES"
                  :key="item.theme"
                  class="dropdown-text"
                  @click="onSelectTheme(item.theme)"
                >
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
          <el-tooltip effect="light" content="快捷键说明" placement="top" popper-class="custom-dropdown-styles">
            <span class="action iconfont icon-tishi" @click="onShowInfo" />
          </el-tooltip>
          <slot name="leftAction" :data="{ content, editor }"></slot>
          <slot name="changeMode" :data="{ content, editor }"></slot>
          <el-tooltip
            v-if="!isCodeEdit"
            effect="light"
            content="切换编辑器"
            placement="top"
            popper-class="custom-dropdown-styles"
          >
            <span class="action iconfont icon-bianjiqi" @click="onChangeEditor" />
          </el-tooltip>
        </div>
        <div v-if="!isCodeEdit" class="create-action">
          <div v-if="showDot" class="action un-save" @click="onDiffValue">未保存</div>
          <div v-if="showDot" class="action" @click="onDiffValue">
            {{ showDiff ? '关闭对比' : '对比变更' }}
          </div>
          <!-- <el-button
            class="action clear"
            type="warning"
            link
            title="清空内容"
            :disabled="!createStore.createInfo.content?.trim()"
            @click="onClear"
          >
            清
          </el-button> -->
          <span class="action" title="草稿列表" @click="onShowDraft">稿</span>
          <!-- <span v-if="createStore.draftArticleId" class="action" title="预览草稿" @click="onPreviewDraft">览</span> -->
          <span class="action save-draft" title="保存草稿" @click="onSaveDraft">
            存
            <el-icon v-if="saveLoading" class="is-loading">
              <i class="iconfont icon-a-huayuanCopy loading-icon" />
            </el-icon>
          </span>
          <span class="action" title="发布文章" @click="onPublish">发</span>
        </div>
        <div v-if="isCodeEdit" class="create-action prev-action">
          <slot name="save" :data="{ content, editor, onChangeLanguage }"></slot>
        </div>
      </div>
      <div class="right">
        <slot v-if="!readonly" name="curLanguage">
          <div class="language-text">当前语言：{{ language }}</div>
        </slot>
        <slot v-else name="resLanguage">
          <span class="language-text result-text">{{ language }} 运行结果</span>
        </slot>
      </div>
    </div>
    <div
      v-show="!showDiff"
      ref="editorRef"
      :class="`${theme !== 'vs' && 'dark-monaco-editor-wrap'} monaco-editor-wrap`"
    />
    <!-- <DiffMonacoEditor
      v-show="showDiff"
      :value="createStore.createInfo.content || ''"
      :old-value="prevContent || ''"
      language="markdown"
      :height="checkOS() === 'mac' ? 'calc(100vh - 138px)' : 'calc(100vh - 125px)'"
    /> -->
    <!-- <ElModel v-model:visible="visible" title="vscode 快捷键说明" :footer="false" :width="'86vw'" :draggable="false">
      <template #content>
        <div class="model-content">
          <el-scrollbar>
            <div v-for="item in SHORTCUT_KEYS" :key="item.name" class="shortcuts">
              <span class="key-name">{{ item.name }}</span>
              <span class="key-desc">{{ item.desc }}</span>
            </div>
          </el-scrollbar>
        </div>
      </template>
    </ElModel> -->
  </div>
</template>

<script setup lang="ts">
// import type { CSSProperties } from 'vue';
import { ref, onMounted, nextTick, onDeactivated, computed, watchEffect, watch, onUnmounted } from 'vue';
import { createNamespace } from '../../utils/bem';
import { ElTooltip } from 'element-plus';
import { monacoProps } from './types';
import * as monaco from 'monaco-editor';
// @ts-ignore
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// @ts-ignore
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// @ts-ignore
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// @ts-ignore
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import './style/index.scss';
// import {
//   MONACO_EDITOR_LANGUAGES,
//   CODE_RUN_LANGUAGES,
//   VS_CODE_SHORTCUT_KEYS,
//   CODERUN_BG,
//   EDIT_THEMES
// } from '@/constant';
// import { checkOS, message } from '@/utils';
// import { createStore } from '@/store';
// import DiffMonacoEditor from '@/components/MonacoDiffEditor/index.vue';
// import { registerDocumentFormatInfo } from './custom';

const bem = createNamespace('monaco');

const emit = defineEmits(['update:theme']);

const props = defineProps(monacoProps);

defineOptions({
  name: 'n-monaco',
  inheritAttrs: false // 禁用继承父组件的属性
});

// 编辑器ref
const editorRef = ref<HTMLDivElement | null>(null);
// 当前语言
const language = ref<string>(props.isCodeEdit ? props.language || 'javascript' : 'markdown');
// 编辑代码模式时的默认值
const content = ref<string | undefined>('');
// 是否显示快捷键提示弹窗
const visible = ref<boolean>(false);
// 控制是否显示对比内容
const showDiff = ref<boolean>(false);

let editor: monaco.editor.IStandaloneCodeEditor | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let initTimer: ReturnType<typeof setTimeout> | null = null;

const theme = computed({
  get() {
    return props.theme as string;
  },
  set(value: string) {
    emit('update:theme', value);
  }
});

// const SHORTCUT_KEYS = computed(() => {
//   if (props.shortcutKeys && props.shortcutKeys.length) {
//     const keysCopy = [...VS_CODE_SHORTCUT_KEYS];
//     keysCopy.splice(props.shortcutPos || 0, 0, ...props.shortcutKeys);
//     return keysCopy;
//   }
//   return VS_CODE_SHORTCUT_KEYS;
// });

// const background = computed(() => {
//   return (CODERUN_BG as Record<string, string>)[theme.value] || props?.editorBgColor || 'transparent';
// });

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    switch (label) {
      case 'json':
        return new jsonWorker();
      case 'css':
      case 'scss':
      case 'less':
        return new cssWorker();
      case 'html':
      case 'handlebars':
      case 'razor':
        return new htmlWorker();
      case 'typescript':
      case 'javascript':
      case 'c':
      case 'python':
        return new tsWorker();
      default:
        return new EditorWorker();
    }
  }
};

onMounted(() => {
  nextTick(() => {
    const editor = initEditor();
    props?.getMonacoEditor?.(editor, onChangeLanguage, setTheme);
  });
});

onUnmounted(() => {
  timer = null;
  initTimer = null;
});

watch(
  () => props.showDot,
  (newVal) => {
    if (!newVal) {
      showDiff.value = false;
    }
  }
);

watchEffect(() => {
  // 设置编辑内容
  initTimer && clearTimeout(initTimer);
  initTimer = setTimeout(() => {
    if (props.code && editor) {
      editor.getModel()?.setValue(props.code);
    }
    if (props.code === '' && editor) {
      editor.getModel()?.setValue('');
    }
    // 切换语言
    if (props.language && editor) {
      onChangeLanguage(props.language);
    }
  });
});

// const languages = computed(() =>
//   props?.isCodeEdit ? props?.languages || CODE_RUN_LANGUAGES : MONACO_EDITOR_LANGUAGES
// );

// 组件弃用时，显示mackdown编辑器
onDeactivated(() => {
  props?.onChangeEditor?.();
});

// 初始化编辑器
const initEditor = () => {
  // 设置 JavaScript 的诊断选项
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true, // 禁用语义验证
    noSyntaxValidation: false // 启用语法验证
  });

  // 设置 JavaScript 的编译器选项
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016, // 设置目标 ECMAScript 版本为 ES2016
    allowNonTsExtensions: true // 允许非 TypeScript 扩展名
  });

  // 设置 TypeScript 的模型同步
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true); // 启用即时模型同步

  // 设置 TypeScript 的诊断选项
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true, // 禁用语义验证
    noSyntaxValidation: true // 禁用语法验证
  });

  if (!editor) {
    // 创建 Monaco 编辑器实例
    editor = monaco?.editor?.create?.(editorRef?.value! as any, {
      // 根据编辑模式和只读状态设置初始值
      value: props.code, // 编辑器初始显示文字
      language: 'markdown', // 语言
      theme: props.theme || 'vs-dark', // 官方自带三种主题vs, hc-black, or vs-dark
      fontFamily: 'Fira Code', // 字体
      fontLigatures: true, // 启用字体连字
      automaticLayout: true, // 自适应布局
      // 代码折叠策略，使用缩进方式
      foldingStrategy: 'indentation',
      // 根据只读状态设置行高亮显示
      renderLineHighlight: props.readonly ? 'none' : 'all', // 行亮 all line none
      selectOnLineNumbers: true, // 显示行号
      // 根据只读状态决定是否显示行号
      lineNumbers: props.readonly ? 'off' : 'on', // 是否显示行号
      minimap: {
        enabled: false // 是否启用预览图
      },
      scrollbar: {
        // 滚动条设置
        verticalScrollbarSize: 6, // 垂直滚动条宽度
        horizontalScrollbarSize: 6, // 水平滚动条高度
        arrowSize: 10, // 箭头大小
        alwaysConsumeMouseWheel: false // 是否始终消费鼠标滚轮事件
      },
      readOnly: props.readonly, // 只读
      fontSize: 16, // 字体大小
      scrollBeyondLastLine: true, // 取消代码后面一大段空白
      overviewRulerBorder: false, // 不要滚动条的边框
      tabSize: 2, // 缩进大小
      colorDecorators: true, // 呈现内联色彩装饰器和颜色选择器
      wordWrap: 'on', // 超出一屏自动换行
      links: false, // 禁止链接检测，避免鼠标点击开启子窗口
      folding: true, // 是否启用代码折叠
      foldingHighlight: true // 折叠时是否高亮
    });
  }

  // // 注册自定义主题
  // monaco?.editor?.defineTheme('beauty', beauty(props?.editorBgColor) as any);

  // // 注册自定义格式化规则
  // registerDocumentFormatInfo(monaco);

  // 监听值的变化
  editor.onDidChangeModelContent(() => {
    if (props.isCodeEdit) {
      content.value = editor?.getValue() || '';
    } else {
      console.log('监听值变化', editor?.getValue());
      // createStore.createInfo.content = editor?.getValue();
    }
    props?.getCodeContent?.(editor?.getValue() as string);
  });

  // 监听鼠标点击事件，在默认浏览器中打开链接
  editor.onMouseDown((e) => {
    const isCommandClick = e.event.metaKey || e.event.ctrlKey;
    if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT && isCommandClick) {
      const model = editor?.getModel();
      const position = e.target.position;
      // 使用Monaco内置的链接检测
      const lineContent = model?.getLineContent(position.lineNumber);
      // 使用正则表达式检测URL
      const urlRegex = /https?:\/\/[^\s]+/g;
      const urls = lineContent?.match(urlRegex);
      if (urls) {
        // 检查点击位置是否在URL上
        const startIndex = lineContent?.indexOf(urls[0]) as number;
        const endIndex = startIndex + urls[0].length;
        // if (position.column - 1 >= startIndex && position.column - 1 <= endIndex) {
        // }
      }
    }
  });

  // 监听编辑器回车事件
  editor?.onKeyDown((e) => {
    if (e.keyCode === monaco.KeyCode.Enter) {
      const position = editor?.getPosition();
      const maxColumn = editor?.getModel()?.getLineMaxColumn(position!.lineNumber);
      const target = e.target as HTMLInputElement;
      if (position!.column === maxColumn && e.keyCode === monaco.KeyCode.Enter) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          props?.onEnter?.(editor?.getValue() || target.value);
        }, 500);
      }
    }
  });

  return editor;
};

// 设置主题颜色
const setTheme = (type: string) => {
  emit('update:theme', type);
  // 定义一个主题
  monaco.editor.setTheme(type);
};

// 切换语言
const onChangeLanguage = (value: string) => {
  language.value = value;
  monaco.editor.setModelLanguage(editor?.getModel()!, value);
  props?.getLanguage?.(value);
};

// 切换主题
const onSelectTheme = (type: string) => {
  setTheme(type);
};

// 切换编辑器类型
const onChangeEditor = () => {
  editor?.getModel()?.setValue('');
  // editor?.getModel()?.setValue(createStore.createInfo.content || '');
  props?.onChangeEditor?.();
};

// 清空编辑
const onClear = () => {
  props.onClear?.();
  editor?.getModel()?.setValue('');
};

// 保存
const onPublish = () => {
  if (!props.code?.trim()) {
    // if (!createStore?.createInfo?.content?.trim()) {
    // message({
    //   title: '嘿！一个字都没写休想发布',
    //   message: '请先编写文章内容后再尝试发布！',
    //   type: 'warning'
    // });
    return;
  }
  props.onPublish?.();
};

// 保存草稿
const onSaveDraft = () => {
  if (!props.code?.trim()) {
    // if (!createStore?.createInfo?.content?.trim()) {
    // message({
    //   title: '嘿！一个字都没写休想发布',
    //   message: '请先编写文章内容后再尝试发布！',
    //   type: 'warning'
    // });
    return;
  }
  props.onSaveDraft?.(editor as any);
};

// 预览
// const onPreviewDraft = () => {
//   if (!createStore?.draftArticleId) return;
//   props?.toPreview?.(createStore?.draftArticleId);
// };

// 显示快捷键提示弹窗
const onShowInfo = () => {
  visible.value = true;
};

// 显示变更内容
const onDiffValue = () => {
  showDiff.value = !showDiff.value;
};
</script>
