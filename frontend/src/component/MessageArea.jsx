import React, { useEffect, useState } from 'react'
import { MdEmojiEmotions } from "react-icons/md";
import { LuImages } from "react-icons/lu";
import { FiSend } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { setSelectedUser } from '../redux/userSlice';

import { useDispatch, useSelector } from 'react-redux';
import ReceiverMessage from './ReceiverMessage';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import SenderMessage from './SenderMessage.jsx';
import { serverURL } from "../main.jsx";
import dp from '../assets/dp.webp'
import { setmessages } from '../redux/messageslice.js';

function MessageArea() {
  const { selectedUser, userData, socket } = useSelector((state) => state.user);
  const { messages } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const [showpicker, setshowpicker] = useState(false);
  const [input, setinput] = useState("");
  const [frontendimage, setFrontendImage] = useState(null);
  const [backendimage, setbackendimage] = useState(null);
  const image = React.useRef();

  const handelsendmessage = async (e) => {
    e.preventDefault();
    if (input.length == 0 && backendimage == null) {
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("message", input);

      if (backendimage) {
        formData.append("image", backendimage);
      }

      const result = await axios.post(
        `${serverURL}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      // ✅ Safe: ensure messages is an array before spreading
      dispatch(
        setmessages(Array.isArray(messages) ? [...messages, result.data.newMessage] : [result.data.newMessage])
      );

      setinput("");
      setFrontendImage(null);
      setbackendimage(null);
    } catch (error) {
      console.error(error);
    }
  };


  const onEmojiClick = (emojiData) => {
    setinput(prev => prev + emojiData.emoji);
    setshowpicker(false);
  };

  useEffect(() => {
  if (!socket) return;

  const handler = (mess) => {
    if (!mess) return;

    dispatch(
      setmessages(
        Array.isArray(messages) ? [...messages, mess] : [mess]
      )
    );
  };

  socket.on("newmessage", handler);

  return () => socket.off("newmessage", handler);
}, [socket, messages]);




  const handelimage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontendImage(URL.createObjectURL(file));
      setbackendimage(file);
    }
  };

return (
  <div
    className={`
      h-screen bg-[#0F172A] border-l-2 border-[#334155]
      w-full lg:w-[70%] relative overflow-hidden
      ${selectedUser ? "block" : "hidden"}
      lg:block
    `}
  >
    {selectedUser && (
  <div className="w-full h-[100px] bg-[#00E5FF] rounded-b-[30px] shadow-[#6482b6] shadow-lg gap-[20px] items-center px-[20px] flex">
    <IoIosArrowRoundBack
      className="bg-[#00E5FF] w-[40px] h-[40px] rounded-lg shadow-[#6482b6] shadow-lg hover:bg-[#324d77] transition-all duration-300 cursor-pointer"
      onClick={() => dispatch(setSelectedUser(null))}
    />
    <div className="w-[50px] h-[50px] rounded-full bg-white p-[2px] border-4 border-[#00E5FF] shadow-lg shadow-[#00E5FF]/50 overflow-hidden flex items-center justify-center">
      <img
        src={selectedUser?.image || dp}
        className="w-full h-full rounded-full object-cover ring-2 ring-white"
      />
    </div>
    <h1 className="font-bold text-[18px]">{selectedUser?.name}</h1>
  </div>
)}


    {!selectedUser && (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h2 className="text-gray-400 mt-2 text-sm">Welcome, to</h2>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#fdffff] via-blue-500 to-white bg-clip-text text-transparent animate-gradient">
          Chat-Versa
        </h1>
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-500 to-white bg-clip-text text-transparent animate-gradient tracking-wide">
          modern chat app
        </h3>
        <p className="text-gray-400 mt-2 text-sm">
          Select a chat to start messaging
        </p>
      </div>
    )}

    {selectedUser && (
      <div className="flex flex-col h-[calc(100%-100px)] relative">

        {/* MESSAGES */}
        <div className="flex-1 flex flex-col pt-[30px] px-[20px] pb-[160px] overflow-y-auto">
          {showpicker && (
            <div className="absolute bottom-[120px] left-[20px] z-50">
              <EmojiPicker width={250} height={350} onEmojiClick={onEmojiClick} />
            </div>
          )}

          {Array.isArray(messages) &&
            messages.map((mess, index) =>
              mess.sender === userData._id ? (
                <SenderMessage
                  key={mess._id || index}
                  image={mess.image}
                  message={mess.message}
                />
              ) : (
                <ReceiverMessage
                  key={mess._id || index}
                  image={mess.image}
                  message={mess.message}
                />
              )
            )}
        </div>

        {/* INPUT BAR */}
        <div className="absolute bottom-[20px] left-0 right-0 flex items-center justify-center lg:w-[70%] mx-auto">
          <img
            src={frontendimage}
            className="w-[80px] bottom-[100px] right-[20%] absolute rounded-lg shadow-lg shadow-[#3f595c]"
          />

          <form
            onSubmit={handelsendmessage}
            className="w-[95%] lg:w-[70%] h-[60px] bg-[#00E5FF] rounded-full shadow-lg shadow-[#3f595c] flex items-center gap-[20px] px-[20px]"
          >
            <MdEmojiEmotions
              className="w-[25px] h-[25px] text-white cursor-pointer z-[10000]"
              onClick={() => setshowpicker((p) => !p)}
            />

            <input
              type="file"
              ref={image}
              hidden
              accept="image/*"
              onChange={handelimage}
            />

            <input
              type="text"
              className="w-full h-full px-[10px] outline-none border-0 text-[19px] text-black bg-transparent"
              placeholder="Message..."
              value={input}
              onChange={(e) => setinput(e.target.value)}
            />

            <LuImages
              className="w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => image.current.click()}
            />

            {(input.length > 0 || backendimage !== null) && (
              <button type="submit">
                <FiSend className="w-[25px] h-[25px] text-white" />
              </button>
            )}
          </form>
        </div>

      </div>
    )}
  </div>
);

}

export default MessageArea;
