import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// =========新增开始=========
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// =========新增结束=========
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// =========新增开始：全局注册所有图标=========
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// =========新增结束=========

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')


