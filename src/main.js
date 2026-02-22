import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Lenis from '@studio-freight/lenis'

import App from './App.vue'
import router from './router'

const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
