import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TeamuserService } from '../teamuser/teamuser.service';
 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
        private teamuserService: TeamuserService
    ){}

    async validateUser(weixinName: string, password: string){
        const user = await this.teamuserService.getUserInfoByName(weixinName)
        return user;
    }

    async login(user:any){
        //查询用户角色
        let userInfo = await this.teamuserService.getUserInfoByName(user.weixinName)
        const userId = (await this.teamuserService.getUserInfoByName(user.weixinName))._id
        const userRole = (await this.teamuserService.getUserInfoByName(user.weixinName)).role;
        //生成签名
        //const payload = {username:user.username, userId: userId, roleId: userRole};
        const payload = {weixinName: user.userweixinName, userRole: userRole}
        return {
            access_token: this.jwtService.sign(payload),
            userInfo: userInfo
        };
    }
}
