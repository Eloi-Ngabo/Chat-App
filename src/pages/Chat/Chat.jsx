import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import ChatBox from "../../components/ChatBox/ChatBox";
import RightSiderbar from "../../components/RightSidebar/RightSiderbar";
import { AppContext } from "../../context/AppContext";
import assets from "../../assets/assets";

const Chat = () => {
  const { chatData, userData, chatsUser, messages, setChatUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  <img 
  src={assets.arrow_icon} 
  className="arrow" 
  alt="" 
  onClick={() => setChatUser(null)} 
/>


  useEffect(()=>{
    if (chatData && userData) {
      setLoading(false)
    }

  },[chatData,userData])

  return (
    <div className="chat">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="chat-container">
          <LeftSidebar />
          <ChatBox />
          <RightSiderbar />
        </div>
      )}
    </div>
  );
};

export default Chat;
