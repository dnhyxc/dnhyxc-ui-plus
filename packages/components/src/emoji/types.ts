import NEmoji from './index.vue';
import { EMOJI_NAME } from './constant';

export type EmojiName = (typeof EMOJI_NAME)[number];
export type EmojiList = EmojiName[];

export type EmojiProps = Readonly<{
  onSelect: (value: EmojiName) => void;
  visible?: boolean;
  className?: string;
  col?: number; // 每一行的列数，即一行放几个，默认是10个
  gap?: number; // 每一列的间距
  initShowEmojiCount?: number; // 初始化显示的emoji数量
  includeEmoji?: EmojiList; // 包含的emoji
  excludeEmoji?: EmojiList; // 排除的emoji
}>;

// 定义这个是为了让组件在业务中使用时，可以有组件所需的类型提示
declare module 'vue' {
  export interface GlobalComponents {
    NEmoji: typeof NEmoji;
  }
}
