import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import {createRoomReview} from '../../../controllers/roomController';
import {isAuthenticatedUser} from '../../../middlewares/auth'
import onError from '../../../middlewares/error'
const handler = nc({onError});
dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview)

export default handler;