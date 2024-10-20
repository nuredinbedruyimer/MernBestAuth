import { mailtrapCliet, sender } from "./mailtrapConfig.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./verificationEmailTemplate.js"


export const sendVerificationEmail =  async(email, verificationToken)=>{

    const receipent = [{email}]

    try {
        
        const response = await mailtrapCliet.send({
            from:sender, 
            to:receipent, 
            subject:"Verify Your Email ",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), 
            category:"Email Verification",
        })

        console.log("Email Verification Send Successfullly !!", response)
    } catch (error) {
        console.log("Error In Sending Veification Email : ", error)
        
    }

}

export const  sendWellcomeEmail = async(email, name)=>{
    const receipent = [{email}]

    try {
        const response = await mailtrapCliet.send({
            from:sender, 
            to:receipent, 
            template_uuid: "11a3d0c8-5305-48f8-894e-e00d69cf25e3",
            template_variables: {
                "company_info_name": "NureAuth",
                "name": name
              }

        })
        console.log("Welcome E-mail Is Send Successfully !!", response)
    } catch (error) {

        console.log("Error In Welcome Email : ", error)
        
    }
}

export const sendResentPasswordEmail = async(email, url) =>{

    const receipent = [{email}]

    try {
        
        const response = await mailtrapCliet.send({
            from:sender, 
            to:receipent, 
            subject:"Reset Password ",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url), 
            category:"Reset Password",
        })

        console.log("Reset Password Email Sending Success !!", response)
    } catch (error) {
        console.log("Error In Reset Email : ", error)
        
    }

}

export const  sendResetSuccessEmail = async (email)=>{

    const receipent = [{email}]

    try {
        
        const response = await mailtrapCliet.send({
            from:sender, 
            to:receipent, 
            subject:"Reset Password Successfully !!!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE, 
            category:"Reset Password Success",
        })

        console.log("Reset Password Email Sending Success !!", response)
    } catch (error) {
        console.log("Error In Reset Email : ", error)
        
    }


}

