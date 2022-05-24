import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducer";
import {checkBookingReducer,bookedDatesReducer,bookingsReducer} from './bookingReducer'
import {authReducer,userReducer,forgotPasswordReducer,loadedUserReducer} from './authReducer'
const reducer =combineReducers({
    allRooms:allRoomsReducer,
    roomDetails:roomDetailsReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    loadedUser:loadedUserReducer,
    checkBooking: checkBookingReducer,
    bookedDates:bookedDatesReducer,
    bookings:bookingsReducer

})

export default reducer;