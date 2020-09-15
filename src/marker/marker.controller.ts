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
    @ApiOperation({summary: '创建新图层'})
    createMarker(@Body() markerDto: MarkerDto){
        return this.markerService.create(markerDto);
    }
}

