<script setup lang="ts">
    import {reactive, ref} from 'vue'
    // import {encrypt, decrypt} from '../assets/auth.js'
    type user = Record<string, string>

    const user: user = reactive({
        id:"",
        pass:""
    })

    async function createUser(){
        console.log(user)
        let response = await fetch('http://localhost:3000/register',{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(user)
        })
        console.log(response.status)
        if(response.status === 200){
            console.log('sucess')
            alert('user created')
            window.location.hash = '/login'
        }
        else if(response.status === 409){
            alert('user already exists')
        }
        else{
            alert('internal error')
        }
    }

</script>
<template>
    <div class = 'container'>
        <h1 class = "title">SIGN UP</h1>
        <form @submit.prevent = 'createUser' class = 'login'>
            <label>SIGN UP</label>
            <span>
                <label for="userName">User Name</label>
                <input type="text" id = "userName" name="userName" placeholder="User Name" v-model="user.id">
            </span>
            <span>
                <label for="pass">Password</label>
                <input type="password" id ="pass" name="password" placeholder="Enter Password" v-model="user.pass">
            </span>
    
            <button type="submit">submit</button>
        </form>
        <span>
            <a href="#/login">Log in | </a>
            <a href="#/signup">Sign up</a>
        </span>
    </div>
</template>

<style scoped>
.title{
    color: black;
}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:97vh;
    background-color: #fefbf8 ;
}

.login{
    display: flex; 
    flex-direction: column; 
    justify-content: space-between;
    width:200px;
    border: 2px inset black;
    padding: 50px;
    height:200px;
    background-color: white;
    box-shadow: 3px 2px rgb(167, 167, 167);
}



</style>