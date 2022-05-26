import Booking from '../models/booking';
import ErrorHandler from '../utils/errorHandler';
import Moment from 'moment'
import {extendMoment} from 'moment-range'
import catchAsyncError from '../middlewares/catchAsyncError';
const moment = extendMoment(Moment);
// create new booking  => /api/bookings
const newBooking = catchAsyncError(async(req,res) =>{
    const {room,checkInDate,checkOutDate,daysOfStay,amountPaid,paymentInfo} = req.body;
    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paidAt: Date.now(),
        paymentInfo
    })
    res.status(200).json({
        success:true,
        booking
    })
})
// Check room booking availability => /api/bookings/check
const checkRoomBookingsAvailability = catchAsyncError(async(req,res) =>{
    let {roomId, checkInDate,checkOutDate} =req.query;
    checkInDate = new Date(checkInDate)
    checkOutDate = new Date(checkOutDate)
    const bookings = await Booking.find({
        room: roomId,
        $and:[{
                checkInDate:{
                $lte:checkOutDate
            }},
            {
                checkOutDate: {$gte: checkInDate}
        }]
    })
    // check if there is any booking available
    let isAvailable;
    if(bookings && bookings.length === 0){
        isAvailable= true
    }else{ isAvailable = false}
    res.status(200).json({
        success:true,
        isAvailable
    })
})
// Check booked dates of a room => /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncError(async(req,res) =>{
    const {roomId} = req.query;
    const bookings = await Booking.find({room: roomId})

    let bookedDates = [];
    const timeDifference = moment().utcOffset() / 60;
    console.log(timeDifference);
    bookings.forEach(booking => {
        const checkInDate= moment(booking.checkInDate).add(timeDifference,'hours')
        const checkOutDate= moment(booking.checkOutDate).add(timeDifference,'hours')
        const range = moment.range(moment(checkInDate),moment(checkOutDate))
        console.log(range);
        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates)
    })
    res.status(200).json({
        success:true,
        bookedDates
    })
})
// Fetch All My Bookings => /api/bookings/me
const myBookings = catchAsyncError(async(req,res) =>{
    const bookings = await Booking.find({user: req.user._id}).populate({
        path:'room',
        select:'name pricePerNight images'
    }).populate({
        path:'user',
        select: 'name email'
    })

    res.status(200).json({
        success:true,
        bookings
    })
})
// get  Booking details => /api/bookings/:id
const getBookingDetails = catchAsyncError(async(req,res) =>{
    const booking = await Booking.findById(req.query.id).populate({
        path:'room',
        select:'name pricePerNight images'
    }).populate({
        path:'user',
        select: 'name email'
    })


    res.status(200).json({
        success:true,
        booking
    })
})



export {newBooking,checkRoomBookingsAvailability,checkBookedDatesOfRoom,myBookings, getBookingDetails}