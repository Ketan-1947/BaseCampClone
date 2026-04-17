import COMMENTS from "../data_models/comments.model.js";
import MESSAGE from "../data_models/message.model.js"
async function removeComment(id) {
    try {
        await COMMENTS.deleteOne({ _id: id })
        return {
            status: true,
            code: 200
        }
    }
    catch (e) {
        console.log(e)
        return {
            status: false,
            code: 500,
            error: "internal server error!"
        }
    }
}
async function removeMessage(id) {
    try {
        await MESSAGE.deleteOne({ m_id: id })
        return {
            status: true,
            code: 200
        }
    }
    catch (e) {
        console.log(e)
        return {
            status: false,
            code: 500,
            error: "internal server error!"
        }
    }
}

export { removeComment, removeMessage }