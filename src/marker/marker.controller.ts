import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MarkerService } from './marker.service';
import { MarkerDto } from './dto/marker.dto';
import { identity } from 'rxjs';

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
    @ApiOperation({summary:'查找全部点及其详细信息'})
    getAllMarkers(){
        return this.markerService.findAllMarkers();
    }

    @Get('findMarkerByMultiLayer')
    @ApiQuery({
        name: 'layerNames',
    })
    @ApiOperation({
        summary: '根据一组图层参数查询点数据'
    })
    getMarkersByMultiLayers(@Query('layerNames') layerNames){
        // 字符串转数组
        let queryArr = JSON.stringify(layerNames.split(','));
        return this.markerService.findMarkerByMultiLayerNames(queryArr);
    }

    @Get('findMarkerActive')
    @ApiOperation({
        summary: '查询处于激活状态的点数据'
    })    
    getMarkersActive(){
        return this.markerService.findMarkerActive();
    }

    @Get('detail/:id')
    @ApiParam({
        name: 'id',
        description: '请传入markerID'
    })
    @ApiOperation({
        summary: '根据ID查询点的详细信息'
    })    
    queryMarkerByID(@Param('id') id){
        return this.markerService.queryMarkerByID(id);
    }

}

