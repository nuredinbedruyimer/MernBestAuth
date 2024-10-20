import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
    }, 
    email: {
        type: String, 
        required: [true, "E-mail is required"], 
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, "Password is required"]
    }, 
    lastLogin: {
        type: Date, 
        default: Date.now
    }, 
    isVerified: {
        type: Boolean, 
        default: false
    }, 
    resetPasswordToken: {
        type: String
    }, 
    resetPasswordTokenExpireAt: {
        type: Date
    }, 
    verificationToken: {
        type: String
    }, 
    verificationTokenExpireAt: {
        type: Date
    }, 

}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);
