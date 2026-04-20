import USER from "../data_models/user.model.js"
import MESSAGE from "../data_models/message.model.js"
import COMMENT from "../data_models/comments.model.js"


async function fetchUser(uid) {
    try {
        const user = await USER.findOne({ id: uid })
        return user;
    }
    catch (e) {
        console.log(e)
        return null;
    }
}

async function fetchAllMessage() {
    try {
        const messages = await MESSAGE.find({})
        return {
            status: true,
            code: 200,
            data: messages
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

async function fetchMessageById(m_id) {
    try {
        const message = await MESSAGE.findOne({ m_id: m_id })
        return {
            status: true,
            code: 200,
            data: message
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

async function fetchAllComments(m_id) {
    try {
        const comments = await COMMENT.find({ m_id: m_id })
        return {
            status: true,
            code: 200,
            data: comments
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
export { fetchUser, fetchAllMessage, fetchMessageById, fetchAllComments }