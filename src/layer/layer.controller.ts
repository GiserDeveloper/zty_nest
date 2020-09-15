import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
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
}
