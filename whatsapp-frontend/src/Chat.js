import React, { useEffect, useRef,useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import axios from './axios';
import { useSelector } from 'react-redux';
import { checkUser } from './stateManagement/userSlice';


function Chat({messages}) {
  const [input, setinput] = useState("");
  const chatContainerRef = useRef(null);

const checkIflogged=useSelector(checkUser);

  const sendMessage=  (e)=>{
    e.preventDefault();
     axios.post("/message/new",{
      message:input,
      name:sessionStorage.getItem('username'),
      timestamp:new Date().toLocaleDateString(),
      received:true
    })
    setinput('');
  }
  useEffect(() => {
    if (chatContainerRef.current) {
      console.log(chatContainerRef.current)
      chatContainerRef.current.scrollTop += chatContainerRef.current.scrollHeight; // Restore scroll position after new message is added
    }
 
  }, [messages])
  
  return (
    <div className="chat">
      <div className="chat_header">
       <IconButton> <Avatar src="https://qph.cf2.quoracdn.net/main-qimg-d12513d5003db4b5db1bf995b571997a-lq"/></IconButton> 
        <div className="chat_headerInfo">
          <h3>Group chat</h3>
          <p>Last seen at ...</p>

        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          
          <IconButton>
          <AttachFile/>
          </IconButton>

          <IconButton>
          <MoreVert/>
          </IconButton>

        </div>
      </div>
      <div className="chat_body" ref={chatContainerRef}>
        {messages.map((message)=>(
          <p className={`chat_message ${message.name==sessionStorage.getItem('username')?"chat_receiver":""}` } key={message._id}>
          <span className="chat_name">{message.name}</span>
         {message.message}
          <span className="chat_timestamp">{message.timestamp}</span>
        </p>
        ))}
       
       


      </div>
      <div className="chat_footer">
        <InsertEmoticon/>
        <form>
          <input value={input} onChange={e=>setinput(e.target.value)} placeholder='Type a message'/>
          <button type='submit' onClick={sendMessage}> Send</button>


        </form>
        <Mic/>
      </div>
    </div>
  )
}

export default Chat