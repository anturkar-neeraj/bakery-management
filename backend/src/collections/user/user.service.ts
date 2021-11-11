import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserRequest, LoginUserRequest } from './user.interface';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }


    async createUser(user: CreateUserRequest): Promise<any> {
        user.password = bcrypt.hashSync(user.password, 10);
        const newUser = this.usersRepository.create(user);
        const { password, ...savedUser } = await this.usersRepository.save(newUser);
        return savedUser;
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

    async loginUser(creds: LoginUserRequest): Promise<any> {
        try {
            const userData = await this.validatateUser(creds);
            const accessToken = await this.jwtService.signAsync(userData);
            return {
                access_token: accessToken
            }
        } catch (e) {
            throw new UnauthorizedException('Invalid email or password');
        }
    }
}
