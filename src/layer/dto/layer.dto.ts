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

    @IsNumber()
    @ApiProperty({
        description: '点的数量'
    })
    markerCount: number;

    @IsObject()
    @ApiProperty({
        description: '图层字段列表'
    })
    fieldList: string[];

}

export class modifyLayerFieldDto{

    @IsString()
    @ApiProperty({
        description: '修改的图层id'
    })
    modifyLayerId: string;

    @IsString()
    @ApiProperty({
        description: '修改的图层字段FieldList'
    })
    modifyFieldName: string;

    @IsString()
    @ApiProperty({
        description: '指定修改字段的名称'
    })
    modifyFieldNameCon: string;
}