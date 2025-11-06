// .vitepress/config.mts
import { defineConfig } from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/vitepress@1.6.3_@algolia+client-search@5.33.0_@types+node@24.0.13_async-validator@4.2.5_d11c90b069dec47867708a02a4c1fc79/node_modules/vitepress/dist/node/index.js";
import { demoPreviewPlugin } from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/@vitepress-code-preview+plugin@1.0.6/node_modules/@vitepress-code-preview/plugin/dist/index.js";
import { groupIconMdPlugin } from "file:///Users/dnhyxc/Documents/code/dnhyxc-ui-plus/node_modules/.pnpm/vitepress-plugin-group-icons@1.6.1_markdown-it@14.1.0_vite@5.4.19_@types+node@24.0.13_sass@1.89.2_/node_modules/vitepress-plugin-group-icons/dist/index.js";
var config_default = defineConfig({
  lang: "zh-CN",
  title: "dnhyxc-ui-plus",
  description: "Vue3 UI Component",
  // html head
  head: [
    ["link", { rel: "icon", href: "/logo.svg" }],
    ["meta", { name: "author", content: "dnhyxc" }],
    [
      "meta",
      {
        name: "keywords",
        content: "dnhyxc-ui-plus,vue3,element-plus"
      }
    ]
  ],
  themeConfig: {
    search: {
      provider: "local"
    },
    outline: {
      label: "\u9875\u9762\u5BFC\u822A"
    },
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright \xA9 2025-present dnhyxc"
    },
    sidebarMenuLabel: "\u83DC\u5355",
    returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
    darkModeSwitchLabel: "\u5916\u89C2",
    // logo 必须放在根目录下的 public 目录下，否则打包过后会找不到资源
    logo: "/logo.svg",
    sidebar: {
      "/guide/": [
        {
          text: "\u57FA\u7840",
          items: [
            { text: "\u5B89\u88C5", link: "/guide/installation" },
            { text: "\u5FEB\u901F\u4E0A\u624B", link: "/guide/quick-start" }
          ]
        },
        {
          text: "\u8FDB\u9636",
          items: [{ text: "\u66F4\u6539\u7EC4\u4EF6\u9ED8\u8BA4\u6837\u5F0F", link: "/guide/change-style" }]
        }
      ],
      "/components/": [
        {
          text: "\u57FA\u672C\u7EC4\u4EF6",
          items: [
            { text: "Button \u6309\u94AE", link: "/components/button" },
            { text: "Input \u6587\u672C\u8F93\u5165", link: "/components/input" },
            { text: "Icon \u56FE\u6807", link: "/components/icon" }
          ]
        },
        {
          text: "\u4E1A\u52A1\u7EC4\u4EF6",
          items: [
            { text: "Emoji \u8868\u60C5", link: "/components/emoji" },
            { text: "Image \u56FE\u7247", link: "/components/image" },
            { text: "ImagePreview \u56FE\u7247\u9884\u89C8", link: "/components/image-preview" },
            { text: "ImageContrast \u56FE\u7247\u5BF9\u6BD4", link: "/components/image-contrast" }
          ]
        }
      ]
    },
    nav: [
      // activeMatch 使切换到 quick-start 时 nav 指南也会高亮
      { text: "\u6307\u5357", link: "/guide/installation", activeMatch: "/guide/" },
      { text: "\u7EC4\u4EF6", link: "/components/button", activeMatch: "/components/" }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/dnhyxc/dnhyxc-ui-plus/tree/template"
      }
    ]
  },
  markdown: {
    config(md) {
      md.use(demoPreviewPlugin);
      md.use(groupIconMdPlugin);
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RuaHl4Yy9Eb2N1bWVudHMvY29kZS9kbmh5eGMtdWktcGx1cy9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kbmh5eGMvRG9jdW1lbnRzL2NvZGUvZG5oeXhjLXVpLXBsdXMvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2RuaHl4Yy9Eb2N1bWVudHMvY29kZS9kbmh5eGMtdWktcGx1cy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XG5pbXBvcnQgeyBkZW1vUHJldmlld1BsdWdpbiB9IGZyb20gJ0B2aXRlcHJlc3MtY29kZS1wcmV2aWV3L3BsdWdpbic7XG5pbXBvcnQgeyBncm91cEljb25NZFBsdWdpbiB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tZ3JvdXAtaWNvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBsYW5nOiAnemgtQ04nLFxuICB0aXRsZTogJ2RuaHl4Yy11aS1wbHVzJyxcbiAgZGVzY3JpcHRpb246ICdWdWUzIFVJIENvbXBvbmVudCcsXG4gIC8vIGh0bWwgaGVhZFxuICBoZWFkOiBbXG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJy9sb2dvLnN2ZycgfV0sXG4gICAgWydtZXRhJywgeyBuYW1lOiAnYXV0aG9yJywgY29udGVudDogJ2RuaHl4YycgfV0sXG4gICAgW1xuICAgICAgJ21ldGEnLFxuICAgICAge1xuICAgICAgICBuYW1lOiAna2V5d29yZHMnLFxuICAgICAgICBjb250ZW50OiAnZG5oeXhjLXVpLXBsdXMsdnVlMyxlbGVtZW50LXBsdXMnXG4gICAgICB9XG4gICAgXVxuICBdLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICdsb2NhbCdcbiAgICB9LFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxhYmVsOiAnXHU5ODc1XHU5NzYyXHU1QkZDXHU4MjJBJ1xuICAgIH0sXG4gICAgZG9jRm9vdGVyOiB7XG4gICAgICBwcmV2OiAnXHU0RTBBXHU0RTAwXHU5ODc1JyxcbiAgICAgIG5leHQ6ICdcdTRFMEJcdTRFMDBcdTk4NzUnXG4gICAgfSxcbiAgICBmb290ZXI6IHtcbiAgICAgIG1lc3NhZ2U6ICdSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuJyxcbiAgICAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyNS1wcmVzZW50IGRuaHl4YydcbiAgICB9LFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdcdTgzRENcdTUzNTUnLFxuICAgIHJldHVyblRvVG9wTGFiZWw6ICdcdThGRDRcdTU2REVcdTk4NzZcdTkwRTgnLFxuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6ICdcdTU5MTZcdTg5QzInLFxuICAgIC8vIGxvZ28gXHU1RkM1XHU5ODdCXHU2NTNFXHU1NzI4XHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0IHB1YmxpYyBcdTc2RUVcdTVGNTVcdTRFMEJcdUZGMENcdTU0MjZcdTUyMTlcdTYyNTNcdTUzMDVcdThGQzdcdTU0MEVcdTRGMUFcdTYyN0VcdTRFMERcdTUyMzBcdThENDRcdTZFOTBcbiAgICBsb2dvOiAnL2xvZ28uc3ZnJyxcbiAgICBzaWRlYmFyOiB7XG4gICAgICAnL2d1aWRlLyc6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTU3RkFcdTc4NDAnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTVCODlcdTg4QzUnLCBsaW5rOiAnL2d1aWRlL2luc3RhbGxhdGlvbicgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1NUZFQlx1OTAxRlx1NEUwQVx1NjI0QicsIGxpbms6ICcvZ3VpZGUvcXVpY2stc3RhcnQnIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU4RkRCXHU5NjM2JyxcbiAgICAgICAgICBpdGVtczogW3sgdGV4dDogJ1x1NjZGNFx1NjUzOVx1N0VDNFx1NEVGNlx1OUVEOFx1OEJBNFx1NjgzN1x1NUYwRicsIGxpbms6ICcvZ3VpZGUvY2hhbmdlLXN0eWxlJyB9XVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgJy9jb21wb25lbnRzLyc6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTU3RkFcdTY3MkNcdTdFQzRcdTRFRjYnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdCdXR0b24gXHU2MzA5XHU5NEFFJywgbGluazogJy9jb21wb25lbnRzL2J1dHRvbicgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0lucHV0IFx1NjU4N1x1NjcyQ1x1OEY5M1x1NTE2NScsIGxpbms6ICcvY29tcG9uZW50cy9pbnB1dCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0ljb24gXHU1NkZFXHU2ODA3JywgbGluazogJy9jb21wb25lbnRzL2ljb24nIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU0RTFBXHU1MkExXHU3RUM0XHU0RUY2JyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnRW1vamkgXHU4ODY4XHU2MEM1JywgbGluazogJy9jb21wb25lbnRzL2Vtb2ppJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnSW1hZ2UgXHU1NkZFXHU3MjQ3JywgbGluazogJy9jb21wb25lbnRzL2ltYWdlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnSW1hZ2VQcmV2aWV3IFx1NTZGRVx1NzI0N1x1OTg4NFx1ODlDOCcsIGxpbms6ICcvY29tcG9uZW50cy9pbWFnZS1wcmV2aWV3JyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnSW1hZ2VDb250cmFzdCBcdTU2RkVcdTcyNDdcdTVCRjlcdTZCRDQnLCBsaW5rOiAnL2NvbXBvbmVudHMvaW1hZ2UtY29udHJhc3QnIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgLy8gYWN0aXZlTWF0Y2ggXHU0RjdGXHU1MjA3XHU2MzYyXHU1MjMwIHF1aWNrLXN0YXJ0IFx1NjVGNiBuYXYgXHU2MzA3XHU1MzU3XHU0RTVGXHU0RjFBXHU5QUQ4XHU0RUFFXG4gICAgICB7IHRleHQ6ICdcdTYzMDdcdTUzNTcnLCBsaW5rOiAnL2d1aWRlL2luc3RhbGxhdGlvbicsIGFjdGl2ZU1hdGNoOiAnL2d1aWRlLycgfSxcbiAgICAgIHsgdGV4dDogJ1x1N0VDNFx1NEVGNicsIGxpbms6ICcvY29tcG9uZW50cy9idXR0b24nLCBhY3RpdmVNYXRjaDogJy9jb21wb25lbnRzLycgfVxuICAgIF0sXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHtcbiAgICAgICAgaWNvbjogJ2dpdGh1YicsXG4gICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vZG5oeXhjL2RuaHl4Yy11aS1wbHVzL3RyZWUvdGVtcGxhdGUnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBtYXJrZG93bjoge1xuICAgIGNvbmZpZyhtZCkge1xuICAgICAgLy8gY29uc3QgZG9jUm9vdCA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi4vJywgaW1wb3J0Lm1ldGEudXJsKSk7XG4gICAgICBtZC51c2UoZGVtb1ByZXZpZXdQbHVnaW4pO1xuICAgICAgbWQudXNlKGdyb3VwSWNvbk1kUGx1Z2luKTtcbiAgICB9XG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixTQUFTLG9CQUFvQjtBQUN4WCxTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLHlCQUF5QjtBQUVsQyxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUE7QUFBQSxFQUViLE1BQU07QUFBQSxJQUNKLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxNQUFNLFlBQVksQ0FBQztBQUFBLElBQzNDLENBQUMsUUFBUSxFQUFFLE1BQU0sVUFBVSxTQUFTLFNBQVMsQ0FBQztBQUFBLElBQzlDO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWE7QUFBQSxJQUNYLFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxrQkFBa0I7QUFBQSxJQUNsQixrQkFBa0I7QUFBQSxJQUNsQixxQkFBcUI7QUFBQTtBQUFBLElBRXJCLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLFdBQVc7QUFBQSxRQUNUO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsWUFDTCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxzQkFBc0I7QUFBQSxZQUMxQyxFQUFFLE1BQU0sNEJBQVEsTUFBTSxxQkFBcUI7QUFBQSxVQUM3QztBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixPQUFPLENBQUMsRUFBRSxNQUFNLG9EQUFZLE1BQU0sc0JBQXNCLENBQUM7QUFBQSxRQUMzRDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGdCQUFnQjtBQUFBLFFBQ2Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMLEVBQUUsTUFBTSx1QkFBYSxNQUFNLHFCQUFxQjtBQUFBLFlBQ2hELEVBQUUsTUFBTSxrQ0FBYyxNQUFNLG9CQUFvQjtBQUFBLFlBQ2hELEVBQUUsTUFBTSxxQkFBVyxNQUFNLG1CQUFtQjtBQUFBLFVBQzlDO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxZQUNMLEVBQUUsTUFBTSxzQkFBWSxNQUFNLG9CQUFvQjtBQUFBLFlBQzlDLEVBQUUsTUFBTSxzQkFBWSxNQUFNLG9CQUFvQjtBQUFBLFlBQzlDLEVBQUUsTUFBTSx5Q0FBcUIsTUFBTSw0QkFBNEI7QUFBQSxZQUMvRCxFQUFFLE1BQU0sMENBQXNCLE1BQU0sNkJBQTZCO0FBQUEsVUFDbkU7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQTtBQUFBLE1BRUgsRUFBRSxNQUFNLGdCQUFNLE1BQU0sdUJBQXVCLGFBQWEsVUFBVTtBQUFBLE1BQ2xFLEVBQUUsTUFBTSxnQkFBTSxNQUFNLHNCQUFzQixhQUFhLGVBQWU7QUFBQSxJQUN4RTtBQUFBLElBQ0EsYUFBYTtBQUFBLE1BQ1g7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNSLE9BQU8sSUFBSTtBQUVULFNBQUcsSUFBSSxpQkFBaUI7QUFDeEIsU0FBRyxJQUFJLGlCQUFpQjtBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
