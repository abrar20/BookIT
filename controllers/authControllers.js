import next from 'next';
import User from '../models/user'
import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';
import APIFeatures from '../utils/apiFeatures';

const registerUser = catchAsyncError(async(req,res) => {
    const{name, email, password} = req.body;
    const user = User.create({
        name,email, password,
        avatar:{public_id:"publict_ID", url:"url"}
    })
    res.status(200).json({
        success:true,
        message:"Account Registerd successfully"
    })
})



export {registerUser}