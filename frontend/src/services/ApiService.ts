import {AuthContextState} from "../contexts/AuthContext";
import env from "../env";
import AuthService from "./AuthService";


export class HTTPRequestError extends Error {
    code: number;
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.name = "HTTP request error";
    }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function api<T>(path: string, method: Method = "GET", authContext: AuthContextState,body?: any, authorize: boolean = true, empty = false): Promise<T> {
    const state = authContext;

    const headers = new Headers();

    if (authorize) {
        if (!state.token) {
            throw new Error("Token not found");
        }
        if (state.token.body && new Date(state.token.body.exp).getTime() < new Date().getTime() ){		//Logout on Token expired
            throw new HTTPRequestError(401, "Token expired");
        }
        headers.append("Authorization", `Bearer ${state.token.id_token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const res = await fetch(env.DEV_API + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        try {
            throw new HTTPRequestError(res.status, await res.json());
        } catch {
            throw new HTTPRequestError(res.status, "Unknown error");
        }
    }
    // handling void result
    if (res.headers.get("content-length") === "0" || res.status === 204 || empty) {
        return {} as T;
    }
    return res.json();
}


async function get<T>(path: string, authContext: AuthContextState, authorize: boolean = true): Promise<T> {
    return api<T>(path, "GET", authContext,undefined, authorize, false);
}

async function del<T>(path: string, authContext: AuthContextState, authorize: boolean = true, empty = false): Promise<T> {
    return api<T>(path, "DELETE", authContext,undefined, authorize, empty); //TODO verify this
}

async function post<T>(path: string, body: any, authContext: AuthContextState, authorize: boolean = true): Promise<T> {
    return api<T>(path, "POST",authContext, body, authorize);
}

async function put<T>(path: string, body: any = undefined, authContext: AuthContextState, authorize: boolean = true): Promise<T> {
    return api<T>(path, "PUT", authContext, body, authorize);
}

async function patch<T>(path: string, body: any = undefined, authContext: AuthContextState, authorize: boolean = true): Promise<T> {
    return api<T>(path, "PATCH", authContext, body, authorize);
}

const ApiService = {
    get,
    del,
    post,
    put,
    patch
}

export default ApiService;
