import { fetchAllComments } from '../utils/fetchData.js'
import { insertComment } from '../utils/addData.js'
import { removeComment } from '../utils/deleteData.js'

async function getAllComments(m_id) {
    const comments = await fetchAllComments(m_id);
    return comments;
}

async function createComment(comment, m_id) {
    comment.m_id = m_id;
    const time = new Date()
    comment.time = time.getDate() + " " + time.getMonth()
    const created = await insertComment(comment);
    if (created.status) {
        return {
            status: true,
            code: 200,
        }
    }
    else {
        return {
            status: false,
            code: 500,
            error: "internal server error!"
        }
    }
}

async function deleteComment(id) {
    try {
        await removeComment(id);
        return {
            status: true,
            code: 200,
            data: "comment deleted successfully!"
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

export { getAllComments, createComment, deleteComment }