<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// const userData = useUserData();
console.log(2)

const user = reactive({
    id: "",
    pass: ""
})

async function verifyUser() {
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
        <h1 class='title'> LOG IN</h1>
        <form @submit.prevent='verifyUser' class='login'>
            <label>Log IN</label>
            <span>
                <label for="userName">User Name</label>
                <input type="text" id="userName" name="userName" placeholder="User Name" v-model="user.id">
            </span>
            <span>
                <label for="pass">Password</label>
                <input type="password" id="pass" name="password" placeholder="Enter Password" v-model="user.pass">
            </span>

            <button>submit</button>
        </form>
        <span>
            <a href="#/login">Log in</a> |
            <a href="#/signup">Sign up</a>
        </span>
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
    justify-content: center;
    height: 97vh;
    background-color: #fefbf8;
}

.login {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    border: 2px inset black;
    padding: 50px;
    height: 200px;
    background-color: white;
    box-shadow: 3px 2px rgb(167, 167, 167);
}
</style>
