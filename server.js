import express from 'express'
import cors from 'cors'
import {registerUser, checkUser} from './route_methods/userMethods.js'
import {deRegisterMessage, registerMessage, returnAllMessage, returnMessageBody} from './route_methods/messageMethods.js'
import {deRegisterCommnet, registerComment} from './route_methods/commentsMethods.js'
import mongoose from 'mongoose'

mongoose.connect("connection string here")

const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

app.post('/register', registerUser)

app.post('/verify', checkUser)

app.post('/message/create', registerMessage)

app.get('/messages', returnAllMessage)

app.get('/message/:id', returnMessageBody)

app.post('/comment/create/:id', registerComment)

app.delete('/comment/delete/:id', deRegisterCommnet)

app.delete('/message/delete/:id', deRegisterMessage)

app.listen(3000)
