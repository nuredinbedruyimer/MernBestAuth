import mongoose from "mongoose";



export const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connectted Successfully On Host : ${connect.connection.host}`)
    } catch (error) {
        console.log("Error When We Connect To MongoDB : ", error)
        //  1 --> Failure
        //  2 --> Success
        process.exit(1)
        
    }
}