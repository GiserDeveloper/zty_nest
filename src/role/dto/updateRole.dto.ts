import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRoleDto{

    @IsString()
    @ApiProperty({
        description: '角色名称'
    })
    roleName: string;

}