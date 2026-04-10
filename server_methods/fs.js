import { v5 as uid5 } from 'uuid'
import fs from 'fs/promises'
const secret = "f47ac10b-58cc-4372-a567-0e02b2c3d479"

async function addUser(user) {

    try {
        let users = await fs.readFile('data/users.json', 'utf-8')
        users = JSON.parse(users)
        if (users[user.id] != undefined) {
            return 409
        }
        else {
            users[user.id] = user.pass
            await fs.writeFile('data/users.json', JSON.stringify(users))
            return 200;
        }
        return 500

    }
    catch (err) {
        console.log('error: ', err)
        return false;
    }

}


async function verifyUser(user) {
    try {
        let users = await fs.readFile('data/users.json', 'utf-8')
        users = JSON.parse(users)
        if (users[user.id] === undefined) {
            console.log('no such user')
            return 401
        }
        else {
            if (users[user.id] === user.pass) {
                return 200
            }
            else {
                return 401
            }
        }
    }
    catch (e) {
        console.log('error: ', e)
        return false
    }
}
async function createMessage(data) {
    /*     const data = reactive({
        user:userData.user_id,
        title:"",
        category:"",
        message:""
        }) */
    try {
        let m_id = uid5(data.title, secret)
        console.log("data is: " + data + typeof (data))

        let time = new Date()
        data['time'] = time.toDateString().slice(4, 10);

        let msg_file = await fs.readFile('data/messages.json', 'utf-8')
        let cmnt_file = await fs.readFile('data/comments.json', 'utf-8')

        msg_file = JSON.parse(msg_file)
        cmnt_file = JSON.parse(cmnt_file)

        msg_file[m_id] = data;
        cmnt_file[m_id] = {};

        await fs.writeFile('data/messages.json', JSON.stringify(msg_file));
        await fs.writeFile('data/comments.json', JSON.stringify(cmnt_file));

        return {
            status: 200,
            id: m_id
        }
    }
    catch (e) {
        console.log(e)
        return 500
    }
}

async function createComment(comment_data, m_id) {
    try {
        let res = await fs.readFile("data/comments.json", "utf-8")
        res = JSON.parse(res);
        // console.log(res, typeof(res))
        let comments_m_id = res[m_id]
        let c_id = uid5(comment_data.comment, secret)
        console.log(comments_m_id + " | " + typeof (comments_m_id) + " : " + m_id + " : " + c_id)

        let time = new Date()
        comment_data['time'] = time.toDateString().slice(4, 10);
        comments_m_id[c_id] = comment_data


        await fs.writeFile("data/comments.json", JSON.stringify(res))
        return 200
    }
    catch (E) {
        console.log("writeerror", E)
    }
    return 500
}

async function deleteCommnet(mid, cid) {
    try {
        let res = await fs.readFile('data/comments.json', 'utf-8')
        res = JSON.parse(res)
        let comments = res[mid];
        delete res[mid][cid]
        res[mid] = comments
        await fs.writeFile('data/comments.json', JSON.stringify(res));
        return 200
    }
    catch (e) {
        console.log(e)
        return 500
    }
}
async function deleteMessage(mid) {
    try {
        let res_cmnt = await fs.readFile('data/comments.json', 'utf-8')
        let res_msg = await fs.readFile('data/messages.json', 'utf-8')

        res_cmnt = JSON.parse(res_cmnt)
        res_msg = JSON.parse(res_msg)

        delete res_cmnt[mid]
        delete res_msg[mid]

        await fs.writeFile('data/comments.json', JSON.stringify(res_cmnt));
        await fs.writeFile('data/messages.json', JSON.stringify(res_msg));
        return 200
    }
    catch (e) {
        console.log(e)
        return 500
    }
}

export { addUser, verifyUser, createMessage, createComment, deleteCommnet, deleteMessage }