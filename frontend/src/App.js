import React from "react";
import './App.css';
import Alert from 'react-bootstrap/Alert';
import './Categories/Menu_selection.js';

import { LoginAndRegisterButton, LoginAndRegisterContainer} from "./accueil/loginAndRegister/index"


function App() {
  return (
    <div className="App">
      <LoginAndRegisterButton
      />

    </div>
  );
}

export default App;
