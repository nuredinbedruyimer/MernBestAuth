import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next)=>{
    const token  = req.cookies.token 

    if (!token){
        res.status(401).json({
            "Status":"Failure", 
            "Message":"Token Is Not Found"
        })

        return

    }

   try {

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    
    if (!decode){
        res.status(401).json({
            "Status":"Failure", 
            "Message":"Token Is Not Valid"
        })

        return

    }

    req.userID = decode.userID

    next()  

    


    
   } catch (error) {
    console.log("Error In Auth Middleware : ", error)
    res.status(500).json({
        "Status":"Failure", 
        "Message":"Internal Server Error ", 
    })
    
   }
    
}