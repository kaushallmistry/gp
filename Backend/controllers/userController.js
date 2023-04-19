import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";
import Profile from "../models/register.js";
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Profile.findOne({ email });
        if (user) {
            const pay_load = {
                email : user.email,
                id : user.id
            }
            console.log(pay_load);
                const token = jwt.sign(pay_load, "secret")

                res.status(200).json({
                    message : `LOGGED IN SUCCESSFULLY | TOKEN DURATION - 5 MINS`,
                    token:token,
                })
     
        }else{
            res.status(404).json({status : 404, message : 'Either wrong credentials or user not exists!'})
        }
    } catch (error) {
        res.status(400).send('SOMETHING WENT WRONG!')
    }
}
export const register = async (req, res) => {

  const {username,bio,email, password,games,matchedUsers,swipedLeft,swipedRight,avatar} = req.body;
  
    try {
      if (!email || !password ) {
        
        return res.status(400).json({ message: 'Provide Profile Credentials' });

      }
      
      const isEmailExist = await Profile.findOne({ email });
      const isUsernameExist = await Profile.findOne({username});
      
      if (isEmailExist || isUsernameExist) {
          res.status(400).json({
              message : 'Bad Request',
              error : `${isEmailExist.email || isUsernameExist.username} Already Exists`
          })
      }
      else{
            const addData = await Profile.create({
                email : email,
                password : password,
                username : username,
                avatar:avatar,
                bio: bio,
                games: games,
                matchedUsers: matchedUsers,
                swipedLeft: swipedLeft,
                swipedRight: swipedRight
            })
            if(addData){
            res.status(201).send(addData)
            }
            else{
                res.status(400).json({
                    error : 'UNFORTUNATELY ERROR Occured!'
                })
            }    
      }
    } 
    catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Server error' });
    }
}

export const updateUserById = async (req, res) =>{
    const userId = req.params.id

    const payload = req.body

    const status =  await Profile.findByIdAndUpdate(userId,payload,{new :true})

    if(status){
        res.status(200).json(status);
    }
    else{
        res.status(400).json({ error: 'Failed to update user' });
    }

}

export const findUserById = async (req, res) =>{
    const userId = req.params.id

    const status =  await Profile.findById(userId)

    if(status){
        res.status(200).json(status);
    }
    else{
        res.status(400).json({ error: 'Failed to find user' });
    }

}

export const deleteUserById = async (req, res) =>{
    const userId = req.params.id

    const status =  await Profile.findByIdAndRemove(userId)

    if(status){
        res.status(200).json(status);
    }
    else{
        res.status(400).json({ error: 'Failed to Delete User' });
    }

}