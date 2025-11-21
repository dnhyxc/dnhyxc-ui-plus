<template>
  <section ref="loadingRef" :class="bem.b()">
    <div
      v-for="i in dots"
      :key="i"
      class="dot"
      :style="`width: ${dotSize}; height: ${dotSize}; margin-right: ${dotRight}`"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { createNamespace } from '../../utils';
import { LoadingOptions } from './types';
import './style/index.scss';

const bem = createNamespace('loading');

defineOptions({
  name: 'n-loading'
});

const props = withDefaults(defineProps<LoadingOptions>(), {
  dots: 5,
  dotSize: '10px',
  dotRight: '15px',
  dotBgColor0: '',
  dotBgColor50: '',
  dotBgColor100: '',
  dotShadowColor0: '',
  dotShadowColor50: '',
  dotShadowColor100: '',
  dotBgColor: '',
  dotShadowColor: '',
  percent: 20
});

const loadingRef = ref<HTMLElement | null>(null);

// 更改 css 变量
const changeCssVariable = (variable: string, value: string) => {
  if (loadingRef.value) {
    loadingRef.value.style.setProperty(variable, value);
  }
};

onMounted(() => {
  nextTick(() => {
    // 计算并设置 CSS 变量
    const setColorVar = (key: string, val?: string) => val && changeCssVariable(key, val);

    if (props.dotBgColor && props.dotShadowColor) {
      const light = lightenColor(props.dotBgColor);
      const dark = darkenColor(props.dotBgColor);
      const shadowLight = lightenColor(props.dotShadowColor);
      const shadowDark = darkenColor(props.dotShadowColor);
      setColorVar('--loading-bg-color-0', light);
      setColorVar('--loading-bg-color-50', props.dotBgColor);
      setColorVar('--loading-bg-color-100', dark);
      setColorVar('--loading-shadow-color-0', shadowLight);
      setColorVar('--loading-shadow-color-50', props.dotShadowColor);
      setColorVar('--loading-shadow-color-100', shadowDark);
    }

    if (!props.dotBgColor && !props.dotShadowColor) {
      setCssVar();
    }
  });
});

// 颜色计算函数
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

// 解析 rgb/rgba 字符串
function parseRgba(color: string) {
  const rgba = color.trim();
  const reg = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([\d.]+))?\)$/;
  const match = rgba.match(reg);
  if (!match) return null;
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1
  };
}

// 统一将输入颜色转为 {r,g,b,a} 对象
function colorToRgba(color: string) {
  // 如果是 hex
  if (color.startsWith('#')) {
    const rgb = hexToRgb(color);
    return rgb ? { ...rgb, a: 1 } : null;
  }
  // 如果是 rgb 或 rgba
  if (color.startsWith('rgb')) {
    return parseRgba(color);
  }
  return null;
}

function rgbaToString(rgba: { r: number; g: number; b: number; a?: number }) {
  const { r, g, b, a = 1 } = rgba;
  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function lightenColor(color: string, percent: number = props.percent) {
  const rgba = colorToRgba(color);
  if (!rgba) return color;
  const { r, g, b, a } = rgba;
  const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  // 返回与输入格式一致的形式：hex 输入返回 hex，rgb/rgba 输入返回 rgb/rgba
  if (color.startsWith('#')) {
    return rgbToHex(newR, newG, newB);
  }
  return rgbaToString({ r: newR, g: newG, b: newB, a });
}

function darkenColor(color: string, percent: number = props.percent) {
  const rgba = colorToRgba(color);
  if (!rgba) return color;
  const { r, g, b, a } = rgba;
  const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
  const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
  const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));
  if (color.startsWith('#')) {
    return rgbToHex(newR, newG, newB);
  }
  return rgbaToString({ r: newR, g: newG, b: newB, a });
}

// 批量设置 CSS 变量
const setCssVar = () => {
  const cssVarMap: Record<string, string> = {
    '--loading-bg-color-0': props.dotBgColor0,
    '--loading-bg-color-50': props.dotBgColor50,
    '--loading-bg-color-100': props.dotBgColor100,
    '--loading-shadow-color-0': props.dotShadowColor0,
    '--loading-shadow-color-50': props.dotShadowColor50,
    '--loading-shadow-color-100': props.dotShadowColor100
  };
  Object.entries(cssVarMap).forEach(([key, val]) => {
    if (val) changeCssVariable(key, val);
  });
};
</script>
