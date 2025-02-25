import { Router } from "express";
import {
  
  ForgetPasswordOtpController,
  LoginController,
  LogoutController,
  registerController,
  VerifyOtpController,
} from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", LoginController);
userRouter.get("/logout", LogoutController);
userRouter.post("/send-otp", ForgetPasswordOtpController);
userRouter.post("/verify-otp",VerifyOtpController)
export default userRouter;
