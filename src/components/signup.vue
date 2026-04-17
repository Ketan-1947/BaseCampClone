<script setup lang="ts">
    import {reactive, ref} from 'vue'
    import {useRouter} from 'vue-router'
    
    const router = useRouter()

    type user = Record<string, string>

    const user: user = reactive({
        name:"",
        id:"",
        password:""
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
            router.push('/login')
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
    <div class='container'>
        <img src="..\assets\logo.svg" alt="logo" class="logo">
        <form @submit.prevent='createUser' class='login'>
            <h3 class="login-title">Sign up to BaseCamp</h3>
            <span class="input-field">
                <label for="name">Name</label>
                <input type="text" class="text-field" id="name" name="name" placeholder="Enter Name"
                    v-model="user.name">
            </span>
            <span class="input-field">
                <label for="userName">User Name</label>
                <input type="text" class="text-field" id="userName" name="userName" placeholder="User Name"
                    v-model="user.id">
            </span>
            <span class="input-field">
                <label for="password">Password</label>
                <input type="password" class="text-field" id="password" name="password" placeholder="Enter Password"
                    v-model="user.password">
            </span>

            <button>submit</button>
        </form>
        <a href="/login">Log in</a>

    </div>
    <!-- {{ "usreData: " + localstorage.user_id }} -->
</template>

<style scoped>
.title {
    color: black;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 97vh;
    background-color: #fefbf8;
    padding-top: 60px;
}

.logo {
    width: 90px;
    margin-bottom: 10px;
}

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    padding: 10px 40px 50px;
    margin-bottom: 30px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 5px 5px 10px rgb(227, 227, 227), -5px -5px 10px rgb(227, 227, 227);
    gap:10px
}

.login-title {
    color: black;
}

.input-field {
    display: flex;
    ;
    flex-direction: column;
    align-self: flex-start;
    color: black;
    padding-bottom: 20px;
    font-weight: 600;
}

.text-field {
    width: 300px;
    height: 40px;
}
</style>
