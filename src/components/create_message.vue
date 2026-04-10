<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import navBar from './header.vue'
import board from './board.vue'

const router = useRouter()
const metaData = reactive({
    user: localStorage.user_id,
    title: "",
    category: "",
    message: "",
    notify:""
})

const title_rows = ref(1);
function calc_rows(lim) {
    let len = metaData.title.length;
    console.log(len)
    title_rows.value = len / lim + 1;
}
async function createMessage() {
    let response = await fetch('http://localhost:3000/message/create', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaData)
    })

    if (response.status === 200) {
        console.log(response.id)
        alert("message created sucessfully");
        router.push('/')
    }
    else {
        alert("FUCUUUUUUUUUUUUUKKKKKKKKKKKKK!!!!!!!!!!!!!")
    }
}
</script>
<template>
    <navBar />
    <board>
    <div class="board-header">
        <select class="category" v-model="metaData.category">
            <option value="" disabled selected hidden>Pick a category(optional)</option>
            <option value="💡 Pitch">💡 Pitch</option>
            <option value="📢 Announcement">📢 Announcement</option>
            <option value="👋 Question">👋 Question</option>
        </select>
        <textarea name="new-message" id="new-message" class="title text-area" placeholder="Type a title..."
        :rows="title_rows" v-model="metaData.title" @input="()=>{calc_rows(27)}"></textarea>
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
        
        <textarea name="new-message" id="new-message" class="message text-area" placeholder="Write away..."
        rows="15" v-model="metaData.message" @input="()=>{calc_rows(27)}"></textarea>
    </div>
    <div class="footer">
        <p class="notify">When i post this, notify...</p>
        <form class="notify-option">
            <input type="radio" value="Notified all" id="all" name="notifyTo" v-model="metaData.notify">
            <label for="all"> Notify all who can see this project</label>
            <input type="radio" value="Notified some" id="some" name="notifyTo" v-model="metaData.notify">
            <label for="some"> Only notify these people <a href=""> change...</a></label>
            <input type="radio" value="Notified none" id="none" name="notifyTo" v-model="metaData.notify">
            <label for="none"> No one</label>
        </form>
        <div class="buttons">
            <button class="draft" @click.prevent.stop="draftMessage">Save as draft</button>
            <button class="save" @click.prevent.stop="createMessage">Post this message</button>
        </div>
    </div>
    </board>
</template>
<style scoped>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.category {
    background-color: #1b2930;
    border: 1px solid white;
    border-radius: 30px;
    padding: 5px 5px;
    align-self: start;
    color: white;
    margin: 30px 10% 20px;
}

/* #################################################################### */
.toolbar {
    background: #1b2930;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10%;
    border-bottom: 1px solid rgb(104, 104, 104);
    border-top: 1px solid rgb(101, 101, 101);
}

.menu {
    display: flex;
}

.toolbar-btn {
    background: transparent;
    border: none;
    color: #e2e8f0;
    width: 40px;
    height: 40px;
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

/* ############################################################## */
.text-area{
    background-color: #1b2930;
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    padding: 0px 10% 10px;
    color:white;
}
.title {
    font-size: 42px;
}
.message{
    font-size:22px;
    padding-top:30px;
}
.footer{
    /* background-color: #212f39; */
    display: flex;
    flex-direction: column ;
    margin-top: auto;
    padding: 30px 10% 10%;
    background: linear-gradient(180deg, #27353c, #1b2930);
}
.notify{
    font-weight: 500;
}
.notify-option{
    display: grid;
    grid-template-columns: auto auto;
    width: fit-content;
    padding: 5px;
    gap: 0 10px;
}
.buttons{
    display: flex;
    gap:10px;
    padding-top: 30px;
}
.draft{
    padding:10px 20px;
    border-radius: 30px;
    background-color: #6fc082;
    font-size: 14px;
}
.save{
    padding:10px 20px;
    border-radius: 30px;
    background-color: rgba(0,0,0,0);
    font-size: 14px;
    border:1px solid #6fc082;
    color: #6fc082;
}
</style>