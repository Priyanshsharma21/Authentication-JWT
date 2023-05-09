import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET,JWT_EXPIRY } = process.env;

const {
    Schema,
    model
} = mongoose


const userSchema = new Schema({
    firstName : {
        type : String,
        required : [true, 'Please enter your full name'],
        maxLength : [40, 'Name should be less than 40 characters'],
    },

    lastName : {
        type : String,
        required : [true, 'Please enter your full name'],
        maxLength : [40, 'Name should be less than 40 characters'],
    },

    mobile : {
        type: Number,
        required : [true, 'Please enter Mobile Number']
    },

    gender : {
        type: String,
        required : [true, 'Please enter gender']
    },
    age : {
        type: Number,
        required : [true, 'Please enter Age']
    },


    email : {
        type : String,
        required : [true, 'Please enter your email address'],
        unique : true,
    },

    password : {
        type: String,
        required : [true, 'Please enter your password'],
        minLength : [7,'Password length should be greater than 7 characters'],
        select : false,        
    },

    isDeleted : {
        type : Boolean,
        default : false,
    }

}, {timestamps: true})




const User = model("User", userSchema)
export default User