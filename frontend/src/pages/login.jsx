import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/userSlice";

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
      let result = await axios.post(
        `${serverURL}/api/auth/login`,
        {
          email: Email,
          password: Password,
        },
        { withCredentials: true }
      );

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
      setErrorMessage(
        error?.response?.data?.message ||
          "An error occurred during login."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-5 py-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-slate-700/70 bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl overflow-hidden">

        {/* Top Gradient */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        <div className="px-8 pt-10 pb-8">

          {/* Header */}
          <div className="text-center mb-8">


            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Welcome <span className="text-blue-500">Back</span>
            </h1>

            <p className="text-slate-400 mt-3">
              Sign in to continue chatting with ChatVerse.
            </p>

          </div>

          <form
            onSubmit={handlelogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <input
                type="text"
                placeholder="Enter email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full
                h-14
                rounded-xl
                bg-[#1E293B]
                border
                border-slate-700
                px-4
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                duration-300
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/20
                "
              />

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                  w-full
                  h-14
                  rounded-xl
                  bg-[#1E293B]
                  border
                  border-slate-700
                  px-4
                  pr-14
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/20
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  hover:scale-110
                  transition
                  "
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {errorMessage && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-red-400 text-sm text-center">
                  {errorMessage}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              h-14
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              font-semibold
              text-lg
              shadow-lg
              shadow-blue-900/40
              transition-all
              duration-300
              hover:from-blue-500
              hover:to-cyan-400
              hover:-translate-y-0.5
              active:translate-y-0
              disabled:opacity-70
              disabled:cursor-not-allowed
              "
            >
              {loading ? "Signing In..." : "Log In"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#0F172A] px-4 text-sm text-slate-500">
                  OR
                </span>
              </div>
            </div>

            <p className="text-center text-slate-400 text-sm">
              Don't have an account?
              <span
                onClick={() => navigate("/signup")}
                className="ml-2 font-semibold text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors"
              >
                Sign Up
              </span>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;