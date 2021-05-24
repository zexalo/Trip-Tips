import jwt_decode from "jwt-decode";
import {AuthActionType} from "../models/Auth";
import env from "../env";
import {Token, TokenBody} from "../models/Token";
import ApiService, {HTTPRequestError} from "./ApiService";
import {User} from "../models/User";

const login = (username: string, password: string) => async (dispatch: Function) => {
    try {
        const res = await authenticate("/authenticate", {username: username, password: password});
        if (res.status === 200) {
            const token: Token = await res.json();
            token.body = jwt_decode<TokenBody>(token.id_token);
            if (token.body) token.body.exp = new Date().getTime() + token.body.exp * 1000;
            await dispatch({type: AuthActionType.GET_TOKEN, payload: token});
            console.log(token);
            return ApiService.get<User>("/account", {token: token});
        } else {
            const text = await res.text();
            return new HTTPRequestError(res.status, JSON.parse(text).detail);
        }
    } catch (e) {
        if (e.name === "InvalidTokenError") return new Error("errors:401.credentials");
        return e as Error;
    }
};

const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        await authenticate("/register", {
            firstName,
            email,
            lastName,
            password,
            login: email
        })
    } catch (e) {
        throw new Error(e);
    }
};

const authenticate = async (path: string, body: any) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return fetch(env.DEV_API + path, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });
}


const logout = () => async (dispatch: Function) => {
    dispatch({type: AuthActionType.LOGOUT});
};

const AuthService = {
    login,
    register,
    authenticate,
    logout
}

export default AuthService;
