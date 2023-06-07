export interface IAuthJwt {
    id: string;
    username: string;
}

export interface IAuthResult {
    state: boolean;
    token: string;
    message: string;
}