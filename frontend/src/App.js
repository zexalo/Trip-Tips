import React from "react";
import './App.css';
import Alert from 'react-bootstrap/Alert';
import SideBar from './Navbar/SideBar.js'
import Slider from './Categories/Menu_selection.js';

import { LoginAndRegisterButton, LoginAndRegisterContainer} from "./accueil/loginAndRegister/index"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Router>
        <SideBar/>
        <Switch>
            <Route path='/login_register' exact component={LoginAndRegisterButton}/>
            <Route path='/categories' component={() => <Slider heading="Example Slider"/>}/>
        </Switch>
      </Router>
      

    </div>
  
  );
}

export default App;
