import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Plrase enter your name'],
        maxlength:[50,"Your namecan not exceed 50 char"]
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid email address'],
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minlength:[6,'Your password must be longer than 6 char'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
//Encrypt password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

// compare user password
userSchema.methods.comparePassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
export default mongoose.models.User || mongoose.model('User',userSchema)