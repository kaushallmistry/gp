import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
});

const swipedLeftSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    swipedUserId: { type: String, required: true }
});

const swipedRightSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    swipedUserId: { type: String, required: true }
});

const matchedUserSchema = new mongoose.Schema({
    userid: { type: String, required: true }
});

const messageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    senderId: { type: String, required: true },
    message:{type: String, required: true}
});

const chatsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userId1: { type: String, required: true },
    userId2: { type: String, required: true },
    messages:[messageSchema]
});
    
const registerSchema = new mongoose.Schema({

    id:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    games:[gamesSchema],
    swipedLeft:[swipedLeftSchema],
    swipedRight:[swipedRightSchema],
    matchedUsers:[matchedUserSchema],
    chats:[chatsSchema]

});
const Register = mongoose.model('users',registerSchema);
export default Register;

// push  null on register and transform the schema according to the user and we let them update