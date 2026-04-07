// import './components/main.css'

import { createApp } from 'vue'
import router from '../router'
import App from './App.vue'
// import getUser from './plugins/getUser'

const app = createApp(App)

app.use(router)
// app.use(getUser, {})

app.mount('#app')