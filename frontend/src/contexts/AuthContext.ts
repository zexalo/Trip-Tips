import React from "react";
import { AuthAction, AuthState } from "../models/Auth";

const AuthContext = React.createContext<{ state: AuthState, dispatch: React.Dispatch<AuthAction> }>({
    state: { jwt: null },
    dispatch: () => null
});

export default AuthContext;