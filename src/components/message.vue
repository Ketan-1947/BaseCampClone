<script setup>
import { ref, reactive, onMounted } from 'vue'
import {useUserData} from '../../store.js'

const path = window.location.hash
const message_id = path.split('/')[2]
const userData = useUserData()

const message_data = ref()
let message = ref()
let comments = ref()
const loaded = ref(false);
const write_comment = ref(false);
const new_comment = reactive({
    user:userData.user_id,
    comment:""
})

onMounted(async () => {
    let res = await fetch("http://localhost:3000/message/" + message_id)
    message_data.value = await res.json()
    message.value = message_data.value["message"]
    comments.value = message_data.value["comments"]
    loaded.value = true
})

async function addComment(){
    let res = await fetch("http://localhost:3000/comment/create/"+message_id, {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(new_comment)
    })
    if(res.status == 200){
        alert('comment added')
        let res = await fetch("http://localhost:3000/message/" + message_id)
        message_data.value = await res.json()
        comments.value = message_data.value["comments"]
    }    
    else alert("fuckkkkk")
} 

</script>

<template>
    <div class="container">
        <div class="message-body" v-if="loaded">
            <div class="header">
                <h4 class="category">{{ message.category }}</h4>
                <h2 class="title">{{ message.title }}</h2>
                <div class="user">
                    <img src="" alt="pfp">
                    <p>{{ message.user }}</p>
                    <p>{{ message.time }}</p>
                </div>
            </div>
            <div class="message-content">
                {{ message.message }}
            </div>
            <div class="comments">
                <div class="comment" v-for="comment in comments">
                    {{ comment }}
                </div>
            </div>

            <div class="write-comment" v-if="!write_comment">
                <img src="" alt="pfp">
                <p @click.prevent.stop="write_comment = true" class='add-comment'>Add a comment</p>
            </div>

            <div class="write-comment-box" v-else>
                <div class="text-modifier">
                    <div class="option">
                        <span>B </span>
                        <span>I </span>
                        <span>- </span>
                        <span>link </span>
                        <span>clr </span>
                        <span>head </span>
                        <span>quote </span>
                        <span>dvd </span>
                        <span>code </span>
                        <span>ul </span>
                        <span>ol </span>
                        <span>file </span>
                    </div>
                    <div class="edit">
                        <span>undo</span>
                        <span>redo</span>
                    </div>
                </div>
                <textarea name="new-message" id="new-message" class="message text-area" placeholder="write away"
                    v-model="new_comment.comment"></textarea>
                <button class="submit-comment" @click= "addComment">Add this Commnet</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.message-body {
    /* display: flex;
        align-items: center;
        flex-direction: column; */
    background-color: rgb(35, 42, 42);
    margin: 20px 100px;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user {
    display: flex;
    align-items: center;
}

.message-content {
    padding: 50px
}

.write-comment {
    display: flex;
    align-items: center;
    gap: 20px;
}

.add-comment:hover {
    cursor: pointer;
}
/* .option{
    display: flex;
} */
.edit{
    display: flex;
}
.text-modifier{
    display: flex;
    justify-content: space-between;
}
.write-comment-box{
    padding:100px;
}
.text-area{
    resize: none;
    width: 960px;
    height: 200px;
    background-color:  rgb(35, 42, 42);
    color: white;
}
</style>