import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",   
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null,
        socket:null,
        ononlineUsers:null
        
    },
    reducers: {
  setUserData: (state, action) => {
    state.userData = action.payload;
  },
  setOtherUsers: (state, action) => {   // ✅ fixed
    state.otherUsers = action.payload;
  },
  setSelectedUser: (state, action) => {
    state.selectedUser = action.payload;
  },
  setSocket: (state, action) => {
    state.socket = action.payload;
  },
  setOnlineUsers: (state, action) => {
    state.ononlineUsers = action.payload;
  }
}

});

export const {setUserData, setOtherUsers,setSelectedUser,selectedUser,setSocket,setOnlineUsers}=userSlice.actions;
export default userSlice.reducer;