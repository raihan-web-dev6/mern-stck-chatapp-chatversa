import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import { getreciversoketid } from "../soket/soket.js";
import { io } from "../soket/soket.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image = "";
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    });

    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id]
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const reciversoketid = getreciversoketid(receiver)
    if(reciversoketid){
      io.to(reciversoketid).emit("newmessage",newMessage)
    }

    res.status(200).json({
      success: true,
      newMessage
    });

  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ messages: [] });
    }

    res.status(200).json(conversation.messages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
