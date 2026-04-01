<script setup>
    import {reactive} from 'vue'
    import {useUserData} from '../../store.js'

    const userData = useUserData();

    const metaData = reactive({
        user:userData.user_id,
        title:"",
        category:"",
        message:""
    })
    
    async function createMessage(){
        let response = await fetch('http://localhost:3000/message/create',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(metaData)
        })

        if(response.status === 200){
            console.log(response.id)
            alert("message created sucessfully");
            window.location.hash = '#/messages'
        }
        else{
            alert("FUCUUUUUUUUUUUUUKKKKKKKKKKKKK!!!!!!!!!!!!!")
        }
    }
</script>
<template>
        <header class="header"> 
            <img src="../assets/logo.png" alt="logo" class="logo">
            <nav class="navigation-bar">
                <a href="#">home </a>
                <a href="#">lineup </a>
                <a href="#">pings </a>
                <a href="#">hey! </a>
                <a href="#">Activity </a>
                <a href="#">My Stuff </a>
                <a href="#">Find </a>
            </nav>
            <div class="userlogo">K</div>
        </header>
        <br>
        <main class="main">
            <div class="board">
                <div class="board-body">
                    <select class="category" v-model="metaData.category">
                        <option value="" disabled selected hidden>Pick a category</option>
                        <option value="tech">Technology</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                    </select>
                    <textarea name="message-title" id="message-title" class="title text-area" placeholder="Title" v-model = "metaData.title"></textarea>
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
                    <textarea name="new-message" id="new-message" class="message text-area" placeholder="write away" v-model="metaData.message"></textarea>
                </div>

                <div class="footer">
                    <form class="notify">
                        <input type="radio" value="1" id="all"  name="notifyTo">
                        <label for="all"> 1</label>
                        <input type="radio" value="2" id="some" name="notifyTo">
                        <label for="some"> 2</label>
                        <input type="radio" value="3" id="none" name="notifyTo">
                        <label for="none"> 3</label>
                    </form>
                    <div class="buttons">
                        <button class="draft" @click.prevent.stop = "draftMessage">draft</button>
                        <button class="save" @click.prevent.stop = "createMessage">save</button>
                    </div>
                </div>
            </div>
        </main>
        {{ metaData }}
</template> 
<style scoped>
    
    .header{
        display: flex;
        justify-content: space-between;
        background-color: rgb(11,21,27,0.7);
        position: fixed;
        width: 99%;
    }
    .main{
        display: flex;
        justify-content: center;
        margin:0px 20px;
        padding: 10px;
        box-sizing: border-box;
    }
    .board{
        display: flex;
        flex-direction: column;
        background-color: #1b2930;
        border-radius: 15px;
    }
    .board-body{
        display: flex;
        flex-direction: column;
        min-width:960px;
        padding: 0 100px;
    }
    .text-area{
        /* width: 100%; */
        background-color: #1b2930;
        border: 0px;
        resize:none;
        overflow: hidden;
        color: white;
    }
    .title{
        font-size: 40px;
        min-height: 100px;
    }
    .message{
        font-size: 20px;
        min-height: 600px;
    }
    .category{
        width:fit-content;
        border: 2px solid;
        border-radius: 20px;
        padding:5px 10px; 
        margin: 10px 0;
        color: #ffffff;
        background-color: #1b2930;
    }
    .text-area:focus{
        outline: none;
        color: white;
    }
    .text-modifier{
        display: flex;
        width: 100%;
        padding:10px 0;
        justify-content: space-between;
        background-color: #1b2930;
        border-top: 1px solid #313e44;
        border-bottom: 1px solid #313e44;
    }
    .text-modifier .edit{
        display: flex;
        gap:10px;
    }
    .footer{
        width: 100%;
        background-color: #27353c;
    }

    .draft{
        height: 50px;
        width:100px;
    }
    .save{
        height: 50px;
        width:100px;
    }
</style>