export interface CreateUserRequest {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
}