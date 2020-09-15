import { Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';

export class MarkerDto{

    // @IsNumber()
    // @ApiProperty({
    //     description: '标记点id'
    // })
    // id: number;

    @IsNumber()
    @ApiProperty({
        description: '纬度'
    })
    latitude: number;

    @IsNumber()
    @ApiProperty({
        description: '经度'
    })
    longitude: number;

    @IsNumber()
    @ApiProperty({
        description: '标注图标宽度'
    })
    width: number;

    @IsNumber()
    @ApiProperty({
        description: '标注图标高度'
    })
    height: number;

    @IsString()
    @ApiProperty({
        description: '显示的图标'
    })
    iconPath: string;

    @IsObject()
    @ApiProperty({
        description: '标记点上方的气泡窗口'
    })
    callout: object;

    @IsString()
    @ApiProperty({
        description: '元素额外属性（图层名称）'
    })
    layer_name: string;

}

