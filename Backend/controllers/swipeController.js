import Conversation from "../models/conversation.js";
import Profile from "../models/register.js"
// swipeLeft


// swipeRight

export const swipeRight = async(req,res)=>{

    const {userId,swipeduser} = req.body
    // console.log(userId,swipeduser)
    const usersIds =[userId,swipeduser]
    //getting swiped users 

    const usersData = await Profile.find({ _id: { $in: usersIds } });
    

    const swipedRightCheck = usersData[1].swipedRight.filter(v =>v === userId)
    
    console.log(swipedRightCheck.length)
    //  updating current userData payload concating swipedRight and matched users

    usersData[0].swipedRight.push(swipeduser)


    // res.json(usersData)
    

  if(swipedRightCheck.length > 0){
    // it is for the already for swiped right user  
    usersData[0].matchedUsers.push(swipeduser)
    usersData[1].matchedUsers.push(userId)
    
    const saveCurrentuser = await  Profile.findByIdAndUpdate(usersData[0]._id,usersData[0])

    const saveSwipeduser = await Profile.findByIdAndUpdate(usersData[1]._id,usersData[1])

      if(saveCurrentuser && saveSwipeduser){

        const newConversation = new Conversation({
            members: [userId,swipeduser],
          });
        const conversationinit = await newConversation.save();
          
        res.json(conversationinit)
      }
      else{

        res.satus(500).json("updating users failed")

      }

  }else{
      // saving swiperight
      console.log(usersData[0])
      const saveCurrentuser = await Profile.findByIdAndUpdate(usersData[0]._id,usersData[0])
      
        if(saveCurrentuser){
          res.status(200).json(saveCurrentuser)
        }
        else{
          res.status(500).json("payload error")
        }
    }

}

