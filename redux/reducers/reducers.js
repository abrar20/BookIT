import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import {authReducer,userReducer} from './authReducer'
const reducer =combineReducers({
    allRooms:allRoomsReducer,
    roomDetails:roomDetailsReducer,
    auth:authReducer,
    user:userReducer
})

export default reducer;