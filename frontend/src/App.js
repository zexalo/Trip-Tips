import React from "react";
import './App.css';
import Alert from 'react-bootstrap/Alert';
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
