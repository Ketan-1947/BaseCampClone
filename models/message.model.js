import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    m_id:{
      type: String,
      required: true  
    },
    user: {
      type: String,
      required: true  
    },
    title: {
      type: String,
      required: true  
    },
    category: {
      type: String,
      required: true  
    },
    message: {
      type: String,
      required: true  
    },
    notify: {
      type: String,
      required: true  
    },
    time: {
      type: String,
      required: true  
    }
})

const MESSAGE = mongoose.model('message', messageSchema)

export default MESSAGE