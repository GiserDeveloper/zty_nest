import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';

export class TeamuserDto{

    @IsString()
    @ApiProperty({
        description: '微信昵称'
    })
    weixinName: string;

    @IsString()
    @ApiProperty({
        description: '默认团队ID'
    })
    defaultTeamId: string;

    @IsString()
    @ApiProperty({
        description: '用户角色'
    })
    role: string;

    @ApiProperty({
        description: '管理团队列表'
    })
    manageTeamList: [
        {teamId: string,
        defaultMapId: string,
        power: number}
    ];

    @ApiProperty({
        description: '加入团队列表'
    })
    joinTeamList: [
        {teamId: string,
            defaultMapId: string,
            power: number}
    ];

}

export class TeamPowerDto{
    @IsString()
    @ApiProperty({
        description: '团队ID'
    })
    teamId: string;

    @IsNumber()
    @ApiProperty({
        description: '用户权限标识'
    })
    power: number;
}

export class IDListDto{
    @IsString()
    @ApiProperty({
        description: '用户ID'
    })
    userId: string;

    @IsString()
    @ApiProperty({
        description: '团队ID'
    })
    teamId: string;

    @IsString()
    @ApiProperty({
        description: '地图ID'
    })
    mapId: string;
}

