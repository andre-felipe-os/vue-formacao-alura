import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'

import roteador from './routers'
import { key, store } from './stores'

createApp(App)
    .use(roteador)
    .use(store, key)
    .mount('#app')
