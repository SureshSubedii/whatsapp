import React from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'

function Chat() {
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar/>
        <div className="chat_headerInfo">
          <h3>Room Name</h3>
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
      <div className="chat_body">
        <p>
          <span className="chat_name">Loop</span>
          This is the message
          <span className="chat_timestamp">{new Date().toLocaleString()}</span>


        </p>
      </div>
    </div>
  )
}

export default Chat