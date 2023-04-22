import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'

function App() {
  document.body.style.backgroundColor='#dadbd3'
  return (
    <div className="app">
      <div className="app_body">
     <Sidebar/>
     <Chat/>
      </div>
    
    </div>
  );
}

export default App;
