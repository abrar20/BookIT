import next from 'next';
import User from '../models/user'
import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';
import sendEmail from '../utils/sendEmail'
import cloudinary from 'cloudinary'
import absoluteUrl from 'next-absolute-url'
import crypto from 'crypto'
//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const registerUser = catchAsyncError(async(req,res) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'bookit/avatars',
        width:'150',
        crop:'scale'
    })
    const{name, email, password} = req.body;
    const user = User.create({
        name,email, password,
        avatar:{public_id:result.public_id, url:result.secure_url}
    })
    res.status(200).json({
        success:true,
        message:"Account Registerd successfully"
    })
})
// Current profile user api/me 
const currentUserProfile = catchAsyncError(async(req,res) => {
    const user = await User.findById(req.user._id)
    res.status(200).json({
        success:true,
        user
    })
})
// Update profile user api/me/update 
const updateUserProfile = catchAsyncError(async(req,res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name;
        user.email = req.body.email;
        if(req.body.password) user.password = req.body.password
    }
    //update avatar
    if(req.body.avatar !== ''){
        const image_id= user.avatar.public_id;
        //Delete user previous avatar
        await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'bookit/avatars',
            width:'150',
            crop:'scale'
        })
        user.avatar = {
            public_id:result.public_id,
            url:result.secure_url
        }
    }
    await user.save();
    res.status(200).json({
        success:true
    })
})

// Forgot password =>  api/password/forgot 
const forgotPassword = catchAsyncError(async(req,res,next) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return next(new ErrorHandler('User not found with this email',404))
    }
    //get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false})

    // create reset password url
    // const resetUrl = `${req.get('host')}` this (get)way does not accept in nextjs so we use next-absolute-url

    //get origin
    const {origin} = absoluteUrl(req)

    // create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`
    const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`

    try{
        await sendEmail({
            email: user.email,
            subject: 'BookIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }

})
// reset password =>  api/password/reset/:token 
const resetPassword = catchAsyncError(async(req,res,next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')
    const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})
    if(!user){
        return next(new ErrorHandler('Password rest Token is invalid or has been expired',404))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Passwords does not matched',404))
    }

    //Set up new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined

    await user.save();
    res.status(200).json({success: true,message:"Password Updated Successfully"})
    

})



export {registerUser, currentUserProfile, updateUserProfile, forgotPassword,resetPassword}
