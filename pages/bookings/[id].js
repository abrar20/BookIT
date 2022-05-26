import React from 'react'
import Layout from '../../components/layout/Layout'
import { getSession } from 'next-auth/react'
import BookingDetails from '../../components/booking/BookingDetails'
import {wrapper} from '../../redux/store'
import { getBookingDetails } from '../../redux/actions/bookingsAction'

const BookingDetailsPage = () => {
  return (
    <Layout title='My Bookings'>
        <BookingDetails/>
    </Layout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps( store => async({req, params}) =>{
    const session = await getSession({req})
    if(!session){
        return{
            redirect:{
                destination:'/login',
                permanent:false
            }
        }
    }
    await store.dispatch(getBookingDetails(req.headers.cookie, req, params.id))
})
export default BookingDetailsPage
