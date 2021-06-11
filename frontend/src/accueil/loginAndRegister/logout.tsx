import {AuthContext} from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect } from 'react';


export const LogOut: React.FC = () => {

    const {dispatch} = useContext(AuthContext);
    let history = useHistory();

    const handleLogout = () => {
        AuthService.logout()(dispatch).then(() => {history.push('/home')})
    };

    useEffect(() => {handleLogout()}, []);
  
        return (
           <div></div>
        )
}

export default LogOut;
