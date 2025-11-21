<!--
 * 表情组件
 * @author: dnhyxc
 * @since: 2023-07-27 10:30:00
 * index.vue
-->
<template>
  <div v-if="show" :id="id" :class="className">
    <div id="_EMOJI_" class="emoji-list" :style="styles">
      <div v-for="value in emojiNameList" id="EMOJI_ITEM" :key="value" class="emoji-item" @click="onSelect(value)">
        <img :id="value" :src="EMOJI_MAP[value as keyof typeof EMOJI_MAP]" :alt="value" class="emoji" />
      </div>
    </div>
    <div v-if="initShowEmojiCount && initShowEmojiCount <= emojiName.length" class="show-more" @click="showMore">
      {{ showMoreEmoji ? 'close more' : 'show more' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue';
import { createNamespace } from '../../utils';
import { EMOJI_MAP, EMOJI_NAME } from './constant';
import { EmojiProps, EmojiName } from './types';
import './style/index.scss';

const bem = createNamespace('emoji');

defineOptions({
  name: 'n-emoji'
});

const props = withDefaults(defineProps<EmojiProps>(), {
  visible: true,
  id: 'EMOJI_LIST'
});

const className = [bem.b(), props.className].filter(Boolean).join(' ');

const emit = defineEmits(['update:visible']);

const showMoreEmoji = ref(false);

const emojiName = computed(() => {
  // 优先使用 includeEmoji，如果有则直接返回
  if (props.includeEmoji?.length) {
    return props.includeEmoji;
  }
  // 处理 excludeEmoji 的情况
  const baseEmoji = EMOJI_NAME;
  if (props.excludeEmoji?.length) {
    return baseEmoji.filter((item) => !props.excludeEmoji?.includes(item));
  }

  return baseEmoji;
});

const emojiNameList = computed(() => {
  const { initShowEmojiCount } = props;
  let emojiInitCount = initShowEmojiCount;
  if (initShowEmojiCount && initShowEmojiCount > EMOJI_NAME.length) {
    emojiInitCount = emojiName.value.length;
  }
  if (showMoreEmoji.value) {
    return emojiName.value;
  } else {
    return emojiName.value.slice(0, emojiInitCount);
  }
});

const show = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit('update:visible', visible);
  }
});

const styles = computed<CSSProperties>(() => {
  const { col, gap } = props;
  if (!col && !gap) return {};
  return {
    ...(col ? { 'grid-template-columns': `repeat(${col}, 1fr)` } : {}),
    ...(gap ? { gap: gap + 'px' } : {})
  };
});

const showMore = () => {
  if (emojiNameList.value.length === emojiName.value.length) {
    showMoreEmoji.value = false;
  } else {
    showMoreEmoji.value = true;
  }
};

// 选择表情
const onSelect = (key: EmojiName) => {
  props.onSelect?.(key);
};
</script>
