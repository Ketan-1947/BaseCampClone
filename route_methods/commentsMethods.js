import {createComment, deleteComment} from "../business_logic/commentsLogic.js"

async function registerComment(req, res){
    const comment = req.body
    const m_id = req.params.id
    const isCreated = await createComment(comment, m_id);
    console.log(isCreated)
    res.status(isCreated.code).send();
}

async function deRegisterCommnet(req, res){
    const isDeleted = await deleteComment(req.params.id)
    res.status(isDeleted.code).send()
}

export {registerComment, deRegisterCommnet}