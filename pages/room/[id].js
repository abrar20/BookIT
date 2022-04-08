import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/layout/Layout'
import RoomDetails from '../../components/room/RoomDetails'
import { getRoomDetails } from '../../redux/actions/roomsAction'
import {wrapper} from '../../redux/store'

export default function RoomDeatilsPage() {
  return (
    <Layout>
      <RoomDetails title='Room Details'/>
    </Layout>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(store=> async({req}) => {
//   await store.dispatch(getRooms(req))
// })
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req,params }) => {
  await store.dispatch(getRoomDetails(req,params.id))
})