import { TriptipsApi } from "../enums/TriptipsApi";
import axios from "axios";
import env from "../../env";

const login = async (username: string, password: string) => {
    try {
        return await axios.post(env.DEV_API + TriptipsApi.Authenticate, {
            username: username,
            password: password
        });
    } catch (e) {
        return e;
    }
};

const register = async (firstName: string, lastName: string, email: string, phone: string, password: string) => {
    try {
        return await axios.post(env.DEV_API + TriptipsApi.Register, {
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            email: email,
            password: password
        });
    } catch (e) {
        return e;
    }
}

const getUser = async (jwt: string) => {
    try {
        return await axios.get(env.DEV_API + TriptipsApi.Account, { headers: { Authorization: 'Bearer ' + jwt } });
    } catch (err) {
        if (err.response.data.code === 401) {
            console.error("Erreur d'authentification");
        }
    }
}

export const AuthService = {
    login,
    register,
    getUser
};
