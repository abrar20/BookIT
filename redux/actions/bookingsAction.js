import {CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_FAIL,
    BOOKED_DATES_FAIL,
    BOOKED_DATES_SUCCESS,
    MY_BOOKINGS_FAIL,
    MY_BOOKINGS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    BOOKING_DETAILS_SUCCESS,
    CLEAR_ERRORS} from '../constants/bookingConstants'
    import absoluteUrl from "next-absolute-url";
    import axios from 'axios'

export const checkBooking =(roomId,checkInDate,checkOutDate) => async(dispatch) =>{
        try {
            dispatch({
                type:CHECK_BOOKING_REQUEST
            });
            const link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`

            const {data} = await axios.get(link)
            
            dispatch({
                type:CHECK_BOOKING_SUCCESS,
                payload: data.isAvailable
            })
        } catch (error) {
            dispatch({
                type: CHECK_BOOKING_FAIL,
                payload:error.response.data.message
            })
        }
}
//fetch all booked dates
export const getBookedDates =(id) => async(dispatch) =>{
        try {
            const {data} = await axios.get(`/api/bookings/check_booked_dates?roomId=${id}`)
            
            dispatch({
                type:BOOKED_DATES_SUCCESS,
                payload: data.bookedDates
            })
        } catch (error) {
            dispatch({
                type: BOOKED_DATES_FAIL,
                payload:error.response.data.message
            })
        }
}
//fetch all my bookings 
export const myBookings =(authCookie,req) => async(dispatch) =>{
        try {
            const {origin} = absoluteUrl(req);
            const config={
                headers:{
                    cookie:authCookie
                }
            }
            const {data} = await axios.get(`${origin}/api/bookings/me`,config)
            
            dispatch({
                type:MY_BOOKINGS_SUCCESS,
                payload: data.bookings
            })
        } catch (error) {
            dispatch({
                type: MY_BOOKINGS_FAIL,
                payload:error.response.data.message
            })
        }
}
//fetch booking details
export const getBookingDetails =(authCookie,req ,id) => async(dispatch) =>{
        try {
            const {origin} = absoluteUrl(req);
            const config={
                headers:{
                    cookie:authCookie
                }
            }
            const {data} = await axios.get(`${origin}/api/bookings/${id}`,config)
            
            dispatch({
                type:BOOKING_DETAILS_SUCCESS,
                payload: data.booking
            })
        } catch (error) {
            dispatch({
                type: BOOKING_DETAILS_FAIL,
                payload:error.response.data.message
            })
        }
}

export const clearErrors =()=> async(dispatch)=>{
        dispatch({
            type:CLEAR_ERRORS
        })
}