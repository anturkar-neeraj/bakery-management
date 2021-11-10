import { CreateUserRequest, LoginUserRequest } from "./user.model";
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(user: CreateUserRequest): void;
    loginUser(creds: LoginUserRequest): Promise<any>;
    getHello(req: any): string;
}
