import USER from "../models/user.model.js"
import MESSAGE from "../models/message.model.js"
import COMMENT from "../models/comments.model.js"

async function insertUser(user) {
    try {
        const userDOC = new USER(user)
        await userDOC.save()
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


async function insertMessage(message) {
    try {
        const messageDOC = new MESSAGE(message)
        await messageDOC.save()
        return {
            status: true,
            code: 200,
            id: messageDOC._id
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

async function insertComment(comment) {
    try {
        const commentDOC = new COMMENT(comment)
        await commentDOC.save()
        return {
            status: true,
            code: 200,
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
export { insertUser, insertMessage, insertComment }