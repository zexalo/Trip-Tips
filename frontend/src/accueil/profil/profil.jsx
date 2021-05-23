import React, {useContext} from 'react'
import {AuthContext} from "../../contexts/AuthContext";


function Profil() {
    const { state } = useContext(AuthContext);
    
    return (
        <div>
            <h1>{state.user.email}</h1>
        </div>
    )
}

export default Profil;
