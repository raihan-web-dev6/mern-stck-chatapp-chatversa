import React, { useState, useRef } from 'react'
import dp from '../assets/dp.webp'
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../main';
import { setUserData } from '../redux/userSlice';

function Profile() {
  const userData = useSelector((state) => state.user?.userData || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [saving, setsaving] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [frontendimage, setfrontendimage] = useState(userData?.image || dp);
  const [backendimage, setbackendImage] = useState(null);

  const image = useRef(null);

  const handelimage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setbackendImage(file);
    setfrontendimage(URL.createObjectURL(file));
  };

  const handelprofile = async (e) => {
    e.preventDefault();
    setsaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (backendimage) {
        formData.append("image", backendimage);
      }

      const result = await axios.put(
        `${serverURL}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user)); // ✅ FIX
      navigate("/");
    } catch (error) {
      console.log("Error updating profile:", error);
    } finally {
      setsaving(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-[#0F172A] flex flex-col justify-center items-center'>

      <div
        className='fixed top-[20px] left-[20px] cursor-pointer'
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className='bg-[#00E5FF] w-[40px] h-[40px] rounded-lg shadow-[#6482b6] shadow-lg hover:bg-[#324d77] transition-all duration-300' />
      </div>

      <div className='w-[200px] h-[200px] bg-white rounded-full border-4 border-[#00E5FF] shadow-[#6482b6] shadow-lg overflow-hidden relative justify-center items-center'>
        <img
          src={frontendimage || dp}
          alt="profile"
          className="w-full h-full object-cover"
        />
        <IoCameraOutline
          onClick={() => image.current.click()}
          className='absolute bottom-4 right-4 w-[35px] h-[35px] text-white cursor-pointer'
        />
      </div>

      <form
        className='w-[95%] h-[400px] max-w-[500px] flex flex-col gap-[40px] items-center justify-center'
        onSubmit={handelprofile}
      >
        <input
          type="file"
          accept='image/*'
          ref={image}
          hidden
          onChange={handelimage}
        />

        <input
          type="text"
          placeholder='Enter your name.'
          className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          readOnly
          className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] outline-none"
          value={userData?.username || ""}
        />

        <input
          type="email"
          readOnly
          className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] outline-none"
          value={userData?.email || ""}
        />

        <button
          className="w-[200px] h-[50px] bg-[#00E5FF] rounded-lg shadow-[#6482b6] shadow-lg text-[#1E293F] font-bold text-[18px] hover:bg-[#324d77] hover:text-[#E2E8F0] transition-all duration-300"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
