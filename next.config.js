/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    // DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
    DB_LOCAL_URI: 'mongodb+srv://abrarbackend:abrarbackend@cluster0.aekzb.mongodb.net/Bookit?retryWrites=true&w=majority',
    CLOUDINARY_CLOUD_NAME:'diw9lfbdd',
    CLOUDINARY_API_KEY:'495622962731182',
    CLOUDINARY_API_SECRET:'uv_ejlC6WCy1zUpJWFciWfID1cE',
    STRIPE_API_KEY:'pk_test_51L3DokLKAlMkA3TmO5iKmqqLiwsmyVm5lwXoQUxFc0nGleAqX8vxa5qJnkzcQ1zKxv5C5VuQBnDI24WLpyaPR92Q00UOAbU8OB',
    STRIPE_SECRET_KEY:'sk_test_51L3DokLKAlMkA3Tm844X1xO2MD35zQzM2g6fG35oxl7Wp4PMoV3gxoTmJvDAheFXIByDgBnF4wqUELCgarwt6yAn00WWtI5NKC',
    STRIPE_WEBHOOK_SECRET:'whsec_e95e0d78dc3abdae04580e348f233bef45255d5e425f989af58846318d83bebb',
    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "572a7c0f45397d",
    SMTP_PASSWORD: "28f17bfecf5541",
    SMTP_FROM_EMAIL: "nesma_hama@hotmail.com",
    SMTP_FROM_NAME: "BookIT",
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
