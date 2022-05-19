import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { updateUserProfile} from '../../../controllers/authController';
import onError from '../../../middlewares/error'
import {isAuthenticatedUser} from '../../../middlewares/auth'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticatedUser).put(updateUserProfile)

export default handler;