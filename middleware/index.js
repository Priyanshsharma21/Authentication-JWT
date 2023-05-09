import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import User from '../models/user.js'
dotenv.config()

const { JWT_SECRET } = process.env

export const isLoggedIn = async(req,res,next)=>{
    try {
        // const token = req.header("Authorization")?.replace("Bearer ", " ")  || req.cookies.token || req.headers.authorization.split(" ")[1] 
        const token = req.headers.authorization.split(" ")[1] 

        
        if(!token) return res.status(404).json({Message : "Token Not Found"})

        const decoded = jwt.verify(token, JWT_SECRET)

        console.log(decoded._id)

        const thisIsThatUser = await User.findById(decoded._id)

        // console.log(thisIsThatUser)
        req.user = thisIsThatUser

        next()

    } catch (error) {
        console.log(error)
    }
}