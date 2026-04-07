// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/login", component:() => import("./src/components/login.vue") },
  { path: "/signup", component:() => import("./src/components/signup.vue") },
  { path: "/", component:() => import("./src/components/messages.vue") },
  { path: "/message/:id", component:() => import("./src/components/message.vue") },
  { path: "/create-message", component:() => import("./src/components/create_message.vue") }
]

export default createRouter({
  history: createWebHistory(),
  routes
})