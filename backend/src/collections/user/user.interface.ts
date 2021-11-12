export interface CreateUserRequest {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    isPasswordInitial: boolean;
    forcePasswordChange: boolean;
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

export interface StandardResponse {
    success: boolean;
    data: any;
    message: string;
}