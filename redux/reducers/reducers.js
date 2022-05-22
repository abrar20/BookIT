import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import {authReducer,userReducer,forgotPasswordReducer} from './authReducer'
const reducer =combineReducers({
    allRooms:allRoomsReducer,
    roomDetails:roomDetailsReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer
})

export default reducer;