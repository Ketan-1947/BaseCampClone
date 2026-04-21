import express from 'express'
import cors from 'cors'
import {registerUser, checkUser} from './api/userMethods.js'
import {deRegisterMessage, registerMessage, returnAllMessage, returnMessageBody} from './api/messageMethods.js'
import {deRegisterCommnet, registerComment} from './api/commentsMethods.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const mongoUrl = process.env.MONGODB_URL

mongoose.connect(mongoUrl)

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
