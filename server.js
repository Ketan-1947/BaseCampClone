import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import fs from 'fs/promises'

const secret = "asdfghjkl"
const app = express()

async function addUser(user){
    
    try{
        let users = await fs.readFile('data/users.json', 'utf-8')
        users = JSON.parse(users)
        if(users[user.id] != undefined){
            return 409
        }
        else{
            users[user.id] = user.pass
            await fs.writeFile('data/users.json', JSON.stringify(users))
            return 200;
        }
        return 500
        
    }
    catch(err){
        console.log('error: ', err)
        return false;
    }

}

async function verifyUser(user){
    try{
        let users = await fs.readFile('data/users.json', 'utf-8')
        users = JSON.parse(users)
        if(users[user.id] === undefined){
            console.log('no such user')
            return 401
        }
        else{
            if(users[user.id] === user.pass){
                return 200
            }
            else {
                return 401
            }
        }
        return 500
    }
    catch(e){
        console.log('error: ', e)
        return false
    }
}

app.use(cors())

app.use(express.json())

app.post('/register', async (req, res) =>{
    let isRegistered = await addUser(req.body)
    res.status(isRegistered).send()
})

app.post('/verify', async (req, res) =>{
    let isVerified = await verifyUser(req.body)
    res.status(isVerified).send()
})

app.listen(3000)