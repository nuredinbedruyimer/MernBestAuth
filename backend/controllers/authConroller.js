import { sendResentPasswordEmail, sendResetSuccessEmail, sendVerificationEmail, sendWellcomeEmail } from "../config/verificationEmail.js"
import {  getHashedPassword } from "../helpers/authHelper.js"
import { generateTokenAndSetCookie } from "../helpers/generateTokenAndSetCookies.js"
import { User } from "../models/userModel.js"
import { generateVerificationCode, getExpire } from "../utils/verificationCode.js";
import bcrypt from "bcrypt"
import crypto from "crypto"



// Register User And Send Verification Code for Them

export const userSignupController = async(req, res) =>{
    const {email, password, name} = req.body
    try {
        // Check Weather Name is Provided or Not

        if (!name){
            res.status(400).json({
                "Status":"Failure", 
                "Message":"Name Is Required",
            })
            return 
        }

        // Check Weather E-mail is Provided or Not
        
        if (!email){
            res.status(400).json({
                "Status":"Failure", 
                "Message":"E-mail Is Required",
            })
            return 
        }

        //  Check Weather Password is Provided or Not

        if (!password){
            res.status(400).json({
                "Status":"Failure", 
                "Message":"Password Is Required",
            })
            return 
        }

        //  Check The Existance of user with same enail already 

        const filter = {email:email}
        const existingUser = await User.findOne(filter)

        if (existingUser){
            res.status(400).json({
                "Status":"Failure", 
                "Message":"User Already Exist With This Email !!"
            })
            return 
        }

        //  hash the password and store 

        const hashedPassword = await getHashedPassword(password, 10)

        const verificationCode = generateVerificationCode()

        const expireAt = getExpire()

        const user = new User({
            name, 
            password:hashedPassword, 
            email, 
            verificationToken:verificationCode,
            verificationTokenExpireAt:expireAt,
        })
        await user.save()

        generateTokenAndSetCookie(res, user._id);

        sendVerificationEmail(user.email, verificationCode)

        res.status(201).json({
            "Status":"Success", 
            "Message":"User Registered Successfully !!!", 
            user:{
                ...user._doc, 
                password:undefined
            }
       
        })

        


        
    } catch (error) {
        res.status(500).json({
            "Message":"Internal Server Error", 
            "Error": error
        }
    )
        
    }

}

//  Verify The Email Verification


export const  verifyEmailController =  async(req, res) =>{

    const {code} =  req.body
    try {
        const filter = {
            verificationToken:code, 
            verificationTokenExpireAt:{$gt:Date.now()}
        }
        const user = await User.findOne(filter)

        if (!user){
            res.status(400).json({
                "Status":"Failure", 
                "Message":"Invalide Verification Code"
            })
            return 
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpireAt = undefined

        await user.save()

        sendWellcomeEmail(user.email, user.name)

        res.status(200).json({
            "Status":"Success", 
            "Message":"User Verified Successfully ",
            user:{
                ...user._doc,
                password:undefined
            }
        })


        
    } catch (error) {
        console.log("Error In Verifying User Email : ", error)
        res.status(500).json({
            "Status":"Failure", 
            "Message":"Internal Server Error", 
        })
        
    }
}

export const userLoginController = async(req, res) =>{

    const {email, password} = req.body

    try {
        //  Chech The existance of user 

        const user = await User.findOne({email})

        if (!user){
            res.status(400).json({
                "Status":"Success", 
                "Message":"User Does Not Exist With Given  Email"
            })
            return 
        }


        const isMatch = await bcrypt.compare(password, user.password)
        console.log("isMatch : ",isMatch)

        if (!isMatch){
            res.status(401).json({
                "Status":"Failure", 
                "Message":"Unautherizes user"
            })
            return 
        }

        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date();

        res.status(200).json({
            "Status":"Success", 
            "Message":"User Login Successfully", 
            user:{
                ...user._doc, 
                password:undefined
            }
        })
        
    } catch (error) {
        console.log("Internal server Error In Login", error)

        res.status(500).json({
            "Status":"Failure", 
            "Message":"Internal Server Error"
        })
        
    }
    
}

export const userLogoutController = async(req, res) =>{

    res.clearCookie("token");
    res.status(200).json({
        "Status": "Success", 
        "Message":"User Logout Successfully ", 
    })
    
}

export const forgotPasswordController = async(req, res)=>{
    const {email} = req.body

    try {

        const user = await User.findOne({email})

        if (!user){
            res.status(400).json({
                "Status":"Failure", 
                "Message":"User Does Not Exist With Provided Email"
            })

            return 
        }

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpire = Date.now() + (1 * 60 * 60 * 1000)

        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpireAt = resetTokenExpire

        await user.save()

        const url = `${process.env.CLIENT_URL}/forgot-password/${resetToken}`

        await sendResentPasswordEmail(email, url)

        res.status(200).json({
            "Status":"Success", 
            "Message":"We will send you link on your Email "
        })

        
    } catch (error) {
        console.log("Error In Forgot Password : ", error)

        res.status(500).json({
            "Status":"Success", 
            "Message":"Internal Server Error"
        })
        
    }
}

export const resetPasswordController =  async(req, res)=>{
    const {token} = req.params
    const {password} = req.body

    console.log(token)

    try {
        const filter = {
            resetPasswordToken:token, 
            resetPasswordTokenExpireAt:{$gt:Date.now()}
        }

        const user = await User.findOne(filter)

        console.log("User : ", user)

        if (!user){
            res.status(400).json({
                "Status":"Success", 
                "Message":"Invalide Verification Token"
            })
            return
        }

        user.password = await getHashedPassword(password, 10)


        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpireAt = undefined

        await user.save()

        sendResetSuccessEmail(user.email)
        res.status(200).json({
            "Status":"Success", 
            "Message": "Password Reset Successsfully"
        })
        
    } catch (error) {
        console.log("Error In Rester Password Controller : ", error)
        res.status(500).json({
            "Status":"Failure", 
            "Message":"Something Went Wrong"
        })
        
    }
}

export const checkAuthController = async(req, res)=>{

    try {
        const user = await User.findById(req.userID).select("-password")

        if (!user){
            res.status(401).json({
                "Status":"Failure", 
                "Message":"User Not Found"
            })
            return 
        }
        res.status(200).json({
            "Status":"Success", 
            "Message":"User Is Authenticated", 
            user
        })
    } catch (error) {
        console.log("Error In ChechAuthCotroller " , error)
        res.status(500).json({
            "Status":"Failure", 
            "Message":"Internal Server Error"
        })
        
    }


}