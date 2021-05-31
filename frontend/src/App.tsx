import React, {useReducer} from "react";
import './App.css';
import {AuthContext} from "./contexts/AuthContext";
import {authReducer} from "./hooks/reducers/authReducer";
import {Token} from "./models/Token";
import {User} from "./models/User";
import Rooter from "./rooter/rooter";


const App: React.FC = () => {
    const [state, dispatch] = useReducer(authReducer, {user: {} as User, token: {} as Token});
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            <div className="App">
                <Rooter/>
            </div>
        </AuthContext.Provider>

    );
}

export default App;
