import './App.css';
import Front from './Front';
import DefaultComp from './DefaultComp';


import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  document.body.style.backgroundColor='#dadbd3'

  // console.log(message);
  
  return (
    <Router>
    <div className="app">
      <div className="app_body">
        <Routes>
    <Route path="/bod" element={<DefaultComp/>} /> 
      
    <Route path="/" element={<Front/>} /> 
    
     
     </Routes>
      </div>
    
    </div>
    </Router>
  );
}

export default App;
