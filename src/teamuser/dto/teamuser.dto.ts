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

