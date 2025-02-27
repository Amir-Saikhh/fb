import { Router } from "express";
import {
  
  ForgetPasswordOtpController,
  LoginController,
  LogoutController,
  registerController,
  UpdatePasswordController,
  VerifyOtpController,
} from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", LoginController);
userRouter.get("/logout", LogoutController);
userRouter.post("/send-otp", ForgetPasswordOtpController);
userRouter.post("/verify-otp",VerifyOtpController)
userRouter.post("/reset-password",UpdatePasswordController)
export default userRouter;
