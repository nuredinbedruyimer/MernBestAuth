import bcrypt from "bcrypt"

export const getHashedPassword = async(password, salt)=>{
   const  hashedPassword = await bcrypt.hash(password, salt)
   return hashedPassword
}
