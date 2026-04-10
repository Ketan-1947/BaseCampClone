<script setup lang="ts">
import{useRouter} from 'vue-router'
import navBar from './components/header.vue'

const router = useRouter()

// router.beforeEach((to, from, next) => {
//     if(to.path === '/signup'){
//         console.log(2)
//         next()
//     }
//     else if (to.path !== '/login' && !localStorage.user_id) {
//         next('/login')
//     }
//     else {
//         next()
//     }
// })
</script>

<template>
        <RouterView />
</template>

<style>
body {
    background-color: #0b151b;
    color: white;
    box-sizing: border-box;
    margin: 0;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>