import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { SettingService } from './setting.service';
import { SettingDto } from './dto/setting.dto';

@Controller('setting')
@ApiTags('用户配置')
export class SettingController {
    constructor(
        private readonly settingService: SettingService
    ){}

    @Post()
    @ApiOperation({summary: '创建新用户配置'})
    createSetting(@Body() settingDto: SettingDto){
        return this.settingService.create(settingDto)
    }
}
