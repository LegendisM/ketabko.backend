export interface IAuthJwt {
    id: number;
    username: string;
}

export interface IAuthResult {
    state: boolean;
    token: string;
    message: string;
}