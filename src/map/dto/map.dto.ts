import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class MapDto{

    @IsString()
    @ApiProperty({
        description: '地图名称'
    })
    mapName: string;

    @IsBoolean()
    @ApiProperty({
        description: '是否处于激活状态'
    })
    isActive: boolean;

    @IsNumber()
    @ApiProperty({
        description: '包含图层数量'
    })
    layerCount: number;

}