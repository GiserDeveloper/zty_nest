import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class TeamDto{

    @IsString()
    @ApiProperty({
        description: '团队名称'
    })
    teamName: string;
}