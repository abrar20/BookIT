import Head from 'next/head';
import Image from 'next/image';
import React,{useEffect,useState} from 'react'
import DatePicker from 'react-datepicker'
import { useRouter } from 'next/router';
import "react-datepicker/dist/react-datepicker.css";
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/roomsAction';
import {checkBooking,getBookedDates} from '../../redux/actions/bookingsAction';
import {CHECK_BOOKING_RESET} from '../../redux/constants/bookingConstants';
import RoomFeatures from './RoomFeatures';
import axios from 'axios';

const RoomDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState()
  const [checkOutDate, setCheckOutDate] = useState()
  const [daysOfStay, setDaysOfStay] =useState();
  const {dates} = useSelector(state => state.bookedDates)
  const {room, error} = useSelector(state => state.roomDetails)
  const {user} = useSelector(state => state.loadedUser)
  const {available,loading} = useSelector(state => state.checkBooking)
  console.log(room);
  const {id} = router.query;

  const excludedDates =[];
  dates.forEach(date => {
    excludedDates.push(new Date(date))
  })
  useEffect(()=>{
    dispatch(getBookedDates(id))
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }
  },[dispatch,id])
  const onChange =(dates) =>{
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate)

    if(checkInDate && checkOutDate){
    //   console.log(checkInDate.toISOString(),'In');
    // console.log(checkOutDate.toISOString(),'Out');
    //calculate days of stay
    const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1) // milleseconds in 24 hours
    console.log(days,'days');
    setDaysOfStay(days)

    dispatch(checkBooking(id,checkInDate.toISOString(),checkOutDate.toISOString()))
    }
  }
  
  const newBookingHandler =async() =>{
    const bookingData = {
      room: router.query.id,
      checkInDate,checkOutDate,
      daysOfStay,amountPaid:90,
      paymentInfo:{
        id:"STRIPE_",
        status:"STATUS"
      }
    }

    try{
      const config ={
        headers:{
          'Content-Type':'application/json'
        }
      }
      const {data} = await axios.post('/api/bookings',bookingData,config)
      console.log(data);
    }catch(error){
      console.log(error.response);
    }
  }
  return (
    <>
    <Head><title>{room.name} - BookIT</title></Head>
    <div className="container container-fluid">
        <h2 className='mt-5'>{room.name}</h2>
        <p>{room.address}</p>
        <div className="ratings mt-auto mb-3">
            <div className="rating-outer">
              <div className="rating-inner" style={{width: `${(room.ratings /5) * 100}%`}}></div>
            </div>
            <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
          </div>

          <Carousel hover='pause'>
            {room?.images?.map(image =>(
              <Carousel.Item key={image.public_id}>
                <div style={{width:'100%', height: '440px'}}>
                <Image className='d-block m-auto' src={image.url} alt ={room.name} layout="fill"/>
                </div>
              </Carousel.Item>
            )) }
          </Carousel>

          <div className="row my-5">
              <div className="col-12 col-md-6 col-lg-8">
                  <h3>Description</h3>
                  <p>{room.description}.</p>

                  <RoomFeatures room={room}/>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                  <div className="booking-card shadow-lg p-4">
                    <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>
                    <hr/>
                    <p className='mt-5 mb-3'>
                      Pick Check In & Check Out Date
                    </p>
                    <DatePicker
                    className='w-100'
                    selected={checkInDate}
                    onChange={onChange}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    selectsRange
                    excludeDates={excludedDates}
                    inline/>
                    {available === true ? 
                    <div className='alert alert-success my-3 font-weight-bold'>
                      Room is Available. Book now</div> : <div className='alert alert-danger my-3 font-weight-bold'>
                      Room is not Available. Try different dates</div>}
                      {available && !user && <div className='alert alert-danger my-3 font-weight-bold'>
                      Log in to book room.</div>}
                    {available && user &&<button className="btn btn-block py-3 booking-btn" onClick={newBookingHandler}>Pay</button>}

                  </div>
              </div>
          </div>


          <div className="reviews w-75">
            <h3>Reviews:</h3>
            <hr />
                <div className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>
                    <p className="review_user">by John</p>
                    <p className="review_comment">Good Quality</p>

                    <hr />
                </div>

                <div className="review-card my-3">
                  <div className="rating-outer">
                      <div className="rating-inner"></div>
                  </div>
                  <p className="review_user">by John</p>
                  <p className="review_comment">Good Quality</p>

                  <hr />
              </div>
        </div>
    </div>
    </>
  )
}

export default RoomDetails