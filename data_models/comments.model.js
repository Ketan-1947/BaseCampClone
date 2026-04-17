import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    m_id:{
      type: String,
      required: true  
    },
    user: {
      type: String,
      required: true  
    },
    comment: {
      type: String,
      required: true  
    },
    time: {
      type: String,
      required: true  
    }
})

const COMMENTS = mongoose.model('comment', commentSchema)

export default COMMENTS