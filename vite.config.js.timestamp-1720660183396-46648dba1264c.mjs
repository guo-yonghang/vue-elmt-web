// vite.config.js
import { defineConfig } from "file:///C:/Users/19512/Desktop/vue-elmt-web/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// vite-plugins.js
import vue from "file:///C:/Users/19512/Desktop/vue-elmt-web/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/19512/Desktop/vue-elmt-web/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueSetupExtend from "file:///C:/Users/19512/Desktop/vue-elmt-web/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
import { visualizer } from "file:///C:/Users/19512/Desktop/vue-elmt-web/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createSvgIconsPlugin } from "file:///C:/Users/19512/Desktop/vue-elmt-web/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { resolve } from "path";
var createVitePugins = () => {
  return [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    visualizer(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    })
  ];
};

// vite.config.js
var __vite_injected_original_dirname = "C:\\Users\\19512\\Desktop\\vue-elmt-web";
var vite_config_default = defineConfig({
  base: "./",
  plugins: createVitePugins(),
  resolve: {
    alias: {
      "@": resolve2(__vite_injected_original_dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  },
  build: {
    outDir: "dist",
    minify: "esbuild"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAidml0ZS1wbHVnaW5zLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMTk1MTJcXFxcRGVza3RvcFxcXFx2dWUtZWxtdC13ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDE5NTEyXFxcXERlc2t0b3BcXFxcdnVlLWVsbXQtd2ViXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8xOTUxMi9EZXNrdG9wL3Z1ZS1lbG10LXdlYi92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBjcmVhdGVWaXRlUHVnaW5zIH0gZnJvbSAnLi92aXRlLXBsdWdpbnMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6ICcuLycsXHJcbiAgcGx1Z2luczogY3JlYXRlVml0ZVB1Z2lucygpLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlIFwiQC9zdHlsZXMvZWxlbWVudC9pbmRleC5zY3NzXCIgYXMgKjtgLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxyXG4gIH0sXHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMTk1MTJcXFxcRGVza3RvcFxcXFx2dWUtZWxtdC13ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDE5NTEyXFxcXERlc2t0b3BcXFxcdnVlLWVsbXQtd2ViXFxcXHZpdGUtcGx1Z2lucy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvMTk1MTIvRGVza3RvcC92dWUtZWxtdC13ZWIvdml0ZS1wbHVnaW5zLmpzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3VucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlJ1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlVml0ZVB1Z2lucyA9ICgpID0+IHtcclxuICByZXR1cm4gW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHZ1ZVNldHVwRXh0ZW5kKCksXHJcbiAgICB2aXN1YWxpemVyKCksXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcclxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICB9KSxcclxuICBdXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUyxTQUFTLG9CQUFvQjtBQUNsVSxTQUFTLFdBQUFBLGdCQUFlOzs7QUNEK1EsT0FBTyxTQUFTO0FBQ3ZULE9BQU8sWUFBWTtBQUNuQixPQUFPLG9CQUFvQjtBQUMzQixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLGVBQWU7QUFFakIsSUFBTSxtQkFBbUIsTUFBTTtBQUNwQyxTQUFPO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsSUFDZixXQUFXO0FBQUEsSUFDWCxxQkFBcUI7QUFBQSxNQUNuQixVQUFVLENBQUMsUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLE1BQ3JELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNIO0FBQ0Y7OztBRGxCQSxJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTLGlCQUFpQjtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUtDLFNBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgInJlc29sdmUiXQp9Cg==
