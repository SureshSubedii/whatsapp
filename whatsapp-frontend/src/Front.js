import React, { useState } from 'react';
import './front.css';
import axios from './axios';
import {useDispatch} from 'react-redux'
import { login } from './stateManagement/userSlice';


function Front() {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState('');

  const dispatch=useDispatch();


  const handleSignIn = async (e) => {
    e.preventDefault();
    setloading("Loading ..Please Wait..");

    try {
      if(!name || !email || !password){
        alert("Enter all information")
      } else{
      const signin = await axios.post("/createuser",{
        name: name,
        email: email,
        password: password
      });
      setpassword('');
      setemail('');
      setname('');
      const result =  signin.data;
      // console.log(result);
      sessionStorage.setItem('token',result.token);
      sessionStorage.setItem('username',result.username);
      dispatch(login(result.token))
    }
      

    

    } catch (error) {
      console.error(error);
    alert(error.response.data);

    }
  setloading("");

  }


  const handleLogin=async(e)=>{
    e.preventDefault();
    setloading("Loading ..Please Wait..");
  
    try {

      if(!email || !password){
        alert("Enter all information")
      }
      else{
        const loginResponse = await axios.post("/login",{
          name: name,
          email: email,
          password: password
        });
        const result = loginResponse.data;
        setpassword('');
        setemail('');
        setname('');
        sessionStorage.setItem('token',result.token);
        sessionStorage.setItem('username',result.username);
        console.log('first')
        dispatch(login(sessionStorage.getItem('token')));
  
      }
     



      


  }
  catch (error) {
    // console.error(error.response.data);
    alert(error.response.data);
  }
  setloading("");

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
      <div className="loading" style={{"marginTop":"20px"}}>
      <h3>{loading}</h3>

      </div>

    </div>
  )
}

export default Front