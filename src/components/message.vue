<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import navBar from './header.vue'
import board from './board.vue'

const route = useRoute()
const router = useRouter()
const message_id = route.params.id

const message_data = ref()
let message = ref()
let comments = ref()
const loaded = ref(false);
const write_comment = ref(false);
const new_comment = reactive({
    user: localStorage.user_id,
    comment: ""
})

async function load_comments() {
    let res = await fetch("http://localhost:3000/message/" + message_id)
    message_data.value = await res.json()
    comments.value = message_data.value["comments"]
    write_comment.value = false
    new_comment.comment = ""
}


onMounted(async () => {
    loaded.value = false;
    let res = await fetch("http://localhost:3000/message/" + message_id)
    message_data.value = await res.json()
    message.value = message_data.value["message"]
    comments.value = message_data.value["comments"]
    loaded.value = true
})

async function addComment() {
    let res = await fetch("http://localhost:3000/comment/create/" + message_id, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_comment)
    })
    if (res.status == 200) {
        alert('comment added')
        load_comments()

    }
    else alert("fuckkkkk")
}

async function deleteComment(m_id, c_id) {
    let res = await fetch("http://localhost:3000/comment/delete/" + m_id + "/" + c_id, {
        method: "delete"
    })
    if (res.status != 200) {
        alert("failed to delete the comment")
    }
    else {
        load_comments()
    }
}
async function deleteMessage(m_id) {
    let res = await fetch("http://localhost:3000/message/delete/" + m_id, {
        method: "delete"
    })
    if (res.status != 200) {
        alert("failed to delete the comment")
    }
    else {
        router.push('/')
    }
}
</script>

<template>
    <navBar />
    <board v-if="loaded">

        <div class="board-header">
            <div class="filler"></div>
            <div class="content">
                <p class="category">{{ message["category"] }}</p>
                <h1 class="title">{{ message.title }}</h1>
                <div class="line"></div>
                <div class="meta-info">
                    <img src="C:\Ketan\intern\dev\vue-project\src\assets\pfp.png" alt="pfp" class="user">
                    <p class="time">{{ message.time }}</p>
                </div>
            </div>
            <div class="options">
                <button class="edit"> Edit</button>
                <svg class="dots" @click.prevent.stop="() => { deleteMessage(message_id) }"
                    enable-background="new 0 0 18 6" viewBox="0 0 18 6" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#ece9e6">
                        <circle cx="3" cy="3" r="2" />
                        <circle cx="9" cy="3" r="2" />
                        <circle cx="15" cy="3" r="2" />
                    </g>
                </svg>
            </div>
        </div>
        <div class="message">
            {{ message.message }}
        </div>

        <div class="comments">
            <div class="comment-box" v-for="(comment, id) in comments">
                <div class="comment-meta">
                    <p class="comment-time">{{ comment.time }}</p>
                    <img src="C:\Ketan\intern\dev\vue-project\src\assets\pfp.png" alt="pfp" class="comment-user">
                </div>
                <div class="comment-content">
                    <div class="content-top">
                        <div class="comment-user-name">{{ comment.user }}</div>
                        <div class="comments-options">
                            <svg class="comments-dots" enable-background="new 0 0 18 6" viewBox="0 0 18 6"
                                @click.prevent.stop="() => { deleteComment(message_id, id) }"
                                xmlns="http://www.w3.org/2000/svg">
                                <g fill="#ece9e6">
                                    <circle cx="3" cy="3" r="2" />
                                    <circle cx="9" cy="3" r="2" />
                                    <circle cx="15" cy="3" r="2" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="content-bottom">
                        <div class="comment">{{ comment.comment }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="write-comment-box" v-if="!write_comment">
            <div class="comment-filler"></div>
            <img src="C:\Ketan\intern\dev\vue-project\src\assets\pfp.png" alt="pfp" class="comment-user">
            <p @click.prevent.stop="write_comment = true" class='add-comment'>Add a comment here...</p>
        </div>

        <div class="write-comment-box" v-else>
            <div class="comment-filler"></div>
            <img src="C:\Ketan\intern\dev\vue-project\src\assets\pfp.png" alt="pfp"
                class="comment-user add-comment-user">
            <div class="editor">
                <div class="toolbar">
                    <div class="menu">
                        <button class="toolbar-btn icon-bold">B</button>
                        <button class="toolbar-btn icon-italic">I</button>
                        <button class="toolbar-btn icon-strikethrough">S</button>
                        <button class="toolbar-btn icon-link"></button>
                        <button class="toolbar-btn icon-highlight"></button>
                        <button class="toolbar-btn icon-text"></button>
                        <button class="toolbar-btn icon-quote"></button>
                        <button class="toolbar-btn icon-align"></button>
                        <button class="toolbar-btn icon-code"></button>
                        <button class="toolbar-btn icon-ul"></button>
                        <button class="toolbar-btn icon-ol"></button>
                        <button class="toolbar-btn icon-attach"></button>
                    </div>
                    <div class="undo-redo">
                        <button class="toolbar-btn icon-undo"></button>
                        <button class="toolbar-btn icon-redo"></button>
                    </div>
                </div>

                <textarea name="new-message" id="new-message" class="comment-text-area" placeholder="Write away..."
                    rows="15" v-model="new_comment.comment"></textarea>
                <button class="submit-comment" @click="addComment">Add this Commnet</button>
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
    display: flex;
    flex-direction: column;
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

}

.filler {
    width: 40px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 30px;
}

.title {
    margin: 5px 0 0;
    padding-bottom: 0;
}

.line {
    width: 150px;
    margin: 5px 0 20px;
    border: 1px solid #3e4d54;
}

.meta-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.user {
    width: 15%;
    height: 15%;
    border-radius: 100%;
    ;
}

.options {
    display: flex;
    height: 30px;
    align-self: flex-start;
    gap: 10px;
}

.edit {
    background: none;
    color: white;
    border: 1px solid rgb(98, 98, 98);
    border-radius: 50px;
    padding: 5px 10px;
}

.dots {
    width: 20px;
    border-radius: 100%;
    border: 1px solid rgb(100, 100, 100);
    padding: 0 5px;
}

.message {
    text-align: justify;
    width: 80%;
    padding: 40px 0 50px;
    border-bottom: 1px solid #3e4d54;
    align-self: center;
    font-size: large;
    letter-spacing: 1px;
}
.comment-content{
    width: 100%;
}
.comments {
    width: 80%;
    align-self: center;
}

.comment-meta {
    display: flex;
}

.comment-box {
    display: flex;
    gap: 15px;
    border-bottom: 1px solid #3e4d54;
    padding: 10px 0 20px;
}

.comment-time {
    margin: 5px 0 0;
    width: 100px;
}

.comment-user {
    border-radius: 100%;
    width: 50px;
    height: 50px;
}

.content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
}

.comment {
    text-align: justify;
}

.comments-dots {
    width: 20px;
    padding: 0 5px;
}

.comment-user-name {
    font-weight: 600;
    font-size: 20px;
    padding-bottom: 10px;
}

.write-comment-box {
    display: flex;
    width: 80%;
    align-self: center;
    padding: 0 0px 60px;
    color: #777777;
    font-size: 20px;
    align-items: center;
}

.comment-filler {
    width: 100px;
}

.add-comment {
    padding-left: 15px;
}

.comments-options {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.editor {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-self: center;
    margin: 10px 0;
    border-collapse: collapse;
}

.toolbar {
    background: #1b2930;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(101, 101, 101, 0.6);
    border-collapse: collapse;
}

.menu {
    display: flex;
}

.toolbar-btn {
    background: transparent;
    border: none;
    color: #e2e8f0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.15s ease;
    font-size: 16px;
    font-weight: 500;
    position: relative;
}

.toolbar-btn:hover {
    background: #4a5568;
}

.toolbar-btn:active {
    background: #3d4758;
}

/* Icon styles */
.icon-bold {
    font-weight: bold;
}

.icon-italic {
    font-style: italic;
}

.icon-strikethrough {
    text-decoration: line-through;
}

.icon-link::before {
    content: "🔗";
    font-size: 14px;
}

.icon-highlight::before {
    content: "🖍";
    font-size: 14px;
}

.icon-text::before {
    content: "T";
    font-weight: bold;
}

.icon-quote::before {
    content: "\"\"";
    font-size: 14px;
}

.icon-align::before {
    content: "≡";
}

.icon-code::before {
    content: "<>";
    font-size: 13px;
}

.icon-ul::before {
    content: "☰";
}

.icon-ol::before {
    content: "≡";
}

.icon-attach::before {
    content: "📎";
    font-size: 14px;
}

.icon-undo::before {
    content: "↶";
    font-size: 18px;
}

.icon-redo::before {
    content: "↷";
    font-size: 18px;
}

.undo-redo {
    display: flex;
}

.comment-text-area {
    background-color: #1b2930;
    outline: none;
    border: 1px solid rgba(101, 101, 101, 0.6);
    resize: none;
    color:white;
}

.add-comment-user {
    margin-top: 10px;
    margin-right: 20px;
    align-self: flex-start;

}

.submit-comment {
    margin-top: 10px;
    padding: 10px 20px;
    border-radius: 30px;
    background-color: #6fc082;
    font-size: 14px;
    width: fit-content;
}
</style>