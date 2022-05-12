import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect'

export default NextAuth({
    // session:{
    //     jwt:true
    // },
    session:{
        strategy:'jwt'
    },
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            // credentials: {
            //     email: { label: "Email", type: "email", placeholder: "example@exam.com" },
            //     password: {  label: "Password", type: "password" }
            //   },
            async authorized(credentails){
                dbConnect();
                const {email,password} = credentails;

                if(!email || !password){
                    throw new Error('Please enter email and password')
                }
                //find user in the database
                const user = await User.findOne({email}).select('+password')

                if(!user){
                    throw new Error('Invalid Email or password')
                }
                //chaeck if password is correct
                const isPasswordMatched= await user.comparePassword(password);

                if(!isPasswordMatched){
                    throw new Error('Wrong Password')
                }
                return Promise.resolve(user);
            }
        })
    ],
    callbacks:{
        jwt: async ({token, user})=>{
            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async ({session, user})=>{
            session.user = user.user;
            return Promise.resolve(session)
        }
    }
})