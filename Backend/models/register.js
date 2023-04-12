import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
});

const swipedLeftSchema = new mongoose.Schema({

    swipedUserId: { type: String, required: true }
});

const swipedRightSchema = new mongoose.Schema({
  
    swipedUserId: { type: String, required: true }
});

const matchedUserSchema = new mongoose.Schema({
    userid: { type: String, required: true }
});


const registerSchema = new mongoose.Schema({

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
    
},{timestamps:true});
const Profile = mongoose.model('users',registerSchema);
export default Profile;

// push  null on register and transform the schema according to the user and we let them update