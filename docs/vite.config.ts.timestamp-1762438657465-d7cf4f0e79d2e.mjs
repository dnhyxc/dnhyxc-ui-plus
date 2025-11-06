// vite.config.ts
import { defineConfig } from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/vite@7.0.4_@types+node@24.0.13_jiti@2.4.2_sass@1.89.2_tsx@4.20.6_yaml@2.8.0/node_modules/vite/dist/node/index.js";
import { viteDemoPreviewPlugin } from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/@vitepress-code-preview+plugin@1.0.6/node_modules/@vitepress-code-preview/plugin/dist/index.js";
import AutoImport from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/unplugin-auto-import@19.3.0_@vueuse+core@12.8.2_typescript@5.8.3_/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/unplugin-vue-components@28.8.0_@babel+parser@7.28.0_vue@3.5.17_typescript@5.8.3_/node_modules/unplugin-vue-components/dist/vite.js";
import ElementPlus from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/unplugin-element-plus@0.10.0/node_modules/unplugin-element-plus/dist/vite.js";
import { ElementPlusResolver } from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/unplugin-vue-components@28.8.0_@babel+parser@7.28.0_vue@3.5.17_typescript@5.8.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { groupIconVitePlugin } from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/vitepress-plugin-group-icons@1.6.1_markdown-it@14.1.0_vite@5.4.19_@types+node@24.0.13_sass@1.89.2_/node_modules/vitepress-plugin-group-icons/dist/index.js";
var vite_config_default = defineConfig({
  base: "/",
  // 线上打包路径改为绝对路径，防止打包后，资源文件路径出现上述错误
  // 为了解决打包 element-plus css 无法处理而报错问题的问题，需要添加以下 ssr 配置
  ssr: {
    noExternal: ["element-plus", "@dnhyxc-ui/components"]
  },
  plugins: [
    viteDemoPreviewPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    ElementPlus({}),
    groupIconVitePlugin()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZG5oeXhjL0RvY3VtZW50cy9jb2RlL2RuaHl4Yy11aS1wbHVzL2RvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kbmh5eGMvRG9jdW1lbnRzL2NvZGUvZG5oeXhjLXVpLXBsdXMvZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZG5oeXhjL0RvY3VtZW50cy9jb2RlL2RuaHl4Yy11aS1wbHVzL2RvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgdml0ZURlbW9QcmV2aWV3UGx1Z2luIH0gZnJvbSAnQHZpdGVwcmVzcy1jb2RlLXByZXZpZXcvcGx1Z2luJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgRWxlbWVudFBsdXMgZnJvbSAndW5wbHVnaW4tZWxlbWVudC1wbHVzL3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgeyBncm91cEljb25WaXRlUGx1Z2luIH0gZnJvbSAndml0ZXByZXNzLXBsdWdpbi1ncm91cC1pY29ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcvJywgLy8gXHU3RUJGXHU0RTBBXHU2MjUzXHU1MzA1XHU4REVGXHU1Rjg0XHU2NTM5XHU0RTNBXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHVGRjBDXHU5NjMyXHU2QjYyXHU2MjUzXHU1MzA1XHU1NDBFXHVGRjBDXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHU1MUZBXHU3M0IwXHU0RTBBXHU4RkYwXHU5NTE5XHU4QkVGXG4gIC8vIFx1NEUzQVx1NEU4Nlx1ODlFM1x1NTFCM1x1NjI1M1x1NTMwNSBlbGVtZW50LXBsdXMgY3NzIFx1NjVFMFx1NkNENVx1NTkwNFx1NzQwNlx1ODAwQ1x1NjJBNVx1OTUxOVx1OTVFRVx1OTg5OFx1NzY4NFx1OTVFRVx1OTg5OFx1RkYwQ1x1OTcwMFx1ODk4MVx1NkRGQlx1NTJBMFx1NEVFNVx1NEUwQiBzc3IgXHU5MTREXHU3RjZFXG4gIHNzcjoge1xuICAgIG5vRXh0ZXJuYWw6IFsnZWxlbWVudC1wbHVzJywgJ0Bkbmh5eGMtdWkvY29tcG9uZW50cyddXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2aXRlRGVtb1ByZXZpZXdQbHVnaW4oKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICB9KSxcbiAgICBFbGVtZW50UGx1cyh7fSksXG4gICAgZ3JvdXBJY29uVml0ZVBsdWdpbigpIGFzIFBsdWdpblxuICBdXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsU0FBUyxvQkFBNEI7QUFDdlcsU0FBUyw2QkFBNkI7QUFDdEMsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUywyQkFBMkI7QUFDcEMsU0FBUywyQkFBMkI7QUFFcEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBO0FBQUE7QUFBQSxFQUVOLEtBQUs7QUFBQSxJQUNILFlBQVksQ0FBQyxnQkFBZ0IsdUJBQXVCO0FBQUEsRUFDdEQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLHNCQUFzQjtBQUFBLElBQ3RCLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELFlBQVksQ0FBQyxDQUFDO0FBQUEsSUFDZCxvQkFBb0I7QUFBQSxFQUN0QjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
