import { createUser, verifyUser } from "../business_logic/userLogic.js"

async function registerUser(req, res) {
    try {
        const user = await req.body
        await createUser(user);
        res.status(200).send()
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }

}
async function checkUser(req, res) {
    try {
        const user = await req.body
        const response = await verifyUser(user);
        console.log(response)
        res.status(response.code).send();
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
}
export { registerUser, checkUser }