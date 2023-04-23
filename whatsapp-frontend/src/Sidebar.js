import React from 'react'
import './Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton } from '@mui/material';
import { DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';

function sidebar() {
  return (
    <div className="sidebar">
    <div className="sidebar_header">
      <Avatar src=""/> 

      <div className="sidebar_headerRight">
      <IconButton>
        <DonutLarge/>
        </IconButton>

        <IconButton>
        <ChatIcon/>
        </IconButton>

        <IconButton>
        <MoreVert/>
        </IconButton>
        
      </div>

  
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined/>
          <input placeholder="Search" type="text"/>
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>

      </div>
      </div>
  )
}

export default sidebar