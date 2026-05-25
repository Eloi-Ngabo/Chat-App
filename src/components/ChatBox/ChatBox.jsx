import React, { useContext, useState, useEffect } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import {AppContext} from '../../context/AppContext'
import { onSnapshot, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify';


const ChatBox = () => {

 const {userData, messagesId, chatsUser, messages, setMessages} = useContext(AppContext);

 const [input,setInput] = useState("");

 const sendMessage = async () => {
  try {
    if (input &&  messagesId) {
      await updateDoc(doc(db, "messages", messagesId),{
        messages: arrayUnion({
          sId: userData.id,
          text: input,
          createdAt: new Date()
        })
      }) 
      
      const userIDs = [chatsUser.rId, userData.id]

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "chats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chatsData.findIndex((c) => c.messagesId === messagesId);
          if (chatIndex !== -1) return;
          userChatsData.chatsData[chatIndex].lastmessage = input.slice(0,30);
          userChatsData.chatsData[chatIndex].updatedAt = Date.now();
          if(userChatsData.chatsData[chatIndex].rId === userData.id){
            userChatsData.chatsData[chatIndex].messageSeen = false;
          }
          await updateDoc(userChatsRef, {
            chatsData: userChatsData.chatsData
          });
        }
      })
    };
  } catch (error) {
    toast.error("Failed to send message. Please try again.");
   
  }
 }



 useEffect(() => {
  if (messagesId) {
    const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
      if (res.exists()) {
        setMessages(res.data().messages.reverse());
      } else {
        setMessages([]);
        console.log("Missing messages document:", messagesId);
      }
    });
    return () => {
      unSub();
    };
  }
}, [messagesId]);


  return chatsUser ? (
    <div className='chat-box'> 
    <div className='chat-user'>
        <img src={chatsUser.userData.avatar} alt="" />
        <p>{chatsUser.userData.name} <img className ='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon}   className='help'  alt="" />
    </div>
    <div className='chat-msg'>
      <div className='s-msg'>
        <p className='msg'>Lorem ipsum is placeholder text commonly used in ..</p>
        <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 PM</p>
        </div>
    </div>  
      <div className='s-msg'>
        <img className='msg-img' src={assets.pic1} alt="" />
        <div>
            <img  src={assets.profile_img} alt="" />
            <p>2:30 PM</p>
        </div>
    </div>  
      <div className='r-msg'>
        <p className='msg'>Lorem ipsum is placeholder text commonly used in ..</p>
        <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 PM</p>
        </div>
    </div>  
    </div>
    <div className='chat-input'>
    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='send a message' />
    <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
    <label htmlFor="image">
        <img src={assets.gallery_icon} alt="" />
    </label>
    <img onClick={sendMessage} src={assets.send_button} alt="" />
    </div>
    </div>
  )
  :<div className='chat-welcome'>
    <img src={assets.logo_icon} alt="" />
    <p>chat anytime, anywhere</p>  
  </div>
}

export default ChatBox
