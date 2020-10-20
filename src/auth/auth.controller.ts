import { Controller, Post, Body, Get, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { TeamuserService } from '../teamuser/teamuser.service';

import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
@ApiTags('登录注册模块')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly teamuserService: TeamuserService
    ){}

    @Post('register')
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOperation({summary: '注册'})
    async register(@Body() dto: RegisterDTO){
        return await this.userService.create(dto);
    }

    @Post('login')
    @ApiOperation({summary: '登录'})
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @Req() req){
        return this.authService.login(req.user);
    }

    @Get('user')
    @ApiOperation({summary: '获取个人信息'})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async user(@Req() req){
        //根据用户ID返回用户信息
        return await this.teamuserService.getUserInfoById(req.user.userId)
    }
}
