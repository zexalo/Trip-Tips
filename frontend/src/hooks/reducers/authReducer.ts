import { AuthAction, AuthState } from "../../models/Auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function authenticationReducer(state: AuthState, action: AuthAction) {
    switch (action.type) {
        case "login":
            if (action.jwt) {
                AsyncStorage.setItem("jwt", action.jwt);
                return {
                    ...state,
                    jwt: action.jwt
                };
            } else {
                return {
                    ...state,
                    jwt: null
                }
            }

        case "logout":
            AsyncStorage.clear();
            return {
                ...state,
                jwt: null
            };
        case "update":
            AsyncStorage.clear();
            AsyncStorage.setItem("jwt", action.jwt);
            return {
                ...state,
                jwt: action.jwt
            }
        default:
            return state;
    }
}
