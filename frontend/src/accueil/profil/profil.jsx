import React, {useContext} from 'react'
import {AuthContext} from "../../contexts/AuthContext";


function Profil() {
    const { state } = useContext(AuthContext);
    console.log(state.user)

    return (
        <div>
            <h1>{state.user?.firstName}</h1>
        </div>
    )
}

export default Profil;
