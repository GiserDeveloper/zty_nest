import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { MarkerService } from './marker.service';
import { MarkerDto } from './dto/marker.dto';

@Controller('marker')
@ApiTags('标记点模块')
export class MarkerController {
    constructor(
        private readonly markerService: MarkerService
    ){}

    @Post()
    @ApiOperation({summary: '创建新标记点'})
    createMarker(@Body() markerDto: MarkerDto){
        return this.markerService.create(markerDto);
    }

    @Get('findMarkersByLayerName/:layerName')
    @ApiParam({
        name: 'layerName',
        description: '请传入图层名称'
    })
    @ApiOperation({summary: '根据图层查找点'})
    getUserById(@Param('layerName') layerName){
        return this.markerService.findMarkerByLayerName(layerName);
    }

    @Get()
    @ApiOperation({summary:'查找全部'})
    getAllMarkers(){
        return this.markerService.findAllMarkers();
    }


}

