import {AuthAction, AuthActionType} from "../../models/Auth";
import {AuthContextState} from "../../contexts/AuthContext";

export const authReducer = (state: AuthContextState, action: AuthAction): AuthContextState => {
    switch (action.type) {
        case AuthActionType.GET_LOGGED_USER:
            return {
                ...state,
                user: action.payload
            };
        case AuthActionType.GET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case AuthActionType.LOGOUT:
            return {
                token: undefined,
                user: undefined
            };
    }
};
