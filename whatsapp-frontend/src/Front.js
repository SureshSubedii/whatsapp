import React, { useState } from 'react';
import './front.css';
import axios from './axios';
import { useNavigate } from 'react-router-dom';


function Front() {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const navigate=useNavigate()


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const signin = await axios.post("/createuser",{
        name: name,
        email: email,
        password: password
      });
      setpassword('');
      setemail('');
      setname('');
      const result =  signin.data;
      console.log(result);
      if(result.success){
        navigate("/bod");
        }

    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin=async(e)=>{
    e.preventDefault();
    try {
      const login = await axios.post("/login",{
        name: name,
        email: email,
        password: password
      });
      const result = login.data;
      setpassword('');
      setemail('');
      setname('');
      console.log(result.token,result.success)
      if(result.success){
      navigate("/bod");
      }


  }
  catch (error) {
    console.error(error);
  }
} 
  
  return (
    <div className='front'>
      <img src='https://cdn4.iconfinder.com/data/icons/miu-square-flat-social/60/whatsapp-square-social-media-512.png'/>
      <h1>WhatsApp</h1>
      <form className="form">
      <input type="email" onChange={e=>setemail(e.target.value)} placeholder='Enter email'/>
      <input type="text"  onChange={e=>setname(e.target.value)} placeholder='Enter full Name'/>
      <input type="password"  onChange={e=>setpassword(e.target.value)} placeholder='Enter password'/>
      </form>
      <div className="front_buttons">
      <button onClick={handleLogin}>Login </button>
      <h2>{""} If you are new,then: </h2>
      <button onClick={handleSignIn}>Sign up</button> 
      </div>
      

    </div>
  )
}

export default Front