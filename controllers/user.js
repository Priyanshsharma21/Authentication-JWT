import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET, JWT_EXPIRY } = process.env




export const signUp = async(req,res)=>{
    try {
        const user = await User.create(req.body)

        res.status(201).json({success: true, user : user})
    } catch (error) {
        console.log(error)
    }
}


export const login = async(req,res)=>{
    try {
        const { email, password } = req.body

        if(!email && !password) return res.status(500).json({success : false, message : "Please enter email and password"})

        const user = await User.findOne({email}).select("+password")


        if(!user) return res.status(500).json({success : false, message : "No user found, Please SignUp first"})


        if(user.password === password){

            const token = jwt.sign({_id : user._id}, JWT_SECRET, {
                expiresIn : JWT_EXPIRY
            })

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }


            res.header("x_auth_token", token)
            res.cookie('token', token, options).json({
              success: true,
              token,
              user,
            });
            
        }

    } catch (error) {
        console.log(error)
    }
}


export const logout = async(req,res,next)=>{
    try {
        res.cookie('token',null,{
            expires : new Date(Date.now()),
            httpOnly : true
        })
    
        res.status(200).json({success:true, message : "Logout Success"})

    } catch (error) {
        console.log(error)
    }
}



export const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find()

        res.status(201).json({success: true, users : users})
    } catch (error) {
        console.log(error)
    }
}




export const getSingleUser = async(req,res)=>{
    try {
        const { id } = req.params
        const user = await User.findById(id)


        res.status(201).json({success: true, user : user})
    } catch (error) {
        console.log(error)
    }
}


export const updateUser = async(req,res)=>{
    try {
        const { id } = req.params
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })


        res.status(201).json({success: true, updatedUser : updatedUser})
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async(req,res)=>{
    try {
        const { id } = req.params
        const user = await User.findById(id)

        user.isDeleted = true
        user.save()
        

        res.status(201).json({success: true, deletedUser : user})
    } catch (error) {
        console.log(error)
    }
}

