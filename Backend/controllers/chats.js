import Messages from "../models/messages.js";

/// retriving Chats

export const retriveConvs = async (req,res)=>{

    const conversationId = req.params.id
    if(conversationId){
    const messages = await Messages.find({conversationId})

        if(messages){
            res.status(200).json(messages)
        }else{
            res.status(500).json("Failed to fetch messages")
        }
    }else{
        res.status(400).json("Check params")
    }
} 

////////////////////
// posting a message
////////////////////

export const Sendmessage = async (req,res)=>{

    const payload = req.body

    if(payload){

        const newMessages = new Messages({
            conversationId: payload.conversationId,
            sender:payload.sender,
            text:payload.text
        });

        const messageSaved = await newMessages.save()

        if(messageSaved){
            res.status(200).json("Done")
        }else{
            res.status(400).json("Something went wrong")
        }

    }else{
        res.status(400).json("i think its past yous mistake")
    }


}