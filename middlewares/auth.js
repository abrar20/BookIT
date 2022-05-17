import catchAsyncError from './catchAsyncError';
import{getSession} from 'next-auth/react'
import ErrorHandler from '../utils/errorHandler';

const isAuthenticatedUser = catchAsyncError(async (req,res,next) =>{
    const session = await getSession({req})
    console.log(session);
    if(!session){
        return next(new ErrorHandler('Login first to access this resoures',401))
    }
    req.user = session.user;
    next()
})

export {isAuthenticatedUser}