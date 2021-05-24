import React from "react";
import './App.css';
import Alert from 'react-bootstrap/Alert';
//import './Categories/Menu_selection.js';

import { LoginAndRegisterButton, LoginAndRegisterContainer} from "./accueil/loginAndRegister/index";
import { MyProfil } from "./accueil/profil/index"



function App() {
  return (
    <div className="App">
      <MyProfil/>
    </div>
  );
}

export default App;
