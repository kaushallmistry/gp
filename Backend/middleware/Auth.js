
import passport from "passport"
export const isAuth = (req,res,next) => {

    try {
        return (req, res ,next) => {
            passport.authenticate('jwt',{session : false}, (err, user) => {
                if(err){
                    res.status(404).json({
                        error : '404',
                        message : 'Token either expired or not valid!'
                    })
                }else{
                   
                    req.user = user;
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