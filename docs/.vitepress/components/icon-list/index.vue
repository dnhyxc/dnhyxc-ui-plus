<template>
  <div class="icon-content">
    <div class="copy-type">
      <el-switch
        v-model="copyType"
        active-text="复制 Icon 元素"
        active-value="element"
        inactive-text="复制 SVG 内容"
        inactive-value="svg"
        @change="onChange"
      />
      <el-input
        v-model="searchValue"
        size="large"
        placeholder="请输入图标名称进行搜索"
        class="input"
        @input="onSearch"
      />
    </div>
    <div v-for="(item, index) in filterIcons" :key="index" class="icon-list">
      <div v-if="item.items.length" class="icon-type">{{ item.name }}</div>
      <div class="icon-item">
        <div v-for="icon in item.items" class="icon" @click="onCopy(icon)">
          <n-icon ref="nIconRef" :name="icon" size="30" />
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { icons } from './icons';

defineOptions({
  name: 'icon-list'
});

const nIconRef = ref<HTMLElement>();
const copyType = ref('element');
const searchValue = ref('');
const filterIcons = ref(icons);

const onChange = (value: string) => {
  copyType.value = value;
};

const onSearch = (value: string) => {
  const newIcons = icons.map((item) => {
    const newItems = item.items.filter((icon) => icon.includes(value));
    return {
      ...item,
      items: newItems
    };
  });
  filterIcons.value = newIcons;
};

const onCopy = async (icon: string) => {
  const svg = nIconRef.value?.[0]?.getSvg?.(icon);
  const iconNode = copyType.value === 'element' ? `<n-icon name="${icon}" />` : svg;
  try {
    await navigator.clipboard.writeText(iconNode);
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    ElMessage({
      showClose: true,
      message: '复制失败',
      type: 'error'
    });
    return;
  }
  ElMessage({
    showClose: true,
    message: '复制成功',
    type: 'success'
  });
};
</script>

<style lang="scss" scoped>
.icon-content {
  .copy-type {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;

    .input {
      margin-top: 10px;
    }
  }

  .icon-list {
    .icon-type {
      font-size: 18px;
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .icon-item {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      // border-top: 1px solid var(--vp-c-divider);
      // border-left: 1px solid var(--vp-c-divider);

      .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--vp-c-divider);
        border-right: 1px solid var(--vp-c-divider);
        height: 90px;
        cursor: pointer;

        /* 为第一排icon添加上边框 */
        &:nth-child(-n + 5) {
          border-top: 1px solid var(--vp-c-divider);
        }

        /* 为第一列icon添加左边框 */
        &:nth-child(5n + 1) {
          border-left: 1px solid var(--vp-c-divider);
        }

        &:hover {
          background-color: var(--vp-code-bg);
        }

        &:nth-child(6n) {
          border-right: 1px solid var(--vp-c-divider);
        }

        .icon-name {
          margin-top: 10px;
          color: var(--vp-c-text-1);
          font-size: 14px;
        }
      }
    }
  }
}
</style>
