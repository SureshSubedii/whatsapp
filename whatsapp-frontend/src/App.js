import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import Front from './Front';

function App() {
  document.body.style.backgroundColor='#dadbd3'
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
  // console.log(message);
  
  return (
    <div className="app">
      <div className="app_body">
     {/* <Sidebar/>
     <Chat messages={message}/> */}
     <Front/>
      </div>
    
    </div>
  );
}

export default App;
