import { combineReducers } from "redux";
import { allRoomsReducer,newReviewReducer, roomDetailsReducer } from "./roomReducer";
import {checkBookingReducer,bookingDetailsReducer,bookedDatesReducer,bookingsReducer} from './bookingReducer'
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
    bookings:bookingsReducer,
    bookingDetails:bookingDetailsReducer,
    newReview: newReviewReducer

})

export default reducer;