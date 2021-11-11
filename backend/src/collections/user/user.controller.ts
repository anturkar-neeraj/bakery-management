import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { CreateUserRequest, LoginUserRequest } from "./user.interface";
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() user: CreateUserRequest) {
        return this.userService.createUser(user);
    }

    @Post('login')
    loginUser(@Body() creds: LoginUserRequest) {
        return this.userService.loginUser(creds);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(@Request() req): string {
        return req.user;
    }


}
