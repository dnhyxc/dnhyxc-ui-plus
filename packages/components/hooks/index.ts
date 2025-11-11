import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export interface WrapRef extends HTMLElement {
  wrapRef: HTMLElement;
}

// 监听滚动条事件hooks
export const useScroller = (scroll?: (e: MouseEvent) => void) => {
  const scrollRef = ref<HTMLElement | null>(null);
  const scrollTop = ref<number>(0);

  onMounted(() => {
    // 监听滚动条滚动事件
    (scrollRef.value as WrapRef)?.wrapRef?.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    // 卸载滚动条滚动事件
    (scrollRef.value as WrapRef)?.removeEventListener('scroll', onScroll);
  });

  // 滚动事件
  const onScroll = (e: Event) => {
    scrollTop.value = (e.target as HTMLElement).scrollTop;
    scroll?.(e as MouseEvent);
  };

  return { scrollRef, scrollTop };
};

// 滚动到某位置
export const scrollTo = (ref: Ref<HTMLElement>, position: number, time = 20, type = 'top') => {
  // el-scrollbar 容器
  const el = (ref.value as WrapRef)?.wrapRef as HTMLDivElement;
  // 使用requestAnimationFrame，如果没有则使用setTimeOut
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      return setTimeout(callback, time);
    };
  }
  // 获取当前元素滚动的距离
  let scrollTopDistance = (type === 'top' ? el?.scrollTop : el?.scrollLeft) || 0;
  const smoothScroll = () => {
    // 如果你要滚到顶部，那么position传过来的就是0，下面这个distance肯定就是负值。
    const distance = position - scrollTopDistance;
    // 每次滚动的距离要不一样，制造一个缓冲效果
    scrollTopDistance = scrollTopDistance + distance / 5;
    // 判断条件
    if (Math.abs(distance) < 1) {
      if (type === 'top') {
        el.scrollTop = position;
      } else {
        el.scrollLeft = position;
      }
    } else {
      if (type === 'top') {
        el.scrollTop = scrollTopDistance;
      } else {
        el.scrollLeft = scrollTopDistance;
      }
      requestAnimationFrame(smoothScroll);
    }
  };
  requestAnimationFrame(smoothScroll);
};

export const useScrollTo = () => {
  return scrollTo;
};
