<script setup lang="ts">
import{useRouter} from 'vue-router'
import { onMounted, useAttrs } from 'vue'

const router = useRouter()

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !localStorage.user_id) {
        next('/login')
    } else {
        next()
    }
    // console.log(userData.user_id)
})
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

}

.header {
    display: flex;
    justify-content: space-between;
    background-color: rgb(11, 21, 27, 0.7);
    position: fixed;
    width: 99%;
}

.navigation-bar {
    display: flex;
    align-items: center;
    gap: 10px;

}

.nav-text {
    display: flex;
    color: white;
    align-items: center;
    gap: 5px;
    text-decoration: none;
}

.nav-icon {
    height: 20px;
}

.user-logo {
    border-radius: 100%;
    width: fit-content;
    padding: 10px;
    background-color: orange;
}
</style>