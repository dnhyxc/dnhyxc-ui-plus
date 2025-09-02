<!--
 * 
 * @author: dnhyxc
 * @since: 2025-09-02
 * index.vue
-->
<template>
  <div ref="homeRef" class="home">
    <div class="left">
      <div class="title">
        <span class="name">dnhyxc-ui-plus</span>
        <span class="text">dnhyxc-ui-plus 组件库</span>
      </div>
      <div class="tagline">基于 Vue3 + TypeScript + Element Plus 的组件库</div>
      <div class="actions">
        <a href="/guide/installation" class="button installation">快速开始</a>
        <a href="/components/button" class="button components">组件</a>
      </div>
    </div>
    <div class="right">
      <div ref="rotateRef" class="image">
        <n-icon name="sea" size="180" style="margin-top: -25px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

defineOptions({
  name: 'home'
});

const homeRef = ref<HTMLElement>();
const rotateRef = ref<HTMLElement>();

let VPContent: HTMLElement | null = null;

// 监听鼠标移动事件
const handleMouseMove = (e: MouseEvent) => {
  if (!rotateRef.value) return;

  // 获取元素的位置和尺寸信息
  const rect = rotateRef.value.getBoundingClientRect();

  // 计算鼠标相对元素中心点的位置
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;

  // 计算旋转角度（将鼠标移动距离转换为合适的旋转角度）
  const rotateX = (mouseY / rect.height) * 8;
  const rotateY = -(mouseX / rect.width) * 8;
  // 设置transform
  // 设置3D变换效果:
  // perspective(800px): 设置3D透视效果,值越大透视感越弱
  // rotateX/Y: 根据鼠标位置计算X轴和Y轴的旋转角度
  rotateRef.value.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

// 添加和移除事件监听
// 鼠标移入时添加旋转效果
const handleMouseEnter = () => {
  if (!homeRef.value) return;
  homeRef.value.addEventListener('mousemove', handleMouseMove);
};

// 鼠标移出时移除旋转效果并重置transform
const handleMouseLeave = () => {
  if (!homeRef.value || !rotateRef.value) return;
  homeRef.value.removeEventListener('mousemove', handleMouseMove);
  rotateRef.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
};

onMounted(() => {
  VPContent = document.querySelector('#VPContent');
  nextTick(() => {
    if (!VPContent) return;
    VPContent.addEventListener('mouseenter', handleMouseEnter);
    VPContent.addEventListener('mouseleave', handleMouseLeave);
  });
});

onUnmounted(() => {
  if (!VPContent) return;
  VPContent.removeEventListener('mouseenter', handleMouseEnter);
  VPContent.removeEventListener('mouseleave', handleMouseLeave);
});
</script>

<style scoped lang="scss">
.home {
  display: flex;
  height: calc(100vh - 220px);
  padding-top: 100px;

  .left {
    padding-top: 30px;
    margin-left: 85px;

    .title {
      display: flex;
      flex-direction: column;

      .name {
        width: fit-content;
        font-weight: 700;
        line-height: 64px;
        font-size: 56px;
        margin-bottom: 15px;
        background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .text {
        width: fit-content;
        font-weight: 700;
        line-height: 64px;
        font-size: 50px;
        margin-bottom: 20px;
      }
    }

    .tagline {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 40px;
      color: #98989f;
    }

    .actions {
      .button {
        display: inline-block;
        text-decoration: none;
        cursor: pointer;
        background-color: var(--vp-c-brand-3);
        border-radius: 8px;
        padding: 0 20px;
        line-height: 38px;
        font-size: 14px;
        border-color: var(--vp-button-brand-border);
        color: var(--vp-button-brand-text);
        background-color: var(--vp-button-brand-bg);
        margin-right: 15px;

        &:hover {
          border-color: var(--vp-button-brand-hover-border);
          color: var(--vp-button-brand-hover-text);
          background-color: var(--vp-button-brand-hover-bg);
        }
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
    margin-bottom: 38px;

    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background:
        linear-gradient(225deg, #ffffff 0%, #a8b1ff 50%, #8490ff 100%),
        linear-gradient(45deg, #a8b1ff 0%, #8490ff 50%, #6b79ff 100%);
      box-shadow:
        inset -10px -10px 20px rgba(0, 0, 0, 0.3),
        inset 50px 50px 50px rgba(255, 255, 255, 0.9),
        10px 10px 20px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
