import express from "express";
import { login,register,accesscontent } from "../controllers/userController.js";
import { isAuth } from "../middleware/Auth.js";


const router = express.Router();


// router
// .route("/signup")
// .get((req, res) => {
//     res.send(`THIS IS SIGN-UP PAGE 
//     1) EMAIL MUST END WITH .com or .net (no other!)
//     2) PASSWORD MUST BE 5 MINIMUM CHARACTERS AND 20 MAX CHARACTERS WITH NO SYMBOL`)
// })
// .post( signup)
// router.get('/',getPosts);
router.post('/login',login);
// router
// .route("/login")
// .get((req, res) => {
//     res.send('THIS IS LOG-IN PAGE! PROVIDE YOUR EMAIL AND PASSWORD')
// })
// .post(login)
router.post('/register',register);

router.get('/content',isAuth,accesscontent)
export default router