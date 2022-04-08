import next from 'next';
import Room from '../models/room'
import ErrorHandler from '../utils/errorHandler';
import catchAsyncError from '../middlewares/catchAsyncError';
import APIFeatures from '../utils/apiFeatures';

const allRooms = catchAsyncError(async(req,res) => {
    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();
        const apiFeatures = new APIFeatures(Room.find(), req.query)
            .search()
            .filter();
        let rooms = await apiFeatures.query;
        let filteredRoomsCount = rooms.length;
        // const rooms = await Room.find();

        apiFeatures.pagination(resPerPage);
        rooms = await apiFeatures.query.clone();
    res.status(200).json({
        success:true,
        // count:rooms.length,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })
    
})

// create new room
const newRoom = catchAsyncError(async(req,res)=>{
        const room = await Room.create(req.body);
        res.status(200).json({success:true, room})

})
// get room details
const getSingleRoom = catchAsyncError(async(req,res, next)=>{
        const room = await Room.findById(req.query.id);
        if(!room) {
            // return res.status(404).json({success:false, error:'room not found'})
            return next(new ErrorHandler('room not found', 404))
        }
        res.status(200).json({success:true, room})
}) 
// update room 
const updateRoom = catchAsyncError(async(req,res)=>{
        let room = await Room.findById(req.query.id);
        if(!room) {
            // return res.status(404).json({success:false, error:'room not found'})
            return next(new ErrorHandler('room not found', 404))
        }
        room = await Room.findByIdAndUpdate(req.query.id, req.body,{
            new: true,
            runValidators:true,
            usefindAndModify:false
        })
        res.status(200).json({success:true, room})
})
// delete room 
const deleteRoom = catchAsyncError(async(req,res)=>{
        let room = await Room.findById(req.query.id);
        if(!room) {
            // return res.status(404).json({success:false, error:'room not found'})
            return next(new ErrorHandler('room not found', 404))
        }
        await Room.remove(room);
        res.status(200).json({success:true, message:"Room is deleted"})
})

export {allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom}