import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { serverURL } from '../main';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  let [Username, setUsername] = useState("");
  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();

  const handlesignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(`${serverURL}/api/auth/signup`,{
        // signup data
        username:Username,
        email:Email,
        password:Password

      },{withCredentials:true});
      dispatch(setUserData(result.data));
      navigate("/profile");
      setEmail("");
      setPassword("");
      setUsername("");
      setLoading(false);
    } catch (error) {
      console.log("Signup Error:", error);
      setLoading(false);
    }
  }
  let navigate = useNavigate();

  return (
    <div className="w-full h-[100vh] bg-[#0F172A] flex justify-center items-center">
      <div className="w-full max-w-[500px] h-[600px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg flex flex-col items-center gap-[20px] py-[20px]">
        
        {/* Header */}
        <div className="w-full h-[200px] bg-[#00E5FF] rounded-b-[30%] shadow-[#6482b6] shadow-lg flex items-center justify-center">
          <h1 className="text-[#E2E8F0] font-bold text-[29px]">
            Welcome to <span className="text-[#022e95]">ChatVerse</span>
          </h1>
        </div>

        {/* Form Inside the Same Box */}
        <form className="w-full px-[30px] flex flex-col gap-[20px] mt-[20px]"onSubmit={handlesignup}>
          <input
            type="text"
            placeholder="Username"
            className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] outline-none"
            onChange={(e) => setUsername(e.target.value)} value={Username}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] outline-none"
            onChange={(e) => setEmail(e.target.value)} value={Email}
          />

          {/* Password with eye icon */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] pr-[45px] outline-none
              "
              onChange={(e) => setPassword(e.target.value)} value={Password} 
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[15px] top-[50%] -translate-y-1/2 text-[#E2E8F0] cursor-pointer text-[18px] select-none"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button className="w-full h-[50px] bg-[#00E5FF] rounded-lg shadow-[#6482b6] shadow-lg text-[#1E293F] font-bold text-[18px] hover:bg-[#324d77] hover:text-[#E2E8F0] transition-all duration-300">
          {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className='text-[#ffffff] cursor-pointer' onClick={() => navigate("/login")}>
            Already have an account? <span className='text-[#00E5FF] font-semibold'>Login</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
