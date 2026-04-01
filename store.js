import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useUserData = defineStore('user', () =>{
    const user_id = ref(null)

    function setUser(id){
        user_id.value = id
    }
    function clearUser(id){
        user_id.value = null
    }
    return {user_id, setUser, clearUser};
})