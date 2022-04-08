import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout/Layout'
import { getRooms } from '../redux/actions/roomsAction'

import Search from '../components/Search'

export default function SearchPage() {
  return (
    <Layout title='Search Rooms'>
      <Search/>
    </Layout>
  )
}