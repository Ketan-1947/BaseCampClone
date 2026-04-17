import {fetchUser} from '../data_methods/fetchData.js'
import {insertUser, insertMessage} from '../data_methods/addData.js'

async function verifyUser(user) {
    console.log(user)
    const user_in_db = await fetchUser(user.id)
    if (user_in_db) {
        if (user_in_db.password === user.password) {
            return {status: true,
                code: 200
            };
        } else {
            return {status: false,
                code: 401,
                error: "invalid password!"
            };
        }
    }
    else{
        return {status: false,
        code: 404,
        error: "user not found!" };
    }
}

async function createUser(user) {
    const verification = await verifyUser(user);
    const user_exists = verification.status;
    if (user_exists) {
        return {
            status: false,
            code: 409,
            error: "user already exists!"
        }
    }
    else{
        return insertUser(user);
    }
}

export {verifyUser, createUser}