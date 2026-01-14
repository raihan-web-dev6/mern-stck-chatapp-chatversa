import express from "express";
import isAuth from "../midelwears/isnAuth.js";
import { upload } from "../midelwears/multer.js";
import { getMessages, sendMessage } from "../controols/message.controler.js";

const messagerouter = express.Router();

messagerouter.post("/send/:receiver",isAuth,upload.single("image"),sendMessage)
messagerouter.get("/get/:receiver",isAuth,getMessages)

export default messagerouter