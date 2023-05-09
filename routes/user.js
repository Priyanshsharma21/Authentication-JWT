import express from "express";
import { signUp,login,getAllUsers,getSingleUser, updateUser,deleteUser,logout } from "../controllers/user.js";
import { isLoggedIn } from "../middleware/index.js";

const router= express.Router();

router.post('/signup', signUp)
router.post('/login', login)

router.get('/logout',isLoggedIn, logout)

router.get('/users',isLoggedIn, getAllUsers)
router.get('/user/:id',isLoggedIn, getSingleUser)
router.put('/user/:id',isLoggedIn, updateUser)
router.delete('/user/:id',isLoggedIn, deleteUser)




export default router;

