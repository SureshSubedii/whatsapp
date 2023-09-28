import React from 'react';
import './SidebarChat.css'
import { Avatar } from '@mui/material';

function SidebarChat() {
  return (
    <div className="sidebarChat">
        <Avatar/>
    <div className="sidebarChat_info">
        <h2>Ronny</h2>
        <p>Where you at bro?</p>

    </div>
    </div>
  )
}

export default SidebarChat