import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { initRouter } from './router'
import 'virtual:windi.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
initRouter(app)

app.mount('#app')
