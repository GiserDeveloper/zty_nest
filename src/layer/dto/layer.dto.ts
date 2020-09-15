import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';

export class LayerDto{

    @IsString()
    @ApiProperty({
        description: '图层名称'
    })
    layerName: string;

    @IsString()
    @ApiProperty({
        description: '所属地图名称'
    })
    map_name: string;

    @IsBoolean()
    @ApiProperty({
        description: '是否是默认图层'
    })
    isDefaultLayer: boolean;

    @IsBoolean()
    @ApiProperty({
        description: '是否可见'
    })
    isVisible: boolean;

    @IsObject()
    @ApiProperty({
        description: '图层字段列表'
    })
    fieldList: string[];

}