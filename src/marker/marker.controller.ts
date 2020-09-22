import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MarkerService } from './marker.service';
import { MarkerDto, modifyMarkerFieldDto } from './dto/marker.dto';


@Controller('marker')
@ApiTags('标记点模块')
export class MarkerController {
    constructor(
        private readonly markerService: MarkerService
    ) { }

    @Post()
    @ApiOperation({ summary: '创建新标记点' })
    createMarker(@Body() markerDto: MarkerDto) {
        return this.markerService.create(markerDto);
    }

    @Get('findMarkersByLayerName/:layerName')
    @ApiParam({
        name: 'layerName',
        description: '请传入图层名称'
    })
    @ApiOperation({ summary: '根据图层查找点' })
    getUserById(@Param('layerName') layerName) {
        return this.markerService.findMarkerByLayerName(layerName);
    }

    @Get()
    @ApiOperation({ summary: '查找全部点及其详细信息' })
    getAllMarkers() {
        return this.markerService.findAllMarkers();
    }

    @Get('findMarkerByMultiLayer')
    @ApiQuery({
        name: 'layerNames',
    })
    @ApiOperation({
        summary: '根据一组图层参数查询点数据'
    })
    getMarkersByMultiLayers(@Query('layerNames') layerNames) {
        // 字符串转数组
        let queryArr = JSON.stringify(layerNames.split(','));
        return this.markerService.findMarkerByMultiLayerNames(queryArr);
    }

    @Get('findMarkerActive')
    @ApiOperation({
        summary: '查询处于激活状态的点数据'
    })
    getMarkersActive() {
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
    queryMarkerByID(@Param('id') id) {
        return this.markerService.queryMarkerByID(id);
    }

    // 新增点字段
    @Post('addMarkerField')
    @ApiOperation({
        summary: '新增点字段'
    })
    addLayerField(@Body() addMarkerFieldContent: modifyMarkerFieldDto) {
        return this.markerService.addMarkerField(addMarkerFieldContent, addMarkerFieldContent.modifyLayerName)
    }

    // 删除点字段
    @Post('deleteMarkerField')
    @ApiOperation({
        summary: '删除点字段'
    })
    deleteMarkerField(@Body() deleteMarkerFieldContent: modifyMarkerFieldDto){
        return this.markerService.deleteMarkerField(deleteMarkerFieldContent, deleteMarkerFieldContent.modifyLayerName)
    }

    // 修改点数据-部分字段
    @Put('modify')
    @ApiQuery({
        name: 'markerName',
        description: '请传入待修改点名字'
    })
    @ApiOperation({ summary: '修改点数据' })
    modifyMarker(@Query('markerName') query, @Body() updateContent: MarkerDto) {
        return this.markerService.modifyMarker(query, updateContent);
    }

    // 根据图层名称修改点字段
    @Put('modifyByLayer')
    @ApiQuery({
        name: 'layerName',
        description: '请传入修改的图层名字'
    })
    @ApiOperation({ summary: '修改点数据-通过图层' })
    modifyMarkerByLayer(@Query('layerName') query, @Body() updateContent: MarkerDto) {
        return this.markerService.modifyMarkerByLayerName(query, updateContent);
    }


    @Delete(':markerName')
    @ApiParam({
        name: 'markerName',
        description: '请传入点名称'
    })
    @ApiOperation({summary: '传入点名称删除点'})
    deleteMarkerByName(@Param('markerName') markerName){
        return this.markerService.deleteMarker(markerName);
    }

    @Delete('multi/:layerName')
    @ApiParam({
        name: 'layerName',
        description: '请传入图层名称'
    })
    @ApiOperation({summary: '传入图层名称删除点'})
    deleteMarkersByLayerName(@Param('layerName') layerName){
        return this.markerService.deleteMarkers(layerName);
    }  

    @Get('test')
    @ApiOperation({summary: 'test'})
    test(){
        return this.markerService.test()
    }

}

