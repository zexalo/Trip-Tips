export type AuthState = {
    jwt: string | null,
};

export type AuthAction =
    | { type: 'login', jwt: string }
    | { type: 'update', jwt: string }
    | { type: 'logout' };