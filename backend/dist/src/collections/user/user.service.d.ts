import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserRequest, LoginUserRequest } from './user.model';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    createUser(user: CreateUserRequest): Promise<User>;
    validatateUser(creds: LoginUserRequest): Promise<any>;
    loginUser(creds: LoginUserRequest): Promise<any>;
}
