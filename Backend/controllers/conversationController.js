
// Creating conversation must be done when it is swiped
// Creation is done while swipes
/////////////////////////////////////////////////////////////////////////////////////////////////

// get all conversation according to userId

import Conversation from "../models/conversation.js"

export const fetchConversation = async (req,res)=>{
  
   const userId = req.params.id

   if(userId){

      const conservations = await Conversation.find({
         members:{$in: userId}
      });
      if(conservations) {
         res.status(200).json(conservations)
      }else{
         res.status(400).json("Failed to get convs")
      }
   }
   else{
      res.status(400).json("userId not found ")
   }

}


