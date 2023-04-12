import mongoose from "mongoose";

const convSchema = new mongoose.Schema({

    member:{
        type:String
    }   

},{timestamps:true})

const Conversation = mongoose.model('conversation',convSchema)

export default Conversation