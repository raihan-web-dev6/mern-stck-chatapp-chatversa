import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userroutes.js";
import messagerouter from "./routes/message.routes.js";
import { app, server } from "./soket/soket.js";



dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messagerouter)

server.listen(PORT, () => {
  console.log("🚀 Server is running on port " + PORT);
  
});
