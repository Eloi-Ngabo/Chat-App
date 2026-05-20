import React from 'react'
import './chat.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSiderbar from '../../components/RightSidebar/RightSiderbar'

const Chat = () =>{
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSidebar />
        <ChatBox />
        <RightSiderbar />
      </div>
    </div>
  )
}

export default Chat
