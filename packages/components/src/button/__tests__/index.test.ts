// ButtonComponent.test.js
import { mount } from '@vue/test-utils';
import ButtonComponent from '../index.vue';
import { describe, it, expect } from 'vitest'; // Vitest 的测试函数
import * as Components from '../index'; // 导入 index.ts 中导出的所有组件

// 使用 describe 来分组相关的测试用例

// index.vue
describe('Button Component', () => {
  // 测试组件是否正确渲染默认插槽内容
  it('renders correctly with default slot content', () => {
    // 挂载组件
    const wrapper = mount(ButtonComponent);
    // 断言按钮文本是否为默认内容
    expect(wrapper.text()).toBe('测试按钮');
  });

  // // 测试组件是否正确渲染自定义插槽内容
  // it('renders correctly with custom slot content', () => {
  //   // 挂载组件，并传入自定义插槽内容
  //   const wrapper = mount(ButtonComponent, {
  //     slots: {
  //       default: 'Click Me' // 自定义插槽内容
  //     }
  //   });
  //   // 断言按钮文本是否为自定义内容
  //   expect(wrapper.text()).toBe('Click Me');
  // });

  // // 测试传递 disabled 属性为 true 时，button 是否被禁用
  // it('sets the disabled attribute when disabled prop is true', () => {
  //   const wrapper = mount(ButtonComponent, {
  //     props: {
  //       disabled: true // 禁用 button
  //     }
  //   });
  //   const button = wrapper.find('button');
  //   // 使用 DOM 属性进行断言
  //   expect(button.element.disabled).toBe(true);
  // });

  // // 测试传递 disabled 属性为 false 时，button 是否未被禁用
  // it('does not set the disabled attribute when disabled prop is false', () => {
  //   // 挂载组件，并传入 disabled 属性为 false
  //   const wrapper = mount(ButtonComponent, {
  //     props: {
  //       disabled: false // 不禁用 button
  //     }
  //   });
  //   // 断言 button 元素不应存在 disabled 属性
  //   expect(wrapper.attributes('disabled')).toBeUndefined();
  // });

  // // 测试当 button 未禁用时，点击是否会触发 click 事件
  // it('emits click event when clicked and not disabled', async () => {
  //   // 挂载组件，并确保 disabled 为 false
  //   const wrapper = mount(ButtonComponent, {
  //     props: {
  //       disabled: false // 确保 button 未被禁用
  //     }
  //   });
  //   // 触发点击事件
  //   await wrapper.trigger('click');
  //   // 断言组件是否发出了 click 事件
  //   expect(wrapper.emitted()).toHaveProperty('click');
  //   // 断言 click 事件触发的次数是否为 1 次
  //   expect(wrapper.emitted('click')?.length).toBe(1);
  // });

  // // 测试当 button 被禁用时，点击是否不会触发 click 事件
  // it('does not emit click event when disabled', async () => {
  //   // 挂载组件，并传入 disabled 属性为 true
  //   const wrapper = mount(ButtonComponent, {
  //     props: {
  //       disabled: true // 禁用 button
  //     }
  //   });
  //   // 触发点击事件
  //   await wrapper.trigger('click');
  //   // 断言组件未发出 click 事件
  //   expect(wrapper.emitted('click')).toBeUndefined();
  // });
});

// index.ts
describe('Components Entry Point', () => {
  // 测试 Button 组件是否被正确导出
  it('should export Button component', () => {
    // 断言 Components 对象中是否存在 Button
    expect(Components.Button).toBeDefined();
    // 断言 Button 是否具有 install 方法（由 withInstall 添加）
    expect(typeof Components.Button.install).toBe('function');
  });
});
