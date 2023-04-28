import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';

function Deff() {
    const [message, setmessage] = useState([]);
    const chatContainerRef = useRef(null);
    useEffect(() => {
      axios.get('/message/sync')
      .then(response=>{
        setmessage(response.data)
      })
     
    }, [message])
    
  
    useEffect(() => {
      const pusher = new Pusher('21b2b234d78b48e7a505', {
        cluster: 'mt1'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessage)=> {
        setmessage([...message,newMessage]);
      });
      if (chatContainerRef.current) {
        console.log(chatContainerRef.current)
        chatContainerRef.current.scrollTop += chatContainerRef.current.scrollHeight; // Restore scroll position after new message is added
      }
    
     return ()=>{
      pusher.unbind_all();
      pusher.unsubscribe();
     }
    }, [message])


  return (
    
    <>
        <Sidebar/>
        <Chat messages={message}/>
    </>
  )
}

export default Deff