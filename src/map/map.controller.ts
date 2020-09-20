import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';

@Controller('map')
@ApiTags('地图模块')
export class MapController {
    constructor(
        private readonly mapService: MapService
    ){}

    @Post()
    @ApiOperation({summary: '创建新地图'})
    createMap(@Body() mapDto: MapDto){
        return this.mapService.create(mapDto);
    }

    @Get()
    @ApiOperation({summary: '查找所有地图'})
    findAllMaps(){
        return this.mapService.findAllMaps()
    }

    // 修改地图数据-部分字段
    @Put('modify')
    @ApiQuery({
        name: 'mapName',
        description: '请传入待修改地图名字'
    })
    @ApiOperation({summary: '修改地图数据'})
    modifyLayer(@Query('mapName') query, @Body() updateContent:MapDto){
        return this.mapService.modifyMap(query, updateContent);
    }
}

