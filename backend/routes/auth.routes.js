import express from "express";
import { login, logout, signup } from "../controols/auth.controler.js";

const authRouter = express.Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logout)

export default authRouter