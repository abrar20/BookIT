/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    DB_LOCAL_URI: 'mongodb+srv://abrarbackend:abrarbackend@cluster0.aekzb.mongodb.net/Bookit?retryWrites=true&w=majority',
    // DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
    CLOUDINARY_CLOUD_NAME:'diw9lfbdd',
    CLOUDINARY_API_KEY:'495622962731182',
    CLOUDINARY_API_SECRET:'uv_ejlC6WCy1zUpJWFciWfID1cE',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
