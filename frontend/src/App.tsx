import React, {useReducer} from "react";
import './App.css';
import Slider from './Categories/Menu_selection.js';
import { LoginAndRegisterButton, LoginAndRegisterContainer} from "./accueil/loginAndRegister/index"
import { AuthContext } from "./contexts/AuthContext";
import {authReducer} from "./hooks/reducers/authReducer";
import {Token} from "./models/Token";
import {User} from "./models/User";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideBar from './Navbar/SideBar'



const App: React.FC = () => {
    const [state, dispatch] = useReducer(authReducer, {user: {} as User, token: {} as Token});
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
      <Router>
        <SideBar/>
        <Switch>
            <Route path='/login_register' exact component={LoginAndRegisterButton}/>
            <Route path='/categories' component={() => <Slider heading="Example Slider"/>}/>
        </Switch>
      </Router>
      </div>
    </AuthContext.Provider>

  );
}

export default App;