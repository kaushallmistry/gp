import jwt from "jsonwebtoken"

var cookieExtractor = function(req) {
    
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['authToken'];

    }

    return token;
};

export const isAuth = (req,res,next) => {
    const token = cookieExtractor(req);
    
    if(token){
    const match = jwt.verify(token,"secret")

        if(!match || !token){
            
            return res.send("auth wrong");
        }
        else{
            console.log(match)
            next();
         }
    }
    else{
        return res.send("AuthCredential Not Provided")
    }
}