## 改变组件默认样式

如果需要改变某个组件的默认样式，可以通过覆盖对于组件的某个变量来实现，如希望修改 Image 组件的某些默认样式，其中需要注意的是，修改的默认样式需要写在对应组件的最外部元素的类名下，如 Image 组件的默认样式需要写在 `.n-image` 类名下，Icon 组件的默认样式需要写在 `.n-icon` 类名下。

```vue [image.vue]
<style lang="scss" scoped>
.n-image {
  // 默认样式，可以通过修改默认样式来修改组件的样式
  // --image-object-position: top left;
  // --image-hover-object-position: bottom right;
  // --image-empty-bg: #f5f7fa;
  // --image-object-fit: cover;
  // --image-transition: all 0.3s ease-in-out;
  // --image-loading-bg: #f5f7fa;
  // --image-loading-text-color: #ccc;
  // --image-empty-text-color: #ccc;
  // --image-font-size: 14px; // 控制 loading、empty、加载失败的文字大小
  --image-loading-text-color: #333;
  --image-empty-text-color: #333;
  --image-empty-bg: rgb(226, 222, 222);
}
</style>
```
