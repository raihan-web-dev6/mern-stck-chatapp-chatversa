import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../main';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUserData } from '../redux/userSlice'; // ✅ Add this

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let dispatch = useDispatch();

  const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(`${serverURL}/api/auth/login`,{
        // signup data
        
        email:Email,
        password:Password

      },{withCredentials:true});
      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      navigate("/");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErrorMessage("");
      
    } catch (error) {
      console.log("Login Error:", error);
      setLoading(false);
      setErrorMessage(error?.response?.data?.message || "An error occurred during login.");

    }
  }
  return (
    <div className="w-full h-[100vh] bg-[#0F172A] flex justify-center items-center">
      <div className="w-full max-w-[500px] h-[500px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg flex flex-col items-center gap-[20px] py-[20px]">
        
        {/* Header */}
        <div className="w-full h-[180px] bg-[#00E5FF] rounded-b-[30%] shadow-[#6482b6] shadow-lg flex items-center justify-center">
          <h1 className="text-[#E2E8F0] font-bold text-[29px]">
            Welcome Back to <span className="text-[#022e95]">ChatVerse</span>
          </h1>
        </div>

        {/* Form */}
        <form className="w-full px-[30px] flex flex-col gap-[20px] mt-[20px]" onSubmit={handlelogin}>
          <input
            type="text"
            placeholder="Email or Username"
            className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] outline-none"
            onChange={(e) => setEmail(e.target.value)} value={Email}
          />

          {/* Password with eye toggle */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[50px] bg-[#1E293B] rounded-lg shadow-[#6482b6] shadow-lg text-[#E2E8F0] px-[20px] pr-[45px] outline-none"onChange={(e) => setPassword(e.target.value)} value={Password}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[15px] top-[50%] -translate-y-1/2 text-[#E2E8F0] cursor-pointer text-[18px] select-none"
            >
              {showPassword ? '👁️' : '👁‍🗨'}
            </span>
          </div>
{ errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p> }
          <button className="w-full h-[50px] bg-[#00E5FF] rounded-lg shadow-[#6482b6] shadow-lg text-[#1E293F] font-bold text-[18px] hover:bg-[#324d77] hover:text-[#E2E8F0] transition-all duration-300">
          {loading ? "Loading..." : "Log In"}
          </button>

          <p className="text-[#ffffff] cursor-pointer" onClick={() => navigate("/signup")}>
            Don’t have an account? <span className="text-[#00E5FF] font-semibold">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
