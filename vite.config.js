import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite' // 不加这个配置，ElMessage出不来

// https://vitejs.dev/config/
export default ({mode}) => defineConfig({
  plugins: [
    vue(),
    // 按需引入，主题色的配置，需要加上 importStyle: 'sass'
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })],
    }),
    // 用于内部方法调用，样式缺失的现象，如 ElMessage 等
    ElementPlus()
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.vue', '.js', 'jsx', '.json']
  },
  // 静态资源路径配置
  // base: mode == 'development' ? './' : (mode == 'beta' ? '//s.baidu.com/beta/xxx' : '//s.baidu.com/release/xxx')
  base: mode == './',
  server: {
    proxy: {
      '/api': {
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), //去掉api
      }
    }
  },
  css: {
    preprocessorOptions: {
      // 覆盖掉element-plus包中的主题变量文件
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  }
})
