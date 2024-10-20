import express from "express";
import { checkAuthController, forgotPasswordController, resetPasswordController, userLoginController, userLogoutController, userSignupController, verifyEmailController } from "../controllers/authConroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router()

router.get("/check-auth", authMiddleware, checkAuthController)

router.post("/signup", userSignupController)
router.post("/verify-email", verifyEmailController)
router.post("/login", userLoginController)
router.post("/logout", userLogoutController)
router.post("/forgot-password", forgotPasswordController)

router.post("/reset-password/:token", resetPasswordController)




export default router