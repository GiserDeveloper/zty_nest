import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
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
}

