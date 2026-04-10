<script setup>
import { useRouter } from 'vue-router'
import navBar from './header.vue'
import board from './board.vue'
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

function trim(message) {
    let len = 153 - (message.category + message.user + message.time).length
    if (message.message.length > len) {
        return message.message.slice(0, len) + '  ...'
    }
    else {
        return message.message.slice(0, len)
    }
}


</script>
<template>
    <navBar />
    <board>

        <div class="board-header">
            <button class="create-message" @click.prevent.stop="newMessage"><svg enable-background="new 0 0 30 30"
                    viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" class="plus">
                    <path d="m0 12h30v6h-30z" />
                    <path d="m12 0h6v30h-6z" />
                </svg>New Message</button>
            <h1 class="board-title">Message Board</h1>
            <span class="board-options">
                <select class="category">
                    <option value="" disabled selected hidden>All messages</option>
                    <option value="💡 Pitch">💡 Pitch</option>
                    <option value="📢 Announcement">📢 Announcement</option>
                    <option value="👋 Question">👋 Question</option>
                </select>
                <svg class="options" enable-background="new 0 0 18 6" viewBox="0 0 18 6"
                    xmlns="http://www.w3.org/2000/svg">
                    <g fill="#ece9e6">
                        <circle cx="3" cy="3" r="2" />
                        <circle cx="9" cy="3" r="2" />
                        <circle cx="15" cy="3" r="2" />
                    </g>
                </svg>
            </span>
        </div>
        <div class="messages">
            <div class="message" v-for="(message, id) in messages">
                <img class="user" src="C:\Ketan\intern\dev\vue-project\src\assets\pfp.png" alt="pfp">
                <div class="message-body" @click="() => { openMessage(id) }">
                    <h3 class="message-title">{{ message.title }}</h3>
                    <p class="message-text">
                        <span class="meta-text">
                            {{ message.category }} by {{ message.user }} • {{ message.time }} —
                        </span>
                        <span class="main-text">
                            {{ trim(message) }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </board>
</template>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px 20px;
    padding-top: 60px;
    box-sizing: border-box;
}

.bg-board {
    display: flex;
    /* justify-content:center; */
    width: 100%;
    max-width: 760px;
    height: 40px;
    background-color: rgb(22, 34, 41);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.sample {
    padding: 5px;
    background-color: rgb(98, 62, 23);
    margin-top: 0px;
    margin-left: 15px;
    width: fit-content;
    height: fit-content;
    position: fixed;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.sample-board {
    padding-left: 300px;
    text-decoration: underline;
    font-size: 18px;
    font-weight: 500;
    color: #67b0f9;
    height: fit-content;
    margin-top: 3px;
}

.board {
    background-color: #1b2930;
    width: 100%;
    max-width: 1060px;
    min-height: 750px;
    border-radius: 8px;
    padding: 5px;
}

.board-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #3e4d54;
    padding: 0 15px 10px;
}

.board-title {
    padding-left: 20px;
    margin: 0px;
}

.create-message {
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 8px 15px;
    background-color: #6fc082;
    border-radius: 30px;
    font-size: 12px;
    border: none;
    height: fit-content;
}

.plus {
    height: 12px;
}

.board-options {
    display: flex;
    gap: 10px;
}

.category {
    background-color: rgb(0, 0, 0, 0);
    color: white;
    padding: 5px 20px 5px 5px;
    border-radius: 30px;
}

.options {
    border: 1px solid rgb(133, 133, 133);
    border-radius: 100px;
    width: 20px;
    padding: 0 4px;
}

.messages {
    padding: 15px 0 0;
}

.message {
    border-bottom: 1px solid rgb(62, 77, 84);
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 0 120px;
    padding: 10px 0 20px;
    max-height: 60px;
    overflow: hidden;
}

.user {
    height: 40px;
    border-radius: 100%;
}

.message-title {
    margin: 0;
    padding: 0;
    color: #e1e5e8;
    font-weight: 400;
    font-size: 20px;
}

.message-text {
    margin: 0;
    padding: 0;
}

.meta-text {
    color: rgb(165, 172, 176);
}

.message-body:hover {
    cursor: pointer;
}
</style>