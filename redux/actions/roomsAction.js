import axios from "axios"
import { ALL_ROOMS_FAIL, ALL_ROOMS_SUCCESS, CLEAR_ERRORS,ROOM_DETAILS_FAIL,ROOM_DETAILS_SUCCESS } from "../constants/roomConstants"
import absoluteUrl from "next-absolute-url";

export const getRooms =(req, currentPage = 1, location ='') => async(dispatch) =>{
    const {origin} = absoluteUrl(req)
    try {
        const {data} = await axios.get(`${origin}/api/rooms?page=${currentPage}&loaction=${location}`);
        dispatch({
            type:ALL_ROOMS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getRoomDetails =(req,id) => async(dispatch) =>{
    const {origin} = absoluteUrl(req)
    try {
        const {data} = await axios.get(`${origin}/api/rooms/${id}`);
        dispatch({
            type:ROOM_DETAILS_SUCCESS,
            payload: data.room
        })
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}