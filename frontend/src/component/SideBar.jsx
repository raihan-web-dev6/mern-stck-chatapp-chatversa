import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dp from '../assets/dp.webp';
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice';
import TypewriterHeader from "./TypewriterHeader";
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../main';

function SideBar() {
  const { userData, otherUsers, selectedUser, ononlineUsers } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all other users initially
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/user/others`, { withCredentials: true });
        dispatch(setOtherUsers(res.data));
        setFilteredUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Filter users based on searchTerm
 useEffect(() => {
  if (searchTerm === '') {
    setFilteredUsers(otherUsers?.users || []);
  } else {
    const filtered = otherUsers?.users.filter(user =>
      (user?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered || []);
  }
}, [searchTerm, otherUsers]);


  const handelsignout = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`overflow-hidden h-full bg-[#1E293B] w-full lg:w-[30%] ${selectedUser ? "hidden" : "block"} lg:block`}
    >
      {/* Logout Button */}
      <div className='w-[60px] h-[60px] rounded-full border-4 border-[#00E5FF] shadow-[#6482b6] shadow-lg overflow-hidden fixed bottom-[20px] left-[20px] justify-center items-center flex bg-[#00E5FF] hover:bg-[#2f5ac0] hover:shadow-[#022e95] cursor-pointer transition-all duration-300 hover:text-white' onClick={handelsignout}>
        <BiLogOutCircle className='w-[25px] h-[25px] cursor-pointer' />
      </div>

      {/* Header */}
      <div className="w-full h-[300px] bg-[#00E5FF] rounded-b-[30%] shadow-[#6482b6] shadow-lg flex-col gap-[10px] justify-center px-[20px] flex items-start">
        <TypewriterHeader text="ChatVerse | modern chat app" speed={150} />

        <h2 className="text-[11px] text-[#0c0d0c] mt-2 tracking-widest uppercase">
  Created by <span class="text-[#ffffff] font-semibold">Raihan</span>
</h2>





        <div className='w-full flex justify-between items-center'>
          <h1 className='text-[#022e95] font-serif font-bold text-[19px]'>
            Welcome, {userData.name || "User"}
          </h1>
          <div className="w-[60px] h-[60px] rounded-full cursor-pointer" onClick={() => navigate("/profile")}>
            <img
              src={userData?.image?.startsWith("http") ? userData.image : dp}
              alt="profile"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* Search + Quick User Icons */}
        <div className='w-full flex items-center gap-[20px]'>
          {!search && (
            <div className='w-[60px] h-[60px] bg-white rounded-full border-4 border-[#00E5FF] shadow-[#6482b6] shadow-lg flex justify-center items-center cursor-pointer' onClick={() => setSearch(true)}>
              <FaSearch className='w-[25px] h-[25px] cursor-pointer' />
            </div>
          )}

          {search && (
            <div className='w-full flex items-center bg-white rounded-full px-[10px] animate-roundOpen'>
              <FaSearch className='w-[20px] h-[20px] text-gray-500' />
              <input
                type="text"
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full outline-none px-[10px] py-[8px] rounded-full'
              />
              <button className='text-[#00E5FF] font-bold' onClick={() => { setSearch(false); setSearchTerm(''); }}>Cancel</button>
            </div>
          )}

          {/* Quick user icons */}
          {!search && filteredUsers?.map((user, idx) => (
            <div key={idx} className="relative w-[60px] h-[60px] rounded-full flex justify-center items-center">
              <img src={user.image || dp} alt="profile" className="w-full h-full rounded-full object-cover ring-2 ring-white" />
              {ononlineUsers?.includes(user._id) && (
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f172a]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User List */}
      <div className="w-full h-[calc(100vh-380px)] overflow-y-auto mt-5 px-2 space-y-3">
        {filteredUsers?.map((user, idx) => (
          <div
            key={idx}
            className="w-[95%] mx-auto flex items-center gap-4 bg-gradient-to-r from-[#1E293B] to-[#00E5FF] border-[#334155] p-3 rounded-xl shadow-lg cursor-pointer hover:from-cyan-500 hover:to-blue-600 hover:scale-[1.03] transition-all duration-300"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative w-[55px] h-[55px]">
              <img
                src={user.image || dp}
                alt="profile"
                className="w-full h-full rounded-full object-cover ring-2 ring-cyan-400"
              />
              {ononlineUsers?.includes(user._id) && (
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f172a]" />
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-white font-semibold text-[17px]">{user.name}</h1>
              <p className="text-xs text-gray-300">{ononlineUsers?.includes(user._id) ? "Online" : "Offline"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
