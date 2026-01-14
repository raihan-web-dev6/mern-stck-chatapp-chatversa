import React from 'react'
import SideBar from '../component/SideBar'
import MessageArea from '../component/MessageArea'
import getCurrentUser from '../customHooks/getCurrentUser'
 import getMesssages from '../customHooks/getMesssages';

function home() {
  getMesssages();
   getCurrentUser(); // ✅ correct usage
  return (
    <div className='w-full h-[100vh] flex'>
      <SideBar />
      <MessageArea />
    </div>
  )
}

export default home
