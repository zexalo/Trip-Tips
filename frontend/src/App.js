import React from "react";
import './App.css';
import Alert from 'react-bootstrap/Alert';
import './Categories/Menu_selection.js';
import SideBar from './Navbar/SideBar.js'
import Slider from './Categories/Menu_selection.js';

import { LoginAndRegisterButton, LoginAndRegisterContainer} from "./accueil/loginAndRegister/index"


function App() {
  return (
    <div className="App">
      
      <LoginAndRegisterButton
      />
      <Slider heading="Example Slider"/>

    </div>
  
  );
}

export default App;
