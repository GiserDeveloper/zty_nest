import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { LayerService } from './layer.service';
import { LayerDto } from './dto/layer.dto';

@Controller('layer')
@ApiTags('地图图层模块')
export class LayerController {
    constructor(
        private readonly layerService: LayerService
    ){}

    @Post()
    @ApiOperation({summary: '创建新图层'})
    createLayer(@Body() layerDto: LayerDto){
        return this.layerService.create(layerDto);
    }

    @Get()
    @ApiOperation({summary: '查找所有图层'})
    findAllLayers(){
        return this.layerService.findAllLayers()
    }

    // 修改图层数据-部分字段
    @Put('modify')
    @ApiQuery({
        name: 'layerName',
        description: '请传入待修改图层名字'
    })
    @ApiOperation({summary: '修改图层数据'})
    modifyLayer(@Query('layerName') query, @Body() updateContent:LayerDto){
        return this.layerService.modifyLayer(query, updateContent);
    }

    // 根据图层名称查找图层
    @Get(':layerName')
    @ApiParam({
        name: 'layerName',
        description: '请传入图层名称' 
    })
    @ApiOperation({summary: '根据图层名称查询图层数据'})
    findLayerInfoByName(@Param('layerName') layerName){
        return this.layerService.findLayerInfoByName(layerName);
    }

}
