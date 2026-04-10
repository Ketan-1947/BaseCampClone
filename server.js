import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import { addUser, verifyUser, createMessage, createComment, deleteCommnet, deleteMessage } from './server_methods/fs.js'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

app.post('/register', async (req, res) => {
    let isRegistered = await addUser(req.body)
    res.status(isRegistered).send()
})

app.post('/verify', async (req, res) => {
    let isVerified = await verifyUser(req.body)
    res.status(isVerified).send()
})

app.post('/message/create', async (req, res) => {
    let isCreated = await createMessage(req.body);
    res.status(isCreated.status).json(isCreated.id)
})

app.get('/messages', async (req, res) => {
    let messages = await fs.readFile('data/messages.json', 'utf-8')
    res.status(200).json(JSON.parse(messages))
})

app.get('/message/:id', async (req, res) => {
    let data = {}
    let messages = await fs.readFile('data/messages.json', 'utf-8')
    data["message"] = JSON.parse(messages)[req.params.id]

    let comments = await fs.readFile('data/comments.json', 'utf-8')
    data['comments'] = JSON.parse(comments)[req.params.id]

    res.status(200).json(data)
})

app.post('/comment/create/:id', async (req, res) => {
    let isCreated = await createComment(req.body, req.params.id);
    res.status(isCreated).send()
})

app.delete('/comment/delete/:mid/:cid', async (req, res) => {
    let isDeleted = await deleteCommnet(req.params.mid, req.params.cid)
    res.status(isDeleted).send()
})
app.delete('/message/delete/:mid', async (req, res) => {
    let isDeleted = await deleteMessage(req.params.mid)
    res.status(isDeleted).send()
})

app.listen(3000)