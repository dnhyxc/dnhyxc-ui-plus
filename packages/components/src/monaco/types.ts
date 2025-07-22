import { type ExtractPropTypes, type PropType } from 'vue';
import * as monaco from 'monaco-editor';
import type Monaco from './index.vue';
export const monacoProps = {
  editType: Boolean,
  editorBgColor: String,
  onChangeEditor: Function as PropType<(value?: string) => void>,
  onPublish: Function as PropType<(value?: string) => void>,
  onClear: Function as PropType<() => void>,
  onShowDraft: Function as PropType<() => void>,
  toPreview: Function as PropType<(id: string) => void>,
  saveLoading: Boolean,
  onSaveDraft: Function as PropType<(editor: monaco.editor.IStandaloneCodeEditor) => void>,
  // onSaveDraft?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  isCodeEdit: Boolean,
  readonly: Boolean,
  code: String, // 传入的code内容
  theme: String,
  getLanguage: Function as PropType<(language: string) => void>,
  getCodeContent: Function as PropType<(code: string) => void>,
  getMonacoEditor: Function as PropType<
    (
      editor: monaco.editor.IStandaloneCodeEditor,
      onChangeLanguage: (language: string) => void,
      setTheme: (theme: string) => void
    ) => void
  >,
  onEnter: Function as PropType<(code: string) => void>,
  saveText: String,
  language: String,
  languages: Array as PropType<string[]>,
  showDot: Number,
  prevContent: String,
  shortcutKeys: Array as PropType<{ name: string; desc: string }[]>,
  shortcutPos: Number
} as const;

export type MonacoProps = ExtractPropTypes<typeof monacoProps>;

export type MonacoInstance = InstanceType<typeof Monaco> & unknown;

declare module 'vue' {
  export interface GlobalComponents {
    NMonaco: typeof Monaco;
  }
}
