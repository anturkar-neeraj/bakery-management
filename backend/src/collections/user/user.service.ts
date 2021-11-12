import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserRequest, LoginUserRequest, StandardResponse } from './user.interface';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }


    async createUser(user: CreateUserRequest): Promise<StandardResponse> {
        try {

            let createuserResponse: StandardResponse;
            user.password = bcrypt.hashSync(user.password, 10);
            const newUser = this.usersRepository.create(user);
            const { password, ...savedUser } = await this.usersRepository.save(newUser);
            createuserResponse = {
                success: true,
                data: savedUser,
                message: "User created successfully."
            }
            return createuserResponse;
        } catch (e) {
            throw new InternalServerErrorException(e.toString());
        }
    }

    async validatateUser(creds: LoginUserRequest): Promise<any> {
        const user = await this.usersRepository.findOne({
            where:
                { email: creds.email }
        });
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(creds.password, user.password);
            if (isPasswordCorrect) {
                const { password, ...userData } = user;
                return userData;
            } else {
                throw new UnauthorizedException('Invalid email or password');
            }
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }

    }

    async loginUser(creds: LoginUserRequest): Promise<StandardResponse> {
        try {
            const userData = await this.validatateUser(creds);
            const accessToken = await this.jwtService.signAsync(userData);

            let loginResponse: StandardResponse = {
                success: true,
                data: { userData, accessToken },
                message: "Login Successfull."
            };

            return loginResponse;
        } catch (e) {
            throw new UnauthorizedException(e.toString());
        }
    }
}
