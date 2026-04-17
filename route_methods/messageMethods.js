
import { createMessage, getAllMessage, getMessageBody,  deleteMessage} from "../business_logic/messageLogic.js";

async function registerMessage(req, res) {
    const message = req.body
    const isCreated = await createMessage(message);
    console.log(isCreated)
    res.status(isCreated.code).send()
}

async function returnAllMessage(req, res) {
    try {
        const messages = await getAllMessage();
        res.status(messages.code).json(messages.data)
    }
    catch (e) {
        console.log(e)
        res.status(500).json("error: internal server error!")
    }
}

async function returnMessageBody(req, res) {
    try {
        const body = await getMessageBody(req.params.id);
        res.status(body.code).json(body.data)
    }
    catch (e) {
        console.log(e)
        res.status(500).json("error: internal server error!")
    }
}

async function deRegisterMessage(req, res) {
    try {
        const isDeleted = await deleteMessage(req.params.id)
        res.status(isDeleted.code).send()
    }
    catch (e) {
        console.log(e)
        res.status(500).json("error: internal server error!")
    }
}
export { registerMessage, returnAllMessage, returnMessageBody, deRegisterMessage }