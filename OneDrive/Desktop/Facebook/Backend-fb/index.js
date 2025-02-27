import express from 'express';
import cors from 'cors';
import dataBaseConnection from './config/dbConnect.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
dotenv.config({
    path: '.env'
})
dataBaseConnection()
const app = express()
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN_URL, // Update with frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// app.use(cors({
//     origin: process.env.FRONTEND_ORIGIN_URL,
//     credentials: true,
// }))

app.use('/api/v1/users',userRouter)
app.listen(process.env.PORT || 8080,()=>{
    console.log(`server listening on ${process.env.PORT}`);
})