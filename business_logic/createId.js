import { v4 as uid4 } from 'uuid'
const secret = "f47ac10b-58cc-4372-a567-0e02b2c3d479"

function createId(){
    return uid4()
}
export {createId}