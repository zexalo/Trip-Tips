export type Token = {
    id_token: string;
    body?: TokenBody
};

export type TokenBody = {
    sub: string;
    exp: number;
    auth: string;
};
