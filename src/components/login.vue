<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// const userData = useUserData();
console.log(2)

const user = reactive({
    id: "",
    password: ""
})

async function verifyUser() {
    user.id = user.id.toLowerCase()
    let verified = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    console.log(verified)
    if (verified.status === 200) {
        localStorage.user_id = user.id
        alert('login sucessfull')
        router.push('/')
    }
    else if (verified.status === 401) {
        alert('invalid credentials')
    }
    else {
        alert('internal error')
    }
}
</script>
<template>
    <div class='container'>
        <img src="..\assets\logo.svg" alt="logo" class="logo">
        <form @submit.prevent='verifyUser' class='login'>
            <h3 class="login-title">Log in to BaseCamp</h3>

            <span class="input-field">
                <label for="userName">User Name</label>
                <input type="text" class="text-field" id="userName" name="userName" placeholder="User Name"
                    v-model="user.id">
            </span>
            <span class="input-field">
                <label for="pass">Password</label>
                <input type="password" class="text-field" id="pass" name="password" placeholder="Enter Password"
                    v-model="user.password">
            </span>

            <button>submit</button>
        </form>
        <a href="/signup">Sign up for free</a>

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
