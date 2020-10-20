import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs'

// 默认是local,守卫处写local
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'weixinName',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    async validate(weixinName: string, password: string){
        const user = await this.authService.validateUser(weixinName,password);
        if(!user) {
            throw new BadRequestException('用户名不正确');
        }
        //if(!compareSync(password,user.password)){
        console.log(password, user.password)
        if(password != user.password){
            throw new BadRequestException('密码不正确');
        }
        return user;
    }
}