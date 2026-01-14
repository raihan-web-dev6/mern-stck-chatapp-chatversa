import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { selectedUser } from "../redux/userSlice";

function ReceiverMessage({ image, message, receiverAvatar }) {
  const scroll = useRef(null);
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleScroll = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={scroll} className="flex items-end gap-2 mb-3 mr-auto max-w-[600px] relative">

      {/* PROFILE PIC (LEFT SIDE) */}
      <div className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white shadow-md">
        <img
          src={selectedUser.image || dp}
          alt="profile"
          className="w-full h-full rounded-full"
        />
      </div>

      {/* MESSAGE BUBBLE */}
      <div
        className="w-fit max-w-[500px] px-5 py-3 bg-gradient-to-br from-[#9bd2fa] to-[#2a8ef3] text-gray-800 rounded-2xl rounded-br-md shadow-lg shadow-slate-400/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl break-words whitespace-pre-wrap overflow-hidden"
      >
        {image && (
          <img
            src={image}
            alt="sent"
            className="w-[120px] rounded-lg mb-2"
            onLoad={handleScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>

    </div>
  );
}

export default ReceiverMessage;
