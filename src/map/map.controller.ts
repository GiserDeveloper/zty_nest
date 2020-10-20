import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MapService } from './map.service';
import { MapDto } from './dto/map.dto';

import { LayerService } from '../layer/layer.service'
import { SettingService } from '../setting/setting.service'
import { MarkerService} from '../marker/marker.service'

@Controller('map')
@ApiTags('地图模块')
export class MapController {
    constructor(
        private readonly mapService: MapService,
        private readonly layerService: LayerService,
        private readonly settingService: SettingService,
        private readonly markerService: MarkerService,

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
        name: 'mapId',
        description: '请传入待修改地图id'
    })
    @ApiOperation({summary: '修改地图数据'})
    modifyLayer(@Query('mapId') query, @Body() updateContent:MapDto){
        return this.mapService.modifyMap(query, updateContent);
    }

    @Get('getMapListByTeamId/:teamId')
    @ApiParam({
        name: 'teamId',
        description: '请传入团队id'
    })
    @ApiOperation({summary: '获取团队中地图列表'})
    getmMapListByTeamId(@Param('teamId') teamId){
        return this.mapService.getMapListByTeamId(teamId)
    }

    @Delete('deleteMap/:mapId')
    @ApiParam({
        name: 'mapId',
        description: '请传入地图id'
    })
    @ApiOperation({summary: '获取团队中地图列表'})
    async deleteMapById(@Param('mapId') mapId){
        console.log(mapId)
        await this.settingService.deleteManyByMapId(mapId)
        await this.markerService.deleteMakersByMapId(mapId)
        await this.layerService.deleteLayerByMapId(mapId)
        return await this.mapService.deletMapById(mapId)
        // return this.mapService.getMapListByTeamId(mapID)
    }
}

