import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/index.js'




const app=express()

//middlewares
app.use(express.json({ extended: false }))
app.use(cors())
dotenv.config()
app.use('/',userRouter)


//setting up the port
const PORT=process.env.PORT||8000
const URL=process.env.MONGOURL

mongoose.connect(URL,{useNewUrlParser:true, useUnifiedTopology:true})
   .then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
   .catch((error)=>console.log(error.message))