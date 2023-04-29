import './App.css';
import Front from './Front';
import DefaultComp from './DefaultComp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, login } from './stateManagement/userSlice';



function App() {
  document.body.style.backgroundColor='#dadbd3'
  const checkIflogged=useSelector(checkUser);
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(login(sessionStorage.getItem('token')))

  }, [])
  
  
  return (
    <div className="app">
      <div className="app_body">
 
    {checkIflogged?(<DefaultComp/>)
    :
   ( <Front/>) 

    }
     
      
    
     
      </div>
    
    </div>
  );
}

export default App;
