import React, {useReducer} from "react";
import './App.css';
import Slider from './categories/Menu_selection.js';
import { LogOut, LoginAndRegisterContainer} from "./accueil/loginAndRegister/index";

import { AuthContext } from "./contexts/AuthContext";
import {authReducer} from "./hooks/reducers/authReducer";
import {Token} from "./models/Token";
import {User} from "./models/User";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideBar from './navbar/SideBar'
import Profil from "./accueil/profil/profil";



const App: React.FC = () => {
    const [state, dispatch] = useReducer(authReducer, {user: {} as User, token: {} as Token});
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
      <Router>
        <SideBar/>
        <Switch>
            <Route path='/login_register' exact component={() => <LoginAndRegisterContainer/>}/>
            <Route path='/categories' component={() => <Slider heading="Example Slider"/>}/>
            <Route path='/monProfil' component= { Profil}/>
            <Route path='/log_out' component={LogOut}/>
        </Switch>
      </Router>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
