import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema({

    userId : {
        type: String,
        required: true,
        unique: true
    },
    swipedUserId:{
        type:String,
        required:true
    },
});
const Swipes = mongoose.model(swipeSchema);
export default Swipes;