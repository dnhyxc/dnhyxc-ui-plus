import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Emoji from '../../emoji';

describe('Emoji Component', () => {
  // 测试基础渲染
  it('should render correctly when visible is true', () => {
    const wrapper = mount(Emoji, {
      visible: true
    });

    expect(wrapper.find('.n-emoji').exists()).toBe(true);
  });

  // it('should not render when visible is false', () => {
  //   const wrapper = mount(Emoji, {
  //     visible: false
  //   });

  //   expect(wrapper.find('.n-emoji').exists()).toBe(false);
  // });

  // // 测试默认表情列表渲染
  // it('should render all emoji items by default', () => {
  //   const wrapper = mount(Emoji);
  //   const emojiItems = wrapper.findAll('#EMOJI_ITEM');

  //   expect(emojiItems.length).toBe(EMOJI_NAME.length);
  // });

  // // 测试 includeEmoji 属性
  // it('should only render included emojis when includeEmoji is provided', () => {
  //   const includeList = EMOJI_NAME.slice(0, 5);
  //   const wrapper = mount(Emoji, {
  //     includeEmoji: includeList
  //   });

  //   const emojiItems = wrapper.findAll('#EMOJI_ITEM');
  //   expect(emojiItems.length).toBe(includeList.length);
  // });

  // // 测试 excludeEmoji 属性
  // it('should exclude specified emojis when excludeEmoji is provided', () => {
  //   const excludeList = EMOJI_NAME.slice(0, 3);
  //   const wrapper = mount(Emoji, {
  //     excludeEmoji: excludeList
  //   });

  //   const emojiItems = wrapper.findAll('#EMOJI_ITEM');
  //   expect(emojiItems.length).toBe(EMOJI_NAME.length - excludeList.length);
  // });

  // // 测试 initShowEmojiCount 属性
  // it('should only show initShowEmojiCount emojis initially', () => {
  //   const count = 5;
  //   const wrapper = mount(Emoji, {
  //     initShowEmojiCount: count
  //   });

  //   const emojiItems = wrapper.findAll('#EMOJI_ITEM');
  //   expect(emojiItems.length).toBe(count);
  // });

  // // 测试 show more 功能
  // it('should show all emojis when show more is clicked', async () => {
  //   const count = 5;
  //   const wrapper = mount(Emoji, {
  //     initShowEmojiCount: count
  //   });

  //   // 初始应该只显示count个表情
  //   expect(wrapper.findAll('#EMOJI_ITEM').length).toBe(count);

  //   // 点击show more
  //   await wrapper.find('.show-more').trigger('click');

  //   // 应该显示所有表情
  //   expect(wrapper.findAll('#EMOJI_ITEM').length).toBe(EMOJI_NAME.length);
  // });

  // // 测试 grid 样式
  // it('should apply grid styles when col and gap props are provided', () => {
  //   const wrapper = mount(Emoji, {
  //     col: 5,
  //     gap: 10
  //   });

  //   const emojiList = wrapper.find('.emoji-list');
  //   const style = emojiList.attributes('style');

  //   expect(style).toContain('grid-template-columns: repeat(5, 1fr)');
  //   expect(style).toContain('gap: 10px');
  // });

  // // 测试表情选择事件
  // it('should emit select event when an emoji is clicked', async () => {
  //   const onSelect = vi.fn();
  //   const wrapper = mount(Emoji, {
  //     onSelect
  //   });

  //   // 点击第一个表情
  //   await wrapper.find('#EMOJI_ITEM').trigger('click');

  //   expect(onSelect).toHaveBeenCalled();
  //   // 检查是否传递了正确的参数
  //   expect(onSelect.mock.calls[0][0]).toBe(EMOJI_NAME[0]);
  // });

  // // 测试 className 属性
  // it('should apply custom className when provided', () => {
  //   const customClass = 'custom-emoji-class';
  //   const wrapper = mount(Emoji, {
  //     className: customClass
  //   });

  //   expect(wrapper.find('n-emoji').classes()).toContain(customClass);
  // });

  // // 测试 visible 双向绑定
  // it('should update visible when show is changed', async () => {
  //   const wrapper = mount(Emoji, {
  //     visible: true,
  //     'onUpdate:visible': (visible: boolean) => {
  //       wrapper.setProps({ visible });
  //     }
  //   });

  //   // 隐藏组件
  //   await wrapper.setProps({ visible: false });
  //   expect(wrapper.find('.n-emoji').exists()).toBe(false);
  // });
});
