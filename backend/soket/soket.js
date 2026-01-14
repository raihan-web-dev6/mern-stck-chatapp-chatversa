import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  }
});
export const usersoketmap ={}
export const getreciversoketid = (reciver) => {
  return usersoketmap[reciver]
}
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    usersoketmap[userId] = socket.id;
  }
io.emit("getonlineuser", Object.keys(usersoketmap));


  console.log("🟢 User connected:", socket.id);

  socket.on("disconnect", () => {
    delete usersoketmap[userId];
    io.emit("getonlineuser", Object.keys(usersoketmap));
    console.log("🔴 User disconnected:", socket.id);
  });
});

export { app, server, io };





//"🟢 User connected:"