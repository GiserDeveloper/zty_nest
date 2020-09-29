import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class SettingDto{

    @IsString()
    @ApiProperty({
        description: '用户Id'
    })
    userId: string;

    @IsString()
    @ApiProperty({
        description: '图层Id'
    })
    layerId: string;

    @IsBoolean()
    @ApiProperty({
        description: '是否可见'
    })
    isVisible: boolean;
}