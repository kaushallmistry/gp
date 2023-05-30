import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },
    },
    
{timestamps:true})

const Messages =  mongoose.model('messages',messageSchema)

export default Messages