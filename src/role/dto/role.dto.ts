import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class RoleDto{

    @IsNumber()
    @ApiProperty({
        description: '角色ID'
    })
    roleId: number;

    @IsString()
    @ApiProperty({
        description: '角色名称'
    })
    roleName: string;

}