import express from "express";
import { login,register,updateUserById,findUserById,deleteUserById} from "../controllers/userController.js";
import {swipeRight} from "../controllers/swipeController.js"
import { isAuth } from "../middleware/Auth.js";
import passport from "passport";
import { createConversation } from "../controllers/conversationController.js";


const router = express.Router();

router.post('/user/login',login);

// Auth pending
router.post('/user/register',register)
router.put('/user/userupdate/:id',updateUserById)
router.get('/user/finduser/:id',findUserById)
router.delete('/user/deleteuser/:id',deleteUserById)
router.get('/swipeRight', swipeRight)
router.get('/gg', isAuth,createConversation)

export default router