import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SettingService } from './setting.service';
import { SettingDto } from './dto/setting.dto';
import { get } from 'http';

@Controller('setting')
@ApiTags('用户配置')
export class SettingController {
    constructor(
        private readonly settingService: SettingService
    ) { }

    @Post()
    @ApiOperation({ summary: '创建新用户配置' })
    createSetting(@Body() settingDto: SettingDto) {
        return this.settingService.create(settingDto)
    }

    @Put('updateSetting')
    @ApiOperation({ summary: '修改用户配置' })
    updateSetting(@Body() SettingDto: SettingDto) {
        return this.settingService.updateSetting(SettingDto.userId, SettingDto.layerId, SettingDto.isVisible)
    }

    @Put('updateSettingMany')
    @ApiOperation({ summary: '批量修改用户配置' })
    updateSettingMany(@Body() SettingDto: SettingDto[]) {
        if (SettingDto.length != 0) {
            for (var i = 0; i < SettingDto.length; i++) {
                let userId = SettingDto[i]['userId'];
                let layerId = SettingDto[i]['layerId']
                let isVisible = SettingDto[i]['isVisible']
                this.settingService.updateSetting(userId, layerId, isVisible)
            }
            return this.settingService.getSettingById(SettingDto[0]['userId'])
        }
    }

    @Post('initSettings')
    @ApiOperation({ summary: '重新初始化配置' })
    initSettings() {
        return this.settingService.initSettings()
    }

    @Get('getSettingById/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入userId'
    })
    @ApiOperation({ summary: '获取用户配置' })
    getSettingById(@Param('userId') userId) {
        return this.settingService.getSettingById(userId)
    }

    @Get('getUserSettingByLayerId')
    @ApiQuery({
        name: 'userId',
    })
    @ApiQuery({
        name: 'layerId',
    })
    @ApiOperation({ summary: '获取用户关于特定图层的用户配置' })
    getUserSettingByLayerId(@Query('userId') userId, @Query('layerId') layerId) {
        return this.settingService.getUserSettingByLayerId(userId, layerId)
    }

    @Get('getMapSettingById')
    @ApiQuery({
        name: 'userId',
    })
    @ApiQuery({
        name: 'mapId',
    })
    @ApiOperation({ summary: '获取用户关于特定地图所有的图层配置' })
    getMapSettingById(@Query('userId') userId, @Query('mapId') mapId) {
        return this.settingService.getMapSettingById(userId, mapId)
    }

    @Put('insertUserSettingOfNewLayer/:layerId')
    @ApiParam({
        name: 'layerId',
        description: '请传入layerId'
    })
    @ApiOperation({ summary: '根据图层ID新建用户配置' })
    insertUserSettingOfNewLayer(@Param('layerId') layerId) {
        return this.settingService.insertUserSettingOfNewLayer(layerId)
    }

    @Delete('deleteManyByLayerId/:layerId')
    @ApiParam({
        name: 'layerId',
        description: '请传入layerId'
    })
    @ApiOperation({ summary: '根据图层Id删除用户配置' })
    deleteManyByLayerId(@Param('layerId') layerId) {
        return this.settingService.deleteManyByLayerId(layerId)
    }

    @Post('insertUserSettingOfNewUser/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入userId'
    })
    @ApiOperation({ summary: '根据用户ID新建用户配置' })
    insertUserSettingOfNewUser(@Param('userId') userId) {
        return this.settingService.insertUserSettingOfNewUser(userId)
    }

    @Delete('deleteManyByUserId/:userId')
    @ApiParam({
        name: 'userId',
        description: '请传入userId'
    })
    @ApiOperation({ summary: '根据用户Id删除用户配置' })
    deleteManyByUserId(@Param('userId') userId) {
        return this.settingService.deleteManyByUserId(userId)
    }
}
