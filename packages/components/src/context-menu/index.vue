<!--
 * 右键菜单
 * @author: dnhyxc
 * @since: 2023-10-30
 * index.vue
-->
<template>
  <div ref="contextMenuRef">
    <slot></slot>
    <Teleport to="body">
      <div
        v-if="showMenu"
        :class="bem.b()"
        :style="{
          left: pos.posX + 'px',
          top: pos.posY + 'px'
        }"
      >
        <div v-ob-size="onSizeChange" class="menu-list">
          <div v-for="item in menu" :key="item.label" class="menu-item" @click="onSelect(item)">
            {{ item.label }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref, type DirectiveBinding } from 'vue';
import { useContextMenu, useViewPort } from '../../hooks';
import { createNamespace } from '../../utils';
import { ContextMenuOptions } from './types';
import './style/index.scss';

const bem = createNamespace('context-menu');

defineOptions({
  name: 'n-context-menu'
});

const props = defineProps<ContextMenuOptions>();

const emit = defineEmits(['select']);

const contextMenuRef = ref<HTMLElement | null>(null);
const w = ref<number>(0);
const h = ref<number>(0);

const { x, y, showMenu } = useContextMenu(contextMenuRef as Ref<HTMLElement>, props?.noMenu);
const { vw, vh } = useViewPort();

const pos = computed(() => {
  let posX = x.value;
  let posY = y.value;

  if (x.value > vw.value - w.value) {
    posX = x.value - w.value;
  }

  if (y.value > vh.value - h.value) {
    posY = vh.value - h.value;
  }

  return {
    posX,
    posY
  };
});

const onSelect = (item: { label: string; value: any }) => {
  // 选中菜单后关闭菜单
  showMenu.value = false;
  // 并返回选中的菜单
  emit('select', item, contextMenuRef.value);
};

const onSizeChange = (size: { width: number; height: number }) => {
  w.value = size.width;
  h.value = size.height;
};

// 局部注册自定义指令：v-ob-size
const vObSize = {
  mounted(observeNode: HTMLElement, binding: DirectiveBinding) {
    const map = new WeakMap();
    (observeNode as any).ob = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const handler = map.get(entry.target);
        if (handler) {
          const box = entry.borderBoxSize[0];
          handler({
            width: box.inlineSize,
            height: box.blockSize
          });
        }
      }
    });
    (observeNode as any)?.ob?.observe(observeNode);
    map.set(observeNode, binding.value);
  },
  beforeUnmount(observeNode: HTMLElement) {
    (observeNode as any)?.ob?.unobserve(observeNode);
  }
};
</script>
