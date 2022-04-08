/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    DB_LOCAL_URI: 'mongodb+srv://abrarbackend:abrarbackend@cluster0.aekzb.mongodb.net/Bookit?retryWrites=true&w=majority'
    // DB_LOCAL_URI: 'mongodb://localhost:27017/bookit'
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
