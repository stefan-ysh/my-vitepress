// .vitepress/theme/index.js
// .vitepress/theme/index.js
import './tailwind.postcss'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// You can directly import Vue files in the theme entry
// VitePress is pre-configured with @vitejs/plugin-vue.
import Layout from './Layout.vue'

export default {
  DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}