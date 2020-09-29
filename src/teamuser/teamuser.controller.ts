import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TeamuserService } from './teamuser.service';
import { TeamuserDto } from './dto/teamuser.dto';

@Controller('teamuser')
@ApiTags('钉图用户模块')
export class TeamuserController {
    constructor(
        private readonly teamuserService: TeamuserService
    ){}

    @Post()
    @ApiOperation({summary: '创建新用户'})
    createTeamUser(@Body() teamuserDto: TeamuserDto){
        return this.teamuserService.create(teamuserDto)
    }
}
