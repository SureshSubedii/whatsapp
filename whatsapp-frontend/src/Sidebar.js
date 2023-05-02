import React from 'react'
import './Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton } from '@mui/material';
import { DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import { useDispatch } from 'react-redux';
import { logout } from './stateManagement/userSlice';

function Sidebar() {
  const dispatch=useDispatch();

  return (
    <div className="sidebar">
    <div className="sidebar_header">
     <IconButton onClick={() => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  dispatch(logout());}}><Avatar src="https://wallpapers.com/images/high/aesthetic-anime-profile-pictures-tpgavbdrvn6uf21a.webp" 
/> </IconButton> 
      <h3 style={{"marginTop":"10px","marginLeft":"-10px"}}>{sessionStorage.getItem('username')}</h3>

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

export default Sidebar