import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';

function Deff() {
    const [message, setmessage] = useState([]);
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