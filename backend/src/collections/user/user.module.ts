import { Module } from "@nestjs/common";

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from '../../config/app.config'
import { JwtStrategy } from "./auth/jwt.stratagey";

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register(jwtConfig)],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
})

export class UserModule { }