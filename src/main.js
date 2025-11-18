import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Games from './Games.vue'
import About from './About.vue'
import App from './App.vue'
import Fireball from './games/fireball/Fireball.vue'
import SpeechClock from './games/speech_clock/SpeechClock.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: "/games" },
    { path: "/games", component: Games },
    { path: '/about', component: About },
    { path: '/games/fireball', component: Fireball },
    { path: "/games/speech-clock", component: SpeechClock }
  ],
})

const app = createApp(App)

app.use(router)

app.mount('#app')
