
import passport from "passport";


export const cookieExtractor = (req) => {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['authToken'];
    }
    return token;
}

export const isAuth = () => {
    try {
        return (req, res ,next) => {

            passport.authenticate('jwt',{session : false}, (err, user) => {
                console.log("hisdsukd");
                if(err){
                    res.status(404).json({
                        error : '404',
                        message : 'Token either expired or not valid!'
                    })
                }else{
                    // if(roles.includes(user.role)){
                    //     req.user = user;
                    //     next();
                    // }else{
                    //     res.status(404).json({
                    //         error : '404',
                    //         message : 'User Not Authorized!'
                    //     })
                    // }
                    res.send("cookie is working")
                    next();

                   
                }
            })(req, res, next)
        }    
    } catch (error) {
        res.status(404).json({
            error : error
        })
    }
    
}