import express from "express";
import { editprofile, getcurrentuser, getotherusers } from "../controols/usercontroler.js";
import isAuth from "../midelwears/isnAuth.js";
import { upload } from "../midelwears/multer.js";

const userRouter = express.Router();

userRouter.get("/current",isAuth,getcurrentuser)
userRouter.get("/others",isAuth,getotherusers)
userRouter.put("/profile",isAuth,upload.single("image"),editprofile)

export default userRouter