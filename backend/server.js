//  Package Importing Here 

import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js"

import { connectDB } from "./database/connectDB.js";
import cookieParser from "cookie-parser";

//  Instanstiations

dotenv.config()
const app = express()

//  Do The Thing Here

const PORT = process.env.PORT || 5000

//  Config The app With Router


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute)

//  Make Sure Database Connectted Before Starting The Server 

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server Running On Port  : ${PORT}`)
    })
})