import Profile from "../models/register.js"
// swipeLeft


// swipeRight

export const swipeRight = async(req,res)=>{

    const {userId,swipeduser} = req.body
    console.log(userId,swipeduser)
    const usersIds =[userId,swipeduser]
    //getting swiped users 

    const usersData = await Profile.find({ _id: { $in: usersIds } });
  

    const swipedRightCheck = usersData[1].swipedRight.filter(v=> v.swipedUserId === userId)
    
    console.log(swipedRightCheck)
    //  updating current userData payload to swiped Right

    

    // if(swipedRightCheck){
    // // it is for the already for swiped right user  
    //  userData.matchedUsers.push({userid:userId})
      
    //  const savepayload = await Profile.findByIdAndUpdate(userData._id,userData)

    //     if(savepayload){
    //         console.log(savepayload)
    //         res.status(200).json({
    //             message: "succesfully swiped right ",

    //         })
    //     }
    //     else{
    //         res.status(500).json({
    //             message:"payload me error"
    //         })
    //     }
    

    // }else{}

}

