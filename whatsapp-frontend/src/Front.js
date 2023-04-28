import React, { useState } from 'react';
import './front.css';
import axios from './axios';


function Front() {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');


  const handleSignIn=(e)=>{
    axios.post("/createuser",{
      name:name,
      email:email,
      password:password
    })
    setpassword('');
    setemail(' ');
    setname('');
    

  }
  return (
    <div className='front'>
      <img src='https://assets.stickpng.com/images/627baa178d659819b11084f8.png'/>
      <h1>WhatsApp</h1>
      <form className="form">
      <input type="email" onChange={e=>setemail(e.target.value)} placeholder='Enter email'/>
      <input type="text"  onChange={e=>setname(e.target.value)} placeholder='Enter full Name'/>
      <input type="password"  onChange={e=>setpassword(e.target.value)} placeholder='Enter password'/>
      </form>
      <div className="front_buttons">
      <button>Login</button>
      <h2>{""} If you are new,then: </h2>
      <button onClick={handleSignIn}>Sign up</button> 
      </div>
      

    </div>
  )
}

export default Front