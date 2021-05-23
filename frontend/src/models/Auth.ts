import { User } from "./User";
import {Token} from "./Token";

export enum AuthActionType {
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    GET_LOGGED_USER = "GET_LOGGED_USER",
    GET_TOKEN = "GET_TOKEN",
    LOGOUT = "LOGOUT",
}

type AuthGetLoggedUser = {
    type: AuthActionType.GET_LOGGED_USER,
    payload: User
};

type AuthGetToken = {
    type: AuthActionType.GET_TOKEN,
    payload: Token
};

type AuthLogoutAction = {
    type: AuthActionType.LOGOUT;
};

export type AuthAction  = AuthGetLoggedUser
    | AuthGetToken
    | AuthLogoutAction
