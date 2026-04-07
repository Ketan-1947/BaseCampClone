<script setup>
import { useRouter } from 'vue-router'
import navBar from './header.vue'
const router = useRouter()

import { onMounted, ref } from 'vue'
const messages = ref([])
// if(userData.user_id == null) window.location.hash = '/login' 

onMounted(async () => {
    const res = await fetch('http://localhost:3000/messages')
    messages.value = await res.json()
})
// messages = messages
function newMessage() {
    router.push('/create-message')
}

function openMessage(id) {
    router.push('/message/' + id)
}



</script>
<template>
    <navBar />
    <br>
    <main class="main">
        <div class="board">
            <div class="board-header">
                <button class="create-message" @click.prevent.stop="newMessage">New Message</button>
                <div class="board-title">Message Board</div>
                <span class='board-options'>
                    <div class="filter">filter</div>
                    <div class="options">...</div>
                </span>
            </div>
            <div class="pinned">
                <p>pinned to top</p>
            </div>
            <div class="messages">
                <div class="message" v-for="(message, id) in messages">
                    <img class="user" src="" alt="pfp">
                    <div class="message-body" @click="() => { openMessage(id) }">
                        <h2 class="message-title">{{ message.title }}</h2>
                        <p class="message-text">{{ message.category }} by {{ message.user }} | {{ message.time }} -
                            {{ message.message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
body {
    background-color: #0b151b;
    color: rgb(255, 255, 255);
    box-sizing: border-box;

}

.main {
    display: flex;
    justify-content: center;
    margin: 0px 20px;
    padding: 10px;
    box-sizing: border-box;
}

.board {
    background-color: #1b2930;
    width: 100%;
    max-width: 860px;
    min-height: 750px;
    border-radius: 8px;
    padding: 5px;
}

.board-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #3e4d54;
}

.board-options {
    display: flex;
    gap: 10px;
}

.message {
    border-bottom: 1px solid #ffffff;
    display: flex;
    align-items: center;
    gap: 20px;
}

.message-body:hover {
    cursor: pointer;
}
</style>