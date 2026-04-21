import { createId } from './createId.js'
import { insertMessage } from '../utils/addData.js'
import { fetchAllMessage, fetchMessageById } from '../utils/fetchData.js'
import { getAllComments } from './commentsLogic.js'
import { removeMessage } from '../utils/deleteData.js'

async function createMessage(message) {
    message.m_id = createId()
    const time = new Date()
    message.time = time.getDate() + " " + time.getMonth()
    return await insertMessage(message);
}

async function getAllMessage() {
    return await fetchAllMessage();
}

async function getMessageBody(m_id) {
    const message = await fetchMessageById(m_id);
    const comments = await getAllComments(m_id);
    if (message.status && comments.status) {
        const data = {
            message: message.data,
            comments: comments.data
        }
        return {
            status: true,
            code: 200,
            data: data
        }
    }
    else {
        return {
            status: false,
            code: 500,
            data: "error: internal server error!"
        }
    }
}

async function deleteMessage(id) {
    try {
        await removeMessage(id);
        return {
            status: true,
            code: 200,
            data: "message deleted successfully!"
        }
    }
    catch (e) {
        console.log(e)
        return {
            status: false,
            code: 500,
            data: "error: internal server error!"
        };
    }
}
export { createMessage, getAllMessage, getMessageBody, deleteMessage }