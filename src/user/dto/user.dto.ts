import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsNumber } from 'class-validator';

export class UserDto{

    @IsString()
    @ApiProperty({
        description: '用户名'
    })
    username: string;

    @MaxLength(15)
    @ApiProperty({
        description: '用户密码(长度小于15位)'
    })
    password: string;

    @ApiProperty({
        description: '用户描述'
    })
    description: string;

    @IsNumber()
    @ApiProperty({
        description: '用户角色'
    })
    roleId: number;
}