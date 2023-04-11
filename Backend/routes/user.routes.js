import express from "express";
import { login,register,updateUserById,findUserById,deleteUserById } from "../controllers/userController.js";
import { isAuth } from "../middleware/Auth.js";

const router = express.Router();

router.post('/user/login',login);

// Auth pending
router.post('/user/register',register)
router.post('/user/userupdate/:id',updateUserById)
router.get('/user/finduser/:id',findUserById)
router.delete('/user/deleteuser/:id',deleteUserById)



export default router