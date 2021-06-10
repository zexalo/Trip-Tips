import React, {Dispatch} from "react";
import { AuthAction } from "../models/Auth";
import {User} from "../models/User";
import {Token} from "../models/Token";

export type AuthContextState = {
    user?: User,
    token?: Token,
};

export type AuthContextProps = {
    state: AuthContextState;
    dispatch: Dispatch<AuthAction>;
};



export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);
